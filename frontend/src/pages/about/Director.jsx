import React from 'react';
import './Director.css';

const Director = () => {
  return (
    <div className="director-main-container">

      {/* Hero Section */}
      <div className="director-hero">
        <h1 className="director-hero-title">Meet Our Director</h1>
        <p className="director-hero-subtitle">Empowering Students Through Accessible Education & Open Schooling</p>
      </div>

      {/* Profile Overlap Card */}
      <div className="director-profile-wrapper">
        <div className="director-profile-card">
          <div className="director-img-sidebar">
            <div className="director-img-container">
              <img
                src="/assets/images/founder/director.png"
                alt="Muskan Kumari Bhartiya"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/icons/female-teacher.png'; }}
                className="director-img"
              />
            </div>
          </div>

          <div className="director-info-content">
            <h2 className="director-name">Muskan Kumari Bhartiya</h2>
            <div className="director-title">Director, Aarambh Institute of Distance Learning</div>

            <div className="director-contact-badges">
              <a href="tel:9931600795" className="contact-badge">
                <i className="fas fa-phone-alt"></i> +91 9931600795
              </a>
              <a href="mailto:info@openadmissions.in" className="contact-badge">
                <i className="fas fa-envelope"></i> info@openadmissions.in
              </a>
              <span className="contact-badge contact-badge-inactive">
                <i className="fas fa-map-marker-alt contact-icon-inactive"></i> Patna, Bihar, India
              </span>
            </div>

            <div className="director-bio">
              <p>I am the Director of Aarambh Institute of Distance Learning, where I guide students toward flexible and accessible education opportunities through NIOS, BBOSE, BOSSE, and other open schooling programs.</p>
              <p>With a strong passion for education and student support, I am dedicated to helping students who faced academic failures, financial difficulties, personal challenges, or interruptions in their studies continue their educational journey with confidence.</p>
              <p>Through Aarambh Institute, we provide admission guidance, counseling, learning support, study resources, and complete assistance for students across India who want to complete their 10th, 12th, or continue higher education.</p>
              <p className="director-quote">
                Every student has potential, and education should never stop because of one failure or a difficult situation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The Reality */}
      <div className="master-section-card master-reality-card">
        <div className="reality-glow-bg"></div>

        <h2 className="section-heading">The Reality We Address</h2>
        <div className="reality-grid">
          <div className="reality-card reality-card-red">
            <div className="reality-card-title-red">Millions Drop Out</div>
            <p className="reality-card-desc">In India, millions of students discontinue their education every year due to various social, financial, and academic reasons. Lakhs of students fail in board examinations and often lose hope about their future.</p>
          </div>

          <div className="reality-card reality-card-blue">
            <div className="reality-card-title-blue">Lack of Guidance</div>
            <p className="reality-card-desc">Unfortunately, many of these students never get the right guidance or a second opportunity to restart their academic journey, leaving their true potential unfulfilled.</p>
          </div>
        </div>

        <div className="reality-bottom-quote-container">
          <div className="reality-quote-icon">"</div>
          <p className="reality-quote-text">
            That reality drives me to work with Aarambh Institute — a platform focused on helping students continue their studies through flexible and recognized open schooling systems.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="vision-mission-grid">
        <div className="director-3d-card vm-card">
          <div className="vm-icon vm-icon-red">
            <i className="fas fa-eye"></i>
          </div>
          <h3 className="vm-title">Our Vision</h3>
          <p className="vm-desc">To help students across India continue their education without fear of failure and create awareness about flexible learning opportunities available through open schooling and distance education.</p>
        </div>
        <div className="director-3d-card vm-card">
          <div className="vm-icon vm-icon-blue">
            <i className="fas fa-bullseye"></i>
          </div>
          <h3 className="vm-title">Our Mission</h3>
          <p className="vm-desc">To support students who discontinued their studies. To guide failed students toward new educational opportunities. To promote accessible education and encourage confidence and career growth.</p>
        </div>
      </div>

      {/* Lists Grouped in a Master Card */}
      <div className="master-section-card support-card">
        <h2 className="section-heading">Who We Support</h2>
        <div className="modern-list-grid">
          {[
            { text: "Students who failed in 10th or 12th", icon: "fa-user-graduate" },
            { text: "Working professionals", icon: "fa-briefcase" },
            { text: "Students preparing through open boards", icon: "fa-book-open" },
            { text: "Students needing flexible learning", icon: "fa-laptop-house" },
            { text: "Learners restarting their academic journey", icon: "fa-route" }
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item">
              <div className="list-icon-wrapper"><i className={`fas ${item.icon}`}></i></div>
              <div className="list-item-text">{item.text}</div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">What We Offer</h2>
        <div className="modern-list-grid">
          {[
            "NIOS Admission Support",
            "BBOSE Admission Support",
            "BOSSE Admission Support",
            "On-Demand Examination Guidance",
            "Study Materials & Notes",
            "Online & Offline Learning Support",
            "Student Counseling & Career Guidance"
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item">
              <div className="list-icon-wrapper"><i className="fas fa-check"></i></div>
              <div className="list-item-text">{item.text || item}</div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">Leadership & Responsibilities</h2>
        <div className="modern-list-grid">
          {[
            "Student Counseling & Guidance",
            "Academic Support Management",
            "Open Schooling Awareness Programs",
            "Student Admission Assistance",
            "Digital Learning Support",
            "Building Student Confidence & Motivation"
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item">
              <div className="list-icon-wrapper"><i className="fas fa-arrow-right"></i></div>
              <div className="list-item-text">{item.text || item}</div>
            </div>
          ))}
        </div>

        <div className="inner-card highlight-card">
          <p className="highlight-card-text">
            <strong className="highlight-strong">Our goal is not only admissions</strong> — our goal is helping students successfully complete their education and move toward better career opportunities.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <h2 className="section-heading">Our Core Values</h2>
      <div className="core-values-grid">
        {[
          { title: "Student First Approach", icon: "fa-user-graduate" },
          { title: "Trust & Transparency", icon: "fa-handshake" },
          { title: "Equal Learning Opportunities", icon: "fa-balance-scale" },
          { title: "Guidance & Support", icon: "fa-hands-helping" },
          { title: "Educational Empowerment", icon: "fa-lightbulb" }
        ].map((item, idx) => (
          <div key={idx} className="director-3d-card cv-card">
            <div className="cv-icon">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <h4 className="cv-title">{item.title}</h4>
          </div>
        ))}
      </div>

      {/* About Section Footer - ULTRA PREMIUM PRO LEVEL DESIGN */}
      <div className="ultra-cta-wrapper">
        <div className="ultra-cta-card">
          {/* Abstract Premium Background Elements */}
          <div className="cta-glow-1"></div>
          <div className="cta-glow-2"></div>
          <div className="cta-grid-pattern"></div>
          
          <div className="ultra-cta-content">
            <div className="cta-text-section">
              <span className="cta-subtitle">Take The Next Step</span>
              <h2 className="ultra-cta-heading">
                Need Admission Guidance?
              </h2>
              <p className="cta-description">
                Connect with us for expert counseling and personalized support for your open schooling journey.
              </p>
            </div>
            
            <div className="cta-buttons-section">
              <a href="https://openadmissions.in" target="_blank" rel="noreferrer" className="pro-btn pro-btn-primary">
                <i className="fas fa-globe btn-icon"></i> 
                <span>Visit Website</span>
              </a>
              <a href="mailto:info@openadmissions.in" className="pro-btn pro-btn-secondary">
                <i className="fas fa-envelope btn-icon"></i> 
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Director;