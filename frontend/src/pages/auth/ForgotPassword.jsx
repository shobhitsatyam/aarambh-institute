import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwords, setPasswords] = useState({ new: '', confirm: '' });
  const [showPassword, setShowPassword] = useState({ new: false, confirm: false });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [alertMsg, setAlertMsg] = useState({ text: '', type: '' });

  const [otpTimer, setOtpTimer] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    let interval;
    if (otpTimer > 0) {
      interval = setInterval(() => setOtpTimer(prev => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [otpTimer]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const showAlertMsg = (text, type = 'success') => {
    setAlertMsg({ text, type });
    setTimeout(() => setAlertMsg({ text: '', type: '' }), 4000);
  };

  const handleSendOtp = async () => {
    setErrors({});
    if (!email) return setErrors({ email: 'Please enter your email address' });
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setErrors({ email: 'Please enter a valid email' });

    setLoading(true);
    try {
      // Replace with your Node.js endpoint
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlertMsg('OTP sent successfully!');
        setStep(2);
        setOtpTimer(240); // 4 minutes
      } else {
        showAlertMsg(data.message || 'Failed to send OTP', 'error');
        setErrors({ email: data.message });
      }
    } catch (err) {
      showAlertMsg('Server error. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setErrors({});
    if (!otp || otp.length !== 6) return setErrors({ otp: 'Please enter a 6-digit OTP' });

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlertMsg('OTP verified successfully!');
        setStep(3);
      } else {
        showAlertMsg(data.message || 'Invalid OTP', 'error');
        setErrors({ otp: data.message });
      }
    } catch (err) {
      showAlertMsg('Verification failed.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErrors({});
    let newErrors = {};

    if (!passwords.new || passwords.new.length < 6) newErrors.new = 'Password must be at least 6 characters';
    if (passwords.new !== passwords.confirm) newErrors.confirm = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) return setErrors(newErrors);

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/forgot-password/reset`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: passwords.new })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlertMsg('Password reset successful!');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        showAlertMsg(data.message || 'Reset failed', 'error');
      }
    } catch (err) {
      showAlertMsg('Reset failed. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="l360-forgot-container">
      <div className="l360-forgot-card">
        <div className="l360-forgot-header">
          <h2>Forgot Password?</h2>
          <p>Reset your password in three simple steps</p>
          <div className="step-indicator">
            {[1, 2, 3].map(num => (
              <div className="l360-step" key={num}>
                <div className={`step-number ${step > num ? 'completed' : step === num ? 'active' : ''}`}>{num}</div>
                <div className={`step-label ${step > num ? 'completed' : step === num ? 'active' : ''}`}>
                  {num === 1 ? 'Enter Email' : num === 2 ? 'Verify OTP' : 'Reset Password'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {alertMsg.text && (
          <div className={`l360-form-alert alert-${alertMsg.type}`}>
            <i className={`fa-solid ${alertMsg.type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`}></i>
            <span>{alertMsg.text}</span>
          </div>
        )}

        {step === 1 && (
          <div className="step-content active-step">
            <div className="l360-form-group">
              <label>Registered Email Address <span>*</span></label>
              <div className="l360-email-wrapper">
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors({}); }}
                  className={errors.email ? 'error-input' : ''}
                />
                <button type="button" className="l360-otp-btn" onClick={handleSendOtp} disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
              {errors.email && <span className="l360-error-text">{errors.email}</span>}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="step-content active-step">
            <div className="l360-form-group">
              <label>Enter OTP <span>*</span></label>
              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => { 
                  const val = e.target.value;
                  if(val !== '' && !/^\d+$/.test(val)) return;
                  if(val.length > 6) return;
                  setOtp(val); 
                  setErrors({}); 
                }}
                className={errors.otp ? 'error-input' : ''}
              />
              <button type="button" className="l360-otp-btn" onClick={handleVerifyOtp} style={{ marginTop: '15px', width: '100%' }} disabled={loading}>
                {loading ? 'Verifying...' : 'Verify OTP'}
              </button>
              {errors.otp && <span className="l360-error-text">{errors.otp}</span>}
            </div>
            <div className="l360-login-link">
              <button onClick={handleSendOtp} disabled={otpTimer > 0 || loading} style={{ background: 'none', border: 'none', color: 'var(--l360-accent)', cursor: 'pointer', fontWeight: 600 }}>
                {otpTimer > 0 ? `Resend OTP (${formatTime(otpTimer)})` : 'Resend OTP'}
              </button> | <Link to="#" onClick={() => setStep(1)}>Use different email</Link>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content active-step">
            <form onSubmit={handleResetPassword}>
              <div className="l360-form-group">
                <label>New Password <span>*</span></label>
                <div className="l360-password-wrapper">
                  <input
                    type={showPassword.new ? "text" : "password"}
                    placeholder="Enter new password (min. 6 characters)"
                    value={passwords.new}
                    onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    className={errors.new ? 'error-input' : ''}
                  />
                  <button type="button" className="l360-password-toggle" onClick={() => setShowPassword({ ...showPassword, new: !showPassword.new })}>
                    <i className={`fa-regular ${showPassword.new ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.new && <span className="l360-error-text">{errors.new}</span>}
              </div>

              <div className="l360-form-group">
                <label>Confirm Password <span>*</span></label>
                <div className="l360-password-wrapper">
                  <input
                    type={showPassword.confirm ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={passwords.confirm}
                    onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    className={errors.confirm ? 'error-input' : ''}
                  />
                  <button type="button" className="l360-password-toggle" onClick={() => setShowPassword({ ...showPassword, confirm: !showPassword.confirm })}>
                    <i className={`fa-regular ${showPassword.confirm ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {errors.confirm && <span className="l360-error-text">{errors.confirm}</span>}
              </div>

              <button type="submit" className="l360-submit-btn" disabled={loading}>
                <i className="fa-solid fa-key"></i> {loading ? 'Resetting...' : 'Reset Password'}
              </button>

              <div className="l360-login-link">
                <Link to="/login">Back to Login</Link>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
