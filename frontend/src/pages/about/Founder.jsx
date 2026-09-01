import React from 'react';
import './Founder.css'; // Import the new pro-level CSS

const Founder = () => {
  return (
    <div className="founder-main-container">
      
      {/* Hero Section */}
      <div className="founder-hero">
        <h1 className="founder-hero-title">Meet Our Founder</h1>
        <p className="founder-hero-subtitle">Building New Opportunities Through Open Education</p>
      </div>

      {/* Profile Overlap Card */}
      <div className="founder-profile-wrapper">
        <div className="founder-profile-card">
          <div className="founder-img-sidebar">
            <div className="founder-img-container">
              <img
                src="/assets/images/founder/founder.webp"
                alt="Rajkishor Kumar"
                onError={(e) => { e.target.onerror = null; e.target.src = '/assets/images/icons/male-teacher.png'; }}
                className="founder-img"
              />
            </div>
          </div>
          
          <div className="founder-info-content">
            <h2 className="founder-name">Rajkishor Kumar</h2>
            <div className="founder-title">Founder, Aarambh Institute of Distance Learning</div>
            
            <div className="flex flex-wrap gap-4 mb-6">
              <a href="tel:9931003857" className="contact-badge">
                <i className="fas fa-phone-alt"></i> +91 9931003857
              </a>
              <a href="mailto:info@openadmissions.in" className="contact-badge">
                <i className="fas fa-envelope"></i> info@openadmissions.in
              </a>
              <span className="contact-badge bg-gray-50 border-gray-200 text-gray-500 pointer-events-none">
                <i className="fas fa-map-marker-alt text-gray-400"></i> Patna, Bihar, India
              </span>
            </div>
            
            <div className="text-gray-600 leading-relaxed space-y-4 text-[15px]">
              <p>I am the Founder of Aarambh Institute of Distance Learning, an educational platform dedicated to helping students continue their education through NIOS, BBOSE, BOSSE, and other open schooling programs.</p>
              <p>Our mission is to ensure that no student feels their education has ended because of failure, a gap year, personal circumstances, or limitations of traditional schooling.</p>
              <p>Through Aarambh Institute, we provide admission guidance, counseling, learning support, study resources, and complete assistance for students across India who want to complete their 10th, 12th, or continue higher education.</p>
              <p className="text-gray-900 font-bold text-[16px] mt-6 border-l-4 border-[#c40138] pl-4">
                We strongly believe that one exam or one difficult phase should never decide a student's entire future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats / The Problem */}
      <div className="master-section-card relative overflow-hidden">
        {/* Subtle decorative background blob */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -z-10 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <h2 className="section-heading">The Reality We Are Changing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-2xl p-8 border-t-4 border-[#c40138] shadow-[0_10px_30px_rgba(196,1,56,0.08)] hover:-translate-y-2 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-black text-[#c40138] mb-4">2 Crore+</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Students Discontinue Annually</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">Due to financial issues, academic pressure, family responsibilities, lack of awareness, or personal challenges.</p>
          </div>
          
          <div className="bg-white rounded-2xl p-8 border-t-4 border-blue-600 shadow-[0_10px_30px_rgba(37,99,235,0.08)] hover:-translate-y-2 transition-transform duration-300">
            <div className="text-4xl md:text-5xl font-black text-blue-600 mb-4">40 Lakh+</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Students Fail Board Exams</h3>
            <p className="text-gray-600 text-sm leading-relaxed font-medium">Many lose confidence about their future and never get the right guidance or a second opportunity to restart their academic journey.</p>
          </div>
        </div>
        
        {/* Founder's Message Quote Inside Master Card */}
        <div className="bg-gray-50 border-l-[6px] border-[#c40138] p-8 rounded-xl relative mt-8">
          <div className="absolute top-4 left-4 text-5xl text-[#c40138] opacity-20 font-serif leading-none">"</div>
          <p className="text-[17px] leading-relaxed text-gray-800 italic font-medium relative z-10 pl-6">
            Education should never stop because of failure, financial problems, or personal circumstances. Every student deserves a second chance and the right guidance to build a better future. Aarambh Institute was started with the vision of helping students restart their educational journey with confidence.
          </p>
        </div>
      </div>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <div className="founder-3d-card p-8 bg-white border border-gray-200">
          <div className="w-16 h-16 bg-red-50 rounded-2xl flex items-center justify-center text-[#c40138] text-3xl mb-6 shadow-sm border border-red-100">
            <i className="fas fa-eye"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-700 leading-relaxed font-medium">To become one of India's most trusted open learning and distance education platforms by empowering students with quality guidance, flexible education opportunities, and digital learning support.</p>
        </div>
        <div className="founder-3d-card p-8 bg-white border border-gray-200">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 text-3xl mb-6 shadow-sm border border-blue-100">
            <i className="fas fa-bullseye"></i>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-700 leading-relaxed font-medium">To help students continue their education without barriers. To provide genuine and transparent admission guidance. To create awareness about open schooling opportunities and support students with modern learning resources.</p>
        </div>
      </div>

      {/* Lists Grouped in a Master Card */}
      <div className="master-section-card bg-white relative">
        <h2 className="section-heading">Who We Support</h2>
        <div className="modern-list-grid mb-12">
          {[
            { text: "Students who failed in 10th or 12th", icon: "fa-user-graduate" },
            { text: "Working professionals", icon: "fa-briefcase" },
            { text: "Students preparing through open boards", icon: "fa-book-open" },
            { text: "Students needing flexible learning", icon: "fa-laptop-house" },
            { text: "Learners restarting their academic journey", icon: "fa-route" }
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item bg-gray-50 border border-gray-200">
              <div className="list-icon-wrapper shadow-sm"><i className={`fas ${item.icon}`}></i></div>
              <div className="font-bold text-gray-800 mt-1">{item.text}</div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">What We Offer</h2>
        <div className="modern-list-grid mb-12">
          {[
            "NIOS Admission Support",
            "BBOSE Admission Support",
            "BOSSE Admission Support",
            "On-Demand Examination Guidance",
            "Study Materials & Notes",
            "Online & Offline Learning Support",
            "Student Counseling & Career Guidance"
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item bg-gray-50 border border-gray-200">
              <div className="list-icon-wrapper shadow-sm"><i className="fas fa-check"></i></div>
              <div className="font-bold text-gray-800 mt-2">{item.text || item}</div>
            </div>
          ))}
        </div>

        <h2 className="section-heading">Leadership & Growth Focus</h2>
        <div className="modern-list-grid mb-8">
          {[
            "Educational counseling",
            "Student success strategies",
            "Digital education growth",
            "Learning accessibility",
            "Building a strong support system for open schooling students"
          ].map((item, idx) => (
            <div key={idx} className="modern-list-item bg-gray-50 border border-gray-200">
              <div className="list-icon-wrapper shadow-sm"><i className="fas fa-arrow-right"></i></div>
              <div className="font-bold text-gray-800 mt-2">{item.text || item}</div>
            </div>
          ))}
        </div>
        
        <div className="inner-card border-l-4 border-[#c40138] bg-red-50/30">
          <p className="text-[16px] text-gray-900 font-semibold mb-0">
            <strong className="text-[#c40138]">Our goal is not only admissions</strong> — our goal is helping students successfully complete their education and move toward better career opportunities.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <h2 className="section-heading">Our Core Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        {[
          { title: "Trust & Transparency", icon: "fa-handshake" },
          { title: "Student-Centric Approach", icon: "fa-users" },
          { title: "Accessibility in Education", icon: "fa-door-open" },
          { title: "Continuous Learning", icon: "fa-book-reader" },
          { title: "Result-Oriented Guidance", icon: "fa-chart-line" }
        ].map((item, idx) => (
          <div key={idx} className="founder-3d-card p-6 text-center group bg-white border border-gray-200">
            <div className="w-14 h-14 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-2xl mb-4 group-hover:bg-[#c40138] group-hover:text-white group-hover:shadow-[0_0_15px_rgba(196,1,56,0.5)] transition-all duration-300">
              <i className={`fas ${item.icon}`}></i>
            </div>
            <h4 className="font-bold text-gray-900 text-lg">{item.title}</h4>
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
                Ready to Start Your Journey?
              </h2>
              <p className="cta-description">
                Don't let anything stop your education. Get in touch with us for personalized admission guidance today.
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

export default Founder;