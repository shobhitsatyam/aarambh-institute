import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NiosOnDemand.css';

const NiosOnDemand = () => {
  const [activeFaq, setActiveFaq] = useState(null);

  const faqs = [
    { q: "What is On Demand Exam in NIOS?", a: "NIOS On Demand Exam gives flexibility to students as they can appear for the exam when they are ready and prepared mentally." },
    { q: "Who can apply for On Demand Exam?", a: "Students who have completed secondary education from a recognized board can apply for senior secondary exams. For secondary level, students should be at least 14 years old." },
    { q: "How to prepare for NIOS On Demand Exam?", a: "Study prescribed syllabus, solve previous years' question papers, and take guidance from NIOS study centers like Aarambh Institute." },
    { q: "Where is NIOS On Demand Exam held?", a: "Exams are conducted at designated exam centers across the country. Students can select preferred center during registration." },
    { q: "Is NIOS On Demand Exam certificate valid for government jobs?", a: "Yes, NIOS is a government board established by Ministry of Education, Government of India. Certificates are valid for all government jobs." }
  ];

  return (
    <div className="nios_ode_container">
      <div className="nios_ode_intro_section">
        <div className="nios_ode_intro_image">
          <img src="/assets/images/admission/nios-ondemand.jpg" alt=" NIOS On Demand Exam" />
        </div>
        <div className="nios_ode_intro_content">
          <h1>NIOS On Demand Exam 2026-27 - Complete Guide</h1>
          <p>The National Institute of Open Schooling (NIOS) conducts On-Demand Examination (ODE) for Secondary and Senior Secondary levels. It was started in 2003 with the concept of flexible time frame and distance learning. This exam helps students to save their year as they can appear for secondary and senior secondary exams when they are prepared.</p>
          <p>Students who have not cleared 10th or 12th from a recognized board can apply for the exam and clear in the same year through the NIOS On Demand Exam. It is an opportunity where candidates can appear for the exam when they are mentally ready for it.</p>
        </div>
      </div>

      <div className="nios_ode_layout">
        <div className="nios_ode_main">
          <div className="nios_ode_section_header">
            <img src="/assets/images/icons/graduation.png" alt="Graduation" />
            <h2>NIOS On Demand Exam Guide 2026-27</h2>
          </div>
          <div className="nios_ode_content">
            <div className="nios_ode_cta_box nios_ode_cta_box_1">
              <h3>NIOS On Demand Exam Registration Open</h3>
              <p>10th/12th में फेल / कम अंक वाले छात्र On Demand Exam देकर इसी साल पास करे।</p>
              <Link to="/register" className="nios_ode_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios_ode_toc">
              <h3>Table of Contents</h3>
              <ol>
                <li><a href="#details">Details for NIOS On Demand Exam</a></li>
                <li><a href="#eligibility">Eligibility Criteria</a></li>
                <li><a href="#subjects">Subjects Offered</a></li>
                <li><a href="#fee">Fee Structure</a></li>
                <li><a href="#registration">Registration Process</a></li>
                <li><a href="#admit">Admit Card</a></li>
                <li><a href="#results">Results</a></li>
                <li><a href="#center">Study Center in Bihar</a></li>
                <li><a href="#faq">FAQs</a></li>
              </ol>
            </div>

            <div className="nios_ode_video_wrapper">
              <iframe src="https://www.youtube.com/embed/TEoflICo71U" title="NIOS On Demand Exam Guide" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_blue">
              <div className="nios_ode_content_section_inner">
                <h2 id="details">Details for NIOS On Demand Exam</h2>
                <p>This exam allows you to apply for the exam throughout the year. It has two streams:</p>
                <ul>
                  <li><strong>Stream 1 (Secondary Level):</strong> For students who appeared for the public exam but could not clear it or who could not appear for the exam. Students who have cleared 10th but are willing to upgrade themselves can also take admission for 1 or up to 4 subjects.</li>
                  <li><strong>Stream 2 (Senior Secondary Level):</strong> For students who have cleared the board from a recognized board and want to upgrade their grades. Also for students who appeared for the public exam but could not clear it.</li>
                </ul>
                <p>No exams are conducted in April, May, October, and November due to public Board exams.</p>
                <p>Exams are conducted in English and Hindi medium only. However, students are allowed to answer in regional language.</p>
              </div>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_green">
              <div className="nios_ode_content_section_inner">
                <h2 id="eligibility">Eligibility Criteria</h2>
                <h3>For 10th Class (Secondary Level)</h3>
                <ul>
                  <li>Students must be 14 years or above</li>
                  <li>Students who have studied secondary exams but not completed or willing to improve performance</li>
                  <li>Students with self-certificate "I have studied enough to pursue secondary course"</li>
                </ul>

                <h3>For 12th Class (Senior Secondary Level)</h3>
                <ul>
                  <li>Minimum age must be 15 years or above</li>
                  <li>Must have completed Secondary course from a recognized board</li>
                </ul>
              </div>
            </div>

            <div className="nios_ode_video_wrapper">
              <iframe src="https://www.youtube.com/embed/7eYEgd41F9M" title="NIOS On Demand Exam Process" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_orange">
              <div className="nios_ode_content_section_inner">
                <h2 id="subjects">Subjects Offered</h2>
                <h3>Secondary Level (Class 10th)</h3>
                <div className="subjects_list">
                  <div className="subject_item">Hindi (201)</div>
                  <div className="subject_item">English (202)</div>
                  <div className="subject_item">Sanskrit (209)</div>
                  <div className="subject_item">Mathematics (211)</div>
                  <div className="subject_item">Science & Technology (212)</div>
                  <div className="subject_item">Social Science (213)</div>
                  <div className="subject_item">Economics (214)</div>
                  <div className="subject_item">Business Studies (215)</div>
                  <div className="subject_item">Home Science (216)</div>
                  <div className="subject_item">Psychology (222)</div>
                  <div className="subject_item">Indian Culture & Heritage (223)</div>
                  <div className="subject_item">Painting (225)</div>
                </div>

                <h3>Senior Secondary Level (Class 12th)</h3>
                <div className="subjects_list">
                  <div className="subject_item">Hindi (301)</div>
                  <div className="subject_item">English (302)</div>
                  <div className="subject_item">Sanskrit (309)</div>
                  <div className="subject_item">Mathematics (311)</div>
                  <div className="subject_item">Physics (312)</div>
                  <div className="subject_item">Chemistry (313)</div>
                  <div className="subject_item">Biology (314)</div>
                  <div className="subject_item">History (315)</div>
                  <div className="subject_item">Geography (316)</div>
                  <div className="subject_item">Political Science (317)</div>
                  <div className="subject_item">Economics (318)</div>
                  <div className="subject_item">Business Studies (319)</div>
                  <div className="subject_item">Accountancy (320)</div>
                  <div className="subject_item">Home Science (321)</div>
                  <div className="subject_item">Psychology (328)</div>
                  <div className="subject_item">Sociology (331)</div>
                  <div className="subject_item">Painting (332)</div>
                  <div className="subject_item">Environmental Science (333)</div>
                </div>
              </div>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_purple">
              <div className="nios_ode_content_section_inner">
                <h2 id="fee">Fee Structure</h2>
                <h3>For Secondary Level (Class 10th)</h3>
                <ul>
                  <li>Fee for NIOS On Demand Exam: <strong>₹500/-</strong> per subject</li>
                  <li>If subject has practical exam: <strong>₹200/-</strong> extra per practical</li>
                  <li>Payment via credit card, net banking, debit card</li>
                </ul>

                <h3>For Senior Secondary Level (Class 12th)</h3>
                <ul>
                  <li>Fee: <strong>₹500/-</strong> per subject</li>
                  <li>Practical subjects: <strong>₹200/-</strong> extra</li>
                </ul>

                <table className="nios_ode_table">
                  <thead>
                    <tr><th>Category</th><th>Fee (INR)</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>Per Subject (Theory)</td><td>₹500</td></tr>
                    <tr><td>Per Subject (Practical)</td><td>₹200</td></tr>
                    <tr><td>Registration Fee</td><td>₹300</td></tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="nios_ode_cta_box nios_ode_cta_box_2">
              <h3>Failed in 9th or 11th?</h3>
              <p>Aarambh Institute helps you save a year, and gets you direct admission in 10th & 12th through NIOS</p>
              <a href="tel:9931003857" className="nios_ode_cta_btn"><img src="/assets/images/icons/phone.png" alt="Call" /> Call: 9931003857</a>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_blue">
              <div className="nios_ode_content_section_inner">
                <h2 id="registration">Registration Process</h2>
                <ul>
                  <li>Visit <strong>nios.ac.in</strong> and register through OTP on mobile or email</li>
                  <li>Fill details and upload required documents</li>
                  <li>Add subjects for which you need to take the exam</li>
                  <li>Select exam center (check seat availability)</li>
                  <li>Pay fees according to selected subjects</li>
                  <li>Select exam date based on your preparation</li>
                </ul>
              </div>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_green">
              <div className="nios_ode_content_section_inner">
                <h2 id="admit">Admit Card</h2>
                <ul>
                  <li>Login to download admit card and hall ticket</li>
                  <li>Admit card released 7-10 days before exam date</li>
                  <li>Carry printout of admit card with valid ID proof</li>
                </ul>
              </div>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_orange">
              <div className="nios_ode_content_section_inner">
                <h2 id="results">Results</h2>
                <ul>
                  <li>Results declared at <strong>results.nios.ac.in</strong></li>
                  <li>Takes approximately <strong>45 days</strong> for results</li>
                  <li>Passed candidates receive mark sheet and certificates</li>
                </ul>
              </div>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_purple">
              <div className="nios_ode_content_section_inner">
                <h2 id="center">Study Center in Bihar</h2>
                <p>Aarambh Institute in Patna helps you prepare for NIOS On Demand exams. With previous year papers and sample papers, students can easily clear their exams and save their academic year.</p>
              </div>
            </div>

            <div className="nios_ode_cta_box nios_ode_cta_box_3">
              <h3>Want to Discuss about NIOS Admission?</h3>
              <p>10th, 12th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।</p>
              <Link to="/register" className="nios_ode_cta_btn">Apply Now <i className="fa-solid fa-angles-right"></i></Link>
            </div>

            <div className="nios_ode_content_section nios_ode_theme_blue">
              <div className="nios_ode_content_section_inner">
                <h2 id="faq">Frequently Asked Questions</h2>
                {faqs.map((faq, idx) => (
                  <div key={idx} className={`nios_ode_faq_item ${activeFaq === idx ? 'active' : ''}`}>
                    <div className="nios_ode_faq_question" onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}>
                      {faq.q} <img src="/assets/images/icons/chevron-down.png" alt="Toggle" />
                    </div>
                    <div className="nios_ode_faq_answer"><p>{faq.a}</p></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="nios_ode_sidebar">
          <div className="nios_ode_sidebar_widget">
            <h3><img src="/assets/images/icons/quick-links.png" alt="Quick Links" /> Quick Links</h3>
            <ul className="nios_ode_sidebar_list">
              <li><a href="#details"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Exam Details</a></li>
              <li><a href="#eligibility"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Eligibility Criteria</a></li>
              <li><a href="#subjects"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Subjects Offered</a></li>
              <li><a href="#fee"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Fee Structure</a></li>
              <li><a href="#registration"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Registration Process</a></li>
              <li><a href="#admit"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Admit Card</a></li>
              <li><a href="#results"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Results</a></li>
              <li><a href="#center"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> Study Center</a></li>
              <li><a href="#faq"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" /> FAQs</a></li>
            </ul>
          </div>

          <div className="nios_ode_sidebar_widget">
            <h3><img src="/assets/images/icons/contact.png" alt="Contact" /> Need Help?</h3>
            <ul className="nios_ode_sidebar_list">
              <li><a href="tel:9931003857"><img src="/assets/images/icons/call-red.png" alt="Call" /> Call: 9931003857</a></li>
              <li><a href="mailto:info@openadmissions.in"><img src="/assets/images/icons/email-red.png" alt="Email" /> Email Us</a></li>
              <li><a href="https://wa.me/9931003857"><img src="/assets/images/icons/whatsapp-red.png" alt="WhatsApp" /> WhatsApp Us</a></li>
            </ul>
          </div>

          <div className="nios_ode_contact_box">
            <img src="/assets/images/pages/girl_main.jpeg" alt="Contact" />
            <div className="nios_ode_contact_content">
              <h3>10th/12th में फेल?</h3>
              <p>निराश ना हो, On Demand Exam देकर इसी साल पास करे</p>
              <Link to="/contact-us" className="nios_ode_cta_btn" style={{ background: 'white', color: 'var(--l360-accent)' }}>
                Contact Now <img src="/assets/images/icons/arrow-right-red.png" alt="Arrow" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NiosOnDemand;