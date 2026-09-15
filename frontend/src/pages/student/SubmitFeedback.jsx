import React, { useState } from 'react';
import api from '../../services/api';

const SubmitFeedback = () => {
  const [rating, setRating] = useState(0);
  const [category, setCategory] = useState('Course Content');
  const [relatedTeacher, setRelatedTeacher] = useState('None / Not Applicable');
  const [feedbackText, setFeedbackText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please select a rating.');
      return;
    }
    if (!feedbackText.trim()) {
      alert('Please write your feedback.');
      return;
    }
    setSubmitting(true);
    try {
      const { data: result } = await api.post('/student/feedback', {
        rating,
        category,
        relatedTeacher,
        feedbackText
      });
      if (result.success) {
        alert('Thank you! Your feedback has been submitted successfully.');
        setRating(0);
        setCategory('Course Content');
        setRelatedTeacher('None / Not Applicable');
        setFeedbackText('');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto pb-10">
      <div className="mb-12">
        <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
          <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-amber-100 to-orange-50 text-amber-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(245,158,11,0.2)] border border-white">
            <i className="fas fa-comment-dots"></i>
          </div>
          Submit Feedback
        </h2>
        <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Help us improve by sharing your experience.</p>
      </div>

      <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(245,158,11,0.2)] transition-shadow duration-700">
        
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#f59e0b_80%,#ea580c_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="relative bg-white/95 backdrop-blur-2xl rounded-[calc(2.5rem-2px)] p-10 z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
          <form className="space-y-8">
            
            {/* Rating */}
            <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col items-center">
              <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-6">Overall Experience</label>
              <div className="flex gap-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className={`text-5xl transition-all duration-300 focus:outline-none ${
                      star <= rating 
                        ? 'text-amber-400 drop-shadow-[0_0_15px_rgba(251,191,36,0.6)] scale-110 -translate-y-2' 
                        : 'text-slate-200 hover:text-amber-200 hover:scale-105'
                    }`}
                  >
                    <i className="fas fa-star"></i>
                  </button>
                ))}
              </div>
              <p className="text-sm font-bold mt-4 text-amber-600">
                {rating === 0 ? 'Select a rating' :
                 rating === 1 ? 'Poor' :
                 rating === 2 ? 'Fair' :
                 rating === 3 ? 'Good' :
                 rating === 4 ? 'Very Good' : 'Excellent!'}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none shadow-sm cursor-pointer"
                  >
                    <option>Course Content</option>
                    <option>Teaching Quality</option>
                    <option>Platform / Technical</option>
                    <option>Support & Administration</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Related Teacher (Optional)</label>
                <div className="relative">
                  <select 
                    value={relatedTeacher}
                    onChange={(e) => setRelatedTeacher(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all appearance-none shadow-sm cursor-pointer"
                  >
                    <option>None / Not Applicable</option>
                    <option>Prof. Sharma (Physics)</option>
                    <option>Dr. Singh (Chemistry)</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Feedback</label>
              <textarea 
                rows="6" 
                value={feedbackText}
                onChange={(e) => setFeedbackText(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-5 text-sm font-medium text-slate-700 outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10 transition-all resize-none shadow-sm" 
                placeholder="Tell us what you liked or what we can improve..."
              ></textarea>
            </div>

            <button 
              type="button" 
              onClick={handleSubmit}
              disabled={submitting}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_25px_rgba(245,158,11,0.4)] hover:shadow-[0_15px_35px_rgba(245,158,11,0.6)] hover:-translate-y-0.5 flex items-center justify-center gap-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i> {submitting ? 'Submitting...' : 'Submit Feedback'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubmitFeedback;
