import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../../api';
import './Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: '', mobile: '', email: '', otp: '', board: '', class: '', password: '', confirm_password: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alertMsg, setAlertMsg] = useState({ text: '', type: '' });

  // OTP Specific States
  const [otpTimer, setOtpTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [registrationToken, setRegistrationToken] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when page loads
  }, []);

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

  const showAlert = (text, type = 'success') => {
    setAlertMsg({ text, type });
    if (type === 'success') {
      setTimeout(() => setAlertMsg({ text: '', type: '' }), 5000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Strict validation for full_name: only letters and spaces
    if (name === 'full_name' && value !== '') {
      if (!/^[a-zA-Z\s]*$/.test(value)) return;
    }

    // Strict number validation for mobile and otp
    if ((name === 'mobile' || name === 'otp') && value !== '') {
      if (!/^\d+$/.test(value)) return;
      if (name === 'mobile' && value.length > 10) return;
      if (name === 'otp' && value.length > 6) return;
    }

    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: '' });
  };

  const handleSendOtp = async () => {
    if (!formData.email) {
      return setErrors({ email: 'Email address is required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return setErrors({ email: 'Please enter a valid email address' });
    }

    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlert('OTP sent successfully to your email!', 'success');
        setOtpTimer(240); // 4 minutes
      } else {
        showAlert(data.message || 'Failed to send OTP', 'error');
        setErrors({ email: data.message });
      }
    } catch (err) {
      showAlert('Server error while sending OTP. Try again.', 'error');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!formData.otp || formData.otp.length !== 6) return setErrors({ otp: 'Please enter a 6-digit OTP' });

    setOtpLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: formData.email, otp: formData.otp })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlert('Email verified successfully! You can now register.', 'success');
        setEmailVerified(true);
        if (data.registrationToken) {
          setRegistrationToken(data.registrationToken);
        }
      } else {
        showAlert(data.message || 'Invalid OTP', 'error');
        setErrors({ otp: data.message });
      }
    } catch (err) {
      showAlert('Verification failed. Try again.', 'error');
    } finally {
      setOtpLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setAlertMsg({ text: '', type: '' });
    if (!emailVerified) return showAlert('Please verify your email with OTP first to proceed.', 'error');

    let validationErrors = {};
    if (!formData.full_name || formData.full_name.trim().length < 3) validationErrors.full_name = 'Name must be at least 3 characters';
    if (!formData.mobile || formData.mobile.length !== 10) validationErrors.mobile = 'Enter valid 10-digit mobile number';
    if (!formData.board) validationErrors.board = 'Please select a board';
    if (!formData.class) validationErrors.class = 'Please select a class';
    if (!formData.password || formData.password.length < 6) validationErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirm_password) validationErrors.confirm_password = 'Passwords do not match';

    if (Object.keys(validationErrors).length > 0) {
      return setErrors(validationErrors);
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, registrationToken })
      });
      const data = await res.json();

      if (data.success || res.ok) {
        showAlert('Registration successful! Redirecting to login...', 'success');
        setTimeout(() => navigate('/login'), 2000);
      } else {
        showAlert(data.message || 'Registration failed. Please check the details.', 'error');
      }
    } catch (err) {
      showAlert('Registration failed due to server error. Try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="l360-enroll-container">
      <div className="l360-enroll-wrapper">
        <div className="l360-enroll-info">
          <h2>Why Enroll With AARAMBH INSTITUTE?</h2>
          <ul className="l360-feature-list">
            <li><i className="fa-solid fa-laptop-code"></i><span>Complete LMS Access</span> - Study anytime, anywhere</li>
            <li><i className="fa-solid fa-chalkboard-user"></i><span>Live Interactive Classes</span> - Learn from expert faculty</li>
            <li><i className="fa-solid fa-book-open"></i><span>Downloadable Study Materials</span> - Chapter-wise notes & guides</li>
            <li><i className="fa-solid fa-clipboard-check"></i><span>Practice Tests & Mock Exams</span> - Track your progress</li>
            <li><i className="fa-solid fa-headset"></i><span>24/7 Doubt Clearing</span> - Get your questions answered</li>
            <li><i className="fa-solid fa-circle-play"></i><span>Recorded Video Lectures</span> - Revise anytime</li>
            <li><i className="fa-solid fa-pen-to-square"></i><span>Assignment Support</span> - Guidance for TMA submission</li>
            <li><i className="fa-solid fa-lightbulb"></i><span>Exam Preparation Tips</span> - Strategies to score high</li>
          </ul>
        </div>

        <div className="l360-enroll-form">
          <div className="l360-form-header">
            <h2>Student Registration</h2>
            <div className="l360-form-subtitle">Fill the details below to create your LMS account</div>
          </div>

          {alertMsg.text && (
            <div className={`l360-form-alert alert-${alertMsg.type}`}>
              <i className={`fa-solid ${alertMsg.type === 'success' ? 'fa-check-circle' : 'fa-circle-exclamation'}`}></i>
              <span>{alertMsg.text}</span>
            </div>
          )}

          <form onSubmit={handleRegister}>
            <div className="l360-form-row">
              <div className="l360-form-group">
                <label>Full Name <span>*</span></label>
                <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter your full name" className={errors.full_name ? 'error-input' : ''} />
                {errors.full_name && <span className="l360-error-text">{errors.full_name}</span>}
              </div>
              <div className="l360-form-group">
                <label>Mobile Number <span>*</span></label>
                <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit mobile number" className={errors.mobile ? 'error-input' : ''} />
                {errors.mobile && <span className="l360-error-text">{errors.mobile}</span>}
              </div>
            </div>

            <div className="l360-form-row">
              <div className="l360-form-group">
                <label>Email Address <span>*</span></label>
                <div className="l360-email-wrapper">
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" disabled={emailVerified || otpTimer > 0} className={errors.email ? 'error-input' : ''} />
                  <button type="button" className="l360-otp-btn" onClick={handleSendOtp} disabled={otpTimer > 0 || emailVerified || otpLoading}>
                    {otpLoading ? 'Sending...' : otpTimer > 0 ? `Resend (${formatTime(otpTimer)})` : 'Send OTP'}
                  </button>
                </div>
                {emailVerified && <span className="l360-otp-status success">✓ Verified</span>}
                {errors.email && <span className="l360-error-text">{errors.email}</span>}
              </div>
              <div className="l360-form-group">
                <label>OTP <span>*</span></label>
                <input type="text" name="otp" value={formData.otp} onChange={handleChange} placeholder="Enter OTP" disabled={emailVerified} className={errors.otp ? 'error-input' : ''} />
                {!emailVerified && (
                  <button type="button" className="l360-otp-btn" onClick={handleVerifyOtp} style={{ marginTop: '10px', width: '100%' }} disabled={!formData.otp || otpLoading}>
                    {otpLoading ? 'Verifying...' : 'Verify OTP'}
                  </button>
                )}
                {errors.otp && <span className="l360-error-text">{errors.otp}</span>}
              </div>
            </div>

            <div className="l360-form-row">
              <div className="l360-form-group">
                <label>Select Board <span>*</span></label>
                <select name="board" value={formData.board} onChange={handleChange} className={errors.board ? 'error-input' : ''}>
                  <option value="">Select Board</option>
                  <option value="nios">NIOS Board</option>
                  <option value="bbose">BBOSE Board</option>
                  <option value="bosse">BOSSE Board</option>
                </select>
                {errors.board && <span className="l360-error-text">{errors.board}</span>}
              </div>
              <div className="l360-form-group">
                <label>Select Class <span>*</span></label>
                <select name="class" value={formData.class} onChange={handleChange} className={errors.class ? 'error-input' : ''}>
                  <option value="">Select Class</option>
                  <option value="10th">10th (Secondary)</option>
                  <option value="12th">12th (Senior Secondary)</option>
                </select>
                {errors.class && <span className="l360-error-text">{errors.class}</span>}
              </div>
            </div>

            <div className="l360-form-row">
              <div className="l360-form-group">
                <label>Create Password <span>*</span></label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a password" className={errors.password ? 'error-input' : ''} />
                {errors.password && <span className="l360-error-text">{errors.password}</span>}
              </div>
              <div className="l360-form-group">
                <label>Confirm Password <span>*</span></label>
                <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} placeholder="Confirm password" className={errors.confirm_password ? 'error-input' : ''} />
                {errors.confirm_password && <span className="l360-error-text">{errors.confirm_password}</span>}
              </div>
            </div>

            <button type="submit" className="l360-submit-btn" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : <i className="fa-solid fa-user-plus"></i>}
              {loading ? ' Registering...' : ' Register Now'}
            </button>

            <div className="l360-login-link">
              Already have an account? <Link to="/login">Login to LMS</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
