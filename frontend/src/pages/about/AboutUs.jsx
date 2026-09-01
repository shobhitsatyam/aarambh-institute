import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AboutUs.css';

const AboutUs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page-wrapper">
      {/* Hero Section */}
      <div className="about-hero">
        <div className="about-hero-overlay"></div>

        {/* Animated Background Shapes */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 z-0 pointer-events-none">
          <div className="absolute -top-10 -left-10 w-64 h-64 rounded-full bg-[#c40138] blur-3xl mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-blue-500 blur-3xl mix-blend-screen animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="about-hero-content">
          <h1 className="about-hero-title">
            About <span>Aarambh Institute</span>
          </h1>
          <p className="about-hero-subtitle">
            Your trusted partner in alternative education, empowering students to achieve academic success through NIOS, BBOSE & CBSE programs in Patna, Bihar.
          </p>
        </div>
      </div>

      <div className="about-main-container">

        {/* Mission & Vision */}
        <div className="about-section-card">
          <div className="about-section-header">
            <span className="text-[#c40138] font-bold tracking-widest uppercase text-sm mb-2">Who We Are</span>
            <h2 className="about-section-title">Our Mission & Vision</h2>
            <div className="about-section-divider"></div>
          </div>

          <div className="mission-vision-grid">
            <div className="flex flex-col gap-5">
              <div className="mission-card">
                <p>The Mission of <strong className="text-[#c40138]">Aarambh Institute – NIOS Study Centre in Patna, Bihar</strong> is to enroll and coach students who were unable to study in regular schooling system because of various reasons like failure of students, relocation of family, unexpected break from studies, will to study in open schooling system and other reasons.</p>
              </div>
              <div className="mission-card">
                <p><strong className="text-[#c40138]">Aarambh Institute</strong> is private, non-traditional, alternative educational institution which has excellent education quality that helps students in clearing <strong className="text-gray-800">NIOS, BBOSE & CBSE Board</strong> with ease.</p>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="mission-card flex-grow">
                <p>We focus on providing right education with updated curriculum to its students, ensuring they receive personalized attention and guidance to excel in their academic pursuits.</p>
              </div>
              <div className="vision-card flex-grow">
                <div className="vision-card-bg"></div>
                <h3 className="text-2xl font-bold mb-3 flex items-center gap-3 relative z-10">
                  <i className="fas fa-eye text-[#ffb4b4]"></i> Our Vision
                </h3>
                <p className="text-white/95 relative z-10 text-base leading-relaxed">To become the leading alternative education provider in Bihar, creating opportunities for students who need flexible learning options without compromising on educational quality.</p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer */}
        <div className="about-section-card">
          <div className="about-section-header">
            <h2 className="about-section-title">What We Offer</h2>
            <div className="about-section-divider"></div>
          </div>

          <div className="offer-grid">
            {[
              { img: "nios.png", title: "NIOS Programs", desc: "Complete coaching for NIOS Secondary (10th) and Senior Secondary (12th) examinations." },
              { img: "bbose.png", title: "BBOSE Programs", desc: "Specialized coaching for Bihar Board of Open Schooling and Examination programs." },
              { img: "cbse.png", title: "CBSE Coaching", desc: "Quality education for CBSE curriculum students with conceptual understanding." },
              { img: "personalized.png", title: "Personalized Attention", desc: "Small batch sizes and individual attention to ensure each student receives support." },
              { img: "exam-prep.png", title: "Exam Preparation", desc: "Comprehensive test series, mock exams, and revision sessions to build confidence." },
              { img: "digital.png", title: "Digital Resources", desc: "Access to online study materials, video lectures, and digital resources for learning." }
            ].map((item, idx) => (
              <div key={idx} className="offer-card">
                <div className="offer-icon-wrapper">
                  <img src={`/assets/images/icons/${item.img}`} alt={item.title} className="offer-icon" />
                </div>
                <h3 className="text-gray-900 font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements - 3D Cards */}
        <div className="achievement-section">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#c40138]/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl z-0"></div>

          <div className="about-section-header relative z-10">
            <h2 className="achievement-section-title">Our Achievements</h2>
            <p className="achievement-section-subtitle">Milestones that define our journey of excellence</p>
          </div>

          <div className="achievement-grid">
            {[
              { num: "5000+", label: "Students Enrolled", icon: "fa-users" },
              { num: "92%", label: "Pass Percentage", icon: "fa-chart-line" },
              { num: "12+", label: "Years of Excellence", icon: "fa-award" },
              { num: "98%", label: "Student Satisfaction", icon: "fa-smile-beam" }
            ].map((item, idx) => (
              <div key={idx} className="achievement-card">
                <i className={`fas ${item.icon} achievement-icon`}></i>
                <div className="achievement-num">{item.num}</div>
                <div className="achievement-label">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="about-section-card">
          <div className="about-section-header">
            <h2 className="about-section-title">Our Core Values</h2>
            <div className="about-section-divider"></div>
          </div>

          <div className="offer-grid">
            {[
              { img: "quality.png", title: "Quality Education", desc: "We deliver high-quality education that meets national standards and prepares students for future success." },
              { img: "integrity.png", title: "Integrity", desc: "We operate with complete transparency and honesty in all our dealings with students and parents." },
              { img: "innovation.png", title: "Innovation", desc: "We constantly update our teaching methods and resources to provide the best learning experience." }
            ].map((item, idx) => (
              <div key={idx} className="offer-card">
                <div className="offer-icon-wrapper border-none bg-transparent">
                  <img src={`/assets/images/icons/${item.img}`} alt={item.title} className="w-16 h-16 object-contain hover:scale-110 transition-transform duration-300" />
                </div>
                <h3 className="text-gray-900 font-bold text-xl mb-3">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="about-section-card">
          <div className="about-section-header">
            <h2 className="about-section-title">Meet Our Experts</h2>
            <div className="about-section-divider"></div>
            <p className="text-gray-500 max-w-2xl mt-4">Our team consists of experienced educators and administrators dedicated to providing quality education and support to our students.</p>
          </div>

          <div className="team-grid">
            {[
              { imgSrc: "/assets/images/icons/female-teacher.png", name: "Muskan Kumari", role: "Director & Coordinator", desc: "Teaching Education with 10+ years of experience in alternative education systems." },
              { imgSrc: "/assets/images/icons/male-teacher.png", name: "Rajkishor Bhartiya", role: "Dy-Coordinator & Marketing Head", desc: "Specialized in NIOS curriculum with 10+ years of teaching experience." },
              { imgSrc: "/assets/images/icons/male-teacher.png", name: "Nutan Tripathi", role: "Administrative Head", desc: "Manages admissions and ensures smooth operations of the study centre." },
              { imgSrc: "/assets/images/icons/female-teacher.png", name: "Guriya Singh", role: "Admission Counsellor", desc: "Provides guidance and support to help students with the admission process." }
            ].map((item, idx) => (
              <div key={idx} className="team-card">
                <div className="team-header-bg"></div>
                <div className="team-img-wrapper">
                  <img src={item.imgSrc} alt={item.name} className="team-img" />
                </div>
                <div className="team-content">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                  <div className="text-[#c40138] font-bold text-xs uppercase tracking-wider mb-2">{item.role}</div>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose Us & CTA */}
        <div className="cta-container">
          <div className="about-section-card">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Why Choose Aarambh Institute?</h2>

            <ul className="space-y-4">
              {[
                { title: "Proven Track Record", desc: "Consistently high success rates in examinations" },
                { title: "Experienced Faculty", desc: "Qualified teachers with expertise in open schooling" },
                { title: "Flexible Learning Options", desc: "Accommodates students with various schedules" },
                { title: "Comprehensive Materials", desc: "Specially designed resources for open curriculum" },
                { title: "Personalized Attention", desc: "Small batch sizes ensuring individual focus" }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center shrink-0">
                    <i className="fas fa-check text-[#c40138]"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-base mb-1">{item.title}</h4>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="cta-banner">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full transform translate-x-1/3 -translate-y-1/3 transition-transform duration-700 hover:scale-150 pointer-events-none"></div>

            <div className="cta-banner-icon mt-6">
              <i className="fas fa-graduation-cap text-5xl text-white"></i>
            </div>

            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 drop-shadow-md tracking-tight">Ready to Begin?</h2>
            <p className="text-[16px] text-white/95 mb-8 leading-relaxed max-w-sm drop-shadow-sm font-medium">Join hundreds of successful students who have achieved their academic goals through Aarambh Institute.</p>

            <Link to="/contact-us" className="cta-button mb-6">
              Get In Touch <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;