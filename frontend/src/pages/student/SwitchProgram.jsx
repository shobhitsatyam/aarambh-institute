import React, { useState } from 'react';

const SwitchProgram = () => {
  const [requests] = useState([
    { id: '#SW-802', from: 'BBOSE 10th - Morning', to: 'NIOS 10th - Morning', date: 'Oct 20, 2026', status: 'Pending', reason: 'Syllabus alignment' },
  ]);

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Switch Program / Course</h2>
        <p className="text-sm text-slate-500">Request a transfer to a different course or batch.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Request Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-exchange-alt text-indigo-500"></i> New Switch Request
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Enrolled Course</label>
                <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-500 cursor-not-allowed">
                  BBOSE 10th - Morning
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Switch To</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                  <option value="" disabled selected>Select new course/batch...</option>
                  <option>NIOS 10th - Morning</option>
                  <option>BBOSE 10th - Evening</option>
                  <option>Medical Prep - Weekend</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Reason for Switch</label>
                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Please explain why you want to change your program..."></textarea>
              </div>

              <div className="bg-amber-50 p-4 rounded-xl border border-amber-100">
                <p className="text-xs font-semibold text-amber-700 leading-relaxed">
                  <i className="fas fa-info-circle mr-1"></i> Program switch requests are subject to approval by the administration. Any fee differences will be adjusted upon approval.
                </p>
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                Submit Request
              </button>
            </form>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">My Requests History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                    <th className="p-5 font-bold border-b border-slate-100">Request ID</th>
                    <th className="p-5 font-bold border-b border-slate-100">Details</th>
                    <th className="p-5 font-bold border-b border-slate-100">Date</th>
                    <th className="p-5 font-bold border-b border-slate-100">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {requests.map((req, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                      <td className="p-5 font-bold text-slate-800">{req.id}</td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500 font-semibold line-through text-xs">{req.from}</span>
                          <i className="fas fa-arrow-right text-indigo-400 text-xs"></i>
                          <span className="text-slate-800 font-bold text-sm">{req.to}</span>
                        </div>
                      </td>
                      <td className="p-5 font-semibold text-slate-500">{req.date}</td>
                      <td className="p-5">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                          req.status === 'Approved' ? 'bg-emerald-100 text-emerald-700' : 
                          req.status === 'Pending' ? 'bg-amber-100 text-amber-700' : 'bg-rose-100 text-rose-700'
                        }`}>
                          {req.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  
                  {requests.length === 0 && (
                    <tr>
                      <td colSpan="4" className="p-8 text-center text-slate-500 font-semibold">
                        You have no past switch requests.
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
  );
};

export default SwitchProgram;
