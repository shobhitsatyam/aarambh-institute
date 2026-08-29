import React from 'react';
import { Link } from 'react-router-dom';
import './AboutSection.css';

const AboutSection = () => {
    return (
        <div className="l360-about-section">
            <div className="l360-about-container">
                <div className="l360-about-card">
                    <div className="l360-about-card-header">
                        <h2>
                            <i className="fas fa-graduation-cap"></i>
                            Aarambh Institute - NIOS Study Centre
                        </h2>
                    </div>
                    <div className="l360-about-card-content">
                        <p className="l360-about-text">
                            The Mission of <span className="l360-about-highlight">Aarambh Institute – NIOS Study Centre in Patna, Bihar</span> is to enroll and coach students who were unable to study in regular schooling system because of various reasons like failure of students, relocation of family, unexpected break from studies, will to study in open schooling system and other reasons.
                        </p>
                        <p className="l360-about-text">
                            <span className="l360-about-highlight">Aarambh Institute</span> is private, non-traditional, alternative educational institution which has excellent education quality which helps students in clearing <span className="l360-about-highlight">NIOS, BBOSE, BOSSE & Other Boards</span> with ease.
                        </p>
                        <p className="l360-about-text">
                            We focus on providing right education with updated curriculum to its students, ensuring every learner achieves their academic goals.
                        </p>
                    </div>
                </div>

                <div className="l360-about-card">
                    <div className="l360-about-card-header">
                        <h2>
                            <i className="fas fa-trophy"></i>
                            Student Achievements
                        </h2>
                    </div>
                    <div className="l360-about-card-content">
                        <div className="l360-about-grid">
                            {/* Students Map */}
                            {[
                                { img: "1.jpeg", name: "Sakshi Bisht", result: "10th - 85%" },
                                { img: "2.jpeg", name: "Saravana P", result: "12th - 79%" },
                                { img: "3.jpeg", name: "Vinay Sharma", result: "10th - 92%" },
                                { img: "4.jpeg", name: "Sahana Reddy", result: "10th - 89%" },
                                { img: "5.jpeg", name: "Nilesh Patel", result: "12th - 85%" },
                                { img: "6.jpeg", name: "Rubeen Taj", result: "12th - 78%" }
                            ].map((student, index) => (
                                <div className="l360-about-student-item" key={index}>
                                    <div className="l360-about-student-image">
                                        <img src={`/assets/images/students/${student.img}`} alt={student.name} />
                                    </div>
                                    <div className="l360-about-student-name">{student.name}</div>
                                    <div className="l360-about-student-result">{student.result}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="l360-about-card">
                    <div className="l360-about-card-header">
                        <h2>
                            <i className="fas fa-bullhorn"></i>
                            Latest Announcements
                        </h2>
                    </div>
                    <div className="l360-about-card-content">
                        <ul className="l360-about-announcements-list">
                            {[
                                "NIOS On-Demand Exam Registration Open for 2026 Session",
                                "BBOSE 10th & 12th Result Declared - Check Now",
                                "Admission Open for 2026-27 Session - Limited Seats",
                                "Free Study Materials Download Available for NIOS Students",
                                "BOSSE Board Practical Exam Schedule Released",
                                "Scholarship Program for Meritorious Students - Apply Now"
                            ].map((text, idx) => (
                                <li className="l360-about-announcement-item" key={idx}>
                                    <div className="l360-about-announcement-badge">
                                        <img src="/assets/images/icons/new.gif" alt="New" />
                                    </div>
                                    <Link to="/register" className="l360-about-announcement-link">
                                        {text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutSection;