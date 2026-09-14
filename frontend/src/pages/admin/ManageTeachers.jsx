import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ManageTeachers = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const navigate = useNavigate();

  const teachers = [
    { id: 'FAC-001', name: 'R.K. Sharma', subject: 'Physics', experience: '15 Yrs', activeClasses: 4, phone: '+91 9876543210', status: 'Active' },
    { id: 'FAC-002', name: 'Priya Verma', subject: 'Chemistry', experience: '8 Yrs', activeClasses: 3, phone: '+91 8765432109', status: 'Active' },
    { id: 'FAC-003', name: 'Amit Desai', subject: 'Mathematics', experience: '12 Yrs', activeClasses: 5, phone: '+91 7654321098', status: 'On Leave' },
    { id: 'FAC-004', name: 'Dr. Neha Singh', subject: 'Biology', experience: '10 Yrs', activeClasses: 3, phone: '+91 6543210987', status: 'Active' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Manage Teachers</h2>
            <p className="text-sm text-slate-500">Add, edit, and monitor faculty members.</p>
          </div>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-user-plus mr-2"></i> Add New Teacher
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
              <option>Biology</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>Active</option>
              <option>On Leave</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search teacher..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Faculty Details</th>
                <th className="p-5 font-bold border-b border-slate-100">Subject / Exp.</th>
                <th className="p-5 font-bold border-b border-slate-100">Contact</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {teachers.map((teacher, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{teacher.name}</p>
                        <p className="text-xs font-semibold text-slate-500">{teacher.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-700">{teacher.subject}</p>
                    <p className="text-xs font-semibold text-slate-500">{teacher.experience} Exp • {teacher.activeClasses} Classes</p>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{teacher.phone}</td>
                  <td className="p-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      teacher.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${teacher.status === 'Active' ? 'bg-emerald-500' : 'bg-amber-500'}`}></span>
                      {teacher.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Edit Profile">
                        <i className="fas fa-edit"></i>
                      </button>
                      <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors tooltip" title="Remove Faculty">
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

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-user-plus text-indigo-500"></i> Add New Faculty
            </h3>
            
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Dr. Rajesh Kumar" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="rajesh@aarambh.com" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="+91" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Primary Subject</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold text-slate-700">
                    <option>Physics</option>
                    <option>Chemistry</option>
                    <option>Mathematics</option>
                    <option>Biology</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Years of Experience</label>
                  <input type="number" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. 5" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Account Password</label>
                  <input type="password" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="Temporary password" />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                  Cancel
                </button>
                <button type="button" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageTeachers;
