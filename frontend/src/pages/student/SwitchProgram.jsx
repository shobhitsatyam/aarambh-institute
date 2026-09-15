import React, { useState } from 'react';
import api from '../../services/api';

const SwitchProgram = () => {
  const [requests, setRequests] = useState([
    { id: '#SW-802', from: 'BBOSE 10th - Morning', to: 'NIOS 10th - Morning', date: 'Oct 20, 2026', status: 'Pending', reason: 'Syllabus alignment' },
  ]);
  const [newProgram, setNewProgram] = useState('');
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!newProgram || !reason.trim()) {
      alert('Please select a new program and provide a reason.');
      return;
    }
    setSubmitting(true);
    try {
      const { data: result } = await api.post('/student/switch-program', {
        currentProgram: 'BBOSE 10th - Morning',
        newProgram,
        reason
      });
      if (result.success) {
        alert('Your program switch request has been submitted successfully!');
        setRequests(prev => [...prev, {
          id: `#SW-${Math.floor(Math.random() * 1000) + 800}`,
          from: 'BBOSE 10th - Morning',
          to: newProgram,
          date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          status: 'Pending',
          reason
        }]);
        setNewProgram('');
        setReason('');
      }
    } catch (error) {
      console.error('Error submitting switch request:', error);
      alert('Failed to submit request. Please try again.');
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
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white">
              <i className="fas fa-exchange-alt"></i>
            </div>
            Switch Program / Course
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Request a transfer to a different course or batch.</p>
        </div>
      </div>

      <div className="flex flex-col gap-12">
        
        {/* Request Form */}
        <div className="w-full max-w-4xl mx-auto">
          
          <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] hover:-translate-y-1 transition-all duration-700 h-full">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            
            <div className="relative bg-white/95 backdrop-blur-xl rounded-[calc(2.5rem-2px)] p-8 h-full z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
              <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <i className="fas fa-random text-indigo-500 bg-indigo-50 w-10 h-10 rounded-xl flex items-center justify-center shadow-inner"></i> 
                New Switch Request
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Current Enrolled Course</label>
                  <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-black text-slate-500 cursor-not-allowed shadow-inner flex items-center gap-3">
                    <i className="fas fa-lock text-slate-400"></i> BBOSE 10th - Morning
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Switch To</label>
                  <div className="relative">
                    <select 
                      value={newProgram}
                      onChange={(e) => setNewProgram(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none font-bold text-slate-700 shadow-sm cursor-pointer"
                    >
                      <option value="" disabled>Select new course/batch...</option>
                      <option>NIOS 10th - Morning</option>
                      <option>BBOSE 10th - Evening</option>
                      <option>Medical Prep - Weekend</option>
                    </select>
                    <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reason for Switch</label>
                  <textarea 
                    rows="4" 
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none font-medium text-slate-700 shadow-sm" 
                    placeholder="Please explain why you want to change your program..."
                  ></textarea>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-5 rounded-2xl border border-amber-100 shadow-sm">
                  <p className="text-[11px] font-bold text-amber-700 leading-relaxed uppercase tracking-wider">
                    <i className="fas fa-info-circle mr-1 text-amber-500 text-sm"></i> Note
                  </p>
                  <p className="text-xs font-semibold text-amber-600 mt-1 leading-relaxed">
                    Program switch requests are subject to approval. Any fee differences will be adjusted upon approval.
                  </p>
                </div>

                <button 
                  type="button" 
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 mt-4 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? (<><i className="fas fa-spinner fa-spin mr-2"></i> Submitting...</>) : (<>Submit Request <i className="fas fa-paper-plane ml-2 opacity-50 group-hover/btn:animate-bounce"></i></>)}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="w-full">
          
          <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-shadow duration-700 h-full">
            
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] overflow-hidden z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500 h-full flex flex-col">
              <div className="p-8 border-b border-slate-100">
                <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner text-lg">
                    <i className="fas fa-history"></i>
                  </div>
                  My Requests History
                </h3>
              </div>
              <div className="overflow-x-auto flex-1">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                      <th className="p-6 border-b border-slate-100 pl-8">Request ID</th>
                      <th className="p-6 border-b border-slate-100">Details</th>
                      <th className="p-6 border-b border-slate-100">Date</th>
                      <th className="p-6 border-b border-slate-100 text-right pr-8">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {requests.map((req, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                        <td className="p-6 pl-8 font-black text-slate-800 text-lg">
                          {req.id}
                        </td>
                        <td className="p-6">
                          <div className="flex items-center gap-3">
                            <span className="text-slate-400 font-bold line-through text-xs">{req.from}</span>
                            <div className="w-6 h-6 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 text-[10px]">
                              <i className="fas fa-arrow-right"></i>
                            </div>
                            <span className="text-slate-800 font-black text-sm">{req.to}</span>
                          </div>
                        </td>
                        <td className="p-6 font-bold text-slate-500 group-hover/row:text-slate-800 transition-colors">
                          <i className="far fa-calendar-alt mr-2 opacity-50"></i>{req.date}
                        </td>
                        <td className="p-6 text-right pr-8">
                          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black shadow-sm uppercase tracking-wider border ${
                            req.status === 'Approved' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                            req.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              req.status === 'Approved' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 
                              req.status === 'Pending' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]' : 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]'
                            }`}></span>
                            {req.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                    
                    {requests.length === 0 && (
                      <tr>
                        <td colSpan="4" className="p-16 text-center">
                          <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                            <i className="fas fa-folder-open"></i>
                          </div>
                          <p className="text-slate-500 font-bold">You have no past switch requests.</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SwitchProgram;
