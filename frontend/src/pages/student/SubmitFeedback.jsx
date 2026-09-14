import React, { useState } from 'react';

const SubmitFeedback = () => {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Submit Feedback</h2>
        <p className="text-sm text-slate-500">Help us improve by sharing your experience.</p>
      </div>

      <div className="max-w-2xl bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <form className="space-y-6">
          
          {/* Rating */}
          <div>
            <label className="block text-sm font-bold text-slate-800 mb-3">Overall Experience</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`text-3xl transition-transform hover:scale-110 focus:outline-none ${
                    star <= rating ? 'text-amber-400' : 'text-slate-200 hover:text-amber-200'
                  }`}
                >
                  <i className="fas fa-star"></i>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                <option>Course Content</option>
                <option>Teaching Quality</option>
                <option>Platform / Technical</option>
                <option>Support & Administration</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Related Teacher (Optional)</label>
              <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                <option>None / Not Applicable</option>
                <option>Prof. Sharma (Physics)</option>
                <option>Dr. Singh (Chemistry)</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Feedback</label>
            <textarea 
              rows="5" 
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" 
              placeholder="Tell us what you liked or what we can improve..."
            ></textarea>
          </div>

          <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

export default SubmitFeedback;
