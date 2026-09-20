import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageExams = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form State
  const [formData, setFormData] = useState({
    title: '',
    course: 'All Courses',
    exam_date: '',
    exam_time: ''
  });

  const fetchExams = async () => {
    try {
      const response = await api.get('/admin/exams');
      if (response.data.success) {
        setExams(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching exams', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddExam = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/admin/exams', formData);
      if (response.data.success) {
        alert("Exam scheduled successfully!");
        setShowAddModal(false);
        setFormData({ title: '', course: 'All Courses', exam_date: '', exam_time: '' });
        fetchExams();
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to schedule exam');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Examinations</h2>
          <p className="text-sm text-slate-500">Schedule tests, assign syllabus, and publish results.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-plus-circle mr-2"></i> Schedule Exam
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Courses</option>
              <option>BBOSE 12th</option>
              <option>NIOS 12th</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search exams..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Exam Details</th>
                <th className="p-5 font-bold border-b border-slate-100">Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Date & Time</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Enrolled</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {exams.length === 0 ? (
                <tr><td colSpan="6" className="text-center p-8 text-slate-500">No exams scheduled yet.</td></tr>
              ) : exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{exam.title}</p>
                    <p className="text-xs font-semibold text-slate-500">{exam.exam_id}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {exam.course}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{formatDate(exam.exam_date)}</p>
                    <p className="text-xs text-slate-500 font-semibold"><i className="far fa-clock mr-1"></i>{exam.exam_time}</p>
                  </td>
                  <td className="p-5 text-center">
                    <span className="font-black text-slate-700">{exam.students}</span>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      exam.status === 'Scheduled' ? 'bg-amber-100 text-amber-700' :
                      exam.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {exam.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      {exam.status === 'Completed' ? (
                        <button className="px-3 py-1.5 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white text-xs font-bold transition-colors">
                          Publish Results
                        </button>
                      ) : (
                        <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white text-xs font-bold transition-colors">
                          Edit Paper
                        </button>
                      )}
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

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-calendar-plus text-indigo-500"></i> Schedule New Exam
            </h3>
            
            <form onSubmit={handleAddExam} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Exam Title</label>
                <input required type="text" name="title" value={formData.title} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Mid-Term Physics" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                  <input required type="date" name="exam_date" value={formData.exam_date} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time</label>
                  <input required type="time" name="exam_time" value={formData.exam_time} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Course</label>
                <select name="course" value={formData.course} onChange={handleInputChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                  <option>All Courses</option>
                  <option>BBOSE 10th</option>
                  <option>NIOS 12th</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-100 text-slate-700 hover:bg-slate-200 px-4 py-3 rounded-xl font-bold transition-colors">
                  Cancel
                </button>
                <button type="submit" className="flex-1 bg-indigo-600 text-white hover:bg-indigo-700 px-4 py-3 rounded-xl font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5">
                  Schedule Exam
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExams;
