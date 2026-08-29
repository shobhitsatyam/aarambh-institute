import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-[#1f2937] text-[#e9ecef] text-[13px] font-sans">
      {/* Newsletter and Follow Section */}
      <div className="flex flex-wrap border-b border-[#2d3748]">
        <div className="flex-1 min-w-[300px] p-10 border-r border-[#2d3748] max-md:border-r-0 max-md:border-b max-md:p-[30px_20px]">
          <h3 className="flex items-center gap-3 text-lg font-semibold text-white mb-4 uppercase">
            <img src="/assets/images/icons/email.png" alt="Email" className="w-[30px] h-[30px] filter brightness-0 invert" />
            Get Learning Updates
          </h3>
          <p className="text-[#a0aec0] leading-relaxed mb-6">
            Subscribe to get exam tips, study materials, admission alerts, and educational updates.
            Join 10,000+ students who receive our exclusive learning content.
          </p>
          <div className="flex bg-white rounded overflow-hidden">
            <input type="email" placeholder="Enter your email address" className="flex-1 p-[12px_15px] border-none outline-none text-[#1f2937] text-[13px]" />
            <button className="bg-accent text-white border-none py-[12px] px-[25px] font-semibold text-[13px] cursor-pointer transition-colors hover:bg-accent-dark">SUBSCRIBE</button>
          </div>
        </div>

        <div className="flex-1 min-w-[300px] p-10 max-md:p-[30px_20px]">
          <h3 className="flex items-center gap-3 text-lg font-semibold text-white mb-4 uppercase">
            <img src="/assets/images/icons/follow.png" alt="Follow" className="w-[30px] h-[30px] filter brightness-0 invert" />
            Follow Our Updates
          </h3>
          <p className="text-[#a0aec0] leading-relaxed mb-6">
            Connect with us for daily exam tips, study materials, and live sessions.
            Stay updated with the latest education news and admission alerts.
          </p>
          <div className="flex flex-wrap gap-4 mt-5">
            <a href="https://www.instagram.com/aarambh.institutepatna/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#E1306C]">
              <img src="/assets/images/icons/instagram.png" alt="Instagram" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
            <a href="https://www.facebook.com/share/1B9zGQGH1H/" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#1877F2]">
              <img src="/assets/images/icons/facebook.png" alt="Facebook" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#0077B5]">
              <img src="/assets/images/icons/linkedin.png" alt="LinkedIn" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#1DA1F2]">
              <img src="/assets/images/icons/twitter.png" alt="Twitter" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
            <a href="https://wa.me/9931003857" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#25D366]">
              <img src="/assets/images/icons/whatsapp.png" alt="WhatsApp" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
            <a href="https://www.youtube.com/@aarambhinstitutepatna" target="_blank" rel="noreferrer" className="flex items-center justify-center w-[45px] h-[45px] rounded-full bg-[#2d3748] transition-all hover:-translate-y-1 hover:shadow-[0_5px_15px_rgba(0,0,0,0.3)] hover:bg-[#FF0000]">
              <img src="/assets/images/icons/youtube.png" alt="YouTube" className="w-[20px] h-[20px] filter brightness-0 invert opacity-80" />
            </a>
          </div>
        </div>
      </div>

      {/* Separators */}
      <div className="bg-[#1a2332] py-[25px] border-b border-[#2d3748]">
        <div className="px-5">
          <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-[15px] uppercase">
            <img src="/assets/images/icons/popular.png" alt="Popular" className="w-6 h-6 filter brightness-0 invert opacity-90" />
            Popular Boards
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <Link to="/nios-10th" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS 10th</Link>
            <Link to="/nios-12th" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS 12th</Link>
            <Link to="/bbose-10th" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BBOSE 10th</Link>
            <Link to="/bbose-12th" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BBOSE 12th</Link>
            <Link to="/bosse-12th" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BOSSE Board</Link>
            <Link to="/nios-on-demand-exam" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">On-Demand Exam</Link>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2332] py-[25px] border-b border-[#2d3748]">
        <div className="px-5">
          <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-[15px] uppercase">
            <img src="/assets/images/icons/trending.png" alt="Trending" className="w-6 h-6 filter brightness-0 invert opacity-90" />
            Trending Searches
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS Admission 2026-27</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BBOSE Result</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS Study Material</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">On Demand Exam</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS Practical Exam</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BBOSE Admission</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">BOSSE Registration</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">NIOS TMA</Link>
          </div>
        </div>
      </div>

      <div className="bg-[#1a2332] py-[25px] border-b border-[#2d3748]">
        <div className="px-5">
          <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-[15px] uppercase">
            <img src="/assets/images/icons/location.png" alt="Location" className="w-6 h-6 filter brightness-0 invert opacity-90" />
            Our Presence
          </h4>
          <div className="flex flex-wrap gap-2.5">
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Patna</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Delhi</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Mumbai</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Kolkata</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Lucknow</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Ranchi</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">Varanasi</Link>
            <Link to="#" className="bg-[#2d3748] text-[#e9ecef] px-3 py-1.5 rounded text-xs transition-colors hover:bg-accent hover:text-white">All India</Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-[60px] px-5 max-md:py-10 max-md:px-[15px]">
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-[30px] max-lg:grid-cols-[1fr_1fr] max-md:grid-cols-1">
          <div className="pr-5 max-md:pr-0 max-md:mb-[25px]">
            <h4 className="flex items-center gap-[10px] text-[18px] font-semibold text-white mb-5 uppercase">
              <img src="/assets/images/logo/logo.png" alt="Logo" className="h-[35px] bg-white p-1 rounded" />
              Aarambh Institute
            </h4>
            <p className="text-[#a0aec0] leading-relaxed mb-5">We specialize in distance learning admissions, exam preparation, and educational guidance for NIOS, BBOSE, BOSSE boards across India.</p>
            <div className="flex items-center gap-3 mb-[12px] text-[#e9ecef]">
              <img src="/assets/images/icons/phone.png" alt="Phone" className="w-[18px] h-[18px] filter brightness-0 invert opacity-80" />
              +91-9931003857 (Admission)
            </div>
            <div className="flex items-center gap-3 mb-[12px] text-[#e9ecef]">
              <img src="/assets/images/icons/support.png" alt="Support" className="w-[18px] h-[18px] filter brightness-0 invert opacity-80" />
              +91-9931006379 (Support)
            </div>
            <div className="flex items-center gap-3 mb-[12px] text-[#e9ecef]">
              <img src="/assets/images/icons/imo.png" alt="Support" className="w-[18px] h-[18px] filter brightness-0 invert opacity-80" />
              +91-9931006379 (IMO)
            </div>
            <div className="flex items-center gap-3 mb-[12px] text-[#e9ecef]">
              <img src="/assets/images/icons/email.png" alt="Email" className="w-[18px] h-[18px] filter brightness-0 invert opacity-80" />
              info@openadmissions.in
            </div>
          </div>

          <div className="max-md:mb-[25px]">
            <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-5 uppercase">
              <img src="/assets/images/icons/update.png" alt="Update" className="w-[20px] h-[20px] filter brightness-0 invert opacity-90" />
              LATEST UPDATES
            </h4>
            <div className="flex gap-[12px] mb-[15px] border-b border-[#2d3748] pb-[15px] last:border-b-0 last:pb-0">
              <img src="/assets/images/icons/notification.png" alt="Notification" className="w-[18px] h-[18px] filter brightness-0 invert opacity-60 mt-1" />
              <div className="text-[#a0aec0] leading-[1.6]">
                NIOS On-Demand Exam registration open for 2026-27 session.
                <span className="text-accent block mt-[3px]">#NIOS #OnDemandExam</span><br /><span className="text-[11px] opacity-70">2 days ago</span>
              </div>
            </div>
            <div className="flex gap-[12px] mb-[15px] border-b border-[#2d3748] pb-[15px] last:border-b-0 last:pb-0">
              <img src="/assets/images/icons/notification.png" alt="Notification" className="w-[18px] h-[18px] filter brightness-0 invert opacity-60 mt-1" />
              <div className="text-[#a0aec0] leading-[1.6]">
                BBOSE 10th & 12th results declared. Check your scores now!
                <span className="text-accent block mt-[3px]">#BBOSE #Result</span><br /><span className="text-[11px] opacity-70">5 days ago</span>
              </div>
            </div>
          </div>

          <div className="max-md:mb-[25px]">
            <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-5 uppercase">
              <img src="/assets/images/icons/services.png" alt="Services" className="w-[20px] h-[20px] filter brightness-0 invert opacity-90" />
              OUR SERVICES
            </h4>
            <ul className="list-none p-0">
              <li className="mb-[12px]"><Link to="/nios-12th" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> NIOS Admission</Link></li>
              <li className="mb-[12px]"><Link to="/bbose-12th" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> BBOSE Admission</Link></li>
              <li className="mb-[12px]"><Link to="/bosse-12th" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> BOSSE Admission</Link></li>
              <li className="mb-[12px]"><Link to="/register" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Study Materials</Link></li>
              <li className="mb-[12px]"><Link to="/nios-on-demand-exam" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> On-Demand Exam</Link></li>
              <li className="mb-[12px]"><Link to="/login" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Online Coaching</Link></li>
            </ul>
          </div>

          <div className="max-md:mb-[25px]">
            <h4 className="flex items-center gap-[10px] text-[15px] font-semibold text-white mb-5 uppercase">
              <img src="/assets/images/icons/quick-links.png" alt="Quick Links" className="w-[20px] h-[20px] filter brightness-0 invert opacity-90" />
              QUICK LINKS
            </h4>
            <ul className="list-none p-0">
              <li className="mb-[12px]"><Link to="/about-us" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> About Us</Link></li>
              <li className="mb-[12px]"><Link to="/admission" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Admission</Link></li>
              <li className="mb-[12px]"><Link to="/director" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Director</Link></li>
              <li className="mb-[12px]"><Link to="/blog" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Blog</Link></li>
              <li className="mb-[12px]"><Link to="/contact-us" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Contact Us</Link></li>
              <li className="mb-[12px]"><Link to="#" className="flex items-center gap-2 text-[#a0aec0] transition-colors hover:text-accent hover:pl-1"><img src="/assets/images/icons/arrow-right.png" alt="Arrow" className="w-[12px] h-[12px] filter brightness-0 invert opacity-50" /> Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-[#111827] py-[20px] px-5 border-t border-[#2d3748] flex justify-between items-center text-[#a0aec0] max-md:flex-col max-md:text-center max-md:gap-4 max-md:text-xs">
        <div>© {new Date().getFullYear()} Aarambh Institute of Distance Learning. All Rights Reserved</div>
        <div className="flex gap-[15px]">
          <img src="/assets/images/icons/visa.png" alt="Visa" className="h-[25px] opacity-70 filter grayscale transition-all hover:opacity-100 hover:grayscale-0" />
          <img src="/assets/images/icons/mastercard.png" alt="MasterCard" className="h-[25px] opacity-70 filter grayscale transition-all hover:opacity-100 hover:grayscale-0" />
          <img src="/assets/images/icons/paypal.png" alt="PayPal" className="h-[25px] opacity-70 filter grayscale transition-all hover:opacity-100 hover:grayscale-0" />
          <img src="/assets/images/icons/upi.png" alt="UPI" className="h-[25px] opacity-70 filter grayscale transition-all hover:opacity-100 hover:grayscale-0" />
        </div>
      </div>
    </div>
  );
};

export default Footer;