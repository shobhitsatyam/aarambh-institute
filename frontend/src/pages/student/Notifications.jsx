import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data: result } = await api.get('/student/notifications');
        
        if (result.success) {
          const formattedNotifications = result.data.map(notif => ({
            id: notif.id,
            type: notif.type === 'wallet' ? 'Fee' : notif.type === 'bullhorn' ? 'Alert' : 'Academic',
            title: notif.title,
            message: notif.message,
            date: notif.date,
            isNew: notif.is_new === 1
          }));
          setNotifications(formattedNotifications);
        }
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div className="flex items-center gap-6">
          <button onClick={() => navigate(location.state?.from || '/student')} className="w-12 h-12 rounded-[1.25rem] bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.2)] hover:-translate-x-1">
            <i className="fas fa-arrow-left text-xl"></i>
          </button>
          <div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
              <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white">
                <i className="fas fa-bell"></i>
              </div>
              Notifications
            </h2>
            <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Stay updated with institute announcements and alerts.</p>
          </div>
        </div>
        <button className="bg-white text-indigo-600 hover:text-white hover:bg-indigo-600 font-black text-sm px-6 py-3.5 rounded-xl transition-all border border-indigo-100 hover:border-indigo-600 shadow-sm hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:-translate-y-0.5 whitespace-nowrap">
          Mark all as read
        </button>
      </div>

      <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-shadow duration-700">
        
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] p-6 sm:p-10 z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                notif.isNew ? 'bg-indigo-50/50 border-indigo-100 hover:border-indigo-200' : 'bg-white border-slate-100 hover:border-slate-200'
              }`}>
                <div className="flex gap-5 sm:gap-6 items-start">
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm border border-white ${
                    notif.type === 'Alert' ? 'bg-gradient-to-br from-rose-100 to-rose-50 text-rose-500' :
                    notif.type === 'Academic' ? 'bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-500' :
                    notif.type === 'Exam' ? 'bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-500' :
                    'bg-gradient-to-br from-amber-100 to-amber-50 text-amber-500'
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
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2 gap-2">
                      <h4 className={`text-xl font-black truncate ${notif.isNew ? 'text-slate-800' : 'text-slate-700'}`}>
                        {notif.title}
                      </h4>
                      <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap bg-white px-3 py-1 rounded-full border border-slate-100 shadow-sm">
                        <i className="far fa-clock mr-1"></i> {notif.date}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-600 leading-relaxed mb-4">
                      {notif.message}
                    </p>
                    
                    {/* Action Buttons (if any) */}
                    <div className="flex gap-3">
                      {notif.type === 'Academic' && (
                        <button className="text-indigo-600 bg-indigo-50 hover:bg-indigo-600 hover:text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors border border-indigo-100">View Material</button>
                      )}
                      {notif.type === 'Exam' && (
                        <button className="text-emerald-600 bg-emerald-50 hover:bg-emerald-600 hover:text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors border border-emerald-100">View Calendar</button>
                      )}
                      {notif.type === 'Fee' && (
                        <button className="text-amber-600 bg-amber-50 hover:bg-amber-600 hover:text-white px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-colors border border-amber-100">Pay Now</button>
                      )}
                    </div>
                  </div>
                  
                  {/* Unread Dot */}
                  {notif.isNew && (
                    <div className="w-4 h-4 bg-indigo-500 rounded-full shrink-0 mt-2 shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse"></div>
                  )}
                  
                </div>
              </div>
            ))}

            {notifications.length === 0 && (
              <div className="p-16 text-center text-slate-500 font-semibold">
                <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center text-4xl mx-auto mb-6 shadow-inner">
                  <i className="fas fa-bell-slash"></i>
                </div>
                <h3 className="text-xl font-bold text-slate-800 mb-2">All Caught Up!</h3>
                <p>You have no new notifications.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
