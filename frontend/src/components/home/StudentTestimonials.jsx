import React from 'react';
import './StudentTestimonials.css';

const testimonials = [
    {
        name: "Rahul Sharma",
        course: "NIOS 12th - 78%",
        text: `"I was struggling with my 12th exams after failing twice. Aarambh Institute guided me through NIOS admission and provided excellent coaching. I scored 78% and now pursuing my graduation. Thank you!"`,
        stars: 5,
        halfStar: false
    },
    {
        name: "Priya Kumari",
        course: "BBOSE 10th - 85%",
        text: `"The study materials and video lectures provided by Aarambh Institute were extremely helpful. I completed my 10th through BBOSE in just 60 days. The faculty support was amazing!"`,
        stars: 5,
        halfStar: false
    },
    {
        name: "Amit Singh",
        course: "BOSSE 12th - 72%",
        text: `"I was working and couldn't attend regular classes. Aarambh Institute's flexible learning system helped me clear my 12th through BOSSE board. The doubt clearing sessions were very helpful."`,
        stars: 4,
        halfStar: true
    },
    {
        name: "Neha Gupta",
        course: "NIOS 12th (ODE) - 82%",
        text: `"The On-Demand exam facility at NIOS helped me complete my 12th quickly. Aarambh Institute provided excellent guidance throughout the process. Highly recommended!"`,
        stars: 5,
        halfStar: false
    },
    {
        name: "Vikash Kumar",
        course: "NIOS 10th - 75%",
        text: `"I failed my 10th board exams twice. Aarambh Institute gave me a second chance through NIOS. Their coaching and study materials helped me pass with 75% marks. Forever grateful!"`,
        stars: 4,
        halfStar: true
    },
    {
        name: "Swati Verma",
        course: "NIOS 12th - 79%",
        text: `"The LMS platform of Aarambh Institute is excellent. I could access recorded lectures anytime. The faculty cleared all my doubts promptly. Cleared my 12th with good marks."`,
        stars: 5,
        halfStar: false
    }
];

const StudentTestimonials = () => {
    return (
        <section className="l360-testimonial-section">
            <div className="l360-testimonial-wrapper">
                <div className="l360-testimonial-header">
                    <span className="l360-testimonial-badge">STUDENT SUCCESS STORIES</span>
                    <h2 className="l360-testimonial-heading">
                        <img src="/assets/images/icons/testimonial.png" alt="Testimonial" />
                        What Our Students Say
                    </h2>
                    <p className="l360-testimonial-subheading">
                        Hear from our successful students who achieved their academic goals with Aarambh Institute. Their journey inspires us to do better every day.
                    </p>
                </div>

                <div className="l360-testimonial-grid">
                    {testimonials.map((student, index) => (
                        <div className="l360-testimonial-card" key={index}>
                            <div className="l360-quote-icon">"</div>
                            <div className="l360-testimonial-content">
                                <p className="l360-testimonial-text">{student.text}</p>
                            </div>
                            <div className="l360-student-info">
                                <div className="l360-student-avatar">
                                    <img src="/assets/images/icons/boy.png" alt={student.name} />
                                </div>
                                <div className="l360-student-details">
                                    <h4 className="l360-student-name">{student.name}</h4>
                                    <div className="l360-student-course">{student.course}</div>
                                    <div className="l360-student-rating">
                                        {[...Array(student.stars)].map((_, i) => (
                                            <img key={`full-${i}`} src="/assets/images/icons/star-one.png" alt="Star" />
                                        ))}
                                        {student.halfStar && (
                                            <img src="/assets/images/icons/star-half.png" alt="Half Star" />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="l360-testimonial-stats">
                    <div className="l360-stat-item">
                        <div className="l360-stat-number">5000+</div>
                        <div className="l360-stat-label">Students Enrolled</div>
                    </div>
                    <div className="l360-stat-item">
                        <div className="l360-stat-number">92%</div>
                        <div className="l360-stat-label">Pass Percentage</div>
                    </div>
                    <div className="l360-stat-item">
                        <div className="l360-stat-number">4.8/5</div>
                        <div className="l360-stat-label">Student Rating</div>
                    </div>
                    <div className="l360-stat-item">
                        <div className="l360-stat-number">10+</div>
                        <div className="l360-stat-label">Years of Excellence</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default StudentTestimonials;