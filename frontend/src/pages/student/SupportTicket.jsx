import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const SupportTicket = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const { data: result } = await api.get('/student/tickets');
        
        if (result.success) {
          // Map backend data to frontend format
          const formattedTickets = result.data.map(ticket => ({
            id: ticket.ticket_id,
            subject: ticket.subject,
            category: ticket.category,
            status: ticket.status,
            date: ticket.date,
            priority: ticket.priority || 'Medium', // Default if priority not in DB
            description: ticket.description
          }));
          setTickets(formattedTickets);
        }
      } catch (error) {
        console.error('Error fetching tickets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white">
              <i className="fas fa-headset"></i>
            </div>
            Support Tickets
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Raise issues related to technical problems or administration.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white px-8 py-4 rounded-xl text-sm font-black shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] transition-all hover:-translate-y-0.5 whitespace-nowrap group"
        >
          <i className="fas fa-plus mr-2 group-hover:rotate-90 transition-transform duration-300"></i> Raise New Ticket
        </button>
      </div>

      <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-shadow duration-700">
        
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] overflow-hidden z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
          <div className="p-8 border-b border-slate-100">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner text-lg">
                <i className="fas fa-ticket-alt"></i>
              </div>
              My Tickets
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="p-6 border-b border-slate-100 pl-8">Ticket Details</th>
                  <th className="p-6 border-b border-slate-100">Category</th>
                  <th className="p-6 border-b border-slate-100">Priority</th>
                  <th className="p-6 border-b border-slate-100">Status</th>
                  <th className="p-6 border-b border-slate-100 text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {tickets.map((ticket, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                    <td className="p-6 pl-8">
                      <p className="font-black text-slate-800 text-lg mb-1 group-hover/row:text-indigo-600 transition-colors">{ticket.subject}</p>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ticket.id} <span className="mx-2">•</span> {ticket.date}</p>
                    </td>
                    <td className="p-6">
                      <span className="bg-slate-100 text-slate-600 px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-wider whitespace-nowrap shadow-sm border border-slate-200 group-hover/row:border-indigo-200 group-hover/row:bg-indigo-50 transition-colors">
                        {ticket.category}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`flex items-center gap-2 text-[11px] font-black uppercase tracking-wider ${
                        ticket.priority === 'High' ? 'text-rose-500' : 
                        ticket.priority === 'Medium' ? 'text-amber-500' : 'text-emerald-500'
                      }`}>
                        <i className={`fas fa-flag ${
                          ticket.priority === 'High' ? 'animate-pulse' : ''
                        }`}></i> {ticket.priority}
                      </span>
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black shadow-sm uppercase tracking-wider border ${
                        ticket.status === 'Open' ? 'bg-indigo-50 text-indigo-600 border-indigo-100' :
                        'bg-emerald-50 text-emerald-600 border-emerald-100'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          ticket.status === 'Open' ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]' :
                          'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]'
                        }`}></span>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="p-6 text-right pr-8">
                      <button className="text-indigo-600 hover:text-white font-black text-sm bg-indigo-50 hover:bg-indigo-500 px-6 py-3 rounded-xl transition-all border border-indigo-100 hover:border-indigo-500 shadow-sm hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:-translate-y-0.5">
                        View Reply
                      </button>
                    </td>
                  </tr>
                ))}
                
                {tickets.length === 0 && (
                  <tr>
                    <td colSpan="5" className="p-16 text-center">
                      <div className="w-20 h-20 bg-slate-50 text-slate-300 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <p className="text-slate-500 font-bold">You haven't raised any support tickets yet.</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Raise Ticket Modal (Premium Glassmorphism) */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative group rounded-[2.5rem] p-[2.5px] w-full max-w-xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-100"></div>
            </div>
            
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[calc(2.5rem-2px)] p-10 z-10 border border-white">
              <button onClick={() => setShowAddModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 shadow-sm border border-transparent hover:border-slate-200">
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <h3 className="text-3xl font-black text-slate-800 mb-8 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 rounded-xl flex items-center justify-center shadow-[inset_0_2px_10px_rgba(255,255,255,1)] border border-white relative overflow-hidden">
                  <i className="fas fa-headset relative z-10"></i>
                </div>
                Raise Support Ticket
              </h3>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Issue Subject</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm" placeholder="Brief summary of your issue" />
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Category</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none shadow-sm cursor-pointer">
                        <option>Technical Issue</option>
                        <option>Fee & Payment</option>
                        <option>Course Access</option>
                        <option>Other</option>
                      </select>
                      <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Priority</label>
                    <div className="relative">
                      <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all appearance-none shadow-sm cursor-pointer">
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                      </select>
                      <i className="fas fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"></i>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Issue Description</label>
                  <textarea rows="5" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-4 text-sm font-medium text-slate-700 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all resize-none shadow-sm" placeholder="Please describe your issue in detail..."></textarea>
                </div>

                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Attachment (Optional)</label>
                  <input type="file" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold outline-none focus:border-indigo-500 transition-all shadow-sm file:mr-4 file:py-2.5 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:uppercase file:tracking-wider file:bg-indigo-600 file:text-white hover:file:bg-indigo-700 hover:file:shadow-[0_4px_15px_rgba(99,102,241,0.4)] file:transition-all cursor-pointer" />
                </div>

                <button type="button" onClick={() => setShowAddModal(false)} className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-black py-4 rounded-xl transition-all shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] hover:-translate-y-0.5 mt-6 flex items-center justify-center gap-3">
                  <i className="fas fa-paper-plane"></i> Submit Ticket
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SupportTicket;
