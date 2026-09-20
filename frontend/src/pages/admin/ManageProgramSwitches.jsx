import React, { useState } from 'react';

const ManageProgramSwitches = () => {
  const [selectedRequest, setSelectedRequest] = useState(null);

  const requests = [
    { id: '#SW-802', student: 'Amit Kumar', from: 'BBOSE 10th - Morning', to: 'NIOS 10th - Morning', date: 'Oct 20, 2026', status: 'Pending', reason: 'Syllabus alignment and timing issues.' },
    { id: '#SW-803', student: 'Neha Gupta', from: 'BBOSE 12th', to: 'Medical Prep', date: 'Oct 19, 2026', status: 'Approved', reason: 'Decided to prepare for NEET.' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Program Switch Requests</h2>
          <p className="text-sm text-slate-500">Manage student requests to transfer between courses or batches.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Student & ID</th>
                <th className="p-5 font-bold border-b border-slate-100">Requested Change</th>
                <th className="p-5 font-bold border-b border-slate-100">Date</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {requests.map((req, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{req.student}</p>
                    <p className="text-xs font-semibold text-slate-500">{req.id}</p>
                  </td>
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
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedRequest(req)}
                      className="text-indigo-600 hover:text-white font-bold text-sm bg-indigo-50 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setSelectedRequest(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-exchange-alt text-indigo-500"></i> Review Switch Request
            </h3>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student</p>
                  <p className="font-bold text-slate-800">{selectedRequest.student}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-semibold text-slate-700 text-sm">{selectedRequest.date}</p>
                </div>
              </div>
              
              <div className="flex flex-col gap-2 p-4 bg-white rounded-xl border border-slate-200 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">From</span>
                  <span className="text-sm font-semibold text-slate-600">{selectedRequest.from}</span>
                </div>
                <div className="flex justify-center"><i className="fas fa-arrow-down text-indigo-300"></i></div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400 uppercase">To</span>
                  <span className="text-sm font-bold text-indigo-600">{selectedRequest.to}</span>
                </div>
              </div>

              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Reason</p>
              <p className="text-sm text-slate-600 italic">"{selectedRequest.reason}"</p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Admin Remarks (Sent to student)</label>
                <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Enter any notes regarding fee adjustments or approval conditions..."></textarea>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                <button type="button" onClick={() => setSelectedRequest(null)} className="flex-1 bg-white border-2 border-rose-100 text-rose-600 hover:bg-rose-50 font-bold py-3.5 rounded-xl transition-colors">
                  Reject
                </button>
                <button type="button" onClick={() => setSelectedRequest(null)} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30">
                  Approve Switch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageProgramSwitches;
