import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ManageNotifications = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const notifications = [
    { id: '#NOT-101', title: 'Holiday Announcement', type: 'Alert', audience: 'All Students', date: 'Today, 09:30 AM', status: 'Sent' },
    { id: '#NOT-102', title: 'New Study Material Uploaded', type: 'Academic', audience: 'Physics Students', date: 'Yesterday, 04:15 PM', status: 'Sent' },
    { id: '#NOT-103', title: 'Mid-Term Schedule Released', type: 'Exam', audience: 'All Courses', date: 'Oct 22, 2026', status: 'Sent' },
    { id: '#NOT-104', title: 'Fee Payment Reminder', type: 'Fee', audience: 'Pending Fees List', date: 'Oct 20, 2026', status: 'Sent' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(location.state?.from || '/admin')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manage Notifications</h2>
            <p className="text-sm text-slate-500">Send announcements and alerts to specific batches or all students.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-bullhorn mr-2"></i> Send Notification
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Types</option>
              <option>Alert</option>
              <option>Academic</option>
              <option>Exam</option>
              <option>Fee</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search announcements..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Notification Details</th>
                <th className="p-5 font-bold border-b border-slate-100">Type</th>
                <th className="p-5 font-bold border-b border-slate-100">Target Audience</th>
                <th className="p-5 font-bold border-b border-slate-100">Sent On</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {notifications.map((notif, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{notif.title}</p>
                    <p className="text-xs font-semibold text-slate-500">{notif.id}</p>
                  </td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      notif.type === 'Alert' ? 'bg-rose-100 text-rose-700' :
                      notif.type === 'Academic' ? 'bg-indigo-100 text-indigo-700' :
                      notif.type === 'Exam' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      <i className={`fas ${
                        notif.type === 'Alert' ? 'fa-bullhorn' :
                        notif.type === 'Academic' ? 'fa-book-open' :
                        notif.type === 'Exam' ? 'fa-file-alt' :
                        'fa-wallet'
                      }`}></i>
                      {notif.type}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className="font-semibold text-slate-700">{notif.audience}</span>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{notif.date}</td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="View Content">
                        <i className="fas fa-eye"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Broadcast Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-paper-plane text-indigo-500"></i> Compose Notification
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject / Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Urgent Update Regarding Class" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Notification Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                    <option>General Alert</option>
                    <option>Academic</option>
                    <option>Exam Update</option>
                    <option>Fee Reminder</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Audience</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                    <option>All Students</option>
                    <option>BBOSE 10th</option>
                    <option>NIOS 12th</option>
                    <option>Medical Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Message Body</label>
                <textarea rows="4" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Type the announcement here..."></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" id="sms" className="w-4 h-4 text-indigo-600 rounded border-slate-300 focus:ring-indigo-500" />
                <label htmlFor="sms" className="text-sm font-semibold text-slate-700">Also send as SMS to registered mobile numbers</label>
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4 flex items-center justify-center gap-2">
                <i className="fas fa-paper-plane"></i> Broadcast Now
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;
