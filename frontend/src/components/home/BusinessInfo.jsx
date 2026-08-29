import React from 'react';
import './BusinessInfo.css';

const BusinessInfo = () => {
    return (
        <div className="l360-business-section">
            <div className="l360-business-container">
                <h2 className="l360-business-title">
                    <img src="/assets/images/icons/graduation.png" alt="Graduation Cap" />
                    Your Complete Destination for Distance Learning & Open Schooling in India
                </h2>

                <div className="l360-business-content">
                    <div className="l360-business-card">
                        <h3>
                            <img src="/assets/images/icons/location.png" alt="Location" />
                            Pan-India Presence
                        </h3>
                        <p>Welcome to <span className="l360-business-highlight">Aarambh Institute</span> — your ultimate one-stop destination for distance education and open schooling. With a strong presence across India, we provide comprehensive admission support for NIOS, BBOSE, BOSSE boards nationwide.</p>
                        <div className="l360-feature-tags">
                            <span className="l360-feature-tag"><img src="/assets/images/icons/city.png" alt="City" /> Metro Cities</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/town.png" alt="Town" /> Tier-2 Cities</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/home.png" alt="Home" /> Rural Areas</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/globe.png" alt="Globe" /> Pan India</span>
                        </div>
                    </div>

                    <div className="l360-business-card">
                        <h3>
                            <img src="/assets/images/icons/education.png" alt="Education" />
                            Educational Boards & Programs
                        </h3>
                        <p>We offer admission support across multiple boards including <span className="l360-business-highlight">NIOS (10th & 12th), BBOSE (10th & 12th), BOSSE (10th & 12th)</span>, along with On-Demand Examination services and comprehensive study materials.</p>
                        <div className="l360-feature-tags">
                            <span className="l360-feature-tag"><img src="/assets/images/icons/school.png" alt="School" /> NIOS Board</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/book.png" alt="Book" /> BBOSE Board</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/graduation.png" alt="Graduate" /> BOSSE Board</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/clock.png" alt="Clock" /> On-Demand Exam</span>
                        </div>
                    </div>

                    <div className="l360-business-card">
                        <h3>
                            <img src="/assets/images/icons/star.png" alt="Star" />
                            Special Features
                        </h3>
                        <p>Our <span className="l360-business-highlight">'Free Study Materials'</span> and <span className="l360-business-highlight">'Expert Guidance'</span> features offer students valuable resources for exam preparation. Access live classes, recorded lectures, and get personalized support through our <span className="l360-business-highlight">'Doubt Clearing Sessions'</span>.</p>
                        <div className="l360-feature-tags">
                            <span className="l360-feature-tag"><img src="/assets/images/icons/video.png" alt="Video" /> Live Classes</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/download.png" alt="Download" /> Free Materials</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/chart.png" alt="Chart" /> Progress Tracking</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/question-mark.png" alt="Question" /> Doubt Support</span>
                            <span className="l360-feature-tag"><img src="/assets/images/icons/certificate.png" alt="Certificate" /> Certification</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BusinessInfo;