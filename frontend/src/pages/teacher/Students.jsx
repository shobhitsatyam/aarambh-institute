import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Students = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await api.get('/teacher/students');
        if (response.data.success) {
          setStudents(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch students", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-sky-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  const handleMarkAttendance = async (studentId, status) => {
    try {
      const res = await api.post('/teacher/attendance', {
        studentId: studentId.replace('#STU-10', ''),
        subject: 'General',
        date: new Date().toISOString().split('T')[0],
        time: new Date().toLocaleTimeString(),
        status
      });
      if(res.data.success) {
        import('react-hot-toast').then(m => m.toast.success(`Marked ${status}`));
      }
    } catch(e) {
      import('react-hot-toast').then(m => m.toast.error('Failed to mark attendance'));
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-black text-slate-800 mb-6">My Students</h2>
      <div className="nested-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <select className="border border-slate-200 rounded-lg px-4 py-2 bg-white outline-none focus:border-sky-400">
            <option>All Classes</option>
          </select>
          <button className="btn-glow-primary px-4 py-2 rounded-lg font-bold transition-all text-sm">
            <i className="fas fa-check-double mr-1"></i> Mark All Present
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
              <tr>
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Roll No</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Attendance</th>
                <th className="p-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No students found.</td>
                </tr>
              ) : students.map((s, idx) => (
                <tr key={idx} className="border-b border-slate-50 modern-table-row hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-semibold text-slate-700">{s.name}</td>
                  <td className="p-4 text-slate-500">{s.id}</td>
                  <td className="p-4 text-slate-500">{s.course}</td>
                  <td className="p-4">
                    <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">{s.attendance}</span>
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleMarkAttendance(s.id, 'Present')} className="text-emerald-500 hover:bg-emerald-50 p-2 rounded-lg tooltip" title="Mark Present"><i className="fas fa-check"></i></button>
                    <button onClick={() => handleMarkAttendance(s.id, 'Absent')} className="text-rose-500 hover:bg-rose-50 p-2 rounded-lg tooltip ml-2" title="Mark Absent"><i className="fas fa-times"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Students;
