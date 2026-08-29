import React from 'react';
import './YoutubeChannel.css';

const YoutubeChannel = () => {
    return (
        <section className="l360-youtube-section">
            <div className="l360-youtube-wrapper">
                <div className="l360-youtube-header">
                    <span className="l360-youtube-badge">OUR YOUTUBE CHANNEL</span>
                    <h2 className="l360-youtube-heading">
                        <img src="/assets/images/icons/youtube.png" alt="YouTube" />
                        Aarambh Institute Official Channel
                    </h2>
                    <p className="l360-youtube-subheading">
                        Get free educational videos, exam tips, study materials, and admission guidance directly from our experts. Subscribe for regular updates!
                    </p>
                </div>

                <div className="l360-youtube-grid">
                    <div className="l360-youtube-card">
                        <div className="l360-video-container">
                            <iframe
                                src="https://www.youtube.com/embed/GClSFEz-ydc?autoplay=0&mute=0&enablejsapi=1"
                                title="NIOS Admission Guide"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="l360-video-info">
                            <h3 className="l360-video-title">NIOS Admission 2026-27 | Complete Guide</h3>
                            <p className="l360-video-desc">Step-by-step guide for NIOS admission process, documents required, and important dates.</p>
                        </div>
                    </div>

                    <div className="l360-youtube-card">
                        <div className="l360-video-container">
                            <iframe
                                src="https://www.youtube.com/embed/6o4_Myr-MMY?si=OvFQ_aFD9yLU1QON"
                                title="BBOSE Admission Guide"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="l360-video-info">
                            <h3 className="l360-video-title">BBOSE Board Admission | Pass in 60 Days</h3>
                            <p className="l360-video-desc">Learn how to complete 10th & 12th quickly through BBOSE board with our expert guidance.</p>
                        </div>
                    </div>

                    <div className="l360-youtube-card">
                        <div className="l360-video-container">
                            <iframe
                                src="https://www.youtube.com/embed/TEoflICo71U?si=IV1XdUi89jGlDO3z"
                                title="On-Demand Exam"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="l360-video-info">
                            <h3 className="l360-video-title">NIOS On-Demand Exam | Complete Details</h3>
                            <p className="l360-video-desc">Everything about On-Demand Examination System - benefits, registration, and exam pattern.</p>
                        </div>
                    </div>
                </div>

                <div className="l360-youtube-cta">
                    <a href="https://www.youtube.com/@aarambhinstitutepatna" target="_blank" rel="noreferrer" className="l360-youtube-btn">
                        <img src="/assets/images/icons/youtube-white.png" alt="YouTube" />
                        Subscribe to Our Channel
                        <i className="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default YoutubeChannel;