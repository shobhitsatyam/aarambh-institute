import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './PGAdmission.css';

const PGAdmission = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      title: "Master of Arts (MA)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Specializations: History, Political Science, Sociology, Economics",
        "Advanced research and analytical skills",
        "Comprehensive study material provided"
      ],
      eligibility: "Bachelor's degree from any recognized university"
    },
    {
      title: "Master of Commerce (M.Com)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Specializations in Finance, Accounting, and Business Administration",
        "Industry-relevant curriculum",
        "Expert faculty guidance"
      ],
      eligibility: "B.Com or Bachelor's degree with Commerce"
    },
    {
      title: "Master of Science (M.Sc)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Specializations: Mathematics, Physics, Chemistry, Zoology",
        "Practical and theoretical approach",
        "Laboratory assistance for practical subjects"
      ],
      eligibility: "B.Sc degree from recognized university"
    },
    {
      title: "Master of Computer Applications (MCA)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Latest programming languages and frameworks",
        "Software development and project management",
        "IT industry focused curriculum"
      ],
      eligibility: "Bachelor's with Mathematics at 10+2 or graduation"
    },
    {
      title: "Master of Business Administration (MBA)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Specializations: HR, Marketing, Finance, IT",
        "Case-study based learning approach",
        "Leadership and management skills development"
      ],
      eligibility: "Bachelor's degree with minimum 50% marks"
    },
    {
      title: "Master of Social Work (MSW)",
      duration: "Min 2 Years | Max 5 Years",
      features: [
        "Field work and practical training",
        "Social policy and development studies",
        "NGO and corporate CSR placement assistance"
      ],
      eligibility: "Bachelor's degree from recognized university"
    }
  ];

  return (
    <div className="l360-pg-container">
      {/* Hero Section */}
      <div className="l360-pg-hero">
        <h1>Post Graduation (PG) Admission 2026-27</h1>
        <p>Advance your career with our premium postgraduate programs. Experience a flexible, world-class distance learning environment designed exclusively for graduates and working professionals.</p>
      </div>

      {/* Intro Section */}
      <div className="l360-pg-intro">
        <h2>Why Choose PG Programs at Aarambh Institute?</h2>
        <p>Aarambh Institute offers quality postgraduate education through distance and open learning mode. Our PG programs are designed to provide advanced knowledge, research skills, and career growth opportunities. Whether you want to specialize in your field or switch careers, our flexible learning options help you achieve your goals.</p>
      </div>

      {/* Grid of Pro Cards */}
      <div className="l360-pg-grid">
        {courses.map((course, index) => (
          <div className="l360-pro-card-wrapper" key={index}>
            <div className="l360-pro-card-inner">
              <div className="l360-coming-badge">Coming Soon</div>
              
              <div className="l360-pro-card-header">
                <h3>{course.title}</h3>
                <p><i className="fas fa-clock"></i> Duration: 2 Years</p>
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
                    <i className="fas fa-info-circle text-blue-500"></i> Requirements
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
      <div className="l360-pg-why-section">
        <h2>Why Study PG at Aarambh Institute?</h2>
        <div className="l360-pg-why-grid">
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-book-open"></i></div>
            <h3>Advanced Study Material</h3>
            <p>Comprehensive and updated PG level study materials for all subjects designed by experts.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-laptop-house"></i></div>
            <h3>Flexible Learning</h3>
            <p>Study at your own pace with our distance learning mode perfectly suited for working professionals.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-user-graduate"></i></div>
            <h3>Research Guidance</h3>
            <p>Dedicated faculty support for research projects, assignments, and thesis work.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-rupee-sign"></i></div>
            <h3>Affordable Fees</h3>
            <p>Quality PG education at budget-friendly fees with easy installment and scholarship options.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default PGAdmission;