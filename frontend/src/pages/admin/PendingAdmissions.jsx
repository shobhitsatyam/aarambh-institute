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
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-indigo-600 transition-colors shadow-sm">
            <i className="fas fa-arrow-left"></i>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Pending Admissions</h2>
            <p className="text-sm text-slate-500">Review and approve new student registrations.</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Courses</option>
              <option>BBOSE</option>
              <option>NIOS</option>
              <option>BOSSE</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search applicant..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Applicant Info</th>
                <th className="p-5 font-bold border-b border-slate-100">Applied Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Contact</th>
                <th className="p-5 font-bold border-b border-slate-100">Date Applied</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {pendingList.map((student, idx) => (
                <tr key={idx} className="hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        <p className="text-xs font-semibold text-slate-500">{student.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
                      <i className="fas fa-graduation-cap"></i> {student.course}
                    </span>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{student.phone}</td>
                  <td className="p-5 font-semibold text-slate-600">{student.date}</td>
                  <td className="p-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => setSelectedStudent(student)} className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold text-xs transition-colors">
                        View Details
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white font-bold text-xs transition-colors shadow-sm">
                        Approve
                      </button>
                      <button className="px-3 py-1.5 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-xs transition-colors shadow-sm">
                        Reject
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
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedStudent(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-file-signature text-indigo-500"></i> Review Application
            </h3>
            
            <div className="bg-slate-50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-4 mb-6 pb-6 border-b border-slate-200">
                <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-2xl">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-800">{selectedStudent.name}</h4>
                  <p className="text-sm font-semibold text-slate-500">{selectedStudent.id} • Applied on {selectedStudent.date}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-y-4 gap-x-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Applied Course</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.course}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.phone}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email Address</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.email}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Previous School</p>
                  <p className="text-sm font-bold text-slate-700">{selectedStudent.prevSchool}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h5 className="font-bold text-slate-800 mb-3">Uploaded Documents</h5>
              <div className="flex gap-3">
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors" title="View in new tab">
                  <i className="fas fa-file-pdf text-rose-500"></i>
                  <span className="text-xs font-bold text-slate-700">Aadhar_Card.pdf</span>
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-indigo-400 transition-colors" title="View in new tab">
                  <i className="fas fa-image text-emerald-500"></i>
                  <span className="text-xs font-bold text-slate-700">Passport_Photo.jpg</span>
                </a>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button onClick={() => setSelectedStudent(null)} className="px-5 py-2.5 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors">
                Close
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white font-bold text-sm transition-colors shadow-sm">
                Reject Application
              </button>
              <button className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition-colors shadow-lg shadow-emerald-500/30 flex items-center gap-2">
                <i className="fas fa-check-circle"></i> Approve & Create Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAdmissions;
