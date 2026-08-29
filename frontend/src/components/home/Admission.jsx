import React from 'react';
import { Link } from 'react-router-dom';
import './Admission.css';

const Admission = () => {
    return (
        <div className="l360-admission-section">
            <div className="l360-admission-header">
                <h2>NIOS Admission For <span>Failed / Compartment Students</span></h2>
                <p>Complete your 10th & 12th quickly with our flexible admission options and expert guidance</p>
            </div>

            <div className="l360-admission-container">
                <div className="l360-admission-card">
                    <div className="l360-admission-image">
                        <div className="l360-admission-badge">Popular</div>
                        <img src="/assets/images/admission/nios.jpg" alt="NIOS Admission" />
                    </div>
                    <div className="l360-admission-content">
                        <h3>NIOS Admissions 2026 (Save Year)</h3>
                        <p>10th & 12th fail / Dropout / Compart students can pass directly 10th-12th through NIOS Board. Call for Admission & Regular Coaching Classes.</p>
                        <Link to="/register" className="l360-admission-btn">
                            Apply Now <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="l360-admission-card">
                    <div className="l360-admission-image">
                        <div className="l360-admission-badge">Fast Track</div>
                        <img src="/assets/images/admission/bbose.jpg" alt="BBOSE Admission" />
                    </div>
                    <div className="l360-admission-content">
                        <h3>BBOSE Admission 2026 (Pass 10th/12th in 60 Days)</h3>
                        <p>Compart / Fail Student from any recognized board of India can get admission & pass 10th & 12th the same year through BBOSE board in just 60 Days.</p>
                        <Link to="/register" className="l360-admission-btn">
                            Apply Now <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="l360-admission-card">
                    <div className="l360-admission-image">
                        <div className="l360-admission-badge">On Demand</div>
                        <img src="/assets/images/admission/nios-ondemand.jpg" alt="NIOS On Demand" />
                    </div>
                    <div className="l360-admission-content">
                        <h3>NIOS On Demand Exam 2026 (Pass 10th/12th in 45 Days)</h3>
                        <p>Compart / Fail Students from any Recognized Boards can pass within 60 Days through NIOS On Demand Examination (ODES). Get Free Admission Counselling from our Expert.</p>
                        <Link to="/register" className="l360-admission-btn">
                            Apply Now <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>

                <div className="l360-admission-card">
                    <div className="l360-admission-image">
                        <div className="l360-admission-badge">New</div>
                        <img src="/assets/images/admission/bosse.jpg" alt="BOSSE Admission" />
                    </div>
                    <div className="l360-admission-content">
                        <h3>BOSSE Exam 2026 (Pass 10th/12th in 45 Days)</h3>
                        <p>Compartment / Fail students from any recognized board in India can get admission and pass 10th or 12th in the same year through BOSSE Board within just 60 days.</p>
                        <Link to="/register" className="l360-admission-btn">
                            Apply Now <i className="fas fa-arrow-right"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admission;