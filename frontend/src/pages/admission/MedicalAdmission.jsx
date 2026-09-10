import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MedicalAdmission.css';

const MedicalAdmission = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const courses = [
    {
      title: "MBBS (Bachelor of Medicine & Surgery)",
      duration: "5.5 Years (Including 1 Year Internship)",
      features: [
        "Top medical colleges across India",
        "Complete admission guidance and counseling",
        "Expert assistance for choice filling"
      ],
      eligibility: "10+2 with PCB (50% marks), NEET-UG qualified",
      icon: "fa-user-md"
    },
    {
      title: "BDS (Bachelor of Dental Surgery)",
      duration: "5 Years (Including 1 Year Internship)",
      features: [
        "Government and private dental colleges",
        "Career in dental surgery and practice",
        "State-wise counseling support"
      ],
      eligibility: "10+2 with PCB (50% marks), NEET-UG qualified",
      icon: "fa-tooth"
    },
    {
      title: "BAMS (Bachelor of Ayurvedic Medicine)",
      duration: "5.5 Years (Including 1 Year Internship)",
      features: [
        "Growing field of traditional Ayurveda",
        "Practice as a registered Ayurvedic doctor",
        "High demand in wellness sectors"
      ],
      eligibility: "10+2 with PCB (50% marks), NEET-UG qualified",
      icon: "fa-leaf"
    },
    {
      title: "BHMS (Bachelor of Homeopathic Medicine)",
      duration: "5.5 Years (Including 1 Year Internship)",
      features: [
        "Global recognition for Homeopathy",
        "Private practice opportunities",
        "Holistic treatment approach"
      ],
      eligibility: "10+2 with PCB (50% marks), NEET-UG qualified",
      icon: "fa-capsules"
    },
    {
      title: "B.Sc Nursing",
      duration: "4 Years",
      features: [
        "High demand in government and private hospitals",
        "Opportunities to work abroad",
        "Specialized clinical training"
      ],
      eligibility: "10+2 with PCB (45% marks), Entrance/Merit",
      icon: "fa-user-nurse"
    },
    {
      title: "B.Pharm & D.Pharm (Pharmacy)",
      duration: "2 to 4 Years",
      features: [
        "Pharmaceutical manufacturing and research",
        "Open your own medical store/pharmacy",
        "Drug inspector and government roles"
      ],
      eligibility: "10+2 with PCB/PCM (45% marks)",
      icon: "fa-prescription-bottle-alt"
    },
    {
      title: "Paramedical Courses",
      duration: "2 to 3 Years",
      features: [
        "Lab Technician (BMLT/DMLT), Radiology, OT Technician",
        "Direct merit-based admission",
        "Immediate job placement opportunities"
      ],
      eligibility: "10+2 with Science (40-50% marks)",
      icon: "fa-microscope"
    }
  ];

  return (
    <div className="l360-medical-container">
      {/* Hero Section */}
      <div className="l360-medical-hero">
        <h1>Medical & Paramedical Admission 2026-27</h1>
        <p>Get expert guidance for MBBS, BDS, BAMS, BHMS, Nursing, and Paramedical courses. Complete admission assistance, counseling, and college selection support.</p>
      </div>

      {/* Intro Section */}
      <div className="l360-medical-intro">
        <h2>Why Choose Medical Programs at Aarambh Institute?</h2>
        <p>Aarambh Institute provides comprehensive medical admission guidance and career counseling. We help students navigate the complex medical admission process, from NEET preparation to college selection. Our expert counselors guide you through every step to secure admission in top medical colleges across India.</p>
      </div>

      {/* Grid of Pro Cards */}
      <div className="l360-medical-grid">
        {courses.map((course, index) => (
          <div className="l360-pro-card-wrapper" key={index}>
            <div className="l360-pro-card-inner">
              <div className="l360-coming-badge">Coming Soon</div>
              
              <div className="l360-pro-card-header">
                <h3>{course.title}</h3>
                <p><i className="fas fa-clock"></i> Duration: {course.duration.split('(')[0].trim()}</p>
              </div>
              
              <div className="l360-pro-card-body">
                {/* Nested Card 1: Features */}
                <div className="l360-nested-card">
                  <div className="l360-nested-title">
                    <i className={`fas ${course.icon} text-cyan-500`}></i> Career Focus
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
                    <i className="fas fa-info-circle text-sky-500"></i> Requirements
                  </div>
                  <p className="l360-eligibility-text mb-2">
                    <strong>Eligibility:</strong> {course.eligibility}
                  </p>
                  <p className="l360-eligibility-text">
                    <strong>Total Duration:</strong> {course.duration}
                  </p>
                </div>

                <Link to="#" className="l360-pro-btn" onClick={e => e.preventDefault()}>
                  Counseling Starting Soon <i className="fas fa-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Why Section */}
      <div className="l360-medical-why-section">
        <h2>Why Choose Aarambh Institute for Medical Admission?</h2>
        <div className="l360-medical-why-grid">
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-brain"></i></div>
            <h3>NEET Preparation</h3>
            <p>Expert guidance and strategic coaching for NEET-UG examination to maximize your score.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-comments"></i></div>
            <h3>Expert Counseling</h3>
            <p>Complete end-to-end admission and career counseling for all major medical courses.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-hospital-alt"></i></div>
            <h3>College Selection</h3>
            <p>Personalized guidance for choosing the best government and private medical colleges based on rank.</p>
          </div>
          <div className="l360-why-card">
            <div className="l360-why-icon-wrapper"><i className="fas fa-hand-holding-usd"></i></div>
            <h3>Scholarship Guidance</h3>
            <p>Information and application assistance for government, state, and private scholarships.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MedicalAdmission;