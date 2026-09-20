import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ title: '', subject: '', dueDate: '', totalMarks: 100 });

  const fetchAssignments = async () => {
    try {
      const response = await api.get('/teacher/assignments');
      if (response.data.success) {
        setAssignments(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch assignments", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAssignments();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/teacher/assignments', formData);
      if (res.data.success) {
        import('react-hot-toast').then(m => m.toast.success('Assignment Created!'));
        setShowModal(false);
        setFormData({ title: '', subject: '', dueDate: '', totalMarks: 100 });
        fetchAssignments();
      }
    } catch (error) {
      import('react-hot-toast').then(m => m.toast.error('Error creating assignment'));
    }
  };

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-sky-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">Assignments & Grading</h2>
        <button onClick={() => setShowModal(true)} className="bg-sky-500 hover:bg-sky-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-sky-500/30 transition-all">
          <i className="fas fa-plus mr-2"></i> Create New
        </button>
      </div>

      {assignments.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="text-5xl text-sky-200 mb-4"><i className="fas fa-clipboard-list"></i></div>
          <h3 className="text-xl font-bold text-slate-700">No pending assignments to grade.</h3>
          <p className="text-slate-500 mt-2">You're all caught up! Enjoy your day.</p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-1">{assignment.title}</h3>
                <p className="text-sm font-semibold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md inline-block mb-4">{assignment.subject}</p>
                <div className="flex justify-between text-sm text-slate-500 mb-2">
                  <span>Due Date: {assignment.dueDate}</span>
                  <span className="font-bold text-slate-700">{assignment.submitted}/{assignment.total} Submitted</span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 rounded-full h-2 mt-2">
                  <div className="bg-sky-500 h-2 rounded-full" style={{ width: `${(assignment.submitted / assignment.total) * 100}%` }}></div>
                </div>
              </div>
              <button className="w-full mt-6 bg-slate-50 hover:bg-sky-50 text-sky-600 border border-slate-200 hover:border-sky-200 py-2.5 rounded-xl text-sm font-bold transition-colors">
                Grade Submissions
              </button>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Create Assignment</h3>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" required />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subject</label>
                <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100" required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Due Date</label>
                  <input type="date" value={formData.dueDate} onChange={e => setFormData({...formData, dueDate: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-400" required />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Total Marks</label>
                  <input type="number" value={formData.totalMarks} onChange={e => setFormData({...formData, totalMarks: e.target.value})} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-sky-400" required />
                </div>
              </div>
              <button type="submit" className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-xl transition-all mt-4">
                Create
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignments;
