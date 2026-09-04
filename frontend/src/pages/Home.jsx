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




    </>
  );
};

export default Home;