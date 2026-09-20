import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const StudentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [toastMsg, setToastMsg] = useState('');

  // Mock data for the student based on ID
  const student = {
    id: id || '#STU-1024',
    name: 'Rahul Sharma',
    course: 'BBOSE 10th - Morning',
    email: 'rahul.s@example.com',
    phone: '+91 9876543210',
    joinDate: 'Aug 10, 2026',
    status: 'Active',
    attendance: 85,
    totalFee: 45000,
    paidFee: 15000,
    recentExams: [
      { subject: 'Physics', marks: '85/100', grade: 'A' },
      { subject: 'Chemistry', marks: '78/100', grade: 'B+' },
    ]
  };

  const handleAction = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-24 right-8 bg-slate-800 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-[slideIn_0.3s_ease-out] flex items-center gap-3 font-bold border border-slate-700">
          <i className="fas fa-check-circle text-emerald-400 text-xl"></i>
          {toastMsg}
        </div>
      )}

      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="w-10 h-10 bg-white border border-slate-200 rounded-xl flex items-center justify-center text-slate-500 hover:text-indigo-600 hover:border-indigo-200 hover:bg-indigo-50 transition-colors"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student Profile</h2>
          <p className="text-sm text-slate-500">Detailed view of academic and financial records.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col - Identity Card */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
            
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-white p-1 rounded-full shadow-lg mb-4 mt-8">
                <div className="w-full h-full rounded-full bg-slate-100 flex items-center justify-center text-4xl text-slate-300">
                  <i className="fas fa-user"></i>
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-slate-800 mb-1">{student.name}</h3>
              <p className="text-sm font-semibold text-slate-500 mb-4">{student.id}</p>
              
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                {student.status}
              </span>
            </div>
            
            <div className="mt-8 space-y-4 text-left border-t border-slate-100 pt-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Enrolled Course</p>
                <p className="font-bold text-slate-700">{student.course}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Email Address</p>
                <p className="font-semibold text-slate-600">{student.email}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Phone Number</p>
                <p className="font-semibold text-slate-600">{student.phone}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase">Joining Date</p>
                <p className="font-semibold text-slate-600">{student.joinDate}</p>
              </div>
            </div>
            
            <div className="mt-8 flex gap-2">
              <button 
                onClick={() => handleAction('Edit Profile modal will open here (Demo)')}
                className="flex-1 bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white font-bold py-2.5 rounded-xl transition-colors"
              >
                Edit Profile
              </button>
              <button 
                onClick={() => {
                  const confirmBan = window.confirm('Are you sure you want to suspend this student account?');
                  if(confirmBan) handleAction('Student account suspended successfully!');
                }}
                className="w-12 bg-slate-50 text-slate-600 hover:bg-rose-50 hover:text-rose-600 font-bold py-2.5 rounded-xl transition-colors border border-slate-200" title="Suspend Student"
              >
                <i className="fas fa-ban"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Right Col - Details Tabs */}
        <div className="xl:col-span-2 space-y-6">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl">
                <i className="fas fa-clipboard-check"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Attendance</p>
                <p className="text-xl font-black text-slate-800">{student.attendance}%</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl">
                <i className="fas fa-wallet"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Fees Paid</p>
                <p className="text-xl font-black text-slate-800">₹{student.paidFee / 1000}k</p>
              </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 col-span-2 sm:col-span-1">
              <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center text-xl">
                <i className="fas fa-exclamation-circle"></i>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">Fees Dues</p>
                <p className="text-xl font-black text-slate-800">₹{(student.totalFee - student.paidFee) / 1000}k</p>
              </div>
            </div>
          </div>

          {/* Academic Performance */}
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Recent Exam Performance</h3>
              <button className="text-indigo-600 font-bold text-sm hover:underline">View All</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {student.recentExams.map((exam, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-indigo-500 shadow-sm">
                        <i className="fas fa-file-alt"></i>
                      </div>
                      <span className="font-bold text-slate-700">{exam.subject} Mid-Term</span>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-slate-800">{exam.marks}</p>
                      <p className="text-xs font-bold text-slate-500">Grade {exam.grade}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default StudentDetails;
