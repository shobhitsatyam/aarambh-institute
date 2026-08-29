import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
    const [formData, setFormData] = useState({
        full_name: '',
        mobile: '',
        email: '',
        course: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [modal, setModal] = useState({ show: false, type: '', title: '', message: '' });

    const showModal = (type, title, message) => {
        setModal({ show: true, type, title, message });
        setTimeout(() => setModal({ show: false, type: '', title: '', message: '' }), type === 'success' ? 3000 : 4000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validations
        if (!formData.full_name.trim()) return showModal('error', 'Validation Error', 'Please enter your full name.');
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(formData.mobile)) return showModal('error', 'Validation Error', 'Please enter a valid 10-digit mobile number.');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) return showModal('error', 'Validation Error', 'Please enter a valid email address.');
        if (!formData.course) return showModal('error', 'Validation Error', 'Please select your course.');

        setIsSubmitting(true);
        try {
            // Updated endpoint for your Node.js backend
            const response = await fetch('/api/contact/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await response.json();

            if (response.ok && data.success) {
                showModal('success', 'Success!', data.message || 'Inquiry submitted successfully.');
                setFormData({ full_name: '', mobile: '', email: '', course: '' });
            } else {
                showModal('error', 'Submission Failed', data.message);
            }
        } catch (error) {
            showModal('error', 'Error!', 'Unable to submit. Please try again or call us.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="l360-cta-section">
            <div className="l360-cta-inner">
                <div className="l360-cta-content">
                    <h2>Start Your <span>Learning Journey</span> Today</h2>
                    <p>India's Most Trusted Distance Learning Center – Aarambh Institute stands as one of the leading and most reliable NIOS study centres in Patna, Bihar...</p>
                    <ul className="l360-cta-benefits">
                        <li><img src="/assets/images/icons/check-circle.png" alt="check" /><span>NIOS, BBOSE, BOSSE - All boards under one roof</span></li>
                        <li><img src="/assets/images/icons/check-circle.png" alt="check" /><span>Expert faculty with 15+ years of teaching experience</span></li>
                        <li><img src="/assets/images/icons/check-circle.png" alt="check" /><span>Flexible learning options - Online & Offline classes</span></li>
                        <li><img src="/assets/images/icons/check-circle.png" alt="check" /><span>Free study materials & previous year papers</span></li>
                    </ul>
                    <div className="l360-cta-trust">
                        <img src="/assets/images/icons/trust.png" alt="trust badge" />
                        <p>Trusted by over 5,000+ successful students with 95% pass rate</p>
                    </div>
                </div>
                <div className="l360-cta-form">
                    <h3>Get Free Counselling</h3>
                    <p>Fill the form below and our expert will contact you within 24 hours</p>
                    <form onSubmit={handleSubmit}>
                        <div className="l360-form-group">
                            <label>Full Name</label>
                            <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} placeholder="Enter your full name" required />
                        </div>
                        <div className="l360-form-group">
                            <label>Phone Number</label>
                            <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Enter your phone number" required />
                        </div>
                        <div className="l360-form-group">
                            <label>Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required />
                        </div>
                        <div className="l360-form-group">
                            <label>Select Course</label>
                            <select name="course" value={formData.course} onChange={handleChange} required>
                                <option value="" disabled>Select your course</option>
                                <option value="nios-10th">NIOS 10th</option>
                                <option value="nios-12th">NIOS 12th</option>
                                <option value="bbose-10th">BBOSE 10th</option>
                                <option value="bbose-12th">BBOSE 12th</option>
                                <option value="bosse-10th">BOSSE 10th</option>
                                <option value="bosse-12th">BOSSE 12th</option>
                                <option value="on-demand">NIOS On-Demand Exam</option>
                            </select>
                        </div>
                        <button type="submit" className="l360-cta-submit" disabled={isSubmitting}>
                            {isSubmitting ? 'Sending...' : 'Request Callback'} <i className="fas fa-arrow-right"></i>
                        </button>
                    </form>
                </div>
            </div>

            {/* Custom Modal */}
            {modal.show && (
                <div className="l360-contact-modal" style={{ display: 'flex' }} onClick={() => setModal({ ...modal, show: false })}>
                    <div className="l360-contact-modal-content" onClick={e => e.stopPropagation()}>
                        <div className="l360-contact-modal-header">
                            <div className={`l360-contact-modal-icon ${modal.type}`}>
                                {modal.type === 'success' ? '✓' : '✗'}
                            </div>
                            <h3>{modal.title}</h3>
                        </div>
                        <div className="l360-contact-modal-body">
                            <p>{modal.message}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContactForm;