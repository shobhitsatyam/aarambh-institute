import React, { useState } from 'react';

const DoubtSession = () => {
  const [showAskModal, setShowAskModal] = useState(false);

  const doubts = [
    { id: '#DBT-104', subject: 'Physics', topic: 'Kinematics Equations', question: 'How do we derive the 3rd equation of motion without calculus?', status: 'Answered', date: 'Oct 23, 2026' },
    { id: '#DBT-105', subject: 'Chemistry', topic: 'Hybridization', question: 'I am confused between sp2 and sp3 hybridization shapes.', status: 'Pending', date: 'Oct 24, 2026' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Doubt Sessions</h2>
          <p className="text-sm text-slate-500">Ask questions and clear your academic doubts with expert teachers.</p>
        </div>
        <button 
          onClick={() => setShowAskModal(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-question-circle mr-2"></i> Ask a Doubt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Doubts List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">My Recent Doubts</h3>
          </div>
          
          {doubts.map((doubt) => (
            <div key={doubt.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                    doubt.subject === 'Physics' ? 'bg-indigo-50 text-indigo-500' : 
                    doubt.subject === 'Chemistry' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                  }`}>
                    <i className="fas fa-book"></i>
                  </div>
                  <div>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold mr-2">{doubt.subject}</span>
                    <span className="text-xs font-bold text-slate-400">{doubt.date}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                  doubt.status === 'Answered' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                }`}>
                  {doubt.status}
                </span>
              </div>
              
              <h4 className="font-bold text-slate-800 text-lg mb-2">{doubt.topic}</h4>
              <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-xl border border-slate-100 italic">
                "{doubt.question}"
              </p>

              {doubt.status === 'Answered' && (
                <div className="mt-4 pt-4 border-t border-slate-100">
                  <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center gap-2">
                    <i className="fas fa-check-circle"></i> View Teacher's Reply
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Side - Info Widget */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl p-8 text-white shadow-xl shadow-emerald-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Live Doubt Classes</h3>
              <p className="text-emerald-50 text-sm mb-6 leading-relaxed">
                Join our weekend live doubt clearing sessions where teachers answer questions in real-time.
              </p>
              <button className="w-full bg-white text-emerald-600 font-bold py-3 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
                <i className="fas fa-video"></i> View Schedule
              </button>
            </div>
            <i className="fas fa-comments absolute -right-6 -bottom-6 text-[120px] text-white/10"></i>
          </div>
        </div>

      </div>

      {/* Ask Doubt Modal */}
      {showAskModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAskModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-question-circle text-emerald-500"></i> Ask a New Doubt
            </h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors appearance-none">
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Topic</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors" placeholder="e.g. Kinematics" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Question</label>
                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Type your doubt in detail..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attach Image (Optional)</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-4 text-center hover:border-emerald-400 transition-colors cursor-pointer bg-slate-50">
                  <p className="text-xs font-bold text-slate-600"><i className="fas fa-image mr-1"></i> Click to upload screenshot</p>
                </div>
              </div>

              <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 mt-4">
                Submit Doubt
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtSession;
