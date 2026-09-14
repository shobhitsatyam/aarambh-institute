import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const studentName = 'Aditya Ravi';

  return (
    <div>
      {/* Welcome Banner */}
      <div className="premium-glass-card p-8 mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-3xl font-black mb-2">Welcome back, {studentName}! 👋</h2>
          <p className="text-indigo-100 max-w-lg leading-relaxed">
            You have <span className="font-bold text-white">2 upcoming classes</span> today and a pending assignment due tomorrow. Let's make today productive!
          </p>
          <button 
            onClick={() => navigate('/student/live-classes')}
            className="mt-6 bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold shadow-lg hover:-translate-y-0.5 transition-transform"
          >
            Join Next Class
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
        
        <div className="nested-card p-6 cursor-pointer group" onClick={() => navigate('/student/attendance')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-clipboard-check"></i>
            </div>
            <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded text-xs font-bold">Excellent</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">85%</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Attendance</p>
        </div>

        <div className="nested-card p-6 cursor-pointer group" onClick={() => navigate('/student/subjects')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-book-open"></i>
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">4</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Subjects</p>
        </div>

        <div className="nested-card p-6 cursor-pointer group" onClick={() => navigate('/student/fees')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-wallet"></i>
            </div>
            <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded text-xs font-bold">Due</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">₹15k</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Pending Fees</p>
        </div>

        <div className="nested-card p-6 cursor-pointer group" onClick={() => navigate('/student/exams')}>
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-trophy"></i>
            </div>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded text-xs font-bold">Grade A</span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">82%</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Last Exam Score</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Upcoming Classes */}
        <div className="nested-card overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-video text-indigo-500"></i> Today's Schedule
            </h3>
            <button onClick={() => navigate('/student/live-classes')} className="text-indigo-600 font-bold text-sm hover:underline">View Calendar</button>
          </div>
          <div className="p-6 flex-1 space-y-4">
            
            <div className="flex gap-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 group hover:bg-indigo-50 transition-colors">
              <div className="flex flex-col items-center justify-center min-w-[60px] text-indigo-600">
                <span className="text-xs font-bold uppercase tracking-widest">Oct</span>
                <span className="text-2xl font-black">24</span>
              </div>
              <div className="flex-1 border-l-2 border-indigo-200 pl-4">
                <h4 className="font-bold text-slate-800 text-lg">Physics - Kinematics</h4>
                <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-2">
                  <i className="fas fa-clock text-slate-400"></i> 10:00 AM - 11:30 AM
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="bg-white border border-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs font-bold">Prof. Sharma</span>
                  <span className="bg-emerald-100 text-emerald-600 px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live Now
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:bg-slate-100 transition-colors">
              <div className="flex flex-col items-center justify-center min-w-[60px] text-slate-500">
                <span className="text-xs font-bold uppercase tracking-widest">Oct</span>
                <span className="text-2xl font-black">24</span>
              </div>
              <div className="flex-1 border-l-2 border-slate-200 pl-4">
                <h4 className="font-bold text-slate-800 text-lg">Chemistry - Organic</h4>
                <p className="text-sm font-semibold text-slate-500 mt-1 flex items-center gap-2">
                  <i className="fas fa-clock text-slate-400"></i> 12:00 PM - 01:30 PM
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <span className="bg-white border border-slate-200 text-slate-600 px-2 py-1 rounded text-xs font-bold">Dr. Singh</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Recent Notifications */}
        <div className="nested-card overflow-hidden flex flex-col h-full">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
              <i className="fas fa-bell text-rose-500"></i> Recent Notifications
            </h3>
            <button onClick={() => navigate('/student/notifications')} className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
          </div>
          <div className="p-6 flex-1 space-y-4">
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                <i className="fas fa-bullhorn"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Holiday Announcement</h4>
                <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">The institute will remain closed on Oct 26th due to local elections.</p>
                <p className="text-xs font-semibold text-slate-400 mt-1.5">2 hours ago</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-500 flex items-center justify-center shrink-0">
                <i className="fas fa-book-open"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">New Study Material</h4>
                <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">Chapter 4 Notes have been uploaded for Physics.</p>
                <p className="text-xs font-semibold text-slate-400 mt-1.5">Yesterday</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-500 flex items-center justify-center shrink-0">
                <i className="fas fa-wallet"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">Fee Payment Reminder</h4>
                <p className="text-sm text-slate-500 mt-0.5 line-clamp-1">Your 2nd installment for the course is due next week.</p>
                <p className="text-xs font-semibold text-slate-400 mt-1.5">Oct 20, 2026</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default StudentDashboard;
