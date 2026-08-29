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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validations
    if (!formData.name.trim()) return showToast('Please enter your name', true);
    if (!formData.email.trim()) return showToast('Please enter your email', true);

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) return showToast('Enter a valid email address', true);

    if (!formData.mobile.trim()) return showToast('Please enter mobile number', true);

    const mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(formData.mobile)) return showToast('Enter valid 10-digit mobile number', true);

    if (!formData.board_interest) return showToast('Please select board interest', true);

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

          <div className="popup-body">
            <form id="popupInquiryForm" onSubmit={handleSubmit}>
              <div className="popup-form-row">
                <div className="popup-form-group">
                  <label>Full Name <span className="required">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter full name" required />
                </div>
                <div className="popup-form-group">
                  <label>Email <span className="required">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" required />
                </div>
              </div>
              <div className="popup-form-row">
                <div className="popup-form-group">
                  <label>Mobile <span className="required">*</span></label>
                  <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="10-digit number" required />
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
                <div className="popup-form-group">
                  <label>Board Interest <span className="required">*</span></label>
                  <select name="board_interest" value={formData.board_interest} onChange={handleChange} required>
                    <option value="">Select Board</option>
                    <option value="NIOS">NIOS Board</option>
                    <option value="BBOSE">BBOSE Board</option>
                    <option value="BOSSE">BOSSE Board</option>
                    <option value="NIOSONDEMAND">NIOS On Demand</option>
                    <option value="ICSE">ICSE Board</option>
                    <option value="Other">Other Board</option>
                  </select>
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

      {/* Toast Message */}
      {toast.show && (
        <div className={`popup-success-toast ${toast.isError ? 'popup-error-toast' : ''}`}>
          {toast.message}
        </div>
      )}
    </>
  );
};

export default PopupForm;