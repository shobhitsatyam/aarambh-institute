import React from 'react';
import { Link } from 'react-router-dom';

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


      {/* Side Buttons Section */}
      <div className="fixed right-1 top-1/2 -translate-y-1/2 z-[9999] flex flex-col gap-3 max-md:right-0.5 max-md:gap-2 max-sm:gap-1.5">
        <Link to="/register" className="flex flex-col items-center justify-center text-white text-xs font-semibold text-center py-4 px-2.5 shadow-[0_4px_15px_rgba(0,0,0,0.15)] transition-all duration-300 border-2 border-white [writing-mode:vertical-rl] [text-orientation:mixed] backdrop-blur-[5px] rounded tracking-[1px] bg-gradient-to-br from-[#e11d48] to-[#a0012e] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:brightness-110 hover:-translate-x-[3px] max-md:text-[11px] max-md:py-3 max-md:px-2.5 max-md:tracking-[0.5px] max-sm:text-[10px] max-sm:py-2.5 max-sm:px-2 max-[360px]:text-[9px] max-[360px]:py-2 max-[360px]:px-1.5">
          Enroll Now
        </Link>
        <Link to="/contact-us" className="flex flex-col items-center justify-center text-white text-xs font-semibold text-center py-4 px-2.5 shadow-[0_4px_15px_rgba(37,99,235,0.15)] transition-all duration-300 border-2 border-white [writing-mode:vertical-rl] [text-orientation:mixed] backdrop-blur-[5px] rounded tracking-[1px] bg-gradient-to-br from-[#2563eb] to-[#1e4a8a] animate-[pulse_2s_infinite] hover:shadow-[0_8px_25px_rgba(0,0,0,0.25)] hover:brightness-110 hover:-translate-x-[3px] max-md:text-[11px] max-md:py-3 max-md:px-2.5 max-md:tracking-[0.5px] max-sm:text-[10px] max-sm:py-2.5 max-sm:px-2 max-[360px]:text-[9px] max-[360px]:py-2 max-[360px]:px-1.5">
          Contact Us
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
      <a
        href="https://wa.me/919931003857?text=Hello%20I%20visited%20your%20website%20https%3A%2F%2Fopenadmissions.in%2F%20and%20I%20am%20interested%20in%20NIOS%2C%20BBOSE%2C%20BOSSE%20and%20On-Demand%20Exam%20Institute%20services.%20Please%20share%20more%20details."
        className="fixed bottom-[25px] right-[25px] w-[60px] h-[60px] bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(0,0,0,0.3)] z-[9998] transition-all duration-300 text-[32px] hover:scale-110 hover:shadow-[0_6px_16px_rgba(0,0,0,0.4)]"
        target="_blank"
        rel="noopener noreferrer"
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