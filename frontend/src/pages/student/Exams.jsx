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
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-100 to-orange-50 text-rose-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-file-alt"></i>
            </div>
            Examinations
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">View your upcoming tests and past performance.</p>
        </div>
      </div>

      {/* Upcoming Exams Section */}
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shadow-sm border border-rose-100">
          <i className="fas fa-calendar-alt"></i>
        </div>
        Upcoming Exams
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {upcomingExams.map((exam) => (
          <div key={exam.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(225,29,72,0.06)] hover:shadow-[0_20px_50px_rgba(225,29,72,0.15)] hover:-translate-y-2 transition-all duration-500 h-full">
            
            {/* Animated Rotating Border */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#f43f5e_80%,#be123c_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Actual Card Content */}
            <div className="relative bg-white rounded-[calc(2rem-2px)] p-8 h-full flex flex-col z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500 overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-rose-50 to-transparent rounded-bl-full pointer-events-none transition-transform duration-700 group-hover:scale-125"></div>
              
              <div className="flex justify-between items-start mb-6 relative z-10">
                <h4 className="font-black text-slate-800 text-2xl leading-tight w-3/4 group-hover:text-rose-600 transition-colors">{exam.title}</h4>
                <span className="bg-rose-50 text-rose-600 px-4 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-black shadow-sm border border-rose-100">
                  {exam.duration}
                </span>
              </div>
              
              <div className="space-y-4 mb-8 relative z-10 flex-1">
                <div className="flex items-center text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 text-slate-400 group-hover:text-rose-500 group-hover:bg-rose-50 transition-colors border border-slate-100">
                    <i className="far fa-calendar-alt"></i>
                  </div>
                  {exam.date}
                </div>
                <div className="flex items-center text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 text-slate-400 group-hover:text-rose-500 group-hover:bg-rose-50 transition-colors border border-slate-100">
                    <i className="far fa-clock"></i>
                  </div>
                  {exam.time}
                </div>
                <div className="flex items-start text-sm font-bold text-slate-600 group-hover:text-slate-800 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 flex items-center justify-center mr-3 text-slate-400 group-hover:text-rose-500 group-hover:bg-rose-50 transition-colors border border-slate-100 shrink-0">
                    <i className="fas fa-book-open"></i>
                  </div>
                  <span className="mt-1.5"><span className="text-slate-400 mr-1 uppercase text-[10px] tracking-wider">Syllabus:</span> {exam.syllabus}</span>
                </div>
              </div>
              
              <button onClick={() => alert("Guidelines will be available soon.")} className="w-full bg-slate-50 border border-slate-200 hover:bg-rose-500 hover:text-white hover:border-rose-500 text-slate-700 font-bold py-3.5 rounded-xl transition-all duration-300 text-sm shadow-sm hover:shadow-[0_8px_20px_rgba(225,29,72,0.3)] relative z-10 group/btn overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  View Guidelines <i className="fas fa-arrow-right text-xs opacity-0 group-hover/btn:opacity-100 -translate-x-2 group-hover/btn:translate-x-0 transition-all"></i>
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Past Results Section */}
      <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3 mt-16">
        <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center shadow-sm border border-emerald-100">
          <i className="fas fa-chart-line"></i>
        </div>
        Past Results
      </h3>
      
      <div className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.15)] transition-shadow duration-500">
        
        {/* Animated Rotating Border */}
        <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#10b981_80%,#047857_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>

        <div className="relative bg-white rounded-[calc(2rem-2px)] overflow-hidden z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 text-[11px] uppercase tracking-widest">
                  <th className="p-6 font-bold border-b border-slate-100">Exam Title</th>
                  <th className="p-6 font-bold border-b border-slate-100">Date Taken</th>
                  <th className="p-6 font-bold border-b border-slate-100 text-center">Score</th>
                  <th className="p-6 font-bold border-b border-slate-100 text-center">Grade</th>
                  <th className="p-6 font-bold border-b border-slate-100 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {pastResults.map((res, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                    <td className="p-6">
                      <p className="font-black text-slate-800 text-base group-hover/row:text-emerald-600 transition-colors">{res.title}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">{res.id}</p>
                    </td>
                    <td className="p-6 font-bold text-slate-600">
                      <i className="far fa-calendar-alt text-slate-400 mr-2"></i>
                      {res.date}
                    </td>
                    <td className="p-6 text-center">
                      <span className="font-black text-xl text-slate-800 group-hover/row:text-emerald-600 transition-colors">{res.score}</span>
                    </td>
                    <td className="p-6 text-center">
                      <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 font-black text-lg shadow-sm group-hover/row:scale-110 group-hover/row:bg-emerald-500 group-hover/row:text-white transition-all duration-300">
                        {res.grade}
                      </span>
                    </td>
                    <td className="p-6 text-right">
                      <button onClick={() => alert("Result details will be available soon.")} className="text-emerald-600 hover:text-white font-bold text-xs bg-white border border-emerald-200 hover:bg-emerald-500 px-5 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-[0_5px_15px_rgba(16,185,129,0.3)] hover:-translate-y-0.5">
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
    </div>
  );
};

export default Exams;
