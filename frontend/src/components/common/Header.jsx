import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  // Mobile menu toggle ke liye state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <div className="font-sans text-dark relative">
      {/* Top Bar */}
      <div className="bg-dark text-gray-400 text-xs py-1.5 border-b border-[#2c2c2c]">
        <div className="max-w-7xl mx-auto px-5 flex justify-between items-center flex-col lg:flex-row gap-1.5">
          <div className="flex items-center gap-2.5">
            <div className="flex gap-2">
              <a href="https://www.instagram.com/aarambh.institutepatna/" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://www.facebook.com/share/1B9zGQGH1H/" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-linkedin-in"></i></a>
              <a href="#" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-twitter"></i></a>
              <a href="https://wa.me/9931003857" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-whatsapp"></i></a>
              <a href="https://www.youtube.com/@aarambhinstitutepatna" className="inline-flex items-center justify-center w-7 h-7 rounded-full text-gray-400 hover:bg-accent hover:text-white transition-colors duration-200" target="_blank" rel="noreferrer"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          <div className="flex items-center gap-3 flex-wrap justify-center font-medium">
            <span className="inline-flex items-center gap-1.5"><i className="fas fa-phone text-[11px] text-green-500"></i> <a href="tel:9931003857" className="text-gray-300 hover:text-white transition-colors">+91-9931003857</a></span>
            <span className="inline-flex items-center gap-1.5"><i className="fas fa-phone text-[11px] text-green-500"></i> <a href="tel:9931006379" className="text-gray-300 hover:text-white transition-colors">+91-9931006379</a></span>
            <span className="text-gray-600 text-sm hidden lg:inline">|</span>
            <span className="inline-flex items-center gap-1.5"><i className="fas fa-envelope text-[11px] text-blue-400"></i> <a href="mailto:info@openadmissions.in" className="text-gray-300 hover:text-white transition-colors">info@openadmissions.in</a></span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white border-b border-gray-light sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 h-[65px] lg:h-[80px] flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/"><img src="/assets/images/logo/logo.png" alt="Aarambh Institute" className="h-[40px] lg:h-[55px]" /></Link>
          </div>

          <div className="flex lg:hidden flex-1 justify-center">
            <img src="/assets/govt.png" alt="Government Registered" className="h-[35px] lg:h-[40px] object-contain" />
          </div>

          <nav className="flex items-center gap-5">
            <ul className="hidden lg:flex gap-6 items-center">
              <li><Link to="/" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1"><i className="fa-regular fa-house"></i></Link></li>
              <li><Link to="/about-us" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">About Us</Link></li>

              <li className="relative group">
                <Link to="/admission" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1 flex items-center gap-1">Admission <span className="text-[10px]">▼</span></Link>
                <div className="absolute top-full left-0 mt-2 bg-white min-w-[240px] shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 border border-gray-100">
                  <Link to="/bbose-10th" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">BBOSE Board (10th)</Link>
                  <Link to="/bbose-12th" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">BBOSE Board (12th)</Link>
                  <Link to="/bosse-10th" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">BOSSE Board (10th)</Link>
                  <Link to="/bosse-12th" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">BOSSE Board (12th)</Link>
                  <Link to="/nios-10th" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">NIOS Board (10th)</Link>
                  <Link to="/nios-12th" className="block px-4 py-3 text-sm text-dark hover:bg-light hover:text-accent hover:pl-5 transition-all">NIOS Board (12th)</Link>
                </div>
              </li>

              <li><Link to="/nios-on-demand-exam" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">On Demand</Link></li>

              <li className="relative group">
                <Link to="#" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1 flex items-center gap-1">Upcoming <span className="text-[10px]">▼</span></Link>
                <div className="absolute top-full left-0 mt-2 bg-white min-w-[240px] shadow-lg rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 transition-all duration-200 z-50 border border-gray-100">
                  <Link to="/UG-admission" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">UG Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1.5">Soon</span></Link>
                  <Link to="/PG-admission" className="block px-4 py-3 text-sm text-dark border-b border-gray-light hover:bg-light hover:text-accent hover:pl-5 transition-all">PG Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1.5">Soon</span></Link>
                  <Link to="/medical-admission" className="block px-4 py-3 text-sm text-dark hover:bg-light hover:text-accent hover:pl-5 transition-all">Medical Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1.5">Soon</span></Link>
                </div>
              </li>
              <li><Link to="/founder" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">Founder</Link></li>
              <li><Link to="/director" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">Director</Link></li>
              <li><Link to="/gallery" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">Gallery</Link></li>
              <li><Link to="/contact-us" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">Contact</Link></li>
              <li><Link to="/admission" className="text-sm font-medium text-dark hover:text-accent border-b-2 border-transparent hover:border-accent transition-colors py-1">Join Us</Link></li>
            </ul>

            <Link to="/register" className="hidden lg:inline-flex items-center gap-1.5 py-2 px-4 bg-accent text-white rounded font-semibold text-sm hover:bg-accent-dark transition-colors duration-200 shadow-sm hover:shadow-md">
              <i className="fas fa-graduation-cap"></i> Register Now
            </Link>

            <button className="lg:hidden text-xl text-dark p-2 cursor-pointer" onClick={toggleMobileMenu}>
              <i className="fas fa-bars"></i>
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 w-[280px] h-screen bg-white z-[1000] pt-[70px] pb-5 px-5 shadow-[-2px_0_10px_rgba(0,0,0,0.1)] overflow-y-auto transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <button className="absolute top-5 right-5 text-xl text-gray-500 hover:text-dark p-1" onClick={toggleMobileMenu}>
          <i className="fas fa-times"></i>
        </button>
        <div className="absolute top-5 left-5">
          <Link to="/" onClick={toggleMobileMenu}><img src="/assets/images/logo/logo.png" alt="Aarambh Institute" className="h-[35px]" /></Link>
        </div>

        <ul className="flex flex-col mt-4">
          <li className="border-b border-gray-light"><Link to="/" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Home</Link></li>
          <li className="border-b border-gray-light"><Link to="/about-us" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>About Us</Link></li>
          <li className="border-b border-gray-light"><Link to="/admission" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Join Us</Link></li>

          <li className="border-b border-gray-light">
            <div className="flex justify-between items-center cursor-pointer py-3" onClick={() => toggleDropdown('admission')}>
              <span className="text-sm font-medium text-dark hover:text-accent">Admission</span>
              <i className={`fas fa-chevron-down transition-transform ${activeDropdown === 'admission' ? 'rotate-180' : ''}`}></i>
            </div>
            <div className={`pl-4 bg-light ${activeDropdown === 'admission' ? 'block' : 'hidden'}`}>
              <Link to="/bbose-10th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>BBOSE Board (10th)</Link>
              <Link to="/bbose-12th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>BBOSE Board (12th)</Link>
              <Link to="/bosse-10th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>BOSSE Board (10th)</Link>
              <Link to="/bosse-12th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>BOSSE Board (12th)</Link>
              <Link to="/nios-10th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>NIOS Board (10th)</Link>
              <Link to="/nios-12th" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>NIOS Board (12th)</Link>
            </div>
          </li>

          <li className="border-b border-gray-light"><Link to="/nios-on-demand-exam" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>On Demand</Link></li>

          <li className="border-b border-gray-light">
            <div className="flex justify-between items-center cursor-pointer py-3" onClick={() => toggleDropdown('upcoming')}>
              <span className="text-sm font-medium text-dark hover:text-accent">Upcoming</span>
              <i className={`fas fa-chevron-down transition-transform ${activeDropdown === 'upcoming' ? 'rotate-180' : ''}`}></i>
            </div>
            <div className={`pl-4 bg-light ${activeDropdown === 'upcoming' ? 'block' : 'hidden'}`}>
              <Link to="/UG-admission" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>UG Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1">Soon</span></Link>
              <Link to="/PG-admission" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>PG Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1">Soon</span></Link>
              <Link to="/medical-admission" className="block py-2 text-xs text-dark hover:text-accent" onClick={toggleMobileMenu}>Medical Admission <span className="bg-orange-500 text-white text-[9px] px-1 py-0.5 rounded ml-1">Soon</span></Link>
            </div>
          </li>
          <li className="border-b border-gray-light"><Link to="/founder" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Founder</Link></li>
          <li className="border-b border-gray-light"><Link to="/director" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Director</Link></li>
          <li className="border-b border-gray-light"><Link to="/gallery" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Gallery</Link></li>
          <li className="border-b border-gray-light"><Link to="/contact-us" className="block py-3 text-sm font-medium text-dark hover:text-accent" onClick={toggleMobileMenu}>Contact</Link></li>
        </ul>

        <Link to="/register" className="flex items-center justify-center gap-1.5 w-full mt-4 py-2 px-3 bg-accent hover:bg-accent-dark text-white rounded text-sm font-medium transition-colors" onClick={toggleMobileMenu}>
          <i className="fas fa-graduation-cap"></i> Enroll Now
        </Link>
        <Link to="/contact-us" className="flex items-center justify-center gap-1.5 w-full mt-2 py-2 px-3 bg-transparent border border-gray-light hover:border-accent hover:text-accent text-dark rounded text-sm font-medium transition-colors" onClick={toggleMobileMenu}>
          <i className="fas fa-phone"></i> Contact Us
        </Link>
      </div>

      <div className={`fixed inset-0 bg-black/50 z-[999] transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={toggleMobileMenu}></div>
    </div>
  );
};

export default Header;