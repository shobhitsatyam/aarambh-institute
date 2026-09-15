import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const { data: result } = await api.get('/student/dashboard');
        
        if (result.success) {
          setDashboardData(result.data);
        }
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Fallback if data is null for some reason
  const data = dashboardData || {
    studentName: 'Student',
    attendancePercentage: 0,
    activeSubjects: 0,
    pendingFees: 0,
    lastExamScore: 0,
    upcomingClasses: [],
    recentNotifications: []
  };

  return (
    <div>
      {/* Welcome Banner - Premium Dark Gradient */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-700 to-purple-800 rounded-3xl p-8 mb-8 relative overflow-hidden shadow-2xl shadow-indigo-200/50">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2 text-white">Welcome back, {data.studentName}! 👋</h2>
          <p className="text-indigo-100 max-w-lg leading-relaxed text-lg">
            You have <span className="font-bold text-white bg-white/20 px-2 py-1 rounded-md backdrop-blur-sm mx-1 shadow-inner">{data.upcomingClasses.length} upcoming classes</span> today. Let's make today productive!
          </p>
          <button 
            onClick={() => navigate('/student/live-classes')}
            className="mt-6 bg-white text-indigo-700 px-8 py-3 rounded-xl font-bold shadow-[0_8px_20px_rgba(255,255,255,0.25)] hover:shadow-[0_12px_25px_rgba(255,255,255,0.35)] hover:-translate-y-1 transition-all duration-300 flex items-center gap-2 group"
          >
            <span>Join Next Class</span>
            <i className="fas fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
          </button>
        </div>
        
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-64 h-full">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -right-12 -top-12 w-64 h-64 text-white opacity-10">
            <path fill="currentColor" d="M44.7,-76.4C58.8,-69.2,71.8,-59.1,81.6,-46.7C91.4,-34.3,98,-19.7,99.3,-4.8C100.6,10.1,96.6,25.3,87.7,37.8C78.8,50.3,65,60.1,50.6,67.6C36.2,75.1,21.2,80.3,5.5,84C-10.2,87.7,-25.1,89.9,-39.3,85.1C-53.5,80.3,-67,68.5,-76.8,54.4C-86.6,40.3,-92.7,24,-94.1,7.4C-95.5,-9.2,-92.2,-26.1,-83.4,-39.6C-74.6,-53.1,-60.3,-63.2,-46,-70.3C-31.7,-77.4,-15.8,-81.5,-0.1,-81.3C15.6,-81.1,31.2,-76.6,44.7,-76.4Z" transform="translate(100 100)" />
          </svg>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="nested-card p-5 cursor-pointer group hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:border-emerald-200" onClick={() => navigate('/student/attendance')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-100 to-emerald-50 text-emerald-600 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
              <i className="fas fa-clipboard-check"></i>
            </div>
            {data.attendancePercentage > 75 ? (
              <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">Good</span>
            ) : (
              <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">Warning</span>
            )}
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1 group-hover:text-emerald-600 transition-colors">{data.attendancePercentage}%</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
        </div>

        <div className="nested-card p-5 cursor-pointer group hover:shadow-[0_8px_30px_rgba(99,102,241,0.12)] hover:border-indigo-200" onClick={() => navigate('/student/subjects')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 text-indigo-600 flex items-center justify-center text-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-inner">
              <i className="fas fa-book-open"></i>
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1 group-hover:text-indigo-600 transition-colors">{data.activeSubjects}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Subjects</p>
        </div>

        <div className="nested-card p-5 cursor-pointer group hover:shadow-[0_8px_30px_rgba(244,63,94,0.12)] hover:border-rose-200" onClick={() => navigate('/student/fees')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-rose-50 text-rose-600 flex items-center justify-center text-xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-inner">
              <i className="fas fa-wallet"></i>
            </div>
            {data.pendingFees > 0 ? (
              <span className="bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">Due</span>
            ) : (
              <span className="bg-emerald-100 text-emerald-700 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">Paid</span>
            )}
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1 group-hover:text-rose-600 transition-colors">₹{data.pendingFees.toLocaleString()}</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Fees</p>
        </div>

        <div className="nested-card p-5 cursor-pointer group hover:shadow-[0_8px_30px_rgba(245,158,11,0.12)] hover:border-amber-200" onClick={() => navigate('/student/exams')}>
          <div className="flex justify-between items-start mb-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-50 text-amber-600 flex items-center justify-center text-xl group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-inner">
              <i className="fas fa-trophy"></i>
            </div>
            <span className="bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full text-[10px] font-bold shadow-sm">Grade A</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1 group-hover:text-amber-600 transition-colors">{data.lastExamScore}%</h3>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Last Exam Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Classes */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-sm">
                <i className="fas fa-video"></i>
              </div>
              Today's Schedule
            </h3>
            <button onClick={() => navigate('/student/live-classes')} className="text-indigo-600 font-bold text-sm hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">View Calendar</button>
          </div>
          <div className="p-6 flex-1 space-y-5">
            
            {data.upcomingClasses.length > 0 ? data.upcomingClasses.map((cls, idx) => (
              <div key={idx} className={`flex gap-5 p-5 rounded-2xl border group hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden ${cls.status === 'Live' ? 'bg-gradient-to-r from-indigo-50/80 to-white border-indigo-100/50 hover:border-indigo-200' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                <div className={`absolute left-0 top-0 bottom-0 w-1.5 rounded-l-2xl ${cls.status === 'Live' ? 'bg-indigo-500' : 'bg-slate-300 group-hover:bg-slate-400 transition-colors'}`}></div>
                <div className={`flex flex-col items-center justify-center min-w-[60px] ml-2 ${cls.status === 'Live' ? 'text-indigo-600' : 'text-slate-500'}`}>
                  <i className="fas fa-calendar-day text-2xl mb-1"></i>
                </div>
                <div className={`flex-1 border-l-2 pl-4 ${cls.status === 'Live' ? 'border-indigo-200' : 'border-slate-200'}`}>
                  <h4 className={`font-bold text-lg transition-colors ${cls.status === 'Live' ? 'text-slate-800 group-hover:text-indigo-700' : 'text-slate-800 group-hover:text-slate-900'}`}>{cls.subject} - {cls.topic}</h4>
                  <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-2">
                    <i className="fas fa-clock text-slate-400"></i> {cls.time}
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    {cls.status === 'Live' && (
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-2 shadow-sm border border-emerald-200">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span> Live Now
                      </span>
                    )}
                    {cls.status === 'Upcoming' && (
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-md text-xs font-bold flex items-center gap-2 shadow-sm border border-amber-200">
                        Upcoming
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-slate-400 font-medium">No upcoming classes scheduled.</div>
            )}

          </div>
        </div>

        {/* Recent Notifications */}
        <div className="bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/40 overflow-hidden flex flex-col h-full hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-gradient-to-r from-slate-50 to-white">
            <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center text-sm">
                <i className="fas fa-bell"></i>
              </div>
              Recent Notifications
            </h3>
            <button onClick={() => navigate('/student/notifications')} className="text-indigo-600 font-bold text-sm hover:text-indigo-700 hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">View All</button>
          </div>
          <div className="p-6 flex-1 space-y-5">
            
            {data.recentNotifications.length > 0 ? data.recentNotifications.map((notif, idx) => (
              <div key={idx} className="flex gap-4 items-start p-4 rounded-2xl hover:bg-slate-50 transition-colors group cursor-pointer border border-transparent hover:border-slate-100">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm ${
                  notif.icon === 'wallet' ? 'bg-amber-50 text-amber-500' :
                  notif.icon === 'bullhorn' ? 'bg-rose-50 text-rose-500' :
                  'bg-indigo-50 text-indigo-500'
                }`}>
                  <i className={`fas fa-${notif.icon || 'bell'} text-lg`}></i>
                </div>
                <div className="flex-1">
                  <h4 className={`font-bold text-base transition-colors ${
                    notif.icon === 'wallet' ? 'group-hover:text-amber-600' :
                    notif.icon === 'bullhorn' ? 'group-hover:text-rose-600' :
                    'group-hover:text-indigo-600'
                  } text-slate-800`}>{notif.title}</h4>
                  <p className="text-xs font-bold text-slate-400 mt-2 flex items-center gap-1">
                    <i className="far fa-clock"></i> {notif.time}
                  </p>
                </div>
              </div>
            )) : (
              <div className="text-center py-10 text-slate-400 font-medium">No new notifications.</div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
