import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({ show: false, type: '', title: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);

  const showModal = (type, title, message) => {
    setModal({ show: true, type, title, message });
    setTimeout(() => setModal({ show: false, type: '', title: '', message: '' }), 3000);
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        showModal('success', 'Success!', data.message || "Message sent successfully.");
        setFormData({ name: '', email: '', phone: '', course: '', message: '' });
      } else {
        showModal('error', 'Error!', data.message || "Submission failed.");
      }
    } catch (error) {
      showModal('error', 'Error!', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    { q: "How can I reach Aarambh Institute from the railway station?", a: "Aarambh Institute is approximately 4 km from Patna Junction Railway Station. You can take an auto-rickshaw or cab from the station to Kanti Factory Road." },
    { q: "Do I need to take an appointment before visiting?", a: "While appointments are not mandatory, we recommend calling us at 9931003857 before visiting." },
    { q: "What documents should I bring when visiting for admission?", a: "Please bring your previous class marksheet (8th or 10th), valid ID proof (Aadhar Card), 4 passport size photographs." },
    { q: "Is parking available at the study centre?", a: "Yes, there is parking space available for two-wheelers and four-wheelers near our centre." },
    { q: "What are the nearest landmarks to locate Aarambh Institute?", a: "Our study centre is located near Bank of Baroda on Kanti Factory Road. Other nearby landmarks include Tribac Blue Classes building." },
    { q: "Can parents accompany students for counseling?", a: "Absolutely! We encourage parents to accompany their children for counseling sessions." },
    { q: "What is the best time to visit the study centre?", a: "Our working hours are Monday to Saturday, 10:00 AM to 6:00 PM. The best time to visit is between 11:00 AM to 4:00 PM." }
  ];

  return (
    <div className="contact-page-wrapper">
      <div className="contact-main-container">
        
        {/* Animated Hero Section */}
        <div className="contact-hero">
          <h1 className="contact-hero-title">Contact Us</h1>
          <p className="contact-hero-subtitle">Get in touch with Aarambh Institute for any queries regarding admissions, courses, or career guidance.</p>
        </div>

        {/* Form and Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 relative z-10" style={{ marginTop: '-4rem' }}>
          
          {/* Left: Contact Info 3D Card */}
          <div className="contact-3d-card">
            <div className="contact-card-header">
              <i className="fas fa-map-marker-alt text-2xl text-white"></i>
              <h2>Get in Touch</h2>
            </div>
            
            <div className="p-6">
              <div className="contact-info-item">
                <div className="contact-icon-bubble"><i className="fas fa-building"></i></div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Our Address</h3>
                  <p className="text-[13px] text-gray-600 font-medium leading-relaxed">Aarambh Institute, 1st Floor, Tribac Blue Classes, Near Bank of Baroda, Kanti Factory Road, Patna - 800020</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble"><i className="fas fa-phone-alt"></i></div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Phone Number</h3>
                  <div className="space-y-1">
                    <a href="tel:9931003857" className="block text-[13px] font-medium text-gray-600 hover:text-[#c40138] transition-colors">+91 9931003857 <span className="text-gray-400 text-xs ml-1">(Komal Ma'am)</span></a>
                    <a href="tel:9931006379" className="block text-[13px] font-medium text-gray-600 hover:text-[#c40138] transition-colors">+91 9931006379 <span className="text-gray-400 text-xs ml-1">(Nutan Ma'am)</span></a>
                    <a href="tel:9931600795" className="block text-[13px] font-medium text-gray-600 hover:text-[#c40138] transition-colors">+91 9931600795 <span className="text-gray-400 text-xs ml-1">(Muskan Ma'am)</span></a>
                  </div>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon-bubble"><i className="fas fa-envelope"></i></div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Email Address</h3>
                  <a href="mailto:info@openadmissions.in" className="text-[13px] font-medium text-gray-600 hover:text-[#c40138] transition-colors">info@openadmissions.in</a>
                </div>
              </div>

              <div className="contact-info-item !border-none">
                <div className="contact-icon-bubble"><i className="fas fa-clock"></i></div>
                <div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-1">Working Hours</h3>
                  <p className="text-[13px] font-medium text-gray-600 leading-relaxed">Monday - Saturday: 10:00 AM - 6:00 PM<br/>Sunday: Half-Day (1:00PM - 6:00PM)</p>
                </div>
              </div>
            </div>
            
            <div className="w-full h-[250px] overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3598.134690671843!2d85.1701044!3d25.600440199999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ed59a08cd52ddd%3A0xdcce7390aaa931ba!2sNios%20-%20BBOSE%20-%20BOSSE%20Study%20Centre%20%7C%20Aarambh%20Institute%20%7C%20Bihar%20%26%20Sikkim%20Open%20Board%20Admission%20Center!5e0!3m2!1sen!2sin!4v1776167005917!5m2!1sen!2sin"
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-none"
              ></iframe>
            </div>
          </div>

          {/* Right: Send Message Form 3D Card */}
          <div className="contact-3d-card">
            <div className="contact-card-header !border-blue-600">
              <i className="fas fa-paper-plane text-2xl text-white"></i>
              <h2>Send Us a Message</h2>
            </div>
            
            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5 uppercase tracking-wide">Full Name <span className="text-[#c40138]">*</span></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your full name" required className="contact-input" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5 uppercase tracking-wide">Email Address <span className="text-[#c40138]">*</span></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" required className="contact-input" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5 uppercase tracking-wide">Phone Number <span className="text-[#c40138]">*</span></label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" required className="contact-input" />
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5 uppercase tracking-wide">Interested In</label>
                  <select name="course" value={formData.course} onChange={handleChange} className="contact-input appearance-none">
                    <option value="">Select a course</option>
                    <option value="NIOS 10th">NIOS 10th</option>
                    <option value="NIOS 12th">NIOS 12th</option>
                    <option value="BBOSE 10th">BBOSE 10th</option>
                    <option value="BBOSE 12th">BBOSE 12th</option>
                    <option value="BOSSE 10th">BOSSE 10th</option>
                    <option value="BOSSE 12th">BOSSE 12th</option>
                    <option value="CBSE Coaching">CBSE Coaching</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-[12px] font-bold text-gray-800 mb-1.5 uppercase tracking-wide">Your Message <span className="text-[#c40138]">*</span></label>
                  <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Write your message here..." required className="contact-input resize-y min-h-[90px]"></textarea>
                </div>
                
                <button type="submit" disabled={isSubmitting} className="contact-submit-btn mt-2">
                  {isSubmitting ? 'Sending...' : 'Send Message'} <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Why Visit Aarambh Institute */}
        <div className="master-section-card bg-white relative">
          <h2 className="section-heading">Why Visit Aarambh Institute?</h2>
          <p className="text-[15px] font-medium text-gray-600 mb-8 max-w-3xl">Aarambh Institute is the leading study centre for NIOS, BBOSE, and BOSSE in Patna, Bihar. We provide comprehensive guidance and support for students who want to complete their 10th or 12th through open schooling. When you visit our study centre, you get:</p>
          
          <div className="modern-list-grid">
            {[
              { text: "Face-to-face counseling with our education experts", icon: "fa-user-tie" },
              { text: "Complete guidance on subject selection and exam preparation", icon: "fa-compass" },
              { text: "Access to quality study materials and previous year question papers", icon: "fa-book" },
              { text: "Assistance with admission forms, TMA, practical exams, and hall tickets", icon: "fa-file-signature" },
              { text: "Regular doubt clearing sessions and mock tests", icon: "fa-chalkboard-teacher" }
            ].map((item, idx) => (
              <div key={idx} className="modern-list-item">
                <div className="list-icon-wrapper shadow-sm"><i className={`fas ${item.icon}`}></i></div>
                <div className="font-bold text-gray-800 mt-2">{item.text}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="master-section-card bg-white relative mb-4">
          <h2 className="section-heading">Frequently Asked Questions</h2>
          <div className="max-w-4xl">
            {faqs.map((faq, index) => (
              <div className="faq-item" key={index}>
                <div className="faq-header" onClick={() => toggleFaq(index)}>
                  <span>{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${activeFaq === index ? 'bg-[#c40138] text-white rotate-180' : 'bg-gray-100 text-gray-500'}`}>
                    <i className="fas fa-chevron-down text-sm"></i>
                  </div>
                </div>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${activeFaq === index ? 'max-h-[300px] py-4 border-t border-gray-200' : 'max-h-0 py-0'}`}>
                  <p className="m-0 text-[14px] font-medium leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sleek CTA Banner */}
        <div className="premium-cta-wrapper">
          <div className="premium-cta-card">
            <div className="premium-cta-shape-1"></div>
            <div className="premium-cta-shape-2"></div>
            
            <div className="premium-cta-content">
              <h2 className="premium-cta-heading">Looking for Quick Guidance?</h2>
              <p className="premium-cta-subtitle">Speak directly with our education counselors for immediate assistance regarding admissions, course selection, or exam preparation.</p>
            </div>
            
            <div className="premium-cta-actions">
              <a href="tel:9931003857" className="cta-btn cta-btn-white">
                <i className="fas fa-phone-alt"></i> Call Now
              </a>
              <a href="https://wa.me/9931003857" target="_blank" rel="noreferrer" className="cta-btn cta-btn-whatsapp">
                <i className="fab fa-whatsapp text-lg"></i> WhatsApp
              </a>
              <a href="mailto:info@openadmissions.in" className="cta-btn cta-btn-glass">
                <i className="fas fa-envelope"></i> Email Us
              </a>
            </div>
          </div>
        </div>

      </div>

      {/* Modal */}
      {modal.show && (
        <div className="fixed inset-0 bg-black/70 z-[9999] flex items-center justify-center animate-[fadeIn_0.3s_ease]" onClick={() => setModal({ ...modal, show: false })}>
          <div className="bg-white rounded-[1rem] max-w-[450px] w-[90%] m-5 overflow-hidden animate-[slideIn_0.3s_ease] shadow-[0_30px_60px_rgba(0,0,0,0.4)] border border-gray-100" onClick={e => e.stopPropagation()}>
            <div className="pt-8 px-6 pb-4 text-center">
              <div className={`w-[80px] h-[80px] mx-auto mb-5 rounded-full flex items-center justify-center text-[35px] shadow-lg ${modal.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-[#c40138]'}`}>
                <i className={`fas ${modal.type === 'success' ? 'fa-check' : 'fa-times'}`}></i>
              </div>
              <h3 className="text-[22px] font-bold text-gray-900 m-0">{modal.title}</h3>
            </div>
            <div className="px-8 py-4 pb-8 text-center">
              <p className="text-[15px] font-medium text-gray-600 leading-relaxed m-0">{modal.message}</p>
              <button 
                onClick={() => setModal({ ...modal, show: false })}
                className="mt-6 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-colors w-full"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactUs;