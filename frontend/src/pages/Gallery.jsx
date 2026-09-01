import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Gallery.css'; // Import the new ultra-premium styles

const Gallery = () => {
  const [lightbox, setLightbox] = useState({ isOpen: false, src: '' });

  const openLightbox = (src) => {
    setLightbox({ isOpen: true, src });
  };

  const closeLightbox = () => {
    setLightbox({ isOpen: false, src: '' });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && lightbox.isOpen) {
        closeLightbox();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightbox.isOpen]);

  const galleryData = {
    campus: [
      { src: '/assets/images/gallery/g1.jpg', caption: 'Modern Study Centre' },
      { src: '/assets/images/gallery/g2.jpg', caption: 'Spacious Classroom' },
      { src: '/assets/images/gallery/g3.jpg', caption: 'Study Material Library' },
      { src: '/assets/images/gallery/g4.jpg', caption: 'Computer Lab' },
    ],
    sessions: [
      { src: '/assets/images/gallery/g5.jpg', caption: 'Interactive Teaching' },
      { src: '/assets/images/gallery/g6.jpg', caption: 'Group Discussion' },
      { src: '/assets/images/gallery/g7.jpg', caption: 'Doubt Clearing Session' },
      { src: '/assets/images/gallery/g8.jpg', caption: 'Mock Test Practice' },
    ],
    events: [
      { src: '/assets/images/gallery/g8.jpg', caption: 'Orientation Day' },
      { src: '/assets/images/gallery/g9.jpg', caption: 'Award Ceremony' },
      { src: '/assets/images/gallery/g7.jpg', caption: 'Motivational Session' },
      { src: '/assets/images/gallery/g5.jpg', caption: 'Career Counseling' },
    ],
    achievements: [
      { src: '/assets/images/gallery/g6.jpg', caption: 'Our Toppers' },
      { src: '/assets/images/gallery/g1.jpg', caption: 'Result Celebration' },
      { src: '/assets/images/gallery/g6.jpg', caption: 'Certificate Distribution' },
      { src: '/assets/images/gallery/g3.jpg', caption: 'Success Stories' },
    ]
  };

  const renderGalleryGrid = (images) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {images.map((item, index) => (
        <div key={index} className="gallery-3d-card" onClick={() => openLightbox(item.src)}>
          <div className="gallery-img-wrapper">
            <img src={item.src} alt={item.caption} />
            <div className="gallery-overlay"></div>
          </div>
          <div className="gallery-caption">
            <h4>{item.caption}</h4>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="gallery-page-wrapper">
      <div className="gallery-main-container">
        
        {/* Animated Hero Banner */}
        <div className="gallery-hero">
          <h1 className="gallery-hero-title">Our Gallery</h1>
          <p className="gallery-hero-subtitle">Explore moments from Aarambh Institute - celebrating student success, learning experiences, and memorable events.</p>
        </div>

        {/* Introduction Card */}
        <div className="master-section-card flex flex-col items-center">
          <h2 className="section-heading">Capturing Success Stories</h2>
          <p className="text-[15px] leading-relaxed text-gray-600 max-w-[850px] mt-4 font-medium text-center">
            At Aarambh Institute, we believe in celebrating every milestone of our students. Our gallery showcases the vibrant learning environment, dedicated faculty, and the journey of our students towards academic excellence. From classroom sessions to special events, each picture tells a story of determination and success.
          </p>
        </div>

        {/* Campus & Facilities */}
        <div className="mb-12">
          <h3 className="category-title"><i className="fas fa-building"></i> Campus & Facilities</h3>
          {renderGalleryGrid(galleryData.campus)}
        </div>

        {/* Commitment Card */}
        <div className="master-section-card flex flex-col items-center" style={{ background: 'linear-gradient(to right, #ffffff, #fff0f3)' }}>
          <h3 className="section-heading !text-[#c40138]">Our Commitment to Quality Education</h3>
          <p className="text-[15px] leading-relaxed text-gray-700 max-w-[850px] mt-4 font-medium text-center">
            We provide a conducive learning environment with modern infrastructure, well-equipped classrooms, and comprehensive study materials. Our centre is designed to ensure that every student receives the attention and resources they need to excel in their open schooling journey.
          </p>
        </div>

        {/* Classroom Sessions */}
        <div className="mb-12">
          <h3 className="category-title"><i className="fas fa-chalkboard-teacher"></i> Classroom Sessions</h3>
          {renderGalleryGrid(galleryData.sessions)}
        </div>

        {/* Premium 3D Stats Row */}
        <div className="stats-container">
          <div className="stat-3d-card">
            <div className="stat-value">5000+</div>
            <div className="stat-label">Students Enrolled</div>
          </div>
          <div className="stat-3d-card">
            <div className="stat-value">92%</div>
            <div className="stat-label">Pass Percentage</div>
          </div>
          <div className="stat-3d-card">
            <div className="stat-value">12+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-3d-card">
            <div className="stat-value">1000+</div>
            <div className="stat-label">Success Stories</div>
          </div>
        </div>

        {/* Student Activities & Events */}
        <div className="mb-12">
          <h3 className="category-title"><i className="fas fa-users"></i> Student Activities & Events</h3>
          {renderGalleryGrid(galleryData.events)}
        </div>

        {/* Student Achievements */}
        <div className="mb-12">
          <h3 className="category-title"><i className="fas fa-trophy"></i> Student Achievements</h3>
          {renderGalleryGrid(galleryData.achievements)}
        </div>

        {/* Sleek CTA Banner */}
        <div className="premium-cta-wrapper">
          <div className="premium-cta-card">
            <div className="premium-cta-shape-1"></div>
            <div className="premium-cta-shape-2"></div>
            
            <div className="premium-cta-content">
              <h2 className="premium-cta-heading">Ready to Start Your Journey?</h2>
              <p className="premium-cta-subtitle">Join Aarambh Institute and become part of our success story. We're here to guide you every step of the way.</p>
            </div>
            
            <div className="premium-cta-actions">
              <Link to="/register" className="cta-btn-white">
                Enroll Now <i className="fas fa-arrow-right ml-2"></i>
              </Link>
            </div>
          </div>
        </div>

        {/* Custom Lightbox */}
        {lightbox.isOpen && (
          <div className="fixed inset-0 bg-black/95 z-[9999] cursor-pointer flex items-center justify-center backdrop-blur-sm transition-opacity duration-300" onClick={closeLightbox}>
            <span className="absolute top-5 right-8 text-white text-[40px] cursor-pointer transition-colors hover:text-[#c40138]" onClick={closeLightbox}>&times;</span>
            <img src={lightbox.src} alt="Gallery Preview" className="max-w-[90%] max-h-[90%] object-contain shadow-[0_0_50px_rgba(0,0,0,0.5)] rounded-lg transition-transform duration-300 scale-100" onClick={(e) => e.stopPropagation()} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;