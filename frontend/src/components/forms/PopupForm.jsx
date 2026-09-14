import React, { useState, useEffect } from 'react';
import './PopupForm.css';

const PopupForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', isError: false, show: false });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    class: '',
    board_interest: '',
    address: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});

  // Handle Popup Auto-Open using SessionStorage
  useEffect(() => {
    const popupClosed = sessionStorage.getItem('popupClosed');
    if (!popupClosed) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 2000); // Opens after 2 seconds
      return () => clearTimeout(timer);
    }
  }, []);

  // Handle body overflow when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  const closePopup = () => {
    setIsOpen(false);
    sessionStorage.setItem('popupClosed', 'true');
  };

  const handleOverlayClick = (e) => {
    if (e.target.className.includes('popup-modal')) {
      closePopup();
    }
  };

  const showToast = (message, isError = false) => {
    setToast({ message, isError, show: true });
    setTimeout(() => {
      setToast({ message: '', isError: false, show: false });
    }, 3000); // Auto hide toast after 3 seconds
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear the error for the field being typed
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
      isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
      isValid = false;
    }

    const mobilePattern = /^[0-9]{10}$/;
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
      isValid = false;
    } else if (!mobilePattern.test(formData.mobile)) {
      newErrors.mobile = 'Enter a valid 10-digit number';
      isValid = false;
    }

    if (!formData.board_interest) {
      newErrors.board_interest = 'Please select board interest';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop if validation fails
    }

    setIsLoading(true);

    try {
      // Note: In your MERN backend, you will change this URL to your Express API route
      // Also, GET request is used here to match original logic, but POST is recommended for forms.
      const queryParams = new URLSearchParams(formData).toString();
      const response = await fetch(`/api/contact/submit-popup?${queryParams}`, {
        method: 'GET', // Change to POST in your final Node.js backend
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok && data.success) {
        showToast(data.message || '✅ Inquiry sent successfully!', false);
        setFormData({ name: '', email: '', mobile: '', class: '', board_interest: '', address: '', message: '' });
        setTimeout(() => {
          closePopup();
        }, 1800);
      } else {
        showToast(data.message || 'Submission failed. Please try again.', true);
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      showToast('Server error. Please try again later.', true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Modal */}
      <div className={`popup-modal ${isOpen ? 'active' : ''}`} id="inquiryPopup" onClick={handleOverlayClick}>
        <div className="popup-content">
          <div className="popup-header">
            <div className="popup-close" id="closePopupBtn" onClick={closePopup}>
              <i className="fas fa-times"></i>
            </div>
            <h2><i className="fas fa-graduation-cap"></i> NIOS / BBOSE Admission</h2>
            <p>10th या 12th मात्र 45 दिन में पास करें!</p>
          </div>

          {toast.show && (
            <div className={`l360-form-alert ${toast.isError ? 'alert-error' : 'alert-success'}`} style={{ margin: '0 25px 20px 25px' }}>
              <i className={`fa-solid ${!toast.isError ? 'fa-check-circle' : 'fa-circle-exclamation'}`}></i>
              <span>{toast.message}</span>
            </div>
          )}

          <div className="popup-body">
            <form id="popupInquiryForm" onSubmit={handleSubmit} noValidate>
              <div className="popup-form-row">
                <div className={`popup-form-group ${errors.name ? 'has-error' : ''}`}>
                  <label>Full Name <span className="required">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" />
                  {errors.name && <span className="popup-error-text">{errors.name}</span>}
                </div>
                <div className={`popup-form-group ${errors.email ? 'has-error' : ''}`}>
                  <label>Email <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" />
                  {errors.email && <span className="popup-error-text">{errors.email}</span>}
                </div>
              </div>
              <div className="popup-form-row">
                <div className={`popup-form-group ${errors.mobile ? 'has-error' : ''}`}>
                  <label>Mobile <span className="required">*</span></label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit number" />
                  {errors.mobile && <span className="popup-error-text">{errors.mobile}</span>}
                </div>
                <div className="popup-form-group">
                  <label>Select Class</label>
                  <select name="class" value={formData.class} onChange={handleChange}>
                    <option value="">Select Class</option>
                    <option value="10th">10th (Secondary)</option>
                    <option value="12th">12th (Senior Secondary)</option>
                    <option value="Graduation">Graduation</option>
                    <option value="Post Graduation">Post Graduation</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="popup-form-row">
                <div className={`popup-form-group ${errors.board_interest ? 'has-error' : ''}`}>
                  <label>Board Interest <span className="required">*</span></label>
                  <select name="board_interest" value={formData.board_interest} onChange={handleChange}>
                    <option value="">Select Board</option>
                    <option value="NIOS">NIOS Board</option>
                    <option value="BBOSE">BBOSE Board</option>
                    <option value="BOSSE">BOSSE Board</option>
                    <option value="NIOSONDEMAND">NIOS On Demand</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="Other">Other Board</option>
                  </select>
                  {errors.board_interest && <span className="popup-error-text">{errors.board_interest}</span>}
                </div>
                <div className="popup-form-group">
                  <label>City / Location</label>
                  <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Your city" />
                </div>
              </div>
              <div className="popup-form-group">
                <label>Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleChange} rows="2" placeholder="Write your message..."></textarea>
              </div>
              <button type="submit" className="popup-submit-btn" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="popup-loading"></span> Submitting...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane"></i> Submit Inquiry
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

    </>
  );
};

export default PopupForm;