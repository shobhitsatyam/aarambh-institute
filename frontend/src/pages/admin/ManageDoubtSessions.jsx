import React, { useState } from 'react';

const ManageDoubtSessions = () => {
  const [selectedDoubt, setSelectedDoubt] = useState(null);

  const doubts = [
    { id: '#DBT-104', student: 'Aditya Ravi', subject: 'Physics', topic: 'Kinematics Equations', status: 'Assigned', teacher: 'Prof. Sharma', date: 'Oct 23, 2026', question: 'How do we derive the 3rd equation of motion without calculus?' },
    { id: '#DBT-105', student: 'Neha Gupta', subject: 'Chemistry', topic: 'Hybridization', status: 'Unassigned', teacher: 'Unassigned', date: 'Oct 24, 2026', question: 'I am confused between sp2 and sp3 hybridization shapes. Can you provide a simple mnemonic?' },
    { id: '#DBT-106', student: 'Amit Kumar', subject: 'Mathematics', topic: 'Integration by Parts', status: 'Resolved', teacher: 'Mr. Verma', date: 'Oct 22, 2026', question: 'In ILATE rule, what if both functions are algebraic?' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Doubt Sessions</h2>
          <p className="text-sm text-slate-500">Assign student doubts to teachers and track resolution.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-emerald-400">
              <option>All Subjects</option>
              <option>Physics</option>
              <option>Chemistry</option>
              <option>Mathematics</option>
            </select>
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-emerald-400">
              <option>All Status</option>
              <option>Unassigned</option>
              <option>Assigned</option>
              <option>Resolved</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search doubts..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Student & ID</th>
                <th className="p-5 font-bold border-b border-slate-100">Subject & Topic</th>
                <th className="p-5 font-bold border-b border-slate-100">Assigned Teacher</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {doubts.map((doubt, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{doubt.student}</p>
                    <p className="text-xs font-semibold text-slate-500">{doubt.id} • {doubt.date}</p>
                  </td>
                  <td className="p-5">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-bold mr-2">{doubt.subject}</span>
                    <span className="font-semibold text-slate-700">{doubt.topic}</span>
                  </td>
                  <td className="p-5">
                    <span className={`font-semibold ${doubt.teacher === 'Unassigned' ? 'text-rose-500 italic' : 'text-slate-700'}`}>
                      {doubt.teacher}
                    </span>
                  </td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      doubt.status === 'Unassigned' ? 'bg-rose-100 text-rose-700' :
                      doubt.status === 'Assigned' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {doubt.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedDoubt(doubt)}
                      className="text-emerald-600 hover:text-white font-bold text-sm bg-emerald-50 hover:bg-emerald-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      {doubt.status === 'Unassigned' ? 'Assign' : 'View'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Assign Doubt Modal */}
      {selectedDoubt && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedDoubt(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-chalkboard-teacher text-emerald-500"></i> Doubt {selectedDoubt.id}
            </h3>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Subject</p>
                  <p className="font-bold text-slate-800">{selectedDoubt.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Student</p>
                  <p className="font-semibold text-slate-700 text-sm">{selectedDoubt.student}</p>
                </div>
              </div>
              <h4 className="font-bold text-slate-800 text-lg mb-2">{selectedDoubt.topic}</h4>
              <p className="text-sm text-slate-600 leading-relaxed italic bg-white p-3 rounded-xl border border-slate-200">
                "{selectedDoubt.question}"
              </p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assign to Teacher</label>
                <select defaultValue={selectedDoubt.teacher} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors appearance-none font-semibold">
                  <option value="Unassigned" disabled>Select Teacher...</option>
                  <option value="Prof. Sharma">Prof. Sharma (Physics)</option>
                  <option value="Dr. Singh">Dr. Singh (Chemistry)</option>
                  <option value="Mr. Verma">Mr. Verma (Mathematics)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Internal Note (Optional)</label>
                <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-emerald-500 transition-colors resize-none" placeholder="Add note for the teacher..."></textarea>
              </div>

              <button type="button" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/30 mt-4">
                Assign Doubt
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoubtSessions;
