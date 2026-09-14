import React from 'react';

const Attendance = () => {
  // Mock Data
  const stats = {
    overall: 85,
    present: 102,
    absent: 12,
    late: 6,
    totalClasses: 120
  };

  const recentRecords = [
    { date: 'Oct 24, 2026', subject: 'Physics', status: 'Present', time: '10:00 AM' },
    { date: 'Oct 23, 2026', subject: 'Chemistry', status: 'Present', time: '11:30 AM' },
    { date: 'Oct 22, 2026', subject: 'Mathematics', status: 'Absent', time: '09:00 AM' },
    { date: 'Oct 21, 2026', subject: 'Physics', status: 'Late', time: '10:15 AM' },
    { date: 'Oct 20, 2026', subject: 'Biology', status: 'Present', time: '02:00 PM' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Attendance</h2>
        <p className="text-sm text-slate-500">Track your class presence and overall attendance percentage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        
        {/* Main Stats Card (Circular Progress Mockup) */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden group">
          <h3 className="text-lg font-bold text-slate-800 mb-6 w-full text-left relative z-10">Overall Attendance</h3>
          
          <div className="relative w-48 h-48 flex items-center justify-center z-10">
            {/* SVG Circle for Progress (85%) */}
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-slate-100" />
              <circle cx="96" cy="96" r="80" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray="502" strokeDashoffset="75" className="text-indigo-500 transition-all duration-1000 ease-out" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-black text-slate-800">{stats.overall}%</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">Excellent</span>
            </div>
          </div>
          
          <p className="text-sm font-semibold text-slate-500 mt-6 relative z-10">
            You have attended <span className="text-indigo-600 font-bold">{stats.present}</span> out of <span className="text-slate-700 font-bold">{stats.totalClasses}</span> classes.
          </p>

          <i className="fas fa-chart-pie absolute -right-12 -bottom-12 text-[150px] text-slate-50 group-hover:scale-110 transition-transform duration-500"></i>
        </div>

        {/* Detailed Stats Cards */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl mb-4">
                <i className="fas fa-check-circle"></i>
              </div>
              <p className="text-sm font-bold text-emerald-50 mb-1 uppercase tracking-wider">Total Present</p>
              <h4 className="text-4xl font-black">{stats.present}</h4>
            </div>
            <i className="fas fa-check absolute -right-4 -bottom-4 text-[100px] text-white/10"></i>
          </div>

          <div className="bg-gradient-to-br from-rose-400 to-rose-600 rounded-3xl p-6 text-white shadow-lg shadow-rose-200 relative overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-transform">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl mb-4">
                <i className="fas fa-times-circle"></i>
              </div>
              <p className="text-sm font-bold text-rose-50 mb-1 uppercase tracking-wider">Total Absent</p>
              <h4 className="text-4xl font-black">{stats.absent}</h4>
            </div>
            <i className="fas fa-times absolute -right-4 -bottom-4 text-[100px] text-white/10"></i>
          </div>

          <div className="sm:col-span-2 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-1">Late Arrivals</p>
                <h4 className="text-2xl font-black text-slate-800">{stats.late}</h4>
              </div>
            </div>
            <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-5 py-2.5 rounded-xl transition-colors">
              View Policy
            </button>
          </div>
        </div>
      </div>

      {/* Recent Records Table */}
      <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Records</h3>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Date</th>
                <th className="p-5 font-bold border-b border-slate-100">Subject</th>
                <th className="p-5 font-bold border-b border-slate-100">Time</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentRecords.map((record, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-5 font-bold text-slate-800">{record.date}</td>
                  <td className="p-5 font-semibold text-slate-600">{record.subject}</td>
                  <td className="p-5 font-semibold text-slate-500">{record.time}</td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      record.status === 'Present' ? 'bg-emerald-100 text-emerald-700' :
                      record.status === 'Absent' ? 'bg-rose-100 text-rose-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
};

export default Attendance;
