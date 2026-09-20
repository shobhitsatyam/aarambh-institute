import React, { useState, useEffect } from 'react';

const Subject = () => {
  // Using state to simulate fetching data. Empty for new users.
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSubjects([]); // No subjects for newly registered students
      setLoading(false);
    }, 500);
  }, []);

  const colorMap = {
    indigo: {
      light: 'bg-indigo-50',
      text: 'text-indigo-600',
      border: 'border-indigo-100',
      hoverBg: 'hover:bg-indigo-100',
      bgDark: 'bg-indigo-500',
      shadow: 'hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:border-indigo-100',
      gradient: 'from-indigo-500 to-indigo-400'
    },
    emerald: {
      light: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      hoverBg: 'hover:bg-emerald-100',
      bgDark: 'bg-emerald-500',
      shadow: 'hover:shadow-[0_20px_50px_rgba(16,185,129,0.12)] hover:border-emerald-100',
      gradient: 'from-emerald-500 to-emerald-400'
    },
    rose: {
      light: 'bg-rose-50',
      text: 'text-rose-600',
      border: 'border-rose-100',
      hoverBg: 'hover:bg-rose-100',
      bgDark: 'bg-rose-500',
      shadow: 'hover:shadow-[0_20px_50px_rgba(225,29,72,0.12)] hover:border-rose-100',
      gradient: 'from-rose-500 to-rose-400'
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-layer-group"></i>
            </div>
            My Subjects
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">Track your syllabus progress across all enrolled subjects.</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
      ) : subjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subjects.map((sub) => {
            const colors = colorMap[sub.color];
            
            return (
              <div key={sub.id} className={`relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 flex flex-col h-full ${colors.shadow}`}>
                
                {/* Animated Rotating Border */}
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                   <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#6366f1_80%,#ec4899_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Actual Card Content */}
                <div className="relative bg-white rounded-[calc(2rem-2px)] p-7 h-full flex flex-col z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl ${colors.light} ${colors.text} flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border ${colors.border}`}>
                      <i className="fas fa-book-open"></i>
                    </div>
                    <span className="bg-slate-50 border border-slate-200 text-slate-500 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                      {sub.code}
                    </span>
                  </div>
                  
                  <h3 className={`font-black text-slate-800 text-2xl mb-2 group-hover:${colors.text} transition-colors`}>{sub.name}</h3>
                  <p className="text-sm font-semibold text-slate-500 mb-8 flex items-center gap-2">
                    <i className={`fas fa-chalkboard-teacher ${colors.text} opacity-70`}></i> {sub.teacher}
                  </p>
                  
                  <div className="space-y-3 mt-auto">
                    <div className="flex justify-between items-end text-sm">
                      <span className="font-bold text-slate-600">Syllabus Progress</span>
                      <span className={`font-black ${colors.text}`}>{sub.progress}%</span>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden shadow-inner border border-slate-200/50">
                      <div 
                        className={`h-full ${colors.bgDark} rounded-full relative transition-all duration-1000 ease-out`}
                        style={{ width: `${sub.progress}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
                      </div>
                    </div>
                    
                    <p className="text-[11px] font-bold text-slate-400 text-right mt-1 tracking-wide uppercase">
                      {sub.completedChapters} of {sub.totalChapters} Chapters
                    </p>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-100 flex gap-3">
                    <button onClick={() => alert("Modules will be available soon.")} className={`flex-1 ${colors.light} ${colors.text} ${colors.hoverBg} font-bold py-3 rounded-xl text-sm transition-all shadow-sm group-hover:shadow-md`}>
                      View Modules
                    </button>
                    <button onClick={() => alert("Syllabus download starting...")} className={`flex-1 bg-white border border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-50 font-bold py-3 rounded-xl text-sm transition-all shadow-sm group-hover:shadow-md`}>
                      Syllabus
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center shadow-sm flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-6">
            <i className="fas fa-folder-open text-4xl text-slate-300"></i>
          </div>
          <h3 className="text-2xl font-black text-slate-800 mb-2 tracking-tight">No Subjects Assigned Yet</h3>
          <p className="text-slate-500 font-medium max-w-md mx-auto mb-8">
            You have just registered. The admin team is currently reviewing your profile and will assign you the relevant subjects shortly.
          </p>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
            Refresh Status
          </button>
        </div>
      )}
    </div>
  );
};

export default Subject;
