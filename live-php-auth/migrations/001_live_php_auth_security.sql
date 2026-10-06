-- ====================================================================
-- Aarambh Institute - Live PHP Authentication Security Migration
-- Migration: 001_live_php_auth_security.sql
-- Description: Hardens live PHP authentication schema:
--              - Expands OTP column length to store HMAC-SHA256 hashes
--              - Adds attempts column to prevent brute-force attacks
--              - Adds verified_token and reset_token columns for server authorization
--              - Creates dedicated DB-backed rate limiting table
-- Safety: Non-destructive schema updates (no DROP, TRUNCATE, or DELETE)
-- ====================================================================

-- 1. Alter otp_logs table (used by registration flow)
ALTER TABLE otp_logs MODIFY COLUMN otp VARCHAR(255) NOT NULL;
ALTER TABLE otp_logs ADD COLUMN attempts INT NOT NULL DEFAULT 0;
ALTER TABLE otp_logs ADD COLUMN verified_token VARCHAR(255) DEFAULT NULL;

-- 2. Alter password_reset_otps table (used by forgot-password flow)
ALTER TABLE password_reset_otps MODIFY COLUMN otp VARCHAR(255) NOT NULL;
ALTER TABLE password_reset_otps ADD COLUMN attempts INT NOT NULL DEFAULT 0;
ALTER TABLE password_reset_otps ADD COLUMN reset_token VARCHAR(255) DEFAULT NULL;

-- 3. Create dedicated DB rate limiting table for PHP auth flows
CREATE TABLE IF NOT EXISTS php_auth_rate_limits (
  identifier VARCHAR(150) NOT NULL PRIMARY KEY,
  attempts INT NOT NULL DEFAULT 0,
  last_attempt DATETIME NOT NULL,
  block_until DATETIME DEFAULT NULL
);
