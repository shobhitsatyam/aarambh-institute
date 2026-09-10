import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Bosse10th.css';

const Bosse10th = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is BOSSE 10th certificate valid for government jobs?", a: "Yes, BOSSE is a government recognized board. Its 10th certificates are valid for all government jobs, higher education, and competitive exams like UPSC, SSC, Banking, Railways, etc." },
    { q: "Can I complete 10th in 60 days through BOSSE?", a: "Yes, BOSSE offers a fast-track program where students can complete 10th in just 60 days. This is specially designed for failed students who want to save their academic year." },
    { q: "What is the passing marks for BOSSE 10th?", a: "The minimum passing marks in BOSSE 10th is 33% in each subject. Students need to score at least 33 out of 100 in theory and practical exams separately." },
    { q: "Can I appear for BOSSE 10th exam if I failed in another board?", a: "Yes, students who failed in 10th from any recognized board (CBSE, BSEB, ICSE, etc.) can take admission in BOSSE and complete their 10th." },
    { q: "How many attempts are allowed in BOSSE 10th?", a: "BOSSE allows students to complete their 10th course within 5 years from the date of admission. Students can appear for exams twice a year (April/May and October/November sessions)." }
  ];

  return (
    <div className="bosse10_container">
      <div className="bosse10_hero">
        <h1>BOSSE 10th Admission 2026-27</h1>
        <p>Complete your 10th standard through Board of Open Schooling and Skill Education. Perfect for failed students or those who want to complete quickly with skill-based learning.</p>
      </div>

      <div className="bosse10_intro_section">
        <div className="bosse10_intro_image">
          <img src="/assets/images/pages/bosse-10-12.jpg" alt="BOSSE 10th" />
        </div>
        <div className="bosse10_intro_content">
          <h2>About BOSSE 10th - "Aarambh Institute"</h2>
          <p>BOSSE (Board of Open Schooling and Skill Education) is a government recognized board established to provide flexible learning opportunities with focus on skill development. It offers quality education for students who couldn't complete their 10th standard through regular schooling.</p>
          <p>The BOSSE 10th certificate is recognized by all government departments, universities, and educational institutions across India, making it valid for higher education and government jobs.</p>
          <div className="intro-highlight">
            <h4>✨ Key Highlights:</h4>
            <ul>
              <li>Government recognized board</li>
              <li>Flexible learning schedule with skill focus</li>
              <li>Complete in just 60 days</li>
              <li>Valid for all government jobs</li>
              <li>Study from home option available</li>
              <li>No age limit—open to all learners</li>
              <li>Skill-based vocational foundation courses</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bosse10_layout">
        <div className="bosse10_main">
          <div className="bosse10_section_header">
            <img src="/assets/images/icons/graduation.png" alt="Graduation" />
            <h2>BOSSE 10th Admission Guide 2026-27</h2>
          </div>
          <div className="bosse10_content">
            <div className="bosse10_cta_box bosse10_cta_box_1">
              <h3>🎓 BOSSE 10th Admission Open for 2026-27</h3>
              <p>10th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे। Skill Development के साथ करियर बनाएं।</p>
              <Link to="/register" className="bosse10_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="bosse10_content_section bosse10_theme_blue">
              <div className="bosse10_content_section_inner">
                <h2 id="eligibility">📋 Eligibility Criteria</h2>
                <ul>
                  <li><strong>Minimum age:</strong> 14 years (as of the admission date)</li>
                  <li><strong>No maximum age limit</strong></li>
                  <li>Students who failed in 10th from any recognized board</li>
                  <li>Students who want to improve their marks</li>
                  <li>Working professionals who couldn't complete 10th</li>
                </ul>
              </div>
            </div>

            <div className="bosse10_content_section bosse10_theme_green">
              <div className="bosse10_content_section_inner">
                <h2 id="documents">📄 Documents Required</h2>
                <ul>
                  <li><strong>Valid ID Proof</strong> - Aadhar Card / Voter ID / Passport</li>
                  <li><strong>Caste Certificate</strong> (if applicable)</li>
                  <li><strong>Previous Class Marksheet</strong> (9th or 10th failed marksheet)</li>
                  <li><strong>4 Passport Size Photographs</strong></li>
                  <li><strong>Address Proof</strong> - Electricity Bill / Ration Card</li>
                </ul>
              </div>
            </div>

            <div className="bosse10_video_wrapper">
              <iframe src="https://www.youtube.com/embed/TEoflICo71U?si=VTtQOT-xkbHPigDz" title="BOSSE Admission Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="bosse10_content_section bosse10_theme_orange">
              <div className="bosse10_content_section_inner">
                <h2 id="subjects">📚 Subjects Offered</h2>
                <p>Students can choose any 5 subjects from the following list:</p>
                <div className="bosse10_subjects_grid">
                  <div className="bosse10_subject_card"><strong>📖 Compulsory Subjects</strong><span>Hindi (201), English (202)</span></div>
                  <div className="bosse10_subject_card"><strong>🔢 Mathematics</strong><span>Mathematics (215)</span></div>
                  <div className="bosse10_subject_card"><strong>🔬 Science</strong><span>Science (216)</span></div>
                  <div className="bosse10_subject_card"><strong>🌍 Social Science</strong><span>Social Science (217)</span></div>
                  <div className="bosse10_subject_card"><strong>🖥️ Basic Computer</strong><span>Basic Computer (221)</span></div>
                  <div className="bosse10_subject_card"><strong>🏠 Home Science</strong><span>Home Science (220)</span></div>
                  <div className="bosse10_subject_card"><strong>🎨 Painting</strong><span>Painting (223)</span></div>
                  <div className="bosse10_subject_card"><strong>💼 Business Study</strong><span>Business Study (219)</span></div>
                  <div className="bosse10_subject_card"><strong>🧘 Yoga & PE</strong><span>Yoga & Physical Education (218)</span></div>
                  <div className="bosse10_subject_card"><strong>🌐 Indian Heritage</strong><span>Indian Heritage & Culture (222)</span></div>
                </div>
              </div>
            </div>

            <div className="bosse10_content_section bosse10_theme_purple">
              <div className="bosse10_content_section_inner">
                <h2 id="fee">💰 Fee Structure 2026-27</h2>
                <table className="bosse10_table">
                  <thead>
                    <tr><th>Category</th><th>Fee (INR)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>General / OBC</td><td>₹ 4,000</td></tr>
                    <tr><td>SC / ST</td><td>₹ 3,500</td></tr>
                    <tr><td>Additional Subject (per subject)</td><td>₹ 500</td></tr>
                    <tr><td>Practical Fee (if applicable)</td><td>₹ 1,000</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bosse10_cta_box bosse10_cta_box_2">
              <h3>📚 Need Help with 10th Admission?</h3>
              <p>Get free counseling from our experts. Call us for complete guidance.</p>
              <a href="tel:9931003857" className="bosse10_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call Now: 9931003857</a>
            </div>

            <div className="bosse10_content_section bosse10_theme_blue">
              <div className="bosse10_content_section_inner">
                <h2 id="apply">📝 How to Apply for BOSSE 10th Admission</h2>
                <h3>Online Application Process</h3>
                <ul>
                  <li>Visit the official BOSSE website or contact Aarambh Institute</li>
                  <li>Fill the online application form with your details</li>
                  <li>Select your desired subjects</li>
                  <li>Upload required documents</li>
                  <li>Pay the application fee online</li>
                  <li>Submit the form and take a printout</li>
                </ul>
              </div>
            </div>

            <div className="bosse10_video_wrapper">
              <iframe src="https://www.youtube.com/embed/pdcsw3FrlxY?si=cRpXOlqqz8BhtJWM" title="BOSSE Admission Process" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="bosse10_content_section bosse10_theme_green">
              <div className="bosse10_content_section_inner">
                <h2 id="admit-card">🎫 BOSSE 10th Admit Card</h2>
                <p>BOSSE 10th admit card is released online on the official website before the examination. Students can download it by entering their enrollment number and date of birth.</p>
              </div>
            </div>

            <div className="bosse10_content_section bosse10_theme_orange">
              <div className="bosse10_content_section_inner">
                <h2 id="result">📊 BOSSE 10th Result</h2>
                <p>BOSSE 10th results are declared online on the official website. The passing marks are 33% in each subject. Aarambh Institute has a consistent record of 92%+ pass percentage in 10th.</p>
              </div>
            </div>

            <div className="bosse10_cta_box bosse10_cta_box_3">
              <h3>⏰ Limited Seats Available</h3>
              <p>Register now for BOSSE 10th admission 2026-27. Get free study materials and LMS access.</p>
              <Link to="/register" className="bosse10_cta_btn">Register Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="bosse10_content_section bosse10_theme_purple">
              <div className="bosse10_content_section_inner">
                <h2 id="faq">❓ Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`bosse10_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="bosse10_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="bosse10_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bosse10_sidebar">
          <div className="bosse10_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="bosse10_sidebar_list">
              <li><a href="#eligibility"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Eligibility Criteria</a></li>
              <li><a href="#documents"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Documents Required</a></li>
              <li><a href="#subjects"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Subjects Offered</a></li>
              <li><a href="#fee"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Fee Structure</a></li>
              <li><a href="#apply"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> How to Apply</a></li>
              <li><a href="#admit-card"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Admit Card</a></li>
              <li><a href="#result"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Result</a></li>
              <li><a href="#faq"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> FAQs</a></li>
            </ul>
          </div>

          <div className="bosse10_sidebar_widget">
            <h3><img src="/assets/images/icons/contact.png" alt="Contact" /> Need Help?</h3>
            <ul className="bosse10_sidebar_list">
              <li><a href="tel:9931003857"><img src="/assets/images/icons/call-red.png" alt="Call" /> Call: 9931003857</a></li>
              <li><a href="mailto:info@openadmissions.in"><img src="/assets/images/icons/email-red.png" alt="Email" /> Email Us</a></li>
              <li><a href="https://wa.me/9931003857"><img src="/assets/images/icons/whatsapp-red.png" alt="WhatsApp" /> WhatsApp Us</a></li>
            </ul>
          </div>

          <div className="bosse10_sidebar_widget">
            <h3><img src="/assets/images/icons/tags.png" alt="Tags" /> Popular Tags</h3>
            <div className="bosse10_tags">
              <Link to="#" className="bosse10_tag">BOSSE 10th</Link>
              <Link to="#" className="bosse10_tag">High School Admission</Link>
              <Link to="#" className="bosse10_tag">Open Schooling</Link>
              <Link to="#" className="bosse10_tag">Skill Education</Link>
              <Link to="#" className="bosse10_tag">Failed Students</Link>
            </div>
          </div>

          <div className="bosse10_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="bosse10_contact_content">
              <h3>🎯 10th में फेल?</h3>
              <p>निराश ना हो, इसी साल पास करे 10th</p>
              <Link to="/contact-us" className="bosse10_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bosse10th;