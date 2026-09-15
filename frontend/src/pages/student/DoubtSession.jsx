import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const DoubtSession = () => {
  const [showAskModal, setShowAskModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [selectedReply, setSelectedReply] = useState(null);
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ subject: 'Physics', topic: '', question: '' });
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = async () => {
    try {
      const { data: result } = await api.get('/student/doubts');
      if (result.success) {
        const formatted = result.data.map(d => ({
          id: `#DBT-${d.id}`,
          subject: d.subject,
          topic: d.topic,
          question: d.question,
          status: d.status,
          answer: d.answer,
          date: d.date
        }));
        setDoubts(formatted);
      }
    } catch (error) {
      console.error('Error fetching doubts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitDoubt = async () => {
    if (!formData.topic.trim() || !formData.question.trim()) {
      alert('Please fill in all fields.');
      return;
    }
    setSubmitting(true);
    try {
      const { data: result } = await api.post('/student/doubts', formData);
      if (result.success) {
        alert('Your doubt has been submitted successfully! A teacher will reply soon.');
        setShowAskModal(false);
        setFormData({ subject: 'Physics', topic: '', question: '' });
        fetchDoubts(); // Refresh the list
      }
    } catch (error) {
      console.error('Error submitting doubt:', error);
      alert('Failed to submit doubt. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(16,185,129,0.2)] border border-white">
              <i className="fas fa-question-circle"></i>
            </div>
            Doubt Sessions
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Ask questions and clear your academic doubts with expert teachers.</p>
        </div>
        <button 
          onClick={() => setShowAskModal(true)}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white px-8 py-4 rounded-xl text-sm font-black shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.6)] transition-all hover:-translate-y-0.5 whitespace-nowrap group"
        >
          <i className="fas fa-plus mr-2 group-hover:rotate-90 transition-transform duration-300"></i> Ask a Doubt
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side - Doubts List */}
        <div className="lg:col-span-2 space-y-8">
          <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner text-lg">
              <i className="fas fa-list-ul"></i>
            </div>
            My Recent Doubts
          </h3>
          
          <div className="space-y-6">
            {doubts.map((doubt) => (
              <div key={doubt.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:-translate-y-2 transition-all duration-500">
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                   <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#10b981_80%,#047857_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="relative bg-white rounded-[calc(2rem-2px)] p-6 z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
                  
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shadow-[inset_0_2px_10px_rgba(255,255,255,1)] border border-white ${
                        doubt.subject === 'Physics' ? 'bg-indigo-50 text-indigo-500' : 
                        doubt.subject === 'Chemistry' ? 'bg-rose-50 text-rose-500' : 'bg-blue-50 text-blue-500'
                      }`}>
                        <i className="fas fa-book-open"></i>
                      </div>
                      <div>
                        <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-md text-[9px] font-black uppercase tracking-widest mr-2 shadow-sm border border-slate-200">{doubt.subject}</span>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest"><i className="far fa-calendar-alt mr-1"></i> {doubt.date}</span>
                      </div>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border flex items-center gap-2 ${
                      doubt.status === 'Answered' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        doubt.status === 'Answered' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      }`}></span>
                      {doubt.status}
                    </span>
                  </div>
                  
                  <h4 className="font-black text-slate-800 text-xl mb-3 group-hover:text-emerald-600 transition-colors">{doubt.topic}</h4>
                  <div className="relative">
                    <i className="fas fa-quote-left absolute top-3 left-4 text-slate-200 text-xl"></i>
                    <p className="text-sm font-semibold text-slate-600 bg-slate-50 p-4 pl-12 rounded-xl border border-slate-100 italic shadow-inner">
                      {doubt.question}
                    </p>
                  </div>

                  {doubt.status === 'Answered' && (
                    <div className="mt-5 pt-5 border-t border-slate-100">
                      <button 
                        onClick={() => {
                          setSelectedReply(doubt);
                          setShowReplyModal(true);
                        }}
                        className="text-emerald-600 hover:text-white font-black text-xs flex items-center gap-2 bg-emerald-50 hover:bg-emerald-500 px-5 py-2.5 rounded-lg transition-all border border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 group/btn"
                      >
                        <i className="fas fa-check-circle group-hover/btn:scale-110 transition-transform"></i> View Teacher's Reply
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Info Widget */}
        <div className="space-y-8 mt-[72px]">
          <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_15px_50px_rgba(16,185,129,0.2)] hover:shadow-[0_30px_60px_rgba(16,185,129,0.4)] hover:-translate-y-2 transition-all duration-700">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#10b981_80%,#047857_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div className="relative bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-[calc(2.5rem-2px)] p-8 text-white overflow-hidden z-10 border border-emerald-400/30">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl mb-5 shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)] border border-white/30 group-hover:scale-110 transition-transform duration-500">
                  <i className="fas fa-video"></i>
                </div>
                <h3 className="text-xl font-black mb-2">Live Doubt Classes</h3>
                <p className="text-emerald-50 text-sm mb-8 leading-relaxed font-medium">
                  Join our weekend live doubt clearing sessions where teachers answer questions in real-time.
                </p>
                <button 
                  onClick={() => navigate('/student/live-classes')}
                  className="w-full bg-white text-emerald-700 font-black py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn"
                >
                  <i className="fas fa-calendar-alt group-hover/btn:animate-bounce"></i> View Schedule
                </button>
              </div>
              <i className="fas fa-comments absolute -right-6 -bottom-6 text-[140px] text-white opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"></i>
            </div>
          </div>
        </div>

      </div>

      {/* Ask Doubt Modal (Premium Glassmorphism) */}
      {showAskModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative group rounded-[2.5rem] p-[2.5px] w-full max-w-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#10b981_80%,#047857_100%)] opacity-100"></div>
            </div>
            
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[calc(2.5rem-2px)] p-6 sm:p-10 z-10 border border-white overflow-y-auto flex-1">
              <button onClick={() => setShowAskModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 shadow-sm border border-transparent hover:border-slate-200">
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,1)] border border-white relative overflow-hidden">
                  <i className="fas fa-question-circle relative z-10"></i>
                </div>
                Ask a New Doubt
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Subject</label>
                    <div className="relative">
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all appearance-none shadow-sm cursor-pointer"
                      >
                        <option>Physics</option>
                        <option>Chemistry</option>
                        <option>Mathematics</option>
                        <option>Biology</option>
                      </select>
                      <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Topic</label>
                    <input 
                      type="text" 
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all shadow-sm" 
                      placeholder="e.g. Kinematics" 
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Your Question</label>
                  <textarea 
                    rows="4" 
                    value={formData.question}
                    onChange={(e) => setFormData({...formData, question: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all resize-none shadow-sm" 
                    placeholder="Type your doubt in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Attach Image (Optional)</label>
                  <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center hover:border-emerald-400 hover:bg-emerald-50/50 transition-colors cursor-pointer bg-slate-50 group">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 text-xl mx-auto mb-3 shadow-sm group-hover:text-emerald-500 group-hover:scale-110 transition-all">
                      <i className="fas fa-cloud-upload-alt"></i>
                    </div>
                    <p className="text-xs font-bold text-slate-600">Click to upload screenshot</p>
                    <p className="text-[10px] font-semibold text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  </div>
                </div>

                <button 
                  type="button" 
                  onClick={handleSubmitDoubt}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_25px_rgba(16,185,129,0.4)] hover:shadow-[0_15px_35px_rgba(16,185,129,0.6)] hover:-translate-y-0.5 mt-6 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <i className={`fas ${submitting ? 'fa-spinner fa-spin' : 'fa-paper-plane'}`}></i> {submitting ? 'Submitting...' : 'Submit Doubt'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Teacher's Reply Modal (Premium Glassmorphism) */}
      {showReplyModal && selectedReply && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative group rounded-[2.5rem] p-[2.5px] w-full max-w-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300 max-h-[90vh] flex flex-col">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#10b981_80%,#047857_100%)] opacity-100"></div>
            </div>
            
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[calc(2.5rem-2px)] p-6 sm:p-10 z-10 border border-white overflow-y-auto flex-1">
              <button onClick={() => setShowReplyModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 shadow-sm border border-transparent hover:border-slate-200">
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <div className="flex items-center gap-4 mb-8 border-b border-slate-100 pb-6">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,1)] border border-white text-2xl">
                  <i className="fas fa-chalkboard-teacher"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-800">Teacher's Reply</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Topic: {selectedReply.topic}</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fas fa-question-circle text-slate-300"></i> Your Question
                  </h4>
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 text-sm font-semibold text-slate-600 shadow-inner">
                    {selectedReply.question}
                  </div>
                </div>

                <div>
                  <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3 flex items-center gap-2">
                    <i className="fas fa-reply"></i> Expert Answer
                  </h4>
                  <div className="bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100/50 text-sm font-medium text-slate-700 leading-relaxed shadow-sm">
                    <p>Hello there! That's a great question about {selectedReply.topic}.</p>
                    <br />
                    <p>To understand this concept clearly, I recommend you go through Chapter 4 of the provided study materials where we have explained this with visual diagrams.</p>
                    <br />
                    <p>Basically, you can derive it using the velocity-time graph by calculating the area under the curve which represents displacement. Try doing it on paper, and if you still face issues, you can join the live doubt class this Saturday!</p>
                  </div>
                </div>
                
                <button 
                  onClick={() => setShowReplyModal(false)} 
                  className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-4 rounded-xl transition-all shadow-sm hover:shadow-md mt-4"
                >
                  Close Reply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoubtSession;
