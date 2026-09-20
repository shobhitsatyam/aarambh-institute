import React, { useState } from 'react';

const ManageLiveClass = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [startedClass, setStartedClass] = useState(null);
  
  const classes = [
    { id: 'LC-101', title: 'Advanced Physics (Mechanics)', instructor: 'Prof. Sharma', course: 'BBOSE 12th', date: 'Oct 24, 2026', time: '10:00 AM', status: 'Upcoming', students: 45 },
    { id: 'LC-102', title: 'Organic Chemistry Revision', instructor: 'Dr. Singh', course: 'Medical Prep', date: 'Oct 24, 2026', time: '02:00 PM', status: 'Upcoming', students: 120 },
    { id: 'LC-103', title: 'Calculus Ch-4', instructor: 'Mr. Verma', course: 'NIOS 12th', date: 'Oct 23, 2026', time: '09:00 AM', status: 'Completed', students: 38 },
  ];

  if (startedClass) {
    const roomName = `Aarambh_Institute_Class_${startedClass.id}`;
    return (
      <div className="flex flex-col h-[80vh] w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl relative">
        <div className="flex justify-between items-center p-4 bg-slate-800 text-white">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Hosting: {startedClass.title}
            </h2>
          </div>
          <button 
            onClick={() => setStartedClass(null)}
            className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2"
          >
            <i className="fas fa-stop"></i> End Class
          </button>
        </div>
        <iframe
          src={`https://meet.jit.si/${roomName}`}
          allow="camera; microphone; fullscreen; display-capture; autoplay"
          className="flex-1 w-full border-none"
        ></iframe>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Live Classes</h2>
          <p className="text-sm text-slate-500">Schedule, monitor, and manage online sessions.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-rose-500/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-video mr-2"></i> Schedule Class
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl">
             <i className="fas fa-calendar-check"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">12</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Scheduled Today</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
             <i className="fas fa-play-circle"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">3</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Ongoing Now</p>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-xl">
             <i className="fas fa-history"></i>
          </div>
          <div>
            <p className="text-2xl font-bold text-slate-800">145</p>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Recorded</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Class Schedule</h3>
          
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-rose-400">
              <option>All Courses</option>
              <option>BBOSE 12th</option>
              <option>Medical Prep</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-rose-400">
              <option>All Status</option>
              <option>Upcoming</option>
              <option>Ongoing</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Class Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Instructor</th>
                <th className="p-5 font-bold border-b border-slate-100">Date & Time</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Enrolled</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {classes.map((cls, idx) => (
                <tr key={idx} className="hover:bg-rose-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800 mb-1">{cls.title}</p>
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold">{cls.course}</span>
                  </td>
                  <td className="p-5">
                    <p className="font-semibold text-slate-700">{cls.instructor}</p>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{cls.date}</p>
                    <p className="text-xs text-slate-500 font-semibold"><i className="far fa-clock mr-1"></i>{cls.time}</p>
                  </td>
                  <td className="p-5 text-center">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-700 font-bold text-xs">
                      {cls.students}
                    </span>
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      cls.status === 'Upcoming' ? 'bg-indigo-100 text-indigo-700' :
                      cls.status === 'Ongoing' ? 'bg-rose-100 text-rose-700 animate-pulse' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {cls.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); import('react-hot-toast').then(m => m.toast('Edit mode enabled. Changes can be made in the form.')); }}  className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button onClick={() => setStartedClass(cls)} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Start Class">
                        <i className="fas fa-play"></i>
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

      {/* Simple Modal Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[95vh] overflow-y-auto">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6">Schedule New Class</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Class Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-500" placeholder="e.g. Physics Ch-1" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date & Time</label>
                <input type="datetime-local" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-rose-500" />
              </div>
              <button className="w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-rose-500/30 mt-4">
                Confirm Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageLiveClass;
