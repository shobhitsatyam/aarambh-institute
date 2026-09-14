import React, { useState } from 'react';

const ManageExams = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const exams = [
    { id: 'EXM-101', title: 'Mid-Term Physics (Theory)', course: 'BBOSE 12th', date: 'Nov 15, 2026', time: '10:00 AM', status: 'Scheduled', students: 145 },
    { id: 'EXM-102', title: 'Calculus Unit Test', course: 'NIOS 12th', date: 'Nov 20, 2026', time: '02:00 PM', status: 'Scheduled', students: 89 },
    { id: 'EXM-103', title: 'September Monthly Test', course: 'All Courses', date: 'Sep 28, 2026', time: '10:00 AM', status: 'Completed', students: 320 },
  ];

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
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Scheduled</option>
              <option>Ongoing</option>
              <option>Completed</option>
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
              {exams.map((exam, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{exam.title}</p>
                    <p className="text-xs font-semibold text-slate-500">{exam.id}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap">
                      {exam.course}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{exam.date}</p>
                    <p className="text-xs text-slate-500 font-semibold"><i className="far fa-clock mr-1"></i>{exam.time}</p>
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

      {/* Add Exam Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-calendar-plus text-indigo-500"></i> Schedule New Exam
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Exam Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Mid-Term Physics" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Time</label>
                  <input type="time" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Course</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                  <option>BBOSE 10th</option>
                  <option>NIOS 12th</option>
                  <option>All Courses</option>
                </select>
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Create Schedule
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageExams;
