import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Bbose10th.css';

const Bbose10th = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "Is BBOSE 10th certificate valid for government jobs?", a: "Yes, BBOSE is a government board established by the Government of Bihar. Its certificates are valid for all government jobs, higher education, and competitive exams like UPSC, SSC, Banking, Railways, etc." },
    { q: "Can I complete 10th in 60 days through BBOSE?", a: "Yes, BBOSE offers a fast-track program where students can complete 10th in just 60 days. This is specially designed for failed students who want to save their academic year." },
    { q: "What is the passing marks for BBOSE 10th?", a: "The minimum passing marks in BBOSE 10th is 33% in each subject. Students need to score at least 33 out of 100 in theory and practical exams separately." },
    { q: "Can I appear for BBOSE exam if I failed in another board?", a: "Yes, students who failed in 10th from any recognized board (CBSE, BSEB, ICSE, etc.) can take admission in BBOSE and complete their 10th." },
    { q: "How many attempts are allowed in BBOSE?", a: "BBOSE allows students to complete their course within 5 years from the date of admission. Students can appear for exams twice a year (April/May and October/November sessions)." }
  ];

  return (
    <div className="aarambh_container">
      <div className="aarambh_hero">
        <h1>BBOSE 10th Admission 2026-27</h1>
        <p>Complete your 10th standard through Bihar Board of Open Schooling and Examination. Perfect for failed students or those who want to complete quickly.</p>
      </div>

      <div className="aarambh_intro_section">
        <div className="aarambh_intro_image">
          <img src="/assets/images/pages/bosse.jpg" alt="BBOSE" />
        </div>
        <div className="aarambh_intro_content">
          <h2>About BBOSE 10th - "Aarambh Institute"</h2>
          <p>BBOSE (Bihar Board of Open Schooling and Examination) is a government board established by the Government of Bihar in 2011. It provides flexible learning opportunities for students who couldn't complete their 10th standard through regular schooling.</p>
          <p>The BBOSE 10th certificate is recognized by all government departments, universities, and educational institutions across India, making it valid for higher education and government jobs.</p>
        </div>
      </div>

      <div className="aarambh_layout">
        <div className="aarambh_main">
          <div className="aarambh_content">
            <div className="aarambh_cta_box aarambh_cta_box_1">
              <h3>🎓 BBOSE Admission Open for 2026-27</h3>
              <p>10th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।</p>
              <Link to="/register" className="aarambh_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="aarambh_content_section aarambh_theme_blue">
              <div className="aarambh_content_section_inner">
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

            <div className="aarambh_content_section aarambh_theme_green">
              <div className="aarambh_content_section_inner">
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

            <div className="aarambh_content_section aarambh_theme_orange">
              <div className="aarambh_content_section_inner">
                <h2 id="subjects">📚 Subjects Offered</h2>
                <p>Students can choose any 5 subjects from the following list:</p>
                <div className="aarambh_stream_grid">
                  <div className="aarambh_stream_card">
                    <h4>📖 Compulsory</h4>
                    <p>Hindi (201), English (202)</p>
                  </div>
                  <div className="aarambh_stream_card">
                    <h4>🔢 Core Subjects</h4>
                    <p>Mathematics (215), Science (216), Social Science (217)</p>
                  </div>
                  <div className="aarambh_stream_card">
                    <h4>🗣️ Languages</h4>
                    <p>Urdu, Sanskrit, Bhojpuri, Maithili, Bangla, Arabic, Persian</p>
                  </div>
                  <div className="aarambh_stream_card">
                    <h4>💼 Vocational / Others</h4>
                    <p>Home Science, Computer, Painting, Business Study, Yoga, Indian Heritage</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="aarambh_content_section aarambh_theme_purple">
              <div className="aarambh_content_section_inner">
                <h2 id="fee">💰 Fee Structure 2026-27</h2>
                <table className="aarambh_table">
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

            <div className="aarambh_cta_box aarambh_cta_box_2">
              <h3>📚 Need Help with Admission?</h3>
              <p>Get free counseling from our experts. Call us for complete guidance.</p>
              <a href="tel:9931003857" className="aarambh_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call Now: 9931003857</a>
            </div>

            <div className="aarambh_content_section aarambh_theme_blue">
              <div className="aarambh_content_section_inner">
                <h2 id="apply">📝 How to Apply for BBOSE 10th Admission</h2>
                <h3>Online Application Process</h3>
                <ul>
                  <li>Visit the official BBOSE website or contact Aarambh Institute</li>
                  <li>Fill the online application form with your details</li>
                  <li>Upload required documents</li>
                  <li>Pay the application fee online (Net Banking / Credit Card / Debit Card)</li>
                  <li>Submit the form and take a printout for future reference</li>
                </ul>

                <h3>Offline Application Process</h3>
                <ul>
                  <li>Visit Aarambh Institute study centre in Patna</li>
                  <li>Collect the BBOSE admission form</li>
                  <li>Fill the form with correct details</li>
                  <li>Attach required documents and photographs</li>
                  <li>Submit the form with Demand Draft (DD)</li>
                </ul>
              </div>
            </div>

            <div className="aarambh_content_section aarambh_theme_green">
              <div className="aarambh_content_section_inner">
                <h2 id="admit-card">🎫 BBOSE 10th Admit Card</h2>
                <p>BBOSE 10th admit card is released online on the official website before the examination. Students can download it by entering their enrollment number and date of birth. Aarambh Institute also helps students with admit card download and exam center details.</p>
              </div>
            </div>

            <div className="aarambh_content_section aarambh_theme_orange">
              <div className="aarambh_content_section_inner">
                <h2 id="result">📊 BBOSE 10th Result</h2>
                <p>BBOSE 10th results are declared online on the official website. Students can check their results by entering their roll number. The passing marks are 33% in each subject. Aarambh Institute has a consistent record of 92%+ pass percentage.</p>
              </div>
            </div>

            <div className="aarambh_cta_box aarambh_cta_box_3">
              <h3>⏰ Limited Seats Available</h3>
              <p>Register now for BBOSE 10th admission 2026-27. Get free study materials and LMS access.</p>
              <Link to="/register" className="aarambh_cta_btn">Register Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="aarambh_content_section aarambh_theme_purple">
              <div className="aarambh_content_section_inner">
                <h2 id="faq">❓ Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`aarambh_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="aarambh_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="aarambh_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="aarambh_sidebar">
          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="aarambh_sidebar_list">
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

          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/contact.png" alt="Contact" /> Need Help?</h3>
            <ul className="aarambh_sidebar_list">
              <li><a href="tel:9931003857"><img src="/assets/images/icons/call-red.png" alt="Call" /> Call: 9931003857</a></li>
              <li><a href="mailto:info@openadmissions.in"><img src="/assets/images/icons/email-red.png" alt="Email" /> Email Us</a></li>
              <li><a href="https://wa.me/9931003857"><img src="/assets/images/icons/whatsapp-red.png" alt="WhatsApp" /> WhatsApp Us</a></li>
            </ul>
          </div>

          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/study-material.png" alt="Study" /> Study Materials</h3>
            <ul className="aarambh_sidebar_list">
              <li><Link to="#"><img src="/assets/images/icons/download.png" alt="Download" /> Hindi Sample Paper</Link></li>
              <li><Link to="#"><img src="/assets/images/icons/download.png" alt="Download" /> English Sample Paper</Link></li>
              <li><Link to="#"><img src="/assets/images/icons/download.png" alt="Download" /> Mathematics Sample Paper</Link></li>
              <li><Link to="#"><img src="/assets/images/icons/download.png" alt="Download" /> Science Sample Paper</Link></li>
              <li><Link to="#"><img src="/assets/images/icons/download.png" alt="Download" /> Social Science Sample Paper</Link></li>
            </ul>
          </div>

          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/tags.png" alt="Tags" /> Popular Tags</h3>
            <div className="aarambh_tags">
              <Link to="#" className="aarambh_tag">BBOSE</Link>
              <Link to="#" className="aarambh_tag">10th Admission</Link>
              <Link to="#" className="aarambh_tag">Open Schooling</Link>
              <Link to="#" className="aarambh_tag">Failed Students</Link>
              <Link to="#" className="aarambh_tag">Fast Track</Link>
              <Link to="#" className="aarambh_tag">Bihar Board</Link>
            </div>
          </div>

          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/calendar.png" alt="Calendar" /> Important Dates</h3>
            <ul className="aarambh_sidebar_list">
              <li><strong>Admission Start:</strong> Jan 2025</li>
              <li><strong>Last Date:</strong> March 2025</li>
              <li><strong>Exam Date:</strong> April-May 2025</li>
              <li><strong>Result Date:</strong> July 2025</li>
            </ul>
          </div>

          <div className="aarambh_sidebar_widget">
            <h3><img src="/assets/images/icons/exam-center.png" alt="Exam Center" /> Exam Centers</h3>
            <ul className="aarambh_sidebar_list">
              <li>Patna</li><li>Gaya</li><li>Bhagalpur</li><li>Muzaffarpur</li>
              <li>Darbhanga</li><li>Purnia</li><li>Hajipur</li><li>Arrah</li>
            </ul>
          </div>

          <div className="aarambh_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="aarambh_contact_content">
              <h3>🎯 10th में फेल?</h3>
              <p>निराश ना हो, इसी साल पास करे 10th</p>
              <Link to="/contact-us" className="aarambh_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bbose10th;