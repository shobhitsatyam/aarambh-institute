import React from 'react';

const Exams = () => {
  const upcomingExams = [
    { id: 'EXM-001', title: 'Mid-Term Physics (Theory)', date: 'Nov 15, 2026', time: '10:00 AM', duration: '3 Hours', syllabus: 'Chapter 1 to 5' },
    { id: 'EXM-002', title: 'Calculus Unit Test', date: 'Nov 20, 2026', time: '02:00 PM', duration: '1 Hour', syllabus: 'Integration Basics' },
  ];

  const pastResults = [
    { id: 'RES-001', title: 'September Monthly Test (Math)', date: 'Sep 28, 2026', score: '85/100', grade: 'A', status: 'Passed' },
    { id: 'RES-002', title: 'Physics Quiz 1', date: 'Sep 15, 2026', score: '18/20', grade: 'A+', status: 'Passed' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Examinations</h2>
        <p className="text-sm text-slate-500">View your upcoming tests and past performance.</p>
      </div>

      {/* Upcoming Exams Section */}
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-calendar-alt text-rose-500"></i> Upcoming Exams
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {upcomingExams.map((exam) => (
          <div key={exam.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-rose-100 to-transparent opacity-50 rounded-bl-full pointer-events-none transition-transform group-hover:scale-110"></div>
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <h4 className="font-bold text-slate-800 text-lg leading-tight w-3/4">{exam.title}</h4>
              <span className="bg-rose-50 text-rose-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                {exam.duration}
              </span>
            </div>
            
            <div className="space-y-3 mb-6 relative z-10">
              <div className="flex items-center text-sm font-semibold text-slate-600">
                <i className="far fa-calendar text-slate-400 w-5"></i> {exam.date}
              </div>
              <div className="flex items-center text-sm font-semibold text-slate-600">
                <i className="far fa-clock text-slate-400 w-5"></i> {exam.time}
              </div>
              <div className="flex items-start text-sm font-semibold text-slate-600">
                <i className="fas fa-book text-slate-400 w-5 mt-1"></i> 
                <span><span className="text-slate-400">Syllabus:</span> {exam.syllabus}</span>
              </div>
            </div>
            
            <button className="w-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-700 font-bold py-2.5 rounded-xl transition-colors text-sm shadow-sm relative z-10">
              View Guidelines
            </button>
          </div>
        ))}
      </div>

      {/* Past Results Section */}
      <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <i className="fas fa-chart-line text-emerald-500"></i> Past Results
      </h3>
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Exam Title</th>
                <th className="p-5 font-bold border-b border-slate-100">Date Taken</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Score</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Grade</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pastResults.map((res, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{res.title}</p>
                    <p className="text-xs text-slate-500">{res.id}</p>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{res.date}</td>
                  <td className="p-5 text-center">
                    <span className="font-black text-slate-800">{res.score}</span>
                  </td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 font-black text-sm">
                      {res.grade}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button className="text-rose-500 hover:text-rose-600 font-bold text-sm bg-rose-50 hover:bg-rose-100 px-4 py-2 rounded-lg transition-colors">
                      View Details
                    </button>
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

export default Exams;
