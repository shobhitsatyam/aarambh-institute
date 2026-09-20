import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageStudyMaterial = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    type: 'PDF',
    course: 'BBOSE 10th',
    is_free: true,
    price: ''
  });

  const fetchMaterials = async () => {
    try {
      const response = await api.get('/admin/materials');
      if (response.data.success) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
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

  const handleAddMaterial = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      data.append('title', formData.title);
      data.append('type', formData.type);
      data.append('course', formData.course);
      data.append('is_free', formData.is_free);
      if (!formData.is_free) data.append('price', formData.price);
      if (selectedFile) data.append('file', selectedFile);

      const response = await api.post('/admin/materials', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setShowAddModal(false);
        setFormData({ title: '', type: 'PDF', course: 'BBOSE 10th', is_free: true, price: '' });
        setSelectedFile(null);
        fetchMaterials();
      }
    } catch (error) {
      console.error("Failed to add material", error);
      alert('Error adding material');
    }
  };

  const filteredMaterials = activeTab === 'All' ? materials : materials.filter(m => m.type === activeTab);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Study Materials</h2>
          <p className="text-sm text-slate-500">Upload and manage PDFs, notes, and set prices.</p>
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Material Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Access / Price</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredMaterials.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-slate-500">No materials found.</td>
                </tr>
              ) : filteredMaterials.map((mat, idx) => (
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
                        <p className="text-xs font-semibold text-slate-500">ID: {mat.id} • {mat.size}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {mat.course}
                    </span>
                  </td>
                  <td className="p-5">
                    {mat.is_free ? (
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Free</span>
                    ) : (
                      <span className="bg-amber-100 text-amber-600 px-3 py-1 rounded-full text-xs font-bold">₹{mat.price}</span>
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
    if(window.confirm('Are you sure you want to delete this material?')) {
      if(window.confirm('WARNING: This action is irreversible. Do you REALLY want to delete?')) {
        import('react-hot-toast').then(async (m) => {
          try {
            const res = await api.delete(`/admin/materials/${mat.id}`);
            if (res.data.success) {
              m.toast.success('Material deleted successfully!');
              fetchMaterials();
            }
          } catch(err) {
            m.toast.error('Failed to delete material');
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

      {/* Add Material Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-cloud-upload-alt text-indigo-500"></i> Upload New Material
            </h3>
            
            <form className="space-y-5" onSubmit={handleAddMaterial}>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Chapter 1 Complete Notes" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Type</label>
                  <select name="type" value={formData.type} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option value="PDF">PDF Document</option>
                    <option value="Document">Word Document</option>
                    <option value="Video">Video Link</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Course</label>
                  <select name="course" value={formData.course} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option value="BBOSE 10th">BBOSE 10th</option>
                    <option value="NIOS 12th">NIOS 12th</option>
                    <option value="Medical Prep">Medical Prep</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Upload File</label>
                <input type="file" onChange={handleFileChange} required className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col gap-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" name="is_free" checked={formData.is_free} onChange={handleInputChange} className="w-5 h-5 accent-indigo-600 cursor-pointer rounded border-slate-300" />
                  <span className="text-sm font-bold text-slate-700">Make this material Free?</span>
                </label>
                
                {!formData.is_free && (
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Price (₹)</label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} required min="0" className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. 500" />
                  </div>
                )}
              </div>

              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
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
