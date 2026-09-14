import React from 'react';
import { Link } from 'react-router-dom';

const TeacherDashboard = () => {
  // Mock Data
  const stats = [
    { label: 'Classes Today', value: '3', icon: 'fa-chalkboard', color: 'text-sky-500', bg: 'bg-sky-100' },
    { label: 'Pending Grading', value: '24', icon: 'fa-tasks', color: 'text-amber-500', bg: 'bg-amber-100' },
    { label: 'Total Students', value: '156', icon: 'fa-user-graduate', color: 'text-purple-500', bg: 'bg-purple-100' },
    { label: 'Average Attendance', value: '92%', icon: 'fa-chart-pie', color: 'text-emerald-500', bg: 'bg-emerald-100' },
  ];

  const schedule = [
    { time: '09:00 AM', duration: '1.5 hr', title: 'Mathematics 101 - Section A', type: 'Live Class', link: '#' },
    { time: '11:30 AM', duration: '1 hr', title: 'Physics Fundamentals', type: 'Doubt Clearing', link: '#' },
    { time: '02:00 PM', duration: '2 hr', title: 'Advanced Calculus', type: 'Live Class', link: '#' },
  ];

  const recentSubmissions = [
    { student: 'Aditya Ravi', assignment: 'Calculus Ch-4', time: '10 mins ago' },
    { student: 'Priya Singh', assignment: 'Physics Lab Report', time: '1 hour ago' },
    { student: 'Rahul Sharma', assignment: 'Calculus Ch-4', time: '2 hours ago' },
    { student: 'Neha Gupta', assignment: 'Physics Lab Report', time: '3 hours ago' },
  ];

  return (
    <>
      {/* Welcome Banner */}
      <div className="premium-glass-card p-8 mb-8 flex flex-col md:flex-row items-center justify-between">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Good Morning, Prof. Sharma! ☀️</h2>
          <p className="text-slate-500 text-sm">You have 3 classes scheduled for today and 24 assignments waiting to be graded.</p>
        </div>
        <div className="mt-6 md:mt-0 relative z-10 flex gap-4">
          <button className="bg-sky-50 hover:bg-sky-100 text-sky-600 px-5 py-2.5 rounded-full text-sm font-bold transition-colors shadow-sm">
             <i className="fas fa-file-export mr-2"></i>Export Grades
          </button>
          <button className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-full text-sm font-bold transition-all shadow-lg shadow-sky-500/30 hover:-translate-y-0.5">
             <i className="fas fa-video mr-2"></i>Start Next Class
          </button>
        </div>
        {/* Background pattern */}
        <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-sky-50/50 to-transparent pointer-events-none"></div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="nested-card p-6 flex items-center gap-5 group">
            <div className={`w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
              <i className={`fas ${stat.icon}`}></i>
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Today's Schedule */}
        <div className="xl:col-span-2">
          <div className="nested-card p-6 h-full">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Today's Schedule</h3>
              <p className="text-sm font-semibold text-sky-500">Oct 24, 2026</p>
            </div>
            
            <div className="space-y-4">
              {schedule.map((item, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-100 hover:border-sky-100 hover:bg-sky-50/30 transition-colors group">
                  <div className="sm:w-32 flex flex-col justify-center shrink-0">
                    <span className="text-lg font-bold text-slate-800">{item.time}</span>
                    <span className="text-xs font-semibold text-slate-500">{item.duration}</span>
                  </div>
                  <div className="w-1 h-auto bg-slate-200 rounded-full hidden sm:block group-hover:bg-sky-300 transition-colors"></div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-slate-800 mb-1">{item.title}</h4>
                    <span className="text-xs font-semibold text-sky-600 bg-sky-100 px-2 py-0.5 rounded-full inline-block w-max mb-3 sm:mb-0">
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center sm:justify-end shrink-0">
                    <button className="bg-slate-100 hover:bg-sky-500 hover:text-white text-slate-700 px-4 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto">
                      Join Link
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Pending Grading & Tasks */}
        <div>
          <div className="nested-card p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-slate-800">Recent Submissions</h3>
              <Link to="/teacher/assignments" className="text-sm font-semibold text-sky-500 hover:text-sky-600">View All</Link>
            </div>
            
            <div className="flex-1 space-y-5">
              {recentSubmissions.map((sub, idx) => (
                <div key={idx} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-sky-100 group-hover:text-sky-600 transition-colors">
                      <i className="fas fa-file-alt"></i>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 group-hover:text-sky-600 transition-colors">{sub.student}</p>
                      <p className="text-xs font-medium text-slate-500">{sub.assignment}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-slate-400">{sub.time}</span>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 font-bold text-sm hover:border-sky-300 hover:text-sky-600 transition-colors">
              Open Grading Tool
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default TeacherDashboard;
