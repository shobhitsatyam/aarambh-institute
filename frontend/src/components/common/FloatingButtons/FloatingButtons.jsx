import React from 'react';
import { Link } from 'react-router-dom';
import './FloatingButtons.css';

const FloatingButtons = () => {
  return (
    <>
      {/* Sleek Premium Side Buttons Section */}
      <div className="side-sticky-container">
        <Link to="/register" className="side-sticky-btn btn-enroll">
          <i className="fas fa-graduation-cap"></i>
          <span>Enroll Now</span>
        </Link>
        <Link to="/contact-us" className="side-sticky-btn btn-contact">
          <i className="fas fa-headset"></i>
          <span>Contact Us</span>
        </Link>
      </div>

      {/* WhatsApp Floating Button */}
      <a href="https://wa.me/9931003857"
        className="whatsapp-float bg-[#25D366] text-white w-[60px] h-[60px] rounded-full flex items-center justify-center text-[30px] shadow-lg hover:bg-[#128C7E] transition-colors fixed bottom-[20px] right-[20px] z-[1000]"
        aria-label="Contact us on WhatsApp"
        style={{ animation: 'whatsapp-pulse 2s infinite' }}
      >
        <i className="fab fa-whatsapp"></i>
      </a>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes whatsapp-pulse {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
      `}} />
    </>
  );
};

export default FloatingButtons;
