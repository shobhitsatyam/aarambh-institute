import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', rememberMe: false });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' }); // type: 'error' | 'success'
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Check localStorage for Remember Me email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('lms_remembered_email');
    if (rememberedEmail) {
      setFormData(prev => ({ ...prev, email: rememberedEmail, rememberMe: true }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    setMessage({ text: '', type: '' }); // Clear global message
    if (errors[name]) setErrors({ ...errors, [name]: '' }); // Clear field error
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let validationErrors = {};

    if (!formData.email) {
      validationErrors.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      validationErrors.password = 'Password is required';
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      // Handle Remember Me
      if (formData.rememberMe) {
        localStorage.setItem('lms_remembered_email', formData.email);
      } else {
        localStorage.removeItem('lms_remembered_email');
      }

      // Replace with your Node.js API call
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        // Save token to localStorage or context
        localStorage.setItem('token', data.token);
        
        let redirectPath = '/student-dashboard';
        if (data.role === 'admin') {
          redirectPath = '/admin-dashboard';
        } else if (data.role === 'teacher') {
          redirectPath = '/teacher-dashboard';
        }
        
        setMessage({ text: 'Login successful! Redirecting...', type: 'success' });
        setTimeout(() => navigate(redirectPath), 1500);
      } else {
        setMessage({ text: data.message || 'Invalid email or password', type: 'error' });
      }
    } catch (error) {
      setMessage({ text: 'Server error occurred. Please try again.', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="l360-login-container">
      <div className="l360-login-wrapper">
        <div className="l360-login-left">
          <div className="l360-login-left-content">
            <h2>Welcome to LMS Portal</h2>
            <p>Access your learning materials, track progress, and continue your educational journey with us.</p>
            <ul className="l360-feature-list-login">
              <li><i className="fa-solid fa-graduation-cap"></i><span>Access to complete study materials</span></li>
              <li><i className="fa-solid fa-chalkboard-user"></i><span>Live interactive classes</span></li>
              <li><i className="fa-solid fa-file-alt"></i><span>Downloadable notes & assignments</span></li>
              <li><i className="fa-solid fa-chart-line"></i><span>Track your progress with tests</span></li>
              <li><i className="fa-solid fa-headset"></i><span>24/7 doubt clearing support</span></li>
            </ul>
          </div>
        </div>

        <div className="l360-login-right">
          <div className="l360-login-header">
            <h2>Login to Your Account</h2>
            <p>Enter your credentials to access your dashboard</p>
          </div>

          {message.text && (
            <div className={`alert-message alert-${message.type}`}>
              <i className={`fa-solid ${message.type === 'error' ? 'fa-circle-exclamation' : 'fa-circle-check'}`}></i>
              {' '}{message.text}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="l360-form-group">
              <label>Email Address <span>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="Enter your registered email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error-input' : ''}
              />
              {errors.email && <span className="l360-error-text">{errors.email}</span>}
            </div>

            <div className="l360-form-group">
              <label>Password <span>*</span></label>
              <div className="l360-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? 'error-input' : ''}
                />
                <button type="button" className="l360-password-toggle" onClick={() => setShowPassword(!showPassword)}>
                  <i className={`fa-regular ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {errors.password && <span className="l360-error-text">{errors.password}</span>}
            </div>

            <div className="l360-form-options">
              <label className="l360-remember-me">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                />
                Remember Me
              </label>
              <Link to="/forgot-password" className="l360-forgot-link">Forgot Password?</Link>
            </div>

            <button type="submit" className="l360-login-btn" disabled={loading}>
              {loading ? <span className="loading-spinner"></span> : <i className="fa-solid fa-arrow-right-to-bracket"></i>}
              {loading ? ' Logging in...' : ' Login'}
            </button>

            <div className="l360-register-link">
              Don't have an account? <Link to="/register">Register Now</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
