import React from 'react';
import { Link } from 'react-router-dom';
import './Blogs.css';

const Blogs = () => {
    return (
        <section className="l360-blog-section">
            <div className="l360-blog-wrapper">
                <div className="l360-blog-header">
                    <div className="l360-blog-title-group">
                        <span className="l360-blog-badge">OUR BLOG</span>
                        <h2 className="l360-blog-heading">Latest Articles & Insights</h2>
                        <p className="l360-blog-subheading">Stay updated with the latest trends, tips, and strategies from our experts</p>
                    </div>
                    <Link to="/blog" className="l360-blog-view-link">
                        View All Posts <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>

                <div className="l360-blog-grid">
                    <div className="l360-blog-card">
                        <div className="l360-blog-image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRcRfs7GYl0eDzSifQosThYFc7j30BJPflw-A&s" alt="Digital Learning" />
                            <div className="l360-blog-category">Education</div>
                        </div>
                        <div className="l360-blog-card-content">
                            <div className="l360-blog-meta">
                                <span><i className="far fa-calendar"></i> March 15, 2025</span>
                            </div>
                            <h3 className="l360-blog-post-title">
                                <Link to="#">Top Digital Learning Trends for 2025</Link>
                            </h3>
                            <p className="l360-blog-excerpt">
                                Discover the latest digital learning strategies that are shaping the education industry this year. From AI-powered personalized learning to interactive virtual classrooms.
                            </p>
                            <Link to="#" className="l360-blog-read-link">
                                Read Article <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="l360-blog-card">
                        <div className="l360-blog-image">
                            <img src="https://nios.world/wp-content/uploads/2026/03/task_01kmd390vees7sqgt2k8trt2p7_1774261172_img_0.webp" alt="NIOS Exam Tips" />
                            <div className="l360-blog-category">Exam Tips</div>
                        </div>
                        <div className="l360-blog-card-content">
                            <div className="l360-blog-meta">
                                <span><i className="far fa-calendar"></i> March 10, 2025</span>
                            </div>
                            <h3 className="l360-blog-post-title">
                                <Link to="#">NIOS Exam Preparation Tips for Better Results</Link>
                            </h3>
                            <p className="l360-blog-excerpt">
                                Learn effective strategies to prepare for NIOS examinations, time management techniques, and proven methods to achieve higher scores in your board exams.
                            </p>
                            <Link to="#" className="l360-blog-read-link">
                                Read Article <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="l360-blog-card">
                        <div className="l360-blog-image">
                            <img src="https://www.intervaledu.com/media/blog/NIOS_Class_10_Registration_2025_Complete_Admission_Process__Fees.webp" alt="Distance Learning" />
                            <div className="l360-blog-category">Open Schooling</div>
                        </div>
                        <div className="l360-blog-card-content">
                            <div className="l360-blog-meta">
                                <span><i className="far fa-calendar"></i> March 5, 2025</span>
                            </div>
                            <h3 className="l360-blog-post-title">
                                <Link to="#">Benefits of Open Schooling for Working Professionals</Link>
                            </h3>
                            <p className="l360-blog-excerpt">
                                A comprehensive guide to leveraging open schooling for career advancement, flexible learning schedules, and balancing work-education commitments.
                            </p>
                            <Link to="#" className="l360-blog-read-link">
                                Read Article <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>

                    <div className="l360-blog-card">
                        <div className="l360-blog-image">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8V95sEtkNINScitmweBaZxgF3LMb6R_eu-w&s" alt="Career Guidance" />
                            <div className="l360-blog-category">Career</div>
                        </div>
                        <div className="l360-blog-card-content">
                            <div className="l360-blog-meta">
                                <span><i className="far fa-calendar"></i> February 28, 2025</span>
                            </div>
                            <h3 className="l360-blog-post-title">
                                <Link to="#">Career Opportunities After 10th & 12th in India</Link>
                            </h3>
                            <p className="l360-blog-excerpt">
                                Essential guidance on career paths, higher education options, and professional opportunities available after completing 10th and 12th from open schooling boards.
                            </p>
                            <Link to="#" className="l360-blog-read-link">
                                Read Article <i className="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blogs;