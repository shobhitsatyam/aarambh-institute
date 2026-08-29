import React from 'react';
import { Link } from 'react-router-dom';
import './HowItWork.css';

const HowItWork = () => {
    return (
        <section className="l360-hiw-section">
            <div className="l360-hiw-container">
                <div className="l360-hiw-header">
                    <h2 className="l360-hiw-header-title">
                        <img src="/assets/images/icons/graduation.png" alt="Graduation Cap" />
                        Your Learning Journey with NIOS
                    </h2>
                    <p className="l360-hiw-header-subtitle">
                        Complete online learning ecosystem with live classes, study materials, and comprehensive LMS support
                    </p>
                </div>

                <div className="l360-hiw-steps-wrapper">
                    <div className="l360-hiw-step-item">
                        <div className="l360-hiw-step-badge">STEP 01</div>
                        <div className="l360-hiw-step-icon">
                            <img src="/assets/images/icons/user-plus.png" alt="Register" />
                        </div>
                        <h3 className="l360-hiw-step-heading">Register & Enroll</h3>
                        <p className="l360-hiw-step-description">
                            Create your account and complete admission for NIOS, BBOSE, or BOSSE boards. Choose your subjects and start your learning journey.
                        </p>
                        <ul className="l360-hiw-feature-list">
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Free registration with instant LMS access
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Choose from multiple boards and subjects
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Get personalized learning dashboard
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Access downloadable study materials
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Track your progress with analytics
                            </li>
                        </ul>
                    </div>

                    <div className="l360-hiw-step-connector">
                        <img src="/assets/images/icons/arrow-right.png" alt="Arrow" />
                    </div>

                    <div className="l360-hiw-step-item">
                        <div className="l360-hiw-step-badge">STEP 02</div>
                        <div className="l360-hiw-step-icon">
                            <img src="/assets/images/icons/lms.png" alt="LMS" />
                        </div>
                        <h3 className="l360-hiw-step-heading">Learn with LMS</h3>
                        <p className="l360-hiw-step-description">
                            Access our comprehensive Learning System with live classes, recorded lectures, and interactive study materials.
                        </p>
                        <ul className="l360-hiw-feature-list">
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Live interactive classes with expert faculty
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Downloadable notes and study materials
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Video lectures available 24/7
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Practice tests and assignments
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Doubt-solving sessions with experts
                            </li>
                        </ul>
                    </div>

                    <div className="l360-hiw-step-connector">
                        <img src="/assets/images/icons/arrow-right.png" alt="Arrow" />
                    </div>

                    <div className="l360-hiw-step-item">
                        <div className="l360-hiw-step-badge">STEP 03</div>
                        <div className="l360-hiw-step-icon">
                            <img src="/assets/images/icons/track.png" alt="Success" />
                        </div>
                        <h3 className="l360-hiw-step-heading">Track & Succeed</h3>
                        <p className="l360-hiw-step-description">
                            Monitor your progress, appear for exams, and achieve your academic goals with our comprehensive support system.
                        </p>
                        <ul className="l360-hiw-feature-list">
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Real-time progress tracking
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                On-demand examination facility
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Doubt clearing sessions
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Get certified on completion
                            </li>
                            <li className="l360-hiw-feature-item">
                                <img src="/assets/images/icons/check-circle.png" alt="Check" />
                                Performance analytics reports
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="l360-hiw-additional-features">
                    <h3>
                        <img src="/assets/images/icons/star.png" alt="Star" />
                        What You Get Inside Our LMS
                    </h3>
                    <div className="l360-hiw-features-grid">
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/live-class.png" alt="Live Classes" />
                            <h4>Live Classes</h4>
                            <p>Interactive live sessions with expert teachers, real-time doubt solving</p>
                        </div>
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/study-notes.png" alt="Study Notes" />
                            <h4>Study Notes</h4>
                            <p>Chapter-wise notes, important questions, quick revision guides</p>
                        </div>
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/digital-library.png" alt="Digital Library" />
                            <h4>Digital Library</h4>
                            <p>Access to e-books, previous year papers, sample papers</p>
                        </div>
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/progress-tracking.png" alt="Progress Tracking" />
                            <h4>Progress Tracking</h4>
                            <p>Track your learning progress, test scores, performance analytics</p>
                        </div>
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/doubt-clearing.png" alt="Doubt Clearing" />
                            <h4>Doubt Clearing</h4>
                            <p>24/7 doubt support, discussion forums, expert sessions</p>
                        </div>
                        <div className="l360-hiw-feature-card">
                            <img src="/assets/images/icons/mock-test.png" alt="Mock Tests" />
                            <h4>Mock Tests</h4>
                            <p>Chapter-wise tests, full-length mock exams, performance analysis</p>
                        </div>
                    </div>
                </div>

                <div className="l360-hiw-footer">
                    <Link to="/register" className="l360-hiw-cta-btn">
                        Start Your Learning Journey Today
                        <i className="fa-solid fa-angles-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HowItWork;