import React, { useState } from 'react';

const ManageStudyMaterial = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  
  const materials = [
    { id: 'SM-101', title: 'Physics Chapter 1 Notes', type: 'PDF', course: 'BBOSE 12th', size: '2.4 MB', date: 'Oct 20, 2026', downloads: 145 },
    { id: 'SM-102', title: 'Calculus Formulas', type: 'Document', course: 'NIOS 12th', size: '1.1 MB', date: 'Oct 18, 2026', downloads: 89 },
    { id: 'SM-103', title: 'Organic Chemistry Lec 1', type: 'Video', course: 'Medical Prep', duration: '45 mins', date: 'Oct 15, 2026', views: 320 },
  ];

  const filteredMaterials = activeTab === 'All' ? materials : materials.filter(m => m.type === activeTab);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Study Materials</h2>
          <p className="text-sm text-slate-500">Upload and manage PDFs, notes, and video lectures.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-cloud-upload-alt mr-2"></i> Upload Material
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {['All', 'PDF', 'Document', 'Video'].map(tab => (
              <button 
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${activeTab === tab ? 'bg-indigo-500 text-white shadow-sm' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search materials..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Material Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Upload Date</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Engagement</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredMaterials.map((mat, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${
                        mat.type === 'PDF' ? 'bg-rose-50 text-rose-500' :
                        mat.type === 'Video' ? 'bg-indigo-50 text-indigo-500' :
                        'bg-emerald-50 text-emerald-500'
                      }`}>
                        <i className={`fas ${mat.type === 'PDF' ? 'fa-file-pdf' : mat.type === 'Video' ? 'fa-play-circle' : 'fa-file-word'}`}></i>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{mat.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{mat.id} • {mat.size || mat.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {mat.course}
                    </span>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{mat.date}</td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center justify-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                      <i className={`fas ${mat.type === 'Video' ? 'fa-eye' : 'fa-download'}`}></i>
                      {mat.downloads || mat.views}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Delete">
                        <i className="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-cloud-upload-alt text-indigo-500"></i> Upload New Material
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Chapter 1 Complete Notes" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Material Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>PDF Document</option>
                    <option>Word Document</option>
                    <option>Video Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Course</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>BBOSE 10th</option>
                    <option>NIOS 12th</option>
                    <option>Medical Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload File</label>
                <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:border-indigo-400 transition-colors cursor-pointer bg-slate-50 group">
                  <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center text-indigo-500 mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <i className="fas fa-file-upload text-xl"></i>
                  </div>
                  <p className="text-sm font-bold text-slate-700">Click to browse or drag and drop</p>
                  <p className="text-xs text-slate-500 mt-1">PDF, DOCX up to 10MB</p>
                </div>
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Upload & Publish
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageStudyMaterial;
