import React, { useState } from 'react';

const SupportTicket = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const tickets = [
    { id: '#TKT-2041', subject: 'Payment failed but amount deducted', category: 'Fee & Payment', status: 'Open', date: 'Oct 24, 2026', priority: 'High' },
    { id: '#TKT-2038', subject: 'Unable to access Chapter 3 PDF', category: 'Technical Issue', status: 'Resolved', date: 'Oct 20, 2026', priority: 'Medium' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Support Tickets</h2>
          <p className="text-sm text-slate-500">Raise issues related to technical problems or administration.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-headset mr-2"></i> Raise New Ticket
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">My Tickets</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Ticket Details</th>
                <th className="p-5 font-bold border-b border-slate-100">Category</th>
                <th className="p-5 font-bold border-b border-slate-100">Priority</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tickets.map((ticket, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{ticket.subject}</p>
                    <p className="text-xs font-semibold text-slate-500">{ticket.id} • {ticket.date}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {ticket.category}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${
                      ticket.priority === 'High' ? 'text-rose-500' : 
                      ticket.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                    }`}>
                      <i className="fas fa-flag"></i> {ticket.priority}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      ticket.status === 'Open' ? 'bg-indigo-100 text-indigo-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
                      View Reply
                    </button>
                  </td>
                </tr>
              ))}
              
              {tickets.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500 font-semibold">
                    You haven't raised any support tickets yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raise Ticket Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-headset text-indigo-500"></i> Raise Support Ticket
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Issue Subject</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Brief summary of your issue" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>Technical Issue</option>
                    <option>Fee & Payment</option>
                    <option>Course Access</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Priority</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Issue Description</label>
                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Please describe your issue in detail..."></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Attachment (Optional)</label>
                <input type="file" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Submit Ticket
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicket;
