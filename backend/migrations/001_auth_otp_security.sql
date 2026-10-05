-- ====================================================================
-- Aarambh Institute Database Migration
-- Migration: 001_auth_otp_security.sql
-- Description: Hardens OTP storage by expanding column length for HMAC-SHA256
--              hashes, adding an attempts counter for brute-force protection,
--              and adding indexes for fast expiration and rate-limit queries.
-- Target Tables: otps, otp_rate_limits
-- Safety: Non-destructive schema updates (no DROP, TRUNCATE, or DELETE)
-- ====================================================================

-- 1. Expand otps.otp to VARCHAR(255) to store cryptographic hashes (HMAC-SHA256 hex is 64 chars)
--    and authorization tokens.
ALTER TABLE otps MODIFY COLUMN otp VARCHAR(255) NOT NULL;

-- 2. Add attempts column to otps table to track failed OTP verification attempts (max 5)
--    and prevent brute-force guessing attacks.
ALTER TABLE otps ADD COLUMN attempts INT NOT NULL DEFAULT 0;

-- 3. Expand otps.type to VARCHAR(50) to support status markers ('register_verified', 'forgot_verified')
ALTER TABLE otps MODIFY COLUMN type VARCHAR(50) NOT NULL;

-- 4. Add index on (email, type) for fast lookup of active verification tokens
CREATE INDEX idx_otps_email_type ON otps (email, type);

-- 5. Ensure otp_rate_limits table exists with adequate column sizing
CREATE TABLE IF NOT EXISTS otp_rate_limits (
  email VARCHAR(100) NOT NULL PRIMARY KEY,
  attempts INT NOT NULL DEFAULT 0,
  last_attempt DATETIME NOT NULL,
  block_until DATETIME DEFAULT NULL
);
