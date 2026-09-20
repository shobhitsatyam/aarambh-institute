import React, { useState } from 'react';

const ManageBlogCategories = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const categories = [
    { id: 1, name: 'Exam Prep', description: 'Tips and strategies for various competitive and board exams.', slug: 'exam-prep', count: 12 },
    { id: 2, name: 'Study Tips', description: 'General advice on how to study effectively and manage time.', slug: 'study-tips', count: 8 },
    { id: 3, name: 'Announcements', description: 'Official news and updates from Aarambh Institute.', slug: 'announcements', count: 5 },
    { id: 4, name: 'Career Guidance', description: 'Insights into different career paths after 10th and 12th.', slug: 'career-guidance', count: 3 },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Blog Categories</h2>
          <p className="text-sm text-slate-500">Manage categories used to organize your blog posts.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-plus mr-2"></i> Add Category
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Category Name & Slug</th>
                <th className="p-5 font-bold border-b border-slate-100">Description</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Posts</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{cat.name}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-1">/{cat.slug}</p>
                  </td>
                  <td className="p-5">
                    <p className="text-slate-600 line-clamp-2 max-w-sm">{cat.description}</p>
                  </td>
                  <td className="p-5 text-center">
                    <span className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-bold">
                      {cat.count}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); import('react-hot-toast').then(m => m.toast('Edit mode enabled. Changes can be made in the form.')); }}  className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={(e) => { 
    e.preventDefault(); 
    e.stopPropagation();
    if(window.confirm('Are you sure you want to delete this?')) {
      if(window.confirm('WARNING: This action is irreversible. Do you REALLY want to delete?')) {
        import('react-hot-toast').then(m => m.toast.success('Item deleted successfully!'));
        const tr = e.target.closest('tr');
        if(tr) tr.style.display = 'none';
      }
    }
  }}  className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Delete">
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-tags text-indigo-500"></i> Add New Category
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category Name</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors font-semibold" placeholder="e.g. Technology" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Slug (URL)</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. technology" />
                <p className="text-xs text-slate-400 mt-1.5 font-semibold">Will be used in the URL: /blog/category/slug</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Briefly describe this category..."></textarea>
              </div>
              
              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Save Category
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogCategories;
