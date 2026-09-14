import React, { useState } from 'react';

const ManageTickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);

  const tickets = [
    { id: '#TKT-2041', student: 'Aditya Ravi', subject: 'Payment failed but amount deducted', category: 'Fee & Payment', status: 'Open', date: 'Oct 24, 2026', priority: 'High', description: 'I tried paying for the Medical Prep course via UPI, but it failed. However, 15,000 was deducted from my bank. Please help.' },
    { id: '#TKT-2038', student: 'Neha Gupta', subject: 'Unable to access Chapter 3 PDF', category: 'Technical Issue', status: 'Resolved', date: 'Oct 20, 2026', priority: 'Medium', description: 'When I click on Chapter 3 PDF in Study Materials, it says "Access Denied".' },
    { id: '#TKT-2035', student: 'Amit Kumar', subject: 'Change my mobile number', category: 'Administration', status: 'Pending', date: 'Oct 19, 2026', priority: 'Low', description: 'I want to update my registered mobile number to 9876543210.' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Support Tickets</h2>
        <p className="text-sm text-slate-500">Manage and resolve issues raised by students.</p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Open</option>
              <option>Pending</option>
              <option>Resolved</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Priorities</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search by ID or Student..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Ticket ID</th>
                <th className="p-5 font-bold border-b border-slate-100">Student</th>
                <th className="p-5 font-bold border-b border-slate-100">Subject</th>
                <th className="p-5 font-bold border-b border-slate-100">Priority</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {tickets.map((ticket, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-5 font-bold text-indigo-600">{ticket.id}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{ticket.student}</p>
                    <p className="text-xs text-slate-500">{ticket.date}</p>
                  </td>
                  <td className="p-5">
                    <p className="font-semibold text-slate-700">{ticket.subject}</p>
                    <p className="text-xs text-slate-500">{ticket.category}</p>
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
                      ticket.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {ticket.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedTicket(ticket)}
                      className="text-indigo-600 hover:text-white font-bold text-sm bg-indigo-50 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      Respond
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Respond Ticket Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedTicket(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="flex items-center gap-3 mb-6">
              <h3 className="text-xl font-bold text-slate-800">Ticket {selectedTicket.id}</h3>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                selectedTicket.status === 'Open' ? 'bg-indigo-100 text-indigo-700' :
                selectedTicket.status === 'Pending' ? 'bg-amber-100 text-amber-700' :
                'bg-emerald-100 text-emerald-700'
              }`}>
                {selectedTicket.status}
              </span>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student</p>
                  <p className="font-bold text-slate-800">{selectedTicket.student}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Date</p>
                  <p className="font-semibold text-slate-700 text-sm">{selectedTicket.date}</p>
                </div>
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-2">{selectedTicket.subject}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedTicket.description}
              </p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Your Reply</label>
                <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Type your response to the student..."></textarea>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Status</label>
                  <select defaultValue={selectedTicket.status} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>Open</option>
                    <option>Pending</option>
                    <option>Resolved</option>
                  </select>
                </div>
                <div className="flex-1 flex items-end">
                  <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                    Send Reply
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTickets;
