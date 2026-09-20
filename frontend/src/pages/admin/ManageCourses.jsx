import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageCourses = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '3 Months',
    is_free: true,
    price: '',
    includes_live_classes: false,
    includes_recorded_classes: false
  });

  const fetchCourses = async () => {
    try {
      const response = await api.get('/admin/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('duration', formData.duration);
      data.append('includes_live_classes', formData.includes_live_classes);
      data.append('includes_recorded_classes', formData.includes_recorded_classes);
      data.append('is_free', formData.is_free);
      if (!formData.is_free) data.append('price', formData.price);
      if (selectedFile) data.append('thumbnail', selectedFile);

      const response = await api.post('/admin/courses', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setShowAddModal(false);
        setFormData({ title: '', description: '', duration: '3 Months', is_free: true, price: '', includes_live_classes: false, includes_recorded_classes: false });
        setSelectedFile(null);
        fetchCourses();
      }
    } catch (error) {
      console.error("Failed to add course", error);
      alert('Error adding course');
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Courses</h2>
          <p className="text-sm text-slate-500">Create and manage courses, set pricing, and tags.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-plus mr-2"></i> Create Course
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Course Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Duration</th>
                <th className="p-5 font-bold border-b border-slate-100">Features</th>
                <th className="p-5 font-bold border-b border-slate-100">Price</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {courses.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No courses found.</td>
                </tr>
              ) : courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 bg-indigo-50 text-indigo-500">
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{course.title}</p>
                        <p className="text-xs font-semibold text-slate-500">{course.description?.substring(0, 30)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {course.duration}
                    </span>
                  </td>
                  <td className="p-5 flex flex-wrap gap-2">
                    {course.includes_live_classes ? <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded text-[10px] font-bold"><i className="fas fa-video"></i> Live</span> : null}
                    {course.includes_recorded_classes ? <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-[10px] font-bold"><i className="fas fa-play-circle"></i> VOD</span> : null}
                  </td>
                  <td className="p-5">
                    {course.is_free ? (
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Free</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">₹{course.price}</span>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); import('react-hot-toast').then(m => m.toast('Edit mode enabled. Changes can be made in the form.')); }}  className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={async (e) => { 
    e.preventDefault(); 
    e.stopPropagation();
    if(window.confirm('Are you sure you want to delete this course?')) {
      if(window.confirm('WARNING: This action is irreversible. Do you REALLY want to delete?')) {
        import('react-hot-toast').then(async (m) => {
          try {
            const res = await api.delete(`/admin/courses/${course.id}`);
            if (res.data.success) {
              m.toast.success('Course deleted successfully!');
              fetchCourses();
            }
          } catch(err) {
            m.toast.error('Failed to delete course');
          }
        });
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

      {/* Add Course Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-plus-circle text-indigo-500"></i> Create New Course
            </h3>
            
            <form className="space-y-5" onSubmit={handleAddCourse}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Complete Physics for 12th" />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Short description..." rows="2"></textarea>
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Duration</label>
                  <input type="text" name="duration" value={formData.duration} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. 3 Months" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload Thumbnail</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>

              {/* Checkboxes for Features */}
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="includes_live_classes" checked={formData.includes_live_classes} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Includes Live Classes</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" name="includes_recorded_classes" checked={formData.includes_recorded_classes} onChange={handleInputChange} className="w-4 h-4 accent-indigo-600 rounded border-slate-300" />
                  <span className="text-sm text-slate-700">Includes Recorded Videos</span>
                </label>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="is_free" checked={formData.is_free} onChange={handleInputChange} className="w-5 h-5 accent-indigo-600 cursor-pointer rounded border-slate-300" />
                  <span className="text-sm font-bold text-slate-700">Make this course Free?</span>
                </label>
                
                {!formData.is_free && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. 1999" />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
