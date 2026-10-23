-- ====================================================================
-- Aarambh Institute Database Migration
-- Migration: 002_payment_security_and_transactions.sql
-- Description: Creates a dedicated payments audit table for tracking
--              Razorpay orders, captures, statuses, and audit timestamps.
--              Safely adds uniqueness constraints to prevent duplicate
--              course purchases while strictly preserving existing records.
-- Target Tables: payments (new), purchased_courses
-- Scope Limitation Notice:
--   This migration only creates the `payments` audit table and evaluates
--   the `purchased_courses` unique constraint. It does NOT prepare the
--   full application payment schema. The domain tables `courses`,
--   `study_materials`, `purchased_materials`, `student_fees`, and
--   `fee_installments` are separate prerequisites managed by the base
--   application schema (backend/initDb.js) and are required for full
--   payment controller functionality.
-- Safety: Non-destructive schema updates (no DROP, TRUNCATE, or DELETE).
--         Does not create or drop stored procedures.
--         Validates prerequisite application tables before modifying schema.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. Prerequisite Validation Gate
-- --------------------------------------------------------------------
-- Validates that the minimum required tables for this migration exist:
--   - `users`: Required parent table for payments.student_id foreign key.
--   - `purchased_courses`: Required for the unique constraint check.
--
-- Defensive Guard Strategy:
-- Top-level SQL scripts in MySQL cannot execute SIGNAL statements outside of
-- stored programs, and command-line or GUI SQL clients may continue execution
-- even if an individual statement encounters an error (e.g., batch execution).
-- Therefore, safety cannot rely on the SQL client halting on error.
--
-- Instead, this migration evaluates a unified boolean guard flag:
--   @prereqs_ok = (@users_table_exists = 1 AND @courses_table_exists = 1)
--
-- Every subsequent schema mutation (CREATE TABLE in Section 2, ALTER TABLE
-- in Section 3) is conditionally prepared such that if @prereqs_ok is 0,
-- the statement resolves to a harmless diagnostic notice. No schema mutation
-- can execute when prerequisites are missing, regardless of client behavior.

SET @users_table_exists = 0;
SELECT COUNT(*) INTO @users_table_exists
FROM information_schema.tables
WHERE table_schema = DATABASE() AND table_name = 'users';

SET @courses_table_exists = 0;
SELECT COUNT(*) INTO @courses_table_exists
FROM information_schema.tables
WHERE table_schema = DATABASE() AND table_name = 'purchased_courses';

SET @prereqs_ok = IF(@users_table_exists = 1 AND @courses_table_exists = 1, 1, 0);

SET @prereq_gate_sql = IF(
  @prereqs_ok = 1,
  'SELECT "Prerequisite check passed: required tables users and purchased_courses exist." AS status;',
  CONCAT(
    'SELECT "PREREQUISITE CHECK FAILED: users_exists=',
    @users_table_exists,
    ', purchased_courses_exists=',
    @courses_table_exists,
    '. All schema modifications are blocked. Please run migration 003_payment_domain_tables.sql first." AS prerequisite_error;'
  )
);

PREPARE stmt_prereq FROM @prereq_gate_sql;
EXECUTE stmt_prereq;
DEALLOCATE PREPARE stmt_prereq;

-- --------------------------------------------------------------------
-- 2. Create Payments Audit Table
-- --------------------------------------------------------------------
-- Tracks each payment intent/order from creation through capture or failure.
-- Amounts are stored in both INR decimal (10, 2) and Razorpay paise (integer)
-- to prevent floating-point rounding mismatches during verification.
--
-- Audit Preservation Strategy:
-- student_id is NULLABLE with ON DELETE SET NULL. If a student account is
-- deleted, the financial audit record is PRESERVED permanently. The student's
-- email at the time of payment is also captured in `user_email` to ensure
-- historical traceability even if the user record is removed.
--
-- Guarded by @prereqs_ok: If prerequisites are not met, table creation is skipped.
SET @create_payments_sql = IF(
  @prereqs_ok = 1,
  'CREATE TABLE IF NOT EXISTS payments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT DEFAULT NULL,
    user_email VARCHAR(100) DEFAULT NULL COMMENT \'Snapshot of student email at payment; preserved if student is deleted\',
    razorpay_order_id VARCHAR(100) NOT NULL,
    razorpay_payment_id VARCHAR(100) DEFAULT NULL,
    razorpay_signature VARCHAR(255) DEFAULT NULL,
    item_type ENUM(\'course\', \'material\', \'fee_installment\') NOT NULL,
    item_id INT NOT NULL,
    amount DECIMAL(10, 2) NOT NULL COMMENT \'Amount in INR currency unit (e.g., 4999.00)\',
    amount_paise INT UNSIGNED NOT NULL COMMENT \'Amount in Razorpay subunit (paise, e.g., 499900)\',
    currency VARCHAR(10) NOT NULL DEFAULT \'INR\',
    status ENUM(\'created\', \'authorized\', \'captured\', \'failed\', \'refunded\') NOT NULL DEFAULT \'created\',
    receipt VARCHAR(100) DEFAULT NULL,
    error_code VARCHAR(100) DEFAULT NULL,
    error_description TEXT DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE KEY uq_payments_order_id (razorpay_order_id),
    UNIQUE KEY uq_payments_payment_id (razorpay_payment_id),

    INDEX idx_payments_student_item (student_id, item_type, item_id),
    INDEX idx_payments_user_email (user_email),
    INDEX idx_payments_status (status),

    FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE SET NULL
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;',
  'SELECT "SKIPPED: payments table creation skipped because migration prerequisites are not met." AS status;'
);

PREPARE stmt_payments FROM @create_payments_sql;
EXECUTE stmt_payments;
DEALLOCATE PREPARE stmt_payments;

-- --------------------------------------------------------------------
-- 3. Safe Unique Constraint on purchased_courses(student_id, course_id)
-- --------------------------------------------------------------------
-- Safety Rules:
-- 1. Existing purchase records are strictly preserved (no DELETE, TRUNCATE, or UPDATE).
-- 2. If duplicates already exist in purchased_courses, a UNIQUE constraint cannot be
--    added at the database level without modifying data. The script will NOT delete
--    records; instead, it skips adding the constraint and outputs a clear diagnostic
--    warning stating that duplicates prevent DB-level enforcement.
-- 3. Note: A normal (non-unique) index does NOT prevent duplicate purchases. If duplicates
--    prevent the UNIQUE constraint, application-level transaction locking must guard
--    against duplicate purchases until an administrator resolves existing data.
-- 4. If no duplicates exist, the strict UNIQUE constraint is applied safely.
-- 5. Guarded by @prereqs_ok: If prerequisites are not met, checks and alterations are skipped.

SET @duplicate_count = 0;
SET @unique_exists = 0;

-- Query duplicates and existing constraint only if all prerequisites are met
SET @check_courses_sql = IF(
  @prereqs_ok = 1,
  'SELECT
     (SELECT COUNT(*) FROM (
        SELECT student_id, course_id
        FROM purchased_courses
        GROUP BY student_id, course_id
        HAVING COUNT(*) > 1
      ) AS d),
     (SELECT COUNT(*) FROM information_schema.statistics
      WHERE table_schema = DATABASE()
        AND table_name = \'purchased_courses\'
        AND index_name = \'uq_purchased_courses_student_course\')
   INTO @duplicate_count, @unique_exists;',
  'DO 0;'
);

PREPARE stmt_check_courses FROM @check_courses_sql;
EXECUTE stmt_check_courses;
DEALLOCATE PREPARE stmt_check_courses;

SET @sql_course_constraint = IF(
  @prereqs_ok = 1 AND @duplicate_count = 0 AND @unique_exists = 0,
  'ALTER TABLE purchased_courses ADD CONSTRAINT uq_purchased_courses_student_course UNIQUE KEY (student_id, course_id);',
  IF(
    @prereqs_ok = 1 AND @unique_exists > 0,
    'SELECT "Unique constraint uq_purchased_courses_student_course already exists; skipping." AS status;',
    IF(
      @prereqs_ok = 1 AND @duplicate_count > 0,
      'SELECT "WARNING: Duplicate records detected in purchased_courses. UNIQUE constraint was NOT applied to avoid data loss. Existing purchase records remain untouched. Application transaction locking must prevent new duplicates until existing rows are deduplicated." AS warning;',
      'SELECT "SKIPPED: course constraint check skipped because migration prerequisites are not met." AS status;'
    )
  )
);

PREPARE stmt_course FROM @sql_course_constraint;
EXECUTE stmt_course;
DEALLOCATE PREPARE stmt_course;
