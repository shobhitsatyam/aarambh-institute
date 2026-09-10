import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Bosse12th.css';

const Bosse12th = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is BOSSE 12th certificate valid for graduation and government jobs?", a: "Yes, BOSSE is a government recognized board. Its 12th certificates are valid for graduation, higher education, all government jobs, and competitive exams like UPSC, SSC, Banking, Railways, etc." },
    { q: "Can I complete 12th in 60 days through BOSSE?", a: "Yes, BOSSE offers a fast-track program where students can complete 12th in just 60 days. This is specially designed for failed students who want to save their academic year." },
    { q: "What is the passing marks for BOSSE 12th?", a: "The minimum passing marks in BOSSE 12th is 33% in each subject. Students need to score at least 33 out of 100 in theory and practical exams separately." },
    { q: "Can I appear for BOSSE 12th exam if I failed in another board?", a: "Yes, students who failed in 12th from any recognized board (CBSE, BSEB, ICSE, etc.) can take admission in BOSSE and complete their 12th." },
    { q: "How many attempts are allowed in BOSSE 12th?", a: "BOSSE allows students to complete their 12th course within 5 years from the date of admission. Students can appear for exams twice a year (April/May and October/November sessions)." },
    { q: "Can I change my stream after admission?", a: "Yes, students can change their stream within the first 30 days of admission by paying a nominal fee. Contact Aarambh Institute for assistance." }
  ];

  return (
    <div className="bosse_container">
      <div className="bosse_hero">
        <h1>BOSSE 12th Admission 2026-27</h1>
        <p>Complete your 12th standard through Board of Open Schooling and Skill Education. Perfect for failed students or those who want to complete intermediate quickly with skill-based learning.</p>
      </div>

      <div className="bosse_intro_section">
        <div className="bosse_intro_image">
          <img src="/assets/images/pages/bosse-10-12.jpg" alt="BOSSE 12th" />
        </div>
        <div className="bosse_intro_content">
          <h2>About BOSSE 12th - "Aarambh Institute"</h2>
          <p>BOSSE (Board of Open Schooling and Skill Education) is a government recognized board established to provide flexible learning opportunities with focus on skill development. It offers quality education for students who couldn't complete their 12th standard through regular schooling.</p>
          <p>The BOSSE 12th certificate is recognized by all government departments, universities, and educational institutions across India, making it valid for higher education, graduation, and government jobs.</p>
          <div className="intro-highlight">
            <h4>✨ Key Highlights:</h4>
            <ul>
              <li>Government recognized board</li>
              <li>Flexible learning schedule with skill focus</li>
              <li>Complete in just 60 days</li>
              <li>Valid for all government jobs</li>
              <li>Study from home option available</li>
              <li>Skill-based vocational courses available</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bosse_layout">
        <div className="bosse_main">
          <div className="bosse_section_header">
            <img src="/assets/images/icons/graduation.png" alt="Graduation" />
            <h2>BOSSE 12th Admission Guide 2026-27</h2>
          </div>
          <div className="bosse_content">
            <div className="bosse_cta_box bosse_cta_box_1">
              <h3>🎓 BOSSE 12th Admission Open for 2026-27</h3>
              <p>12th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे। Skill Development के साथ करियर बनाएं।</p>
              <Link to="/register" className="bosse_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="bosse_content_section bosse_theme_blue">
              <div className="bosse_content_section_inner">
                <h2 id="eligibility">📋 Eligibility Criteria</h2>
                <ul>
                  <li><strong>Minimum Qualification:</strong> Passed 10th from any recognized board</li>
                  <li><strong>Minimum age:</strong> 16 years (as of the admission date)</li>
                  <li><strong>No maximum age limit</strong></li>
                  <li>Students who failed in 12th from any recognized board</li>
                </ul>
              </div>
            </div>

            <div className="bosse_content_section bosse_theme_green">
              <div className="bosse_content_section_inner">
                <h2 id="documents">📄 Documents Required</h2>
                <ul>
                  <li><strong>Valid ID Proof</strong> - Aadhar Card / Voter ID / Passport</li>
                  <li><strong>Caste Certificate</strong> (if applicable)</li>
                  <li><strong>10th Marksheet & Certificate</strong></li>
                  <li><strong>Previous Class Marksheet</strong> (11th or 12th failed marksheet)</li>
                  <li><strong>4 Passport Size Photographs</strong></li>
                  <li><strong>Address Proof</strong> - Electricity Bill / Ration Card</li>
                </ul>
              </div>
            </div>

            <div className="bosse_content_section bosse_theme_orange">
              <div className="bosse_content_section_inner">
                <h2 id="streams">🎯 Streams Offered</h2>
                <div className="bosse_stream_grid">
                  <div className="bosse_stream_card">
                    <h4>🎨 Arts (Humanities)</h4>
                    <p>History, Geography, Political Science, Economics, Sociology, Psychology, Home Science</p>
                  </div>
                  <div className="bosse_stream_card">
                    <h4>🔬 Science</h4>
                    <p>Physics, Chemistry, Biology, Mathematics, Computer Science</p>
                  </div>
                  <div className="bosse_stream_card">
                    <h4>💼 Commerce</h4>
                    <p>Accountancy, Business Studies, Economics, Mathematics</p>
                  </div>
                  <div className="bosse_stream_card">
                    <h4>💻 Skill Education</h4>
                    <p>IT, Retail, Healthcare, Tourism, Agriculture, Beauty & Wellness</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bosse_video_wrapper">
              <iframe src="https://www.youtube.com/embed/TEoflICo71U?si=St1yazqktvxVeUz-" title="BOSSE Admission Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="bosse_content_section bosse_theme_purple">
              <div className="bosse_content_section_inner">
                <h2 id="subjects">📚 Subjects Offered</h2>
                <p>Students can choose any 5 subjects from the following list:</p>
                <ul>
                  <li><strong>Compulsory Subjects:</strong> Hindi, English</li>
                  <li><strong>Arts Subjects:</strong> History, Geography, Political Science, Economics, Sociology, Psychology, Home Science</li>
                  <li><strong>Science Subjects:</strong> Physics, Chemistry, Biology, Mathematics, Computer Science</li>
                  <li><strong>Commerce Subjects:</strong> Accountancy, Business Studies, Economics</li>
                  <li><strong>Skill Subjects:</strong> IT Fundamentals, Retail Management, Healthcare Basics, Tourism Management, Agriculture, Beauty & Wellness</li>
                </ul>
              </div>
            </div>

            <div className="bosse_content_section bosse_theme_blue">
              <div className="bosse_content_section_inner">
                <h2 id="fee">💰 Fee Structure 2026-27</h2>
                <table className="bosse_table">
                  <thead>
                    <tr><th>Category</th><th>Fee (INR)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>General / OBC (Arts)</td><td>₹ 4,500</td></tr>
                    <tr><td>General / OBC (Science/Commerce)</td><td>₹ 5,000</td></tr>
                    <tr><td>SC / ST (All Streams)</td><td>₹ 4,000</td></tr>
                    <tr><td>Additional Subject (per subject)</td><td>₹ 600</td></tr>
                    <tr><td>Practical Fee (if applicable)</td><td>₹ 1,200</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bosse_cta_box bosse_cta_box_2">
              <h3>📚 Need Help with 12th Admission?</h3>
              <p>Get free counseling from our experts. Call us for complete guidance.</p>
              <a href="tel:9931003857" className="bosse_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call Now: 9931003857</a>
            </div>

            <div className="bosse_content_section bosse_theme_green">
              <div className="bosse_content_section_inner">
                <h2 id="apply">📝 How to Apply for BOSSE 12th Admission</h2>
                <h3>Online Application Process</h3>
                <ul>
                  <li>Visit the official BOSSE website or contact Aarambh Institute</li>
                  <li>Fill the online application form with your details</li>
                  <li>Select your desired stream and subjects</li>
                  <li>Upload required documents</li>
                  <li>Pay the application fee online</li>
                  <li>Submit the form and take a printout</li>
                </ul>
              </div>
            </div>

            <div className="bosse_video_wrapper">
              <iframe src="https://www.youtube.com/embed/6o4_Myr-MMY?si=oH7t3PG79K__VGxc" title="BOSSE Admission Process" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="bosse_content_section bosse_theme_orange">
              <div className="bosse_content_section_inner">
                <h2 id="admit-card">🎫 BOSSE 12th Admit Card</h2>
                <p>BOSSE 12th admit card is released online on the official website before the examination. Students can download it by entering their enrollment number and date of birth.</p>
              </div>
            </div>

            <div className="bosse_content_section bosse_theme_purple">
              <div className="bosse_content_section_inner">
                <h2 id="result">📊 BOSSE 12th Result</h2>
                <p>BOSSE 12th results are declared online on the official website. The passing marks are 33% in each subject. Aarambh Institute has a consistent record of 90%+ pass percentage in 12th.</p>
              </div>
            </div>

            <div className="bosse_cta_box bosse_cta_box_3">
              <h3>⏰ Limited Seats Available</h3>
              <p>Register now for BOSSE 12th admission 2026-27. Get free study materials and LMS access.</p>
              <Link to="/register" className="bosse_cta_btn">Register Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="bosse_content_section bosse_theme_blue">
              <div className="bosse_content_section_inner">
                <h2 id="faq">❓ Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`bosse_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="bosse_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="bosse_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bosse_sidebar">
          <div className="bosse_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="bosse_sidebar_list">
              <li><a href="#eligibility"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Eligibility Criteria</a></li>
              <li><a href="#documents"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Documents Required</a></li>
              <li><a href="#streams"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Streams Offered</a></li>
              <li><a href="#subjects"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Subjects Offered</a></li>
              <li><a href="#fee"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Fee Structure</a></li>
              <li><a href="#apply"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> How to Apply</a></li>
              <li><a href="#admit-card"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Admit Card</a></li>
              <li><a href="#result"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Result</a></li>
              <li><a href="#faq"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> FAQs</a></li>
            </ul>
          </div>

          <div className="bosse_sidebar_widget">
            <h3><img src="/assets/images/icons/contact.png" alt="Contact" /> Need Help?</h3>
            <ul className="bosse_sidebar_list">
              <li><a href="tel:9931003857"><img src="/assets/images/icons/call-red.png" alt="Call" /> Call: 9931003857</a></li>
              <li><a href="mailto:info@openadmissions.in"><img src="/assets/images/icons/email-red.png" alt="Email" /> Email Us</a></li>
              <li><a href="https://wa.me/9931003857"><img src="/assets/images/icons/whatsapp-red.png" alt="WhatsApp" /> WhatsApp Us</a></li>
            </ul>
          </div>

          <div className="bosse_sidebar_widget">
            <h3><img src="/assets/images/icons/tags.png" alt="Tags" /> Popular Tags</h3>
            <div className="bosse_tags">
              <Link to="#" className="bosse_tag">BOSSE 12th</Link>
              <Link to="#" className="bosse_tag">Intermediate Admission</Link>
              <Link to="#" className="bosse_tag">Skill Education</Link>
              <Link to="#" className="bosse_tag">Arts Stream</Link>
              <Link to="#" className="bosse_tag">Science Stream</Link>
              <Link to="#" className="bosse_tag">Commerce Stream</Link>
            </div>
          </div>

          <div className="bosse_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="bosse_contact_content">
              <h3>🎯 12th में फेल?</h3>
              <p>निराश ना हो, इसी साल पास करे 12th</p>
              <Link to="/contact-us" className="bosse_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bosse12th;