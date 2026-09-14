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
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Study Materials</h2>
          <p className="text-sm text-slate-500">Access your notes, lectures, and resources.</p>
        </div>
        <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-72 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
          <i className="fas fa-search text-slate-400"></i>
          <input type="text" placeholder="Search materials..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'PDF', 'Document', 'Video'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredMaterials.map(mat => (
          <div key={mat.id} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group">
            <div className="flex justify-between items-start mb-4">
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
                mat.type === 'PDF' ? 'bg-rose-50 text-rose-500' :
                mat.type === 'Video' ? 'bg-indigo-50 text-indigo-500' :
                'bg-emerald-50 text-emerald-500'
              }`}>
                <i className={`fas ${mat.type === 'PDF' ? 'fa-file-pdf' : mat.type === 'Video' ? 'fa-play-circle' : 'fa-file-word'}`}></i>
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                {mat.subject}
              </span>
            </div>
            
            <h3 className="font-bold text-slate-800 text-lg mb-2 leading-tight group-hover:text-rose-500 transition-colors">{mat.title}</h3>
            
            <div className="flex-1 flex items-end">
              <div className="w-full flex items-center justify-between pt-4 mt-2 border-t border-slate-100">
                <div className="text-xs font-semibold text-slate-500">
                  <i className="far fa-calendar-alt mr-1"></i> {mat.date} • {mat.size || mat.duration}
                </div>
                <button className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                  mat.type === 'Video' ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white' : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white'
                }`}>
                  <i className={`fas ${mat.type === 'Video' ? 'fa-play' : 'fa-download'}`}></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
