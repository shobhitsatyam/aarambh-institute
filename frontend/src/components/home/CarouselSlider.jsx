import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CarouselSlider.css';

const CarouselSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [isHovered, setIsHovered] = useState(false);
    const [touchStart, setTouchStart] = useState(0);
    const navigate = useNavigate();
    const totalSlides = 3;

    useEffect(() => {
        let interval;
        if (!isHovered) {
            interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isHovered]);

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
    };

    const handleTouchStart = (e) => setTouchStart(e.touches[0].clientX);

    const handleTouchEnd = (e) => {
        const touchEnd = e.changedTouches[0].clientX;
        if (touchStart - touchEnd > 50) {
            setCurrentSlide((prev) => (prev + 1) % totalSlides);
        } else if (touchStart - touchEnd < -50) {
            setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
        }
    };

    return (
        <>
            <div className="l360-hero-section">
                <div className="l360-hero-left-content">
                    <h1>Start Your Learning Journey</h1>
                    <p>Your trusted partner for NIOS, BBOSE, BOSSE admissions and distance education</p>
                    <div className="l360-hero-features">
                        <div className="l360-feature-item">
                            <i className="fas fa-check-circle"></i><span>Registered with Indian govt.</span>
                        </div>
                        <div className="l360-feature-item">
                            <i className="fas fa-chalkboard-user"></i><span>Expert Guidance</span>
                        </div>
                        <div className="l360-feature-item">
                            <i className="fas fa-book-open"></i><span>Free Study Material</span>
                        </div>
                        <div className="l360-feature-item">
                            <i className="fas fa-clock"></i><span>On-Demand Exams</span>
                        </div>
                    </div>
                </div>
                <div className="l360-hero-right-content">
                    <div className="l360-search-container">
                        <i className="fas fa-search"></i>
                        <input
                            type="text"
                            placeholder="Search for courses, study materials, boards..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoComplete="off"
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                </div>
            </div>

            <section className="l360-banner">
                <div
                    className="l360-banner-carousel"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div
                        className="l360-carousel-slides"
                        style={{ transform: `translateX(-${currentSlide * (100 / totalSlides)}%)` }}
                    >
                        <div className="l360-carousel-slide" style={{ backgroundImage: "url('/assets/images/slider/1.jpg')" }}>
                            <div className="l360-slide-content">
                                <h2>Ace Your NIOS Exams with Confidence</h2>
                                <p>Comprehensive study materials, expert guidance, and personalized support to help you succeed in your NIOS examinations.</p>
                                <Link to="/register" className="l360-slide-btn">Learn More</Link>
                            </div>
                        </div>
                        <div className="l360-carousel-slide" style={{ backgroundImage: "url('/assets/images/slider/2.jpg')" }}>
                            <div className="l360-slide-content">
                                <h2>Admissions Open for 2026-27 Session</h2>
                                <p>Enroll now for NIOS, BBOSE, and BOSSE boards. Limited seats available. Apply today!</p>
                                <Link to="/register" className="l360-slide-btn">Apply Now</Link>
                            </div>
                        </div>
                        <div className="l360-carousel-slide" style={{ backgroundImage: "url('/assets/images/slider/3.jpg')" }}>
                            <div className="l360-slide-content">
                                <h2>On-Demand Examination</h2>
                                <p>Appear for NIOS exams anytime, anywhere. Flexible scheduling for working professionals and students.</p>
                                <Link to="/nios-on-demand-exam" className="l360-slide-btn">Register Now</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CarouselSlider;