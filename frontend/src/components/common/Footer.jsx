import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer className="l360-footer">
      {/* Floating Newsletter and Follow Section */}
      <div className="l360-newsletter-wrap">
        <div className="l360-newsletter-box">
          <h3>
            <i className="fas fa-envelope-open-text"></i>
            GET LEARNING UPDATES
          </h3>
          <p>
            Subscribe to get exam tips, study materials, admission alerts, and educational updates.
            Join 10,000+ students who receive our exclusive learning content.
          </p>
          <div className="l360-newsletter-input">
            <input type="email" placeholder="Enter your email address" />
            <button>SUBSCRIBE</button>
          </div>
        </div>

        <div className="l360-follow-box">
          <h3>
            <i className="fas fa-users"></i>
            FOLLOW OUR UPDATES
          </h3>
          <p>
            Connect with us for daily exam tips, study materials, and live sessions.
            Stay updated with the latest education news and admission alerts.
          </p>
          <div className="l360-social-icons">
            <a href="https://www.instagram.com/aarambh.institutepatna/" target="_blank" rel="noreferrer" className="social-ig" title="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.facebook.com/share/1B9zGQGH1H/" target="_blank" rel="noreferrer" className="social-fb" title="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="social-li" title="LinkedIn">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="social-tw" title="Twitter/X">
              <i className="fab fa-x-twitter"></i>
            </a>
            <a href="https://wa.me/9931003857" target="_blank" rel="noreferrer" className="social-wa" title="WhatsApp">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="https://www.youtube.com/@aarambhinstitutepatna" target="_blank" rel="noreferrer" className="social-yt" title="YouTube">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Tags Grid Section (Replaces the ugly separated rows) */}
      <div className="l360-tags-section">
        <div className="l360-tag-group">
          <h4>
            <i className="fas fa-fire-alt"></i>
            Popular Boards
          </h4>
          <div className="l360-category-tags">
            <Link to="/nios-10th" onClick={scrollToTop} className="l360-category-tag">NIOS 10th</Link>
            <Link to="/nios-12th" onClick={scrollToTop} className="l360-category-tag">NIOS 12th</Link>
            <Link to="/bbose-10th" onClick={scrollToTop} className="l360-category-tag">BBOSE 10th</Link>
            <Link to="/bbose-12th" onClick={scrollToTop} className="l360-category-tag">BBOSE 12th</Link>
            <Link to="/bosse-12th" onClick={scrollToTop} className="l360-category-tag">BOSSE Board</Link>
            <Link to="/nios-on-demand-exam" onClick={scrollToTop} className="l360-category-tag">On-Demand Exam</Link>
          </div>
        </div>

        <div className="l360-tag-group">
          <h4>
            <i className="fas fa-search-location"></i>
            Trending Searches
          </h4>
          <div className="l360-category-tags">
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">NIOS Admission 2026-27</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">BBOSE Result</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Study Material</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">On Demand Exam</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Practical Exam</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">BOSSE Registration</Link>
          </div>
        </div>

        <div className="l360-tag-group">
          <h4>
            <i className="fas fa-map-marked-alt"></i>
            Our Presence
          </h4>
          <div className="l360-category-tags">
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Patna</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Delhi</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Mumbai</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Kolkata</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Lucknow</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Ranchi</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">Varanasi</Link>
            <Link to="#" onClick={scrollToTop} className="l360-category-tag">All India</Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="l360-footer-main">
        <div className="l360-footer-grid">
          <div className="l360-footer-col">
            <h4>
              <img src="/assets/images/logo/logo.png" alt="Logo" style={{ height: '40px', background: 'rgba(255,255,255,0.9)', padding: '5px', borderRadius: '8px', boxShadow: '0 4px 10px rgba(0,0,0,0.3)' }} />
              AARAMBH INSTITUTE
            </h4>
            <p>We specialize in distance learning admissions, exam preparation, and educational guidance for NIOS, BBOSE, BOSSE boards across India.</p>
            <div className="l360-contact-box">
              <i className="fas fa-phone-alt"></i>
              +91-9931003857 (Admission)
            </div>
            <div className="l360-contact-box">
              <i className="fas fa-headset"></i>
              +91-9931006379 (Support)
            </div>
            <div className="l360-contact-box">
              <i className="fab fa-whatsapp"></i>
              +91-9931006379 (IMO)
            </div>
            <div className="l360-contact-box">
              <i className="fas fa-envelope"></i>
              info@openadmissions.in
            </div>
          </div>

          <div className="l360-footer-col">
            <h4>
              <i className="fas fa-bolt"></i>
              LATEST UPDATES
            </h4>
            <div className="l360-tweet">
              <i className="fas fa-bell"></i>
              <div className="l360-tweet-text">
                NIOS On-Demand Exam registration open for 2026-27 session.
                <span className="hashtag">#NIOS #OnDemandExam</span>
                <span className="l360-tweet-time">2 days ago</span>
              </div>
            </div>
            <div className="l360-tweet">
              <i className="fas fa-bell"></i>
              <div className="l360-tweet-text">
                BBOSE 10th & 12th results declared. Check your scores now!
                <span className="hashtag">#BBOSE #Result</span>
                <span className="l360-tweet-time">5 days ago</span>
              </div>
            </div>
          </div>

          <div className="l360-footer-col">
            <h4>
              <i className="fas fa-concierge-bell"></i>
              OUR SERVICES
            </h4>
            <ul>
              <li><Link to="/nios-12th" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> NIOS Admission</Link></li>
              <li><Link to="/bbose-12th" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> BBOSE Admission</Link></li>
              <li><Link to="/bosse-12th" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> BOSSE Admission</Link></li>
              <li><Link to="/register" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Study Materials</Link></li>
              <li><Link to="/nios-on-demand-exam" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> On-Demand Exam</Link></li>
              <li><Link to="/login" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Online Coaching</Link></li>
            </ul>
          </div>

          <div className="l360-footer-col">
            <h4>
              <i className="fas fa-link"></i>
              QUICK LINKS
            </h4>
            <ul>
              <li><Link to="/about-us" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> About Us</Link></li>
              <li><Link to="/admission" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Admission</Link></li>
              <li><Link to="/director" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Director</Link></li>
              <li><Link to="/blog" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Blog</Link></li>
              <li><Link to="/contact-us" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Contact Us</Link></li>
              <li><Link to="#" onClick={scrollToTop}><i className="fas fa-chevron-right"></i> Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="l360-footer-bottom-wrap">
        <div className="l360-footer-bottom">
            <div>© {new Date().getFullYear()} Aarambh Institute of Distance Learning. All Rights Reserved. Designed with precision.</div>
            <div className="l360-payment-icons">
            <img src="/assets/images/icons/visa.png" alt="Visa" />
            <img src="/assets/images/icons/mastercard.png" alt="MasterCard" />
            <img src="/assets/images/icons/paypal.png" alt="PayPal" />
            <img src="/assets/images/icons/upi.png" alt="UPI" />
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;