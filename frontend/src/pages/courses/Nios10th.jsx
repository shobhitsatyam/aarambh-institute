import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Nios10th.css';

const Nios10th = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is NIOS 10th certificate valid for government jobs?", a: "Yes, NIOS is a government board established by the Ministry of Education, Government of India. Its 10th certificates are valid for all government jobs, higher education, and competitive exams like UPSC, SSC, Banking, Railways, etc." },
    { q: "Can I complete 10th in 60 days through NIOS?", a: "Yes, NIOS offers a fast-track program where students can complete 10th in just 60 days through On-Demand examination. This is specially designed for failed students who want to save their academic year." },
    { q: "What is the passing marks for NIOS 10th?", a: "The minimum passing marks in NIOS 10th is 33% in each subject. Students need to score at least 33 out of 100 in theory and practical exams separately." },
    { q: "Can I appear for NIOS 10th exam if I failed in another board?", a: "Yes, students who failed in 10th from any recognized board (CBSE, BSEB, ICSE, etc.) can take admission in NIOS and complete their 10th." },
    { q: "How many attempts are allowed in NIOS 10th?", a: "NIOS allows students to complete their 10th course within 5 years from the date of admission. Students can appear for exams twice a year as well as On-Demand exams." },
    { q: "What is On-Demand examination in NIOS?", a: "On-Demand examination is a unique facility provided by NIOS where students can appear for examinations as per their convenience, subject to availability of examination centers and slots." },
    { q: "Can I change my subjects after admission?", a: "Yes, students can change their subjects within the first 30 days of admission by paying a nominal fee. Contact Aarambh Institute for assistance." }
  ];

  return (
    <div className="nios10_container">
      <div className="nios10_hero">
        <h1>NIOS 10th Admission 2026-27</h1>
        <p>Complete your 10th standard through National Institute of Open Schooling. Perfect for failed students or those who want to complete high school quickly with flexible learning options.</p>
      </div>

      <div className="nios10_intro_section">
        <div className="nios10_intro_image">
          <img src="/assets/images/pages/nios-10th.jpg" alt="NIOS 10th" />
        </div>
        <div className="nios10_intro_content">
          <h2>About NIOS 10th - "Aarambh Institute"</h2>
          <p>NIOS (National Institute of Open Schooling) is the largest open schooling system in the world, established by the Ministry of Education, Government of India. It provides flexible learning opportunities for students who couldn't complete their 10th standard through regular schooling.</p>
          <p>The NIOS 10th certificate is recognized by all government departments, universities, and educational institutions across India, making it valid for higher education, and government jobs.</p>
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

      <div className="nios10_layout">
        <div className="nios10_main">
          <div className="nios10_section_header">
            <img src="/assets/images/icons/graduation.png" alt="Graduation" />
            <h2>NIOS 10th Admission Guide 2026-27</h2>
          </div>
          <div className="nios10_content">
            <div className="nios10_cta_box nios10_cta_box_1">
              <h3>🎓 NIOS 10th Admission Open for 2026-27</h3>
              <p>10th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।</p>
              <Link to="/register" className="nios10_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios10_toc">
              <h3>📑 Table of Contents</h3>
              <ol>
                <li><a href="#eligibility">Eligibility Criteria</a></li>
                <li><a href="#documents">Documents Required</a></li>
                <li><a href="#subjects">Subjects Offered</a></li>
                <li><a href="#fee">Fee Structure</a></li>
                <li><a href="#apply">How to Apply</a></li>
                <li><a href="#admit-card">Admit Card</a></li>
                <li><a href="#result">Result</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ol>
            </div>

            <div className="nios10_content_section nios10_theme_blue">
              <div className="nios10_content_section_inner">
                <h2 id="eligibility">📋 Eligibility Criteria</h2>
                <ul>
                  <li><strong>Minimum Qualification:</strong> Passed 8th from any recognized board or self-certification</li>
                  <li><strong>Minimum age:</strong> 14 years (as of 31st January for Block 1 exam)</li>
                  <li><strong>No maximum age limit</strong></li>
                  <li>Students who failed in 10th from any recognized board</li>
                  <li>Working professionals who couldn't complete 10th</li>
                </ul>
              </div>
            </div>

            <div className="nios10_video_wrapper">
              <iframe src="https://www.youtube.com/embed/FnNQCL8iF64?si=J3-10dHXQeQjtiqP" title="NIOS Admission Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios10_content_section nios10_theme_green">
              <div className="nios10_content_section_inner">
                <h2 id="documents">📄 Documents Required</h2>
                <ul>
                  <li><strong>Valid ID Proof</strong> - Aadhar Card / Voter ID / Passport</li>
                  <li><strong>Caste Certificate</strong> (if applicable)</li>
                  <li><strong>8th Marksheet & Certificate</strong> (or self-certificate)</li>
                  <li><strong>Previous Class Marksheet</strong> (9th or 10th failed marksheet)</li>
                  <li><strong>4 Passport Size Photographs</strong></li>
                  <li><strong>Address Proof</strong> - Electricity Bill / Ration Card</li>
                  <li><strong>Valid DOB Proof</strong> - Birth Certificate / 8th Marksheet</li>
                </ul>
              </div>
            </div>

            <div className="nios10_content_section nios10_theme_orange">
              <div className="nios10_content_section_inner">
                <h2 id="subjects">📚 Subjects Offered</h2>
                <p>Students can choose any 5 subjects from the following list:</p>
                <div className="subjects_grid">
                  <div className="subject_card"><strong>📖 Compulsory</strong><span>Hindi (201), English (202)</span></div>
                  <div className="subject_card"><strong>🔢 Mathematics</strong><span>Mathematics (211)</span></div>
                  <div className="subject_card"><strong>🔬 Science & Tech</strong><span>Science (212)</span></div>
                  <div className="subject_card"><strong>🌍 Social Science</strong><span>Social Science (213)</span></div>
                  <div className="subject_card"><strong>📊 Economics</strong><span>Economics (214)</span></div>
                  <div className="subject_card"><strong>💼 Business Studies</strong><span>Business Studies (215)</span></div>
                  <div className="subject_card"><strong>🏠 Home Science</strong><span>Home Science (216)</span></div>
                  <div className="subject_card"><strong>🎨 Painting</strong><span>Painting (225)</span></div>
                  <div className="subject_card"><strong>🧘 Yoga</strong><span>Yoga & Physical Education (217)</span></div>
                  <div className="subject_card"><strong>🖥️ Computer Science</strong><span>Computer Science (229)</span></div>
                  <div className="subject_card"><strong>🌐 Indian Culture</strong><span>Indian Culture & Heritage (223)</span></div>
                  <div className="subject_card"><strong>📝 Psychology</strong><span>Psychology (222)</span></div>
                </div>
              </div>
            </div>

            <div className="nios10_content_section nios10_theme_purple">
              <div className="nios10_content_section_inner">
                <h2 id="fee">💰 Fee Structure 2026-27</h2>
                <table className="nios10_table">
                  <thead>
                    <tr><th>Category</th><th>Fee (INR)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>General / OBC Category</td><td>₹ 2,000</td></tr>
                    <tr><td>SC / ST Category</td><td>₹ 1,800</td></tr>
                    <tr><td>Additional Subject (per subject)</td><td>₹ 400</td></tr>
                    <tr><td>Practical Fee (if applicable)</td><td>₹ 800</td></tr>
                    <tr><td>Late Fee</td><td>₹ 200</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="nios10_cta_box nios10_cta_box_2">
              <h3>📚 Need Help with 10th Admission?</h3>
              <p>Get free counseling from our experts. Call us for complete guidance.</p>
              <a href="tel:9931003857" className="nios10_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call Now: 9931003857</a>
            </div>

            <div className="nios10_content_section nios10_theme_blue">
              <div className="nios10_content_section_inner">
                <h2 id="apply">📝 How to Apply for NIOS 10th Admission</h2>
                <h3>Online Application Process</h3>
                <ul>
                  <li>Visit the official NIOS website (sdmis.nios.ac.in) or contact Aarambh Institute</li>
                  <li>Register with valid email ID and mobile number</li>
                  <li>Fill the online application form with your details</li>
                  <li>Select your desired subjects</li>
                  <li>Upload scanned copies of required documents and photograph</li>
                  <li>Pay the application fee online</li>
                  <li>Submit the form and take a printout</li>
                </ul>
              </div>
            </div>

            <div className="nios10_video_wrapper">
              <iframe src="https://www.youtube.com/embed/TEoflICo71U?si=PqNCir3gIAh1oSsE" title="NIOS Admission Process" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios10_content_section nios10_theme_green">
              <div className="nios10_content_section_inner">
                <h2 id="admit-card">🎫 NIOS 10th Admit Card</h2>
                <p>NIOS 10th admit card is released online on the official website before the examination. Students can download it by entering their enrollment number and date of birth.</p>
              </div>
            </div>

            <div className="nios10_content_section nios10_theme_orange">
              <div className="nios10_content_section_inner">
                <h2 id="result">📊 NIOS 10th Result</h2>
                <p>NIOS 10th results are declared online on the official website. Students can check their results by entering their roll number. The passing marks are 33% in each subject.</p>
              </div>
            </div>

            <div className="nios10_cta_box nios10_cta_box_3">
              <h3>⏰ Limited Seats Available</h3>
              <p>Register now for NIOS 10th admission 2026-27. Get free study materials and LMS access.</p>
              <Link to="/register" className="nios10_cta_btn">Register Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios10_content_section nios10_theme_purple">
              <div className="nios10_content_section_inner">
                <h2 id="faq">❓ Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`nios10_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="nios10_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="nios10_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nios10_sidebar">
          <div className="nios10_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="nios10_sidebar_list">
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

          <div className="nios10_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="nios10_contact_content">
              <h3>🎯 10th में फेल?</h3>
              <p>निराश ना हो, इसी साल पास करे 10th</p>
              <Link to="/contact-us" className="nios10_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nios10th;