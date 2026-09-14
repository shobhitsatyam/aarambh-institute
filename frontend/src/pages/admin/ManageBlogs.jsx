import React, { useState } from 'react';

const ManageBlogs = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const blogs = [
    { id: 1, title: 'How to Prepare for NEET 2027: A Complete Guide', category: 'Exam Prep', author: 'Dr. Singh', date: 'Oct 24, 2026', status: 'Published', views: 1245 },
    { id: 2, title: 'Top 10 Tips for Time Management during Board Exams', category: 'Study Tips', author: 'Prof. Sharma', date: 'Oct 20, 2026', status: 'Published', views: 890 },
    { id: 3, title: 'Understanding the New NIOS Syllabus Changes', category: 'Announcements', author: 'Admin', date: 'Oct 15, 2026', status: 'Draft', views: 0 },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Blogs</h2>
          <p className="text-sm text-slate-500">Publish and manage articles for the main website.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-pen-nib mr-2"></i> Write New Blog
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Categories</option>
              <option>Exam Prep</option>
              <option>Study Tips</option>
              <option>Announcements</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Published</option>
              <option>Draft</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search articles..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100 w-1/3">Blog Title</th>
                <th className="p-5 font-bold border-b border-slate-100">Category</th>
                <th className="p-5 font-bold border-b border-slate-100">Author & Date</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {blogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800 line-clamp-2">{blog.title}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-1">
                      <i className="fas fa-eye"></i> {blog.views} views
                    </p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {blog.category}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-semibold text-slate-700">{blog.author}</p>
                    <p className="text-xs font-semibold text-slate-500">{blog.date}</p>
                  </td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      blog.status === 'Published' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
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

      {/* Add Blog Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-4xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-pen-nib text-indigo-500"></i> Write New Blog
            </h3>
            
            <form className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Blog Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors font-semibold" placeholder="Enter a catchy title..." />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Category</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                    <option>Exam Prep</option>
                    <option>Study Tips</option>
                    <option>Announcements</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Author</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" defaultValue="Admin" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cover Image</label>
                  <input type="file" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex justify-between">
                  <span>Content (Rich Text Editor Mock)</span>
                </label>
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <div className="bg-slate-50 border-b border-slate-200 p-2 flex gap-1">
                    <button type="button" className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600"><i className="fas fa-bold"></i></button>
                    <button type="button" className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600"><i className="fas fa-italic"></i></button>
                    <button type="button" className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600"><i className="fas fa-link"></i></button>
                    <button type="button" className="w-8 h-8 rounded hover:bg-slate-200 flex items-center justify-center text-slate-600"><i className="fas fa-image"></i></button>
                  </div>
                  <textarea rows="10" className="w-full px-4 py-3 text-sm outline-none focus:bg-slate-50 transition-colors resize-none" placeholder="Start writing your blog post here..."></textarea>
                </div>
              </div>
              
              <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                <button type="button" className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold py-3.5 rounded-xl transition-colors">
                  Save as Draft
                </button>
                <button type="button" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                  Publish Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageBlogs;
