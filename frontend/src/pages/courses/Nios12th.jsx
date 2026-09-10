import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nios12th.css';

const Nios12th = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is NIOS 12th certificate valid for graduation and government jobs?", a: "Yes, NIOS is a government board established by the Ministry of Education, Government of India. Its 12th certificates are valid for graduation, higher education, all government jobs, and competitive exams like UPSC, SSC, Banking, Railways, NEET, JEE, etc." },
    { q: "Can I complete 12th in 60 days through NIOS?", a: "Yes, NIOS offers a fast-track program where students can complete 12th in just 60 days through On-Demand examination. This is specially designed for failed students who want to save their academic year." },
    { q: "What is the passing marks for NIOS 12th?", a: "The minimum passing marks in NIOS 12th is 33% in each subject. Students need to score at least 33 out of 100 in theory and practical exams separately." },
    { q: "Can I appear for NIOS 12th exam if I failed in another board?", a: "Yes, students who failed in 12th from any recognized board (CBSE, BSEB, ICSE, etc.) can take admission in NIOS and complete their 12th." },
    { q: "Can I apply for NEET/JEE after passing from NIOS?", a: "Yes, NIOS is recognized by MHRD and its certificates are valid for NEET, JEE, and all other competitive exams. Many students have successfully cleared these exams after passing from NIOS." }
  ];

  return (
    <div className="nios12_container">
      <div className="nios12_hero">
        <h1>NIOS 12th Admission 2026-27</h1>
        <p>Complete your 12th standard through National Institute of Open Schooling. Perfect for failed students or those who want to complete intermediate quickly with flexible learning options.</p>
      </div>

      <div className="nios12_intro_section">
        <div className="nios12_intro_image">
          <img src="/assets/images/pages/nios-12th.jpg" alt="NIOS 12th" />
        </div>
        <div className="nios12_intro_content">
          <h2>About NIOS 12th - "Aarambh Institute"</h2>
          <p>NIOS (National Institute of Open Schooling) is the largest open schooling system in the world, established by the Ministry of Education, Government of India. It provides flexible learning opportunities for students who couldn't complete their 12th standard through regular schooling.</p>
          <p>The NIOS 12th certificate is recognized by all government departments, universities, and educational institutions across India, making it valid for higher education, graduation, and government jobs.</p>
          <div className="intro-highlight">
            <h4>✨ Key Highlights:</h4>
            <ul>
              <li>Government recognized board (MHRD)</li>
              <li>Flexible learning schedule</li>
              <li>Complete in just 60 days</li>
              <li>Valid for all government jobs</li>
              <li>Study from home option available</li>
              <li>No age limit—open to all learners</li>
              <li>On-Demand examination facility</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="nios12_layout">
        <div className="nios12_main">
          <div className="nios12_section_header">
            <img src="/assets/images/icons/graduation.png" alt="Graduation" />
            <h2>NIOS 12th Admission Guide 2026-27</h2>
          </div>
          <div className="nios12_content">
            <div className="nios12_cta_box nios12_cta_box_1">
              <h3>🎓 NIOS 12th Admission Open for 2026-27</h3>
              <p>12th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।</p>
              <Link to="/register" className="nios12_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios12_toc">
              <h3>📑 Table of Contents</h3>
              <ol>
                <li><a href="#eligibility">Eligibility Criteria</a></li>
                <li><a href="#documents">Documents Required</a></li>
                <li><a href="#streams">Streams Offered</a></li>
                <li><a href="#subjects">Subjects Offered</a></li>
                <li><a href="#fee">Fee Structure</a></li>
                <li><a href="#apply">How to Apply</a></li>
                <li><a href="#admit-card">Admit Card</a></li>
                <li><a href="#result">Result</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ol>
            </div>

            <div className="nios12_content_section nios12_theme_blue">
              <div className="nios12_content_section_inner">
                <h2 id="eligibility">📋 Eligibility Criteria</h2>
                <ul>
                  <li><strong>Minimum Qualification:</strong> Passed 10th from any recognized board</li>
                  <li><strong>Minimum age:</strong> 15 years (as of 31st January for Block 1 exam)</li>
                  <li><strong>No maximum age limit</strong></li>
                  <li>Students who failed in 12th from any recognized board</li>
                  <li>Students who want to improve their marks</li>
                  <li>Working professionals who couldn't complete 12th</li>
                </ul>
              </div>
            </div>

            <div className="nios12_video_wrapper">
              <iframe src="https://www.youtube.com/embed/GClSFEz-ydc?autoplay=0&mute=0&enablejsapi=1" title="NIOS Admission Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios12_content_section nios12_theme_green">
              <div className="nios12_content_section_inner">
                <h2 id="documents">📄 Documents Required</h2>
                <ul>
                  <li><strong>Valid ID Proof</strong> - Aadhar Card / Voter ID / Passport</li>
                  <li><strong>Caste Certificate</strong> (if applicable)</li>
                  <li><strong>10th Marksheet & Certificate</strong></li>
                  <li><strong>Previous Class Marksheet</strong> (11th or 12th failed marksheet)</li>
                  <li><strong>4 Passport Size Photographs</strong></li>
                  <li><strong>Address Proof</strong> - Electricity Bill / Ration Card</li>
                  <li><strong>Valid DOB Proof</strong> - Birth Certificate / 10th Marksheet</li>
                </ul>
              </div>
            </div>

            <div className="nios12_content_section nios12_theme_orange">
              <div className="nios12_content_section_inner">
                <h2 id="streams">🎯 Streams Offered</h2>
                <div className="streams_grid">
                  <div className="stream_card"><h4>🎨 Arts (Humanities)</h4></div>
                  <div className="stream_card"><h4>🔬 Science</h4></div>
                  <div className="stream_card"><h4>💼 Commerce</h4></div>
                </div>
              </div>
            </div>

            <div className="nios12_content_section nios12_theme_purple">
              <div className="nios12_content_section_inner">
                <h2 id="subjects">📚 Subjects Offered</h2>
                <p>Students can choose any 5 subjects from the following list:</p>
                <div className="subjects_grid">
                  <div className="subject_card"><strong>📖 Languages</strong><span>Hindi (301), English (302), Sanskrit (309), Urdu (306)</span></div>
                  <div className="subject_card"><strong>🔢 Mathematics</strong><span>Mathematics (311)</span></div>
                  <div className="subject_card"><strong>🔬 Physics</strong><span>Physics (312)</span></div>
                  <div className="subject_card"><strong>🧪 Chemistry</strong><span>Chemistry (313)</span></div>
                  <div className="subject_card"><strong>🔬 Biology</strong><span>Biology (314)</span></div>
                  <div className="subject_card"><strong>💻 Computer Science</strong><span>Computer Science (330)</span></div>
                  <div className="subject_card"><strong>📊 History</strong><span>History (315)</span></div>
                  <div className="subject_card"><strong>🌍 Geography</strong><span>Geography (316)</span></div>
                  <div className="subject_card"><strong>⚖️ Political Science</strong><span>Political Science (317)</span></div>
                  <div className="subject_card"><strong>💰 Economics</strong><span>Economics (318)</span></div>
                  <div className="subject_card"><strong>👥 Sociology</strong><span>Sociology (319)</span></div>
                  <div className="subject_card"><strong>🧠 Psychology</strong><span>Psychology (328)</span></div>
                  <div className="subject_card"><strong>📚 Accountancy</strong><span>Accountancy (320)</span></div>
                  <div className="subject_card"><strong>💼 Business Studies</strong><span>Business Studies (321)</span></div>
                  <div className="subject_card"><strong>🏠 Home Science</strong><span>Home Science (322)</span></div>
                  <div className="subject_card"><strong>🎨 Painting</strong><span>Painting (332)</span></div>
                  <div className="subject_card"><strong>🧘 Yoga & PE</strong><span>Yoga & Physical Education (373)</span></div>
                </div>
              </div>
            </div>

            <div className="nios12_content_section nios12_theme_blue">
              <div className="nios12_content_section_inner">
                <h2 id="fee">💰 Fee Structure 2026-27</h2>
                <table className="nios12_table">
                  <thead>
                    <tr><th>Category</th><th>Fee (INR)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>General / OBC Category</td><td>₹ 4,000</td></tr>
                    <tr><td>SC / ST Category</td><td>₹ 3,500</td></tr>
                    <tr><td>Additional Subject (per subject)</td><td>₹ 500</td></tr>
                    <tr><td>Practical Fee (if applicable)</td><td>₹ 1,000</td></tr>
                    <tr><td>Late Fee</td><td>₹ 200</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="nios12_cta_box nios12_cta_box_2">
              <h3>📚 Need Help with 12th Admission?</h3>
              <p>Get free counseling from our experts. Call us for complete guidance.</p>
              <a href="tel:9931003857" className="nios12_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call Now: 9931003857</a>
            </div>

            <div className="nios12_content_section nios12_theme_green">
              <div className="nios12_content_section_inner">
                <h2 id="apply">📝 How to Apply for NIOS 12th Admission</h2>
                <h3>Online Application Process</h3>
                <ul>
                  <li>Visit the official NIOS website (sdmis.nios.ac.in) or contact Aarambh Institute</li>
                  <li>Register with valid email ID and mobile number</li>
                  <li>Fill the online application form with your details</li>
                  <li>Select your desired stream and subjects</li>
                  <li>Upload scanned copies of required documents and photograph</li>
                  <li>Pay the application fee online</li>
                  <li>Submit the form and take a printout</li>
                </ul>
              </div>
            </div>

            <div className="nios12_video_wrapper">
              <iframe src="https://www.youtube.com/embed/FnNQCL8iF64?si=J3-10dHXQeQjtiqP" title="NIOS Admission Process" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios12_content_section nios12_theme_orange">
              <div className="nios12_content_section_inner">
                <h2 id="admit-card">🎫 NIOS 12th Admit Card</h2>
                <p>NIOS 12th admit card is released online on the official website before the examination. Students can download it by entering their enrollment number and date of birth.</p>
              </div>
            </div>

            <div className="nios12_content_section nios12_theme_purple">
              <div className="nios12_content_section_inner">
                <h2 id="result">📊 NIOS 12th Result</h2>
                <p>NIOS 12th results are declared online on the official website. The passing marks are 33% in each subject. Aarambh Institute has a consistent record of 90%+ pass percentage in 12th.</p>
              </div>
            </div>

            <div className="nios12_cta_box nios12_cta_box_3">
              <h3>⏰ Limited Seats Available</h3>
              <p>Register now for NIOS 12th admission 2026-27. Get free study materials and LMS access.</p>
              <Link to="/register" className="nios12_cta_btn">Register Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios12_content_section nios12_theme_blue">
              <div className="nios12_content_section_inner">
                <h2 id="faq">❓ Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`nios12_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="nios12_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="nios12_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nios12_sidebar">
          <div className="nios12_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="nios12_sidebar_list">
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

          <div className="nios12_sidebar_widget">
            <h3><img src="/assets/images/icons/contact.png" alt="Contact" /> Need Help?</h3>
            <ul className="nios12_sidebar_list">
              <li><a href="tel:9931003857"><img src="/assets/images/icons/call-red.png" alt="Call" /> Call: 9931003857</a></li>
              <li><a href="mailto:info@openadmissions.in"><img src="/assets/images/icons/email-red.png" alt="Email" /> Email Us</a></li>
              <li><a href="https://wa.me/9931003857"><img src="/assets/images/icons/whatsapp-red.png" alt="WhatsApp" /> WhatsApp Us</a></li>
            </ul>
          </div>

          <div className="nios12_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="nios12_contact_content">
              <h3>🎯 12th में फेल?</h3>
              <p>निराश ना हो, इसी साल पास करे 12th</p>
              <Link to="/contact-us" className="nios12_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nios12th;