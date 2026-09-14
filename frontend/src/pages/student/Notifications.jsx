import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const notifications = [
    { id: 1, type: 'Alert', title: 'Holiday Announcement', message: 'The institute will remain closed on Oct 26th due to local elections.', date: 'Today, 09:30 AM', isNew: true },
    { id: 2, type: 'Academic', title: 'New Study Material Uploaded', message: 'Chapter 4 Notes have been uploaded for Physics.', date: 'Yesterday, 04:15 PM', isNew: true },
    { id: 3, type: 'Exam', title: 'Mid-Term Schedule Released', message: 'Please check the Academic Calendar for the upcoming Mid-Term examination schedule.', date: 'Oct 22, 2026', isNew: false },
    { id: 4, type: 'Fee', title: 'Fee Payment Reminder', message: 'Your 2nd installment for the course is due next week.', date: 'Oct 20, 2026', isNew: false },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(location.state?.from || '/student')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Notifications</h2>
            <p className="text-sm text-slate-500">Stay updated with institute announcements and alerts.</p>
          </div>
        </div>
        <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors">
          Mark all as read
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden p-2 sm:p-4">
        <div className="space-y-2">
          {notifications.map((notif) => (
            <div key={notif.id} className={`p-4 sm:p-5 rounded-2xl border transition-all ${
              notif.isNew ? 'bg-indigo-50/30 border-indigo-100' : 'bg-white border-transparent hover:bg-slate-50'
            }`}>
              <div className="flex gap-4 sm:gap-5 items-start">
                
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shrink-0 ${
                  notif.type === 'Alert' ? 'bg-rose-100 text-rose-500' :
                  notif.type === 'Academic' ? 'bg-indigo-100 text-indigo-500' :
                  notif.type === 'Exam' ? 'bg-emerald-100 text-emerald-500' :
                  'bg-amber-100 text-amber-500'
                }`}>
                  <i className={`fas ${
                    notif.type === 'Alert' ? 'fa-bullhorn' :
                    notif.type === 'Academic' ? 'fa-book-open' :
                    notif.type === 'Exam' ? 'fa-file-alt' :
                    'fa-wallet'
                  }`}></i>
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1 gap-1">
                    <h4 className={`text-base font-bold truncate ${notif.isNew ? 'text-slate-800' : 'text-slate-700'}`}>
                      {notif.title}
                    </h4>
                    <span className="text-xs font-semibold text-slate-400 whitespace-nowrap">
                      {notif.date}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-3">
                    {notif.message}
                  </p>
                  
                  {/* Action Buttons (if any) */}
                  {notif.type === 'Academic' && (
                    <button className="text-indigo-600 text-xs font-bold hover:underline">View Material</button>
                  )}
                  {notif.type === 'Exam' && (
                    <button className="text-emerald-600 text-xs font-bold hover:underline">View Calendar</button>
                  )}
                  {notif.type === 'Fee' && (
                    <button className="text-amber-600 text-xs font-bold hover:underline">Pay Now</button>
                  )}
                </div>
                
                {/* Unread Dot */}
                {notif.isNew && (
                  <div className="w-3 h-3 bg-indigo-500 rounded-full shrink-0 mt-1.5 shadow-sm shadow-indigo-500/50"></div>
                )}
                
              </div>
            </div>
          ))}

          {notifications.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-semibold">
              <i className="fas fa-bell-slash text-4xl mb-4 text-slate-300"></i>
              <p>You have no notifications.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
