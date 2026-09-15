import React, { useState } from 'react';

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState('All');
  
  const materials = [
    { id: 1, title: 'Physics Chapter 1 Notes', type: 'PDF', subject: 'Physics', size: '2.4 MB', date: 'Oct 20' },
    { id: 2, title: 'Calculus Advanced Formulas', type: 'Document', subject: 'Mathematics', size: '1.1 MB', date: 'Oct 18' },
    { id: 3, title: 'Organic Chemistry Lecture', type: 'Video', subject: 'Chemistry', duration: '45 mins', date: 'Oct 15' },
    { id: 4, title: 'Mechanics Practice Set', type: 'PDF', subject: 'Physics', size: '3.2 MB', date: 'Oct 12' },
  ];

  const filteredMaterials = activeTab === 'All' ? materials : materials.filter(m => m.type === activeTab);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-book-open"></i>
            </div>
            Study Materials
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">Access your notes, lectures, and resources.</p>
        </div>
        
        {/* Search Bar */}
        <div className="flex items-center bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl px-5 py-3 w-full sm:w-80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus-within:shadow-[0_8px_30px_rgba(99,102,241,0.15)] focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300 group">
          <i className="fas fa-search text-slate-400 group-focus-within:text-indigo-500 transition-colors"></i>
          <input type="text" placeholder="Search materials..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 font-medium placeholder-slate-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'PDF', 'Document', 'Video'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5' 
                : 'bg-white border border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5'
            }`}
          >
            {tab === 'All' && <i className="fas fa-layer-group text-xs opacity-70"></i>}
            {tab === 'PDF' && <i className="fas fa-file-pdf text-xs opacity-70"></i>}
            {tab === 'Document' && <i className="fas fa-file-word text-xs opacity-70"></i>}
            {tab === 'Video' && <i className="fas fa-play-circle text-xs opacity-70"></i>}
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMaterials.map(mat => (
          <div key={mat.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-all duration-500 hover:-translate-y-2 cursor-pointer h-full">
            
            {/* Animated Rotating Border */}
            <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#6366f1_80%,#ec4899_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Actual Card Content */}
            <div className="relative bg-white rounded-[calc(2rem-2px)] p-7 h-full flex flex-col z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border ${
                  mat.type === 'PDF' ? 'bg-rose-50 text-rose-500 border-rose-100/50' :
                  mat.type === 'Video' ? 'bg-indigo-50 text-indigo-500 border-indigo-100/50' :
                  'bg-emerald-50 text-emerald-500 border-emerald-100/50'
                }`}>
                  <i className={`fas ${mat.type === 'PDF' ? 'fa-file-pdf' : mat.type === 'Video' ? 'fa-play-circle' : 'fa-file-word'}`}></i>
                </div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                  {mat.subject}
                </span>
              </div>
              
              <h3 className="font-black text-slate-800 text-xl mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{mat.title}</h3>
              
              <div className="flex-1 flex items-end mt-4">
                <div className="w-full flex items-center justify-between pt-5 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <i className="far fa-calendar-alt text-slate-400"></i> {mat.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-database text-slate-400"></i> {mat.size || mat.duration}
                    </span>
                  </div>
                  <button className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-300 shadow-sm ${
                    mat.type === 'Video' 
                      ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)]' 
                      : 'bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(225,29,72,0.3)]'
                  }`}>
                    <i className={`fas ${mat.type === 'Video' ? 'fa-play ml-0.5' : 'fa-download'}`}></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
