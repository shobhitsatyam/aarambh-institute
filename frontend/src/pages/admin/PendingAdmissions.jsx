import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PendingAdmissions = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const navigate = useNavigate();

  const pendingList = [
    { id: 'REQ-1001', name: 'Ravi Kumar', course: 'BBOSE 10th', date: 'Oct 24, 2026', phone: '+91 9876543210', email: 'ravi@example.com', prevSchool: 'Delhi Public School' },
    { id: 'REQ-1002', name: 'Sneha Patel', course: 'NIOS 12th', date: 'Oct 23, 2026', phone: '+91 8765432109', email: 'sneha@example.com', prevSchool: 'Kendriya Vidyalaya' },
    { id: 'REQ-1003', name: 'Arjun Singh', course: 'Medical Prep', date: 'Oct 22, 2026', phone: '+91 7654321098', email: 'arjun@example.com', prevSchool: 'St. Xaviers' },
    { id: 'REQ-1004', name: 'Pooja Sharma', course: 'BOSSE 12th', date: 'Oct 20, 2026', phone: '+91 6543210987', email: 'pooja@example.com', prevSchool: 'DAV Public School' },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div className="flex items-center gap-5">
          <button onClick={() => navigate('/admin')} className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 group">
            <i className="fas fa-arrow-left group-hover:-translate-x-1 transition-transform"></i>
          </button>
          <div>
            <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
                <i className="fas fa-user-clock"></i>
              </div>
              Pending Admissions
            </h2>
            <p className="text-slate-500 mt-1 font-medium ml-1">Review and approve new student registrations.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 overflow-hidden group hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500">
        
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-xl px-5 py-2.5 text-sm text-slate-600 font-bold outline-none hover:border-indigo-300 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all shadow-sm cursor-pointer appearance-none pr-10 relative">
              <option>All Courses</option>
              <option>BBOSE</option>
              <option>NIOS</option>
              <option>BOSSE</option>
            </select>
            {/* Custom arrow for select since appearance is none */}
            <div className="pointer-events-none absolute inset-y-0 left-[125px] sm:left-[130px] flex items-center px-2 text-slate-500">
              <i className="fas fa-chevron-down text-xs"></i>
            </div>
          </div>
          
          <div className="flex items-center bg-white/80 backdrop-blur-md border border-slate-200/80 rounded-2xl px-5 py-3 w-full sm:w-80 shadow-[0_2px_10px_rgba(0,0,0,0.02)] focus-within:shadow-[0_8px_30px_rgba(99,102,241,0.15)] focus-within:border-indigo-300 focus-within:ring-4 focus-within:ring-indigo-500/10 transition-all duration-300 group/search">
            <i className="fas fa-search text-slate-400 group-focus-within/search:text-indigo-500 transition-colors"></i>
            <input type="text" placeholder="Search applicant..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 font-medium placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50/80 text-slate-400 text-[11px] uppercase tracking-widest">
                <th className="p-6 font-bold border-b border-slate-100">Applicant Info</th>
                <th className="p-6 font-bold border-b border-slate-100">Applied Course</th>
                <th className="p-6 font-bold border-b border-slate-100">Contact</th>
                <th className="p-6 font-bold border-b border-slate-100">Date Applied</th>
                <th className="p-6 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pendingList.map((student, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-orange-50 text-rose-600 flex items-center justify-center font-black text-lg shadow-sm border border-rose-100/50 group-hover/row:scale-110 group-hover/row:rotate-6 transition-all duration-500">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-black text-slate-800 text-base group-hover/row:text-indigo-600 transition-colors">{student.name}</p>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-slate-100/80 text-slate-600 border border-slate-200/60 shadow-sm group-hover/row:bg-white transition-colors">
                      <div className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-500 flex items-center justify-center">
                        <i className="fas fa-graduation-cap"></i>
                      </div>
                      {student.course}
                    </span>
                  </td>
                  <td className="p-6 font-bold text-slate-600">{student.phone}</td>
                  <td className="p-6 font-bold text-slate-600">
                    <i className="far fa-calendar-alt text-slate-400 mr-2"></i>{student.date}
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button onClick={() => setSelectedStudent(student)} className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/80 text-slate-600 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 font-bold text-xs transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5">
                        <i className="fas fa-eye mr-1.5 opacity-70"></i> Review
                      </button>
                      <button className="px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 group/btn">
                        <i className="fas fa-check group-hover/btn:scale-110 transition-transform"></i>
                      </button>
                      <button className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(225,29,72,0.25)] hover:-translate-y-0.5 group/btn">
                        <i className="fas fa-times group-hover/btn:scale-110 transition-transform"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Review Application Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] p-8 w-full max-w-2xl shadow-[0_20px_70px_rgba(0,0,0,0.2)] border border-white/20 relative animate-[zoomIn_0.3s_ease-out]">
            
            {/* Modal Glow effect */}
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-t-[2rem] pointer-events-none"></div>

            <button onClick={() => setSelectedStudent(null)} className="absolute top-6 right-6 text-slate-400 hover:text-rose-500 hover:rotate-90 transition-all duration-300 w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100 z-10">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h3 className="text-2xl font-black text-slate-800 mb-8 flex items-center gap-3 relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner border border-indigo-100/50">
                <i className="fas fa-file-signature"></i>
              </div>
              Review Application
            </h3>
            
            <div className="bg-slate-50/80 rounded-3xl p-8 mb-8 border border-slate-100/80 relative z-10">
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-200/80">
                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-100 to-orange-50 text-rose-600 flex items-center justify-center font-black text-3xl shadow-sm border border-rose-200/50 relative group">
                  <div className="absolute inset-0 border-2 border-rose-400 rounded-3xl opacity-0 group-hover:opacity-100 group-hover:rotate-6 transition-all duration-300"></div>
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-2xl font-black text-slate-800 mb-1">{selectedStudent.name}</h4>
                  <p className="text-xs font-bold text-slate-500 bg-white px-3 py-1.5 rounded-full inline-flex items-center gap-2 border border-slate-200/60 shadow-sm">
                    <span className="text-indigo-500">{selectedStudent.id}</span> • Applied on {selectedStudent.date}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fas fa-graduation-cap opacity-50"></i> Applied Course
                  </p>
                  <p className="text-base font-bold text-slate-800">{selectedStudent.course}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fas fa-phone-alt opacity-50"></i> Phone Number
                  </p>
                  <p className="text-base font-bold text-slate-800">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fas fa-envelope opacity-50"></i> Email Address
                  </p>
                  <p className="text-base font-bold text-slate-800">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <i className="fas fa-school opacity-50"></i> Previous School
                  </p>
                  <p className="text-base font-bold text-slate-800">{selectedStudent.prevSchool}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-10 relative z-10">
              <h5 className="font-black text-slate-800 mb-4 flex items-center gap-2">
                <i className="fas fa-paperclip text-slate-400"></i> Uploaded Documents
              </h5>
              <div className="flex flex-wrap gap-4">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-rose-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-file-pdf"></i>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Aadhar_Card.pdf</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-5 py-3 bg-white border border-slate-200 rounded-2xl cursor-pointer hover:border-emerald-300 hover:shadow-md hover:-translate-y-1 transition-all group">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                    <i className="fas fa-image"></i>
                  </div>
                  <span className="text-sm font-bold text-slate-700">Passport_Photo.jpg</span>
                </a>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-3 pt-6 border-t border-slate-100 relative z-10">
              <button onClick={() => setSelectedStudent(null)} className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-colors">
                Cancel
              </button>
              <button className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-sm transition-all shadow-sm hover:shadow-[0_8px_20px_rgba(225,29,72,0.25)] hover:-translate-y-0.5 group">
                <i className="fas fa-times mr-2 group-hover:rotate-90 transition-transform"></i> Reject 
              </button>
              <button className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-600 hover:to-emerald-500 text-white font-bold text-sm transition-all shadow-[0_8px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_12px_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 flex items-center gap-2 group">
                <i className="fas fa-check-circle group-hover:scale-110 transition-transform"></i> Approve & Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAdmissions;
