import React from 'react';
import './FreeLearningVideos.css';

const FreeLearningVideos = () => {
    return (
        <section className="l360-free-video-section">
            <div className="l360-free-video-wrapper">
                <div className="l360-free-video-header">
                    <span className="l360-free-video-badge">FREE LEARNING RESOURCES</span>
                    <h2 className="l360-free-video-heading">
                        <img src="/assets/images/icons/video.png" alt="Video" />
                        Free Educational Videos & Study Materials
                    </h2>
                    <p className="l360-free-video-subheading">
                        Access free video lectures, exam preparation tips, and study materials from our expert faculty. Learn anytime, anywhere!
                    </p>
                </div>

                <div className="l360-features-grid">
                    <div className="l360-feature-card">
                        <img src="/assets/images/icons/exam.png" alt="Exam Tips" />
                        <h4>Exam Tips & Tricks</h4>
                        <p>Expert strategies to score higher in NIOS, BBOSE, BOSSE exams</p>
                    </div>
                    <div className="l360-feature-card">
                        <img src="/assets/images/icons/study-material.png" alt="Study Material" />
                        <h4>Free Study Material</h4>
                        <p>Download chapter-wise notes and important questions</p>
                    </div>
                    <div className="l360-feature-card">
                        <img src="/assets/images/icons/live-class.png" alt="Live Class" />
                        <h4>Live Classes</h4>
                        <p>Interactive sessions with expert teachers</p>
                    </div>
                    <div className="l360-feature-card">
                        <img src="/assets/images/icons/doubt.png" alt="Doubt Clearing" />
                        <h4>Doubt Clearing</h4>
                        <p>24/7 doubt support and discussion forums</p>
                    </div>
                </div>

                <div className="l360-free-video-grid">
                    <div className="l360-free-video-card">
                        <div className="l360-video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/FnNQCL8iF64?si=P4RxK5TWf-Aizzfr"
                                title="NIOS Exam Preparation"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="l360-free-video-content">
                            <span className="l360-free-badge">FREE</span>
                            <h3 className="l360-free-video-title">NIOS Exam Preparation | Complete Strategy</h3>
                            <p className="l360-free-video-desc">Learn how to prepare for NIOS board exams effectively. Tips for theory papers, practical exams, and TMA submission.</p>
                        </div>
                    </div>

                    <div className="l360-free-video-card">
                        <div className="l360-video-wrapper">
                            <iframe
                                src="https://www.youtube.com/embed/pdcsw3FrlxY?si=0haiRu_v3lVaKrIq"
                                title="Study Material Guide"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="l360-free-video-content">
                            <span className="l360-free-badge">FREE</span>
                            <h3 className="l360-free-video-title">How to Access Free Study Materials</h3>
                            <p className="l360-free-video-desc">Step-by-step guide to download study materials, previous year papers, and sample papers for all boards.</p>
                        </div>
                    </div>
                </div>

                <div className="l360-youtube-cta" style={{ textAlign: 'center', marginTop: '40px' }}>
                    <a href="https://www.youtube.com/@aarambhinstitutepatna" target="_blank" rel="noreferrer" className="l360-youtube-btn">
                        <img src="/assets/images/icons/youtube-white.png" alt="YouTube" />
                        Watch More Videos on Our Channel
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default FreeLearningVideos;