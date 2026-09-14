import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OpenAdmissions = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    course: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry! Our admission counselor will contact you soon.');
    setFormData({ name: '', email: '', phone: '', course: '', message: '' });
  };

  return (
    <div className="font-sans bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white py-24 overflow-hidden">
        {/* Background Overlay & Patterns */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-rose-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>
        <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-blue-500 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-5 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 text-center md:text-left">
            <span className="inline-block py-1 px-3 rounded-full bg-rose-500/20 text-rose-400 text-sm font-bold tracking-widest uppercase mb-4 border border-rose-500/30 backdrop-blur-sm">
              Admissions Open 2026-27
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight">
              Shape Your Future with <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">Aarambh</span>
            </h1>
            <p className="text-lg text-slate-300 mb-8 max-w-xl mx-auto md:mx-0 leading-relaxed">
              Join India's premier institute for specialized education. Get personalized guidance, expert faculty, and assured results in BBOSE, NIOS, and degree programs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="#apply-now" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 px-8 rounded-full shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-1 text-center">
                Apply Now <i className="fas fa-arrow-right ml-2"></i>
              </a>
              <Link to="/contact-us" className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold py-3.5 px-8 rounded-full transition-all backdrop-blur-sm text-center">
                Download Brochure
              </Link>
            </div>
          </div>
          
          <div className="md:w-1/2 hidden md:block relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white/10 transform rotate-3 hover:rotate-0 transition-transform duration-500">
               <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800" alt="Students studying" className="w-full h-auto object-cover" />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-80"></div>
               <div className="absolute bottom-6 left-6 right-6">
                 <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4">
                   <div className="w-12 h-12 rounded-full bg-rose-500 flex items-center justify-center text-xl shadow-inner">
                     <i className="fas fa-trophy"></i>
                   </div>
                   <div>
                     <p className="font-bold text-lg">95% Success Rate</p>
                     <p className="text-xs text-slate-300">In board exams 2025</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b border-slate-100 relative -mt-8 z-20 max-w-6xl mx-auto rounded-2xl shadow-xl px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div className="text-center px-4">
            <p className="text-4xl font-black text-slate-800 mb-1">50+</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Expert Faculty</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-black text-slate-800 mb-1">10k+</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Students Enrolled</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-black text-slate-800 mb-1">100%</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Placement Help</p>
          </div>
          <div className="text-center px-4">
            <p className="text-4xl font-black text-slate-800 mb-1">24/7</p>
            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Support Available</p>
          </div>
        </div>
      </section>

      {/* Programs Available */}
      <section className="py-20 max-w-7xl mx-auto px-5">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Programs Offered</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">Choose from a wide variety of recognized boards and university programs designed for your success.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-3xl mb-6 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
              <i className="fas fa-book-reader"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Open Schooling (10th/12th)</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Complete your secondary and senior secondary education through recognized open boards like NIOS, BBOSE & BOSSE.</p>
            <ul className="space-y-2 mb-8">
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> Flexible Exam Schedule</li>
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> Transfer of Credit Available</li>
            </ul>
            <Link to="/nios-10th" className="inline-block w-full text-center py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-indigo-500 hover:text-white transition-colors">View Details</Link>
          </div>

          {/* Card 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-3xl mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
              <i className="fas fa-user-md"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Medical Admission</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Expert guidance and direct admission assistance for top medical colleges (MBBS, BDS, BAMS) across India.</p>
            <ul className="space-y-2 mb-8">
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> College Shortlisting</li>
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> Counselling Support</li>
            </ul>
            <Link to="/medical-admission" className="inline-block w-full text-center py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-emerald-500 hover:text-white transition-colors">View Details</Link>
          </div>

          {/* Card 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center text-3xl mb-6 group-hover:bg-amber-500 group-hover:text-white transition-colors">
              <i className="fas fa-graduation-cap"></i>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-3">Degree Programs (UG/PG)</h3>
            <p className="text-slate-500 mb-6 text-sm leading-relaxed">Secure admissions in prestigious universities for B.Tech, BCA, BBA, MBA, and other professional courses.</p>
            <ul className="space-y-2 mb-8">
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> Top UGC Universities</li>
              <li className="text-sm font-semibold text-slate-700 flex items-center gap-2"><i className="fas fa-check text-rose-500"></i> Career Counselling</li>
            </ul>
            <Link to="/UG-admission" className="inline-block w-full text-center py-2.5 rounded-full bg-slate-100 text-slate-700 font-bold hover:bg-amber-500 hover:text-white transition-colors">View Details</Link>
          </div>
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="apply-now" className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-5">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
            
            {/* Left Info Box */}
            <div className="md:w-5/12 p-10 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold mb-4">Start Your Journey Today</h3>
                <p className="text-slate-300 text-sm mb-8 leading-relaxed">Fill out the form and our admission experts will reach out to you within 24 hours to guide you through the process.</p>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-400">
                      <i className="fas fa-phone-alt"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Call Us At</p>
                      <p className="font-semibold">+91-9931003857</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-rose-400">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Email Us</p>
                      <p className="font-semibold">info@openadmissions.in</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Form */}
            <div className="md:w-7/12 bg-white p-10">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Admission Inquiry Form</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:bg-white transition-colors"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange} 
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:bg-white transition-colors"
                      placeholder="+91 XXXXX XXXXX"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:bg-white transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Interested Course</label>
                  <select 
                    name="course" 
                    value={formData.course} 
                    onChange={handleChange} 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:bg-white transition-colors appearance-none"
                    required
                  >
                    <option value="" disabled>Select a course</option>
                    <option value="BBOSE 10th/12th">BBOSE (10th/12th)</option>
                    <option value="NIOS 10th/12th">NIOS (10th/12th)</option>
                    <option value="Medical Admission">Medical Admission</option>
                    <option value="UG/PG Admission">UG / PG Admission</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message (Optional)</label>
                  <textarea 
                    name="message" 
                    value={formData.message} 
                    onChange={handleChange} 
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-rose-500 focus:bg-white transition-colors resize-none"
                    placeholder="Any specific queries?"
                  ></textarea>
                </div>

                <button type="submit" className="w-full bg-gradient-to-r from-rose-500 to-[#be123c] hover:from-rose-600 hover:to-[#9f0f32] text-white font-bold py-4 rounded-xl shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 mt-2">
                  Submit Application <i className="fas fa-paper-plane ml-2"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default OpenAdmissions;
