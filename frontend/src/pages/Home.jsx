import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

// Common Components (Based on migration_structure.md)

import PopupForm from '../components/forms/PopupForm';

// Home Page Specific Components 
// (Aapko ye components src/components/home/ me banane honge)
import CarouselSlider from '../components/home/CarouselSlider';
import AboutSection from '../components/home/AboutSection';
import BannerOne from '../components/home/BannerOne';
import HowItWork from '../components/home/HowItWork';
import Admission from '../components/home/Admission';
import ContactForm from '../components/home/ContactForm';
import YoutubeChannel from '../components/home/YoutubeChannel';
import FreeLearningVideos from '../components/home/FreeLearningVideos';
import StudentTestimonials from '../components/home/StudentTestimonials';
import BusinessInfo from '../components/home/BusinessInfo';
import FaqSection from '../components/home/FaqSection';
import AcademicCalendar from '../components/home/AcademicCalendar';
import Blogs from '../components/home/Blogs';

const Home = () => {
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

      {/* Main Content Components */}
      <PopupForm />
      <CarouselSlider />
      <AboutSection />
      <BannerOne />
      <HowItWork />
      <Admission />
      <ContactForm />
      <YoutubeChannel />
      <FreeLearningVideos />
      <StudentTestimonials />
      <BusinessInfo />
      <FaqSection />
      <AcademicCalendar />
      <Blogs />



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

export default Home;