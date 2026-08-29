import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './FaqSection.css';

const faqs = [
    {
        question: "What is NIOS and how is it different from regular boards?",
        answer: "NIOS (National Institute of Open Schooling) is a board of education under the Government of India that provides flexible learning opportunities. Unlike regular boards, NIOS offers flexible exam schedule, no attendance requirements, and valid certification for government jobs."
    },
    {
        question: "How can I get admission in NIOS for 10th or 12th?",
        answer: "Getting admission in NIOS is simple with Aarambh Institute: Contact us for free counseling, submit your documents (previous marksheet, ID proof), choose your subjects, complete the fee payment, and start your learning journey with our expert faculty."
    },
    {
        question: "What is On-Demand Examination (ODE) in NIOS?",
        answer: "On-Demand Examination (ODE) is a unique feature of NIOS that allows students to appear for exams when they are ready. Exams are conducted throughout the year with results declared within 45 days."
    },
    {
        question: "Can I complete 10th or 12th in 60 days through BBOSE?",
        answer: "Yes, BBOSE offers a fast-track program where students can complete 10th or 12th in just 60 days. It has a special provision for compartment/failed students from any recognized board."
    }
];

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleFaq = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="l360-faq-section">
            <div className="l360-faq-wrapper">
                <div className="l360-faq-header">
                    <span className="l360-faq-badge">FREQUENTLY ASKED QUESTIONS</span>
                    <h2 className="l360-faq-heading">
                        <img src="/assets/images/icons/faq.png" alt="FAQ" />
                        Got Questions? We've Got Answers
                    </h2>
                    <p className="l360-faq-subheading">
                        Find answers to commonly asked questions about NIOS, BBOSE, BOSSE admissions, exams, study materials, and more.
                    </p>
                </div>

                <div className="l360-faq-grid">
                    {faqs.map((faq, index) => (
                        <div key={index} className={`l360-faq-item ${activeIndex === index ? 'active' : ''}`}>
                            <div className="l360-faq-question" onClick={() => toggleFaq(index)}>
                                <h3>{faq.question}</h3>
                                <div className="l360-faq-icon">
                                    <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                                </div>
                            </div>
                            <div className="l360-faq-answer">
                                <div className="l360-faq-answer-content">
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="l360-faq-footer">
                    <p>Still have questions? We're here to help you!</p>
                    <Link to="/contact-us" className="l360-faq-contact-btn">
                        <img src="/assets/images/icons/chat.png" alt="Chat" />
                        Contact Our Support Team
                        <i className="fas fa-arrow-right"></i>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FaqSection;