import React from 'react';

const Subject = () => {
  const subjects = [
    { id: 1, name: 'Physics', code: 'PHY-101', teacher: 'Prof. Sharma', progress: 65, totalChapters: 15, completedChapters: 10, color: 'indigo' },
    { id: 2, name: 'Chemistry', code: 'CHE-101', teacher: 'Dr. Singh', progress: 40, totalChapters: 12, completedChapters: 5, color: 'emerald' },
    { id: 3, name: 'Mathematics', code: 'MAT-101', teacher: 'Mr. Verma', progress: 80, totalChapters: 10, completedChapters: 8, color: 'rose' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Subjects</h2>
        <p className="text-sm text-slate-500">Track your syllabus progress across all enrolled subjects.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => {
          // Dynamic color classes based on the subject's assigned color
          const bgLight = `bg-${sub.color}-50`;
          const textDark = `text-${sub.color}-600`;
          const bgDark = `bg-${sub.color}-500`;
          
          return (
            <div key={sub.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl ${bgLight} ${textDark} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                  <i className="fas fa-book"></i>
                </div>
                <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold font-mono">
                  {sub.code}
                </span>
              </div>
              
              <h3 className="font-bold text-slate-800 text-xl mb-1">{sub.name}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-6 flex items-center gap-2">
                <i className="fas fa-chalkboard-teacher text-slate-400"></i> {sub.teacher}
              </p>
              
              <div className="space-y-2">
                <div className="flex justify-between items-end text-sm">
                  <span className="font-bold text-slate-700">Syllabus Progress</span>
                  <span className={`font-black ${textDark}`}>{sub.progress}%</span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${bgDark} rounded-full relative`}
                    style={{ width: `${sub.progress}%` }}
                  >
                    <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
                  </div>
                </div>
                
                <p className="text-xs font-semibold text-slate-400 text-right mt-1">
                  {sub.completedChapters} of {sub.totalChapters} Chapters Completed
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-100 flex gap-2">
                <button className={`flex-1 ${bgLight} ${textDark} hover:bg-${sub.color}-100 font-bold py-2.5 rounded-xl text-sm transition-colors`}>
                  View Syllabus
                </button>
                <button className={`flex-1 border border-slate-200 text-slate-600 hover:bg-slate-50 font-bold py-2.5 rounded-xl text-sm transition-colors`}>
                  Materials
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Subject;
