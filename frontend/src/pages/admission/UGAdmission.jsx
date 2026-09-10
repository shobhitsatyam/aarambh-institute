import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './UGAdmission.css';

const UGAdmission = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      title: "Bachelor of Arts (BA)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Specializations: History, Political Science, Sociology, Economics",
        "Flexible learning schedule",
        "Comprehensive study material provided"
      ],
      eligibility: "10+2 passed from any recognized board"
    },
    {
      title: "Bachelor of Commerce (B.Com)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Focus on accounting, finance, and taxation",
        "Industry-relevant curriculum",
        "Expert faculty guidance"
      ],
      eligibility: "10+2 passed from any recognized board"
    },
    {
      title: "Bachelor of Science (B.Sc)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Specializations: Mathematics, Physics, Chemistry, Zoology",
        "Practical and theoretical approach",
        "Laboratory assistance for practical subjects"
      ],
      eligibility: "10+2 (Science) from recognized board"
    },
    {
      title: "Bachelor of Computer Applications (BCA)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Latest programming languages and frameworks",
        "Software development and IT management",
        "Industry focused curriculum"
      ],
      eligibility: "10+2 passed from any recognized board"
    },
    {
      title: "Bachelor of Business Administration (BBA)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Specializations: HR, Marketing, Finance",
        "Case-study based learning approach",
        "Leadership and management skills development"
      ],
      eligibility: "10+2 passed from any recognized board"
    },
    {
      title: "Bachelor of Social Work (BSW)",
      duration: "Min 3 Years | Max 6 Years",
      features: [
        "Field work and practical training",
        "Social policy and development studies",
        "NGO placement assistance"
      ],
      eligibility: "10+2 passed from any recognized board"
    }
  ];

  return (
    <div className="l360-ug-container">
      {/* Hero Section */}
      <div className="l360-ug-hero">
        <h1>Under Graduation (UG) Admission 2026-27</h1>
        <p>Start your journey towards a brighter future with our comprehensive undergraduate programs. Flexible learning options for students and working professionals.</p>
      </div>

      {/* Intro Section */}
      <div className="l360-ug-intro">
        <h2>Why Choose UG Programs at Aarambh Institute?</h2>
        <p>Aarambh Institute offers quality undergraduate education through distance and open learning mode. Our programs are designed to provide flexibility, affordability, and academic excellence. Whether you're a fresh student or a working professional, our UG courses help you achieve your career goals without compromising your current commitments.</p>
      </div>

      {/* Grid of Pro Cards */}
      <div className="l360-ug-grid">
        {courses.map((course, index) => (
          <div className="l360-pro-card-wrapper" key={index}>
            <div className="l360-pro-card-inner">
              <div className="l360-coming-badge">Coming Soon</div>
              
              <div className="l360-pro-card-header">
                <h3>{course.title}</h3>
                <p><i className="fas fa-clock"></i> Duration: 3 Years</p>
              </div>
              
              <div className="l360-pro-card-body">
                {/* Nested Card 1: Features */}
                <div className="l360-nested-card">
                  <div className="l360-nested-title">
                    <i className="fas fa-star text-yellow-500"></i> Course Highlights
                  </div>
                  <ul>
                    {course.features.map((feature, idx) => (
                      <li key={idx}><i className="fas fa-check"></i> {feature}</li>
                    ))}
                  </ul>
                </div>

                {/* Nested Card 2: Eligibility & Duration */}
                <div className="l360-nested-card">
                  <div className="l360-nested-title">
                    <i className="fas fa-info-circle text-green-500"></i> Requirements
                  </div>
                  <p className="l360-eligibility-text mb-2">
                    <strong>Eligibility:</strong> {course.eligibility}
                  </p>
                  <p className="l360-eligibility-text">
                    <strong>Total Duration:</strong> {course.duration}
                  </p>
                </div>

                <Link to="#" className="l360-pro-btn" onClick={e => e.preventDefault()}>
                  Registration Opening Soon <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Section */}
      <div className="l360-ug-why-section">
        <h2>Why Study UG at Aarambh Institute?</h2>
        <div className="l360-ug-why-grid">
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-book-open"></i></div>
            <h3>Quality Study Material</h3>
            <p>Comprehensive and updated study materials provided for all subjects designed by experts.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-laptop-house"></i></div>
            <h3>Flexible Learning</h3>
            <p>Study at your own pace with our distance learning mode suited for everyone.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-headset"></i></div>
            <h3>Dedicated Support</h3>
            <p>24/7 student support for queries, assignments, and guidance.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-rupee-sign"></i></div>
            <h3>Affordable Fees</h3>
            <p>Quality education at budget-friendly fees with easy installment options.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default UGAdmission;