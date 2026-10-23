-- ====================================================================
-- Aarambh Institute Database Migration
-- Migration: 003_payment_domain_tables.sql
-- Description: Provisions the core application domain tables required
--              for payment processing:
--                1. courses
--                2. purchased_courses
--                3. study_materials
--                4. purchased_materials
--                5. student_fees
--                6. fee_installments
-- Source: Derived directly from backend/initDb.js schema definitions.
-- Target Database: u514244105_aarambh_node
-- Safety Notice:
--   - Non-destructive: Uses CREATE TABLE IF NOT EXISTS.
--   - Zero seed data: No test or dummy records inserted.
--   - Zero destructive operations: No DROP, TRUNCATE, DELETE, or ALTER.
--   - Does NOT touch authentication tables (users, otps, otp_rate_limits).
--   - Does NOT touch the payments audit table (handled by migration 002).
--   - Must NEVER be executed against legacy PHP database u514244105_openadmission.
--
-- Limitation of CREATE TABLE IF NOT EXISTS:
--   CREATE TABLE IF NOT EXISTS creates tables only if they do not already
--   exist. If a table with the same name already exists in the database
--   with missing columns, altered data types, or mismatched constraints,
--   MySQL will silently skip the statement without repairing, updating,
--   or altering the existing table structure.
-- ====================================================================

-- --------------------------------------------------------------------
-- 1. COURSES TABLE
-- --------------------------------------------------------------------
-- Stores course catalogue information, pricing, and class inclusions.
-- Queried by paymentController.createOrder to validate server-side course price.
CREATE TABLE IF NOT EXISTS courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  description TEXT,
  duration VARCHAR(100),
  is_free BOOLEAN DEFAULT TRUE,
  price DECIMAL(10, 2) DEFAULT 0.00,
  includes_live_classes BOOLEAN DEFAULT FALSE,
  includes_recorded_classes BOOLEAN DEFAULT FALSE,
  thumbnail VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 2. PURCHASED COURSES TABLE
-- --------------------------------------------------------------------
-- Records course enrollments and purchases by students.
-- Queried and updated by paymentController.verifyPayment upon successful payment.
-- Note: Migration 002 conditionally adds the UNIQUE KEY uq_purchased_courses_student_course
--       (student_id, course_id) after safe duplicate verification.
CREATE TABLE IF NOT EXISTS purchased_courses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  course_id INT NOT NULL,
  price_paid DECIMAL(10, 2) DEFAULT 0.00,
  purchased_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id),
  FOREIGN KEY (course_id) REFERENCES courses(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 3. STUDY MATERIALS TABLE
-- --------------------------------------------------------------------
-- Stores study materials (PDFs, docs, videos) and individual pricing.
-- Queried by paymentController.createOrder to validate server-side material price.
CREATE TABLE IF NOT EXISTS study_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  type VARCHAR(50) NOT NULL,
  course VARCHAR(100) NOT NULL,
  size VARCHAR(50),
  is_free BOOLEAN DEFAULT TRUE,
  price DECIMAL(10, 2) DEFAULT 0.00,
  file_url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 4. PURCHASED MATERIALS TABLE
-- --------------------------------------------------------------------
-- Records unlocked study materials purchased by students.
-- Queried and updated by paymentController.verifyPayment upon successful payment.
CREATE TABLE IF NOT EXISTS purchased_materials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  material_id INT NOT NULL,
  amount_paid DECIMAL(10, 2) NOT NULL,
  purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (material_id) REFERENCES study_materials(id) ON DELETE CASCADE,
  UNIQUE KEY unique_purchase (student_id, material_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 5. STUDENT FEES TABLE
-- --------------------------------------------------------------------
-- Stores aggregate student fee balances (total fee, paid amount, pending amount).
-- Updated by paymentController.verifyPayment when a fee installment is paid.
CREATE TABLE IF NOT EXISTS student_fees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  total_fee DECIMAL(10, 2) NOT NULL,
  paid_amount DECIMAL(10, 2) DEFAULT 0,
  pending_amount DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------------------
-- 6. FEE INSTALLMENTS TABLE
-- --------------------------------------------------------------------
-- Stores scheduled fee installments and payment statuses.
-- Queried by paymentController.createOrder and updated to 'Paid' by paymentController.verifyPayment.
CREATE TABLE IF NOT EXISTS fee_installments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  due_date DATE NOT NULL,
  status ENUM('Paid', 'Pending', 'Overdue') DEFAULT 'Pending',
  receipt_no VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
