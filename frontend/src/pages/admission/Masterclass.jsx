import React, { useState, useRef, useEffect } from 'react';
import './Masterclass.css';

const Masterclass = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', city: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalConfig, setModalConfig] = useState({ show: false, type: '', message: '' });
  const [activeFaq, setActiveFaq] = useState(null);
  const formRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    { q: "When and where is the workshop and how long it would be?", a: "The workshop will be for 30 minutes and will be held on the Zoom App. Please check the top section of this page to get your preferred date for the workshop." },
    { q: "For whom is this workshop?", a: "This workshop is designed for students preparing for their 12th-grade exams who need effective strategies to maximize their preparation in a short timeframe." },
    { q: "How will this workshop help me?", a: "The workshop provides proven study techniques, time management strategies, and subject-specific guidance to help you prepare effectively and efficiently for your exams." },
    { q: "What should I be prepared with before the workshop starts?", a: "Please have a notebook and pen ready to take notes, ensure you have a stable internet connection, and have the Zoom app installed on your device." },
    { q: "Will I get the recordings of the workshop?", a: "Yes, all registered participants will receive a recording of the workshop within 24 hours after the session concludes." },
    { q: "I made the payment but didn't receive any update", a: "If you haven't received a confirmation after payment, please check your spam folder first. If you still can't find it, contact our support team with your payment details at support@openadmissions.in." }
  ];

  const showMessage = (type, message) => {
    setModalConfig({ show: true, type, message });
    if (type === 'error') {
      setTimeout(() => setModalConfig({ show: false, type: '', message: '' }), 4000);
    } else {
      setTimeout(() => {
        setModalConfig({ show: false, type: '', message: '' });
        setFormData({ name: '', phone: '', email: '', city: '' });
      }, 3000);
    }
  };

  const scrollToForm = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      const formBox = formRef.current.querySelector('.l360-mc-form-box');
      if (formBox) {
        formBox.classList.add('form-highlight');
        setTimeout(() => formBox.classList.remove('form-highlight'), 2400);
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.email || !formData.city) {
      return showMessage('error', 'Please fill in all required fields.');
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return showMessage('error', 'Please enter a valid email address.');
    }
    if (!/^[6-9][0-9]{9}$/.test(formData.phone)) {
      return showMessage('error', 'Please enter a valid 10-digit Indian mobile number.');
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/webinar/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (response.ok && data.success) {
        showMessage('success', 'Registration Successful!');
      } else {
        showMessage('error', data.message || 'Registration failed.');
      }
    } catch (error) {
      showMessage('error', 'Network error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="l360-masterclass-container">
      {/* Alert Bar */}
      <div className="l360-mc-alert-bar">
        <i className="fas fa-exclamation-triangle"></i> Attention: CBSE 12th Failed / Compart / Essential Repeat Students
      </div>

      {/* Success Modal */}
      <div className={`success-modal ${modalConfig.show && modalConfig.type === 'success' ? 'show' : ''}`}>
        <div className="success-modal-content">
          <div className="success-icon"><i className="fas fa-check"></i></div>
          <h3 className="text-2xl font-bold mb-2">🎉 Registration Successful!</h3>
          <p className="text-gray-500 mb-4">Thank you for registering for our FREE webinar!</p>
          <div className="bg-green-50 p-4 rounded-xl text-left border border-green-100">
            <p className="text-sm text-green-700 mb-1"><i className="fas fa-envelope mr-2"></i> We've sent a confirmation to your email</p>
            <p className="text-sm text-green-700 mb-1"><i className="fas fa-phone mr-2"></i> Our team will contact you within 24 hours</p>
            <p className="text-sm text-green-700"><i className="fas fa-calendar mr-2"></i> Save the date: 15th December 2026 | 7:00 PM IST</p>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      <div className={`error-message ${modalConfig.show && modalConfig.type === 'error' ? 'show' : ''}`}>
        <i className="fas fa-exclamation-circle mr-2"></i> <span>{modalConfig.message}</span>
      </div>

      {/* Hero Section */}
      <div className="l360-mc-hero">
        <h1>Golden Opportunity For <br/><span className="l360-mc-highlight-yellow">CBSE 12th Failed Students</span></h1>
        <p>Pass <span className="l360-mc-highlight-yellow">12th</span> with Good Marks in <span className="l360-mc-highlight-green">Next 45 Days</span> & Save Year Without Facing <span className="l360-mc-highlight-yellow">Peer Pressure</span> & <span className="l360-mc-highlight-green">Fear Of Rejection</span></p>
      </div>

      {/* Main Content (Video + Form inside Laser Card) */}
      <div className="l360-mc-main-content" ref={formRef}>
        <div className="l360-pro-card-wrapper">
          <div className="l360-pro-card-inner">
            
            {/* Video Side */}
            <div className="l360-mc-video-box">
              <div className="l360-mc-video-title">
                <i className="fas fa-bullhorn"></i> Join Now… We Have Just 20 Seats!!!
              </div>
              <div className="l360-mc-iframe-wrapper">
                <iframe src="https://www.youtube.com/embed/cF0Nz5p_JAw?si=8kKe0sPF4uyuYkPT" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
              </div>
              <div className="l360-mc-webinar-info">
                <span><i className="fas fa-user-tie text-blue-500"></i> Host: Rajkishor Sir</span>
                <span><i className="fas fa-calendar-alt text-yellow-500"></i> 20th May 2026</span>
                <span><i className="fas fa-clock text-green-500"></i> 7:00 PM</span>
              </div>
            </div>

            {/* Form Side */}
            <div className="l360-mc-form-box">
              <h2 className="l360-mc-form-title">
                🎓 Admission Open 🎓<br/>
                <span className="text-blue-600 text-[1.4rem]">!!! Register Now !!!</span>
              </h2>
              <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" className="l360-mc-input" required />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Mobile Number (10 digits)" className="l360-mc-input" required />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email Address" className="l360-mc-input" required />
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="l360-mc-input" required />
                
                <button type="submit" className={`l360-mc-submit ${isSubmitting ? 'loading' : ''}`} disabled={isSubmitting}>
                  {isSubmitting ? <><i className="fas fa-spinner fa-spin"></i> REGISTERING...</> : 'APPLY FOR ADMISSION'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>

      {/* Target Grid (For Whom is this for) */}
      <h2 className="l360-section-title">For Whom Is This <span className="text-blue-500">Masterclass</span> For</h2>
      <div className="l360-mc-target-grid">
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-user-times"></i></div>
          <h3>12th Failed Students</h3>
        </div>
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-chart-line"></i></div>
          <h3>12th Result Improvement</h3>
        </div>
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-book-open"></i></div>
          <h3>12th Compartment</h3>
        </div>
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-redo-alt"></i></div>
          <h3>Essential Repeat</h3>
        </div>
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-user-graduate"></i></div>
          <h3>Re-appear Candidates</h3>
        </div>
        <div className="l360-target-card">
          <div className="l360-target-icon"><i className="fas fa-road"></i></div>
          <h3>Continuing Education Seekers</h3>
        </div>
      </div>

      {/* Checkbox Section */}
      <div className="l360-pro-card-wrapper l360-wrapper-green l360-checkbox-wrapper">
        <div className="l360-pro-card-inner" style={{ padding: '40px' }}>
          <h2 className="l360-section-title" style={{ marginTop: 0 }}>Please Check All Boxes Where Your Answer Is <span className="text-green-500">YES!</span></h2>
          <div className="l360-mc-checkbox-grid">
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Don't Want To Waste Your Months And Years To Pass In 12th & Then Pursue Higher Education To Achieve Your Career Goals.</p>
            </div>
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Want To Get Good Marks In 12th In Less Than 45 Days But Don't Know What Exactly To Do, How To Do It, Whom To Meet.</p>
            </div>
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Are Looking For A Smart Move To Help You Improve Your Marks In 12th To Get 1st Division Without Facing Academic Pressure.</p>
            </div>
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Don't Want To Study Hard Again In The Same Subject With Your Juniors For 1 Year, But Have A System That Works For You.</p>
            </div>
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Don't Want To Face Academic Frustration Again, But Still, You Want To Complete Your 12th Grade With Distinct Marks.</p>
            </div>
            <div className="l360-checkbox-card">
              <input type="checkbox" />
              <p>You Want To Pass The 12th With Good Marks To Avoid An Uncertain Future Even Without Facing Fear Of Rejection.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mb-16 text-lg text-gray-600 px-5">
        <p>If You Checked Any Of These Boxes Above, Then You Don't Need To Do Anything Else Except Joining Our</p>
        <p className="font-bold text-2xl text-green-600 mt-2">"NIOS On Demand" Masterclass</p>
      </div>

      {/* CTA Button */}
      <div className="l360-large-cta" onClick={scrollToForm}>
        🎓 Register Now – Limited Seats
      </div>

      {/* Trainer Section */}
      <div className="l360-pro-card-wrapper l360-wrapper-purple l360-trainer-wrapper">
        <div className="l360-pro-card-inner" style={{ padding: '40px' }}>
          <div className="l360-trainer-card">
            <div className="l360-trainer-info">
              <h2>Meet Your Trainer</h2>
              <h3 className="text-xl font-bold text-blue-600 mb-4">Raj Kishor Bhartiya Sir</h3>
              <p>Raj Kishor Bhartiya Sir is on a <b>mission to empower CBSE 12th failed/compart students.</b> With a passion for education and unwavering belief in every individual's potential, he specializes in training students to achieve success through the NIOS On Demand Exam.</p>
              <p>Over <b>10,000 students</b> have benefited from his expertise, transforming academic challenges into triumphs. Join him on this journey of academic redemption and unlock a brighter future.</p>
            </div>
            <div className="l360-trainer-img">
              <img src="/assets/admission/rajkishior-sir.jpg" alt="Trainer Image" onError={(e) => e.target.src = 'https://via.placeholder.com/400x500?text=Trainer+Photo'} />
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="l360-pro-card-wrapper l360-wrapper-orange l360-faq-wrapper">
        <div className="l360-pro-card-inner" style={{ padding: '40px', display: 'block' }}>
          <h2 className="l360-section-title" style={{ marginTop: 0 }}>Frequently Asked Questions</h2>
          <div className="l360-faq-section">
            {faqs.map((faq, index) => (
              <div className="l360-faq-item" key={index}>
                <div className="l360-faq-question" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                  <span>{faq.q}</span>
                  <i className={`fas fa-chevron-${activeFaq === index ? 'up' : 'down'} text-blue-500`}></i>
                </div>
                {activeFaq === index && (
                  <div className="l360-faq-answer">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      <div className="l360-large-cta" onClick={scrollToForm}>
        🎓 Register Now – Limited Seats
      </div>

    </div>
  );
};

export default Masterclass;