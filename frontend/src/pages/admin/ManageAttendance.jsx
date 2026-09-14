import React, { useState } from 'react';

const ManageAttendance = () => {
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [students, setStudents] = useState([
    { id: '#STU-1024', name: 'Rahul Sharma', status: 'Present' },
    { id: '#STU-1025', name: 'Priya Singh', status: 'Absent' },
    { id: '#STU-1026', name: 'Amit Kumar', status: null },
    { id: '#STU-1027', name: 'Neha Gupta', status: null },
    { id: '#STU-1028', name: 'Vikram Patel', status: null },
  ]);

  const updateStatus = (index, status) => {
    const newStudents = [...students];
    newStudents[index].status = status;
    setStudents(newStudents);
  };

  const markAll = (status) => {
    setStudents(students.map(s => ({ ...s, status })));
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Attendance</h2>
          <p className="text-sm text-slate-500">Record daily attendance for students across different batches.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        
        {/* Left Col - Filters */}
        <div className="xl:col-span-1 space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">Select Batch</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course / Batch</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                  <option>BBOSE 10th - Morning</option>
                  <option>NIOS 12th - Evening</option>
                  <option>Medical Prep - Weekend</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Subject</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-semibold">
                  <option>Physics</option>
                  <option>Chemistry</option>
                  <option>Mathematics</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date</label>
                <input 
                  type="date" 
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors font-semibold" 
                />
              </div>

              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-2">
                Fetch Students
              </button>
            </div>
          </div>
          
          {/* Summary Widget */}
          <div className="bg-slate-800 rounded-3xl p-6 text-white shadow-lg relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="font-bold mb-4">Attendance Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400 text-sm font-semibold">Total Students</span>
                  <span className="font-bold text-lg">{students.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-emerald-400 text-sm font-semibold">Present</span>
                  <span className="font-bold text-lg">{students.filter(s => s.status === 'Present').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-rose-400 text-sm font-semibold">Absent</span>
                  <span className="font-bold text-lg">{students.filter(s => s.status === 'Absent').length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-amber-400 text-sm font-semibold">Late</span>
                  <span className="font-bold text-lg">{students.filter(s => s.status === 'Late').length}</span>
                </div>
              </div>
            </div>
            <i className="fas fa-chart-pie absolute -right-8 -bottom-8 text-[120px] text-white/5"></i>
          </div>
        </div>

        {/* Right Col - Student List */}
        <div className="xl:col-span-3">
          <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden flex flex-col h-full">
            
            <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-50/50">
              <div>
                <h3 className="text-lg font-bold text-slate-800">Mark Attendance</h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">BBOSE 10th - Morning • {attendanceDate}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => markAll('Present')} className="px-4 py-2 bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-bold transition-colors border border-emerald-100">
                  Mark All Present
                </button>
                <button onClick={() => markAll('Absent')} className="px-4 py-2 bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white rounded-lg text-xs font-bold transition-colors border border-rose-100">
                  Mark All Absent
                </button>
              </div>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead>
                  <tr className="bg-white text-slate-400 text-xs uppercase tracking-wider border-b border-slate-100">
                    <th className="p-5 font-bold">Student</th>
                    <th className="p-5 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {students.map((student, idx) => (
                    <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <p className="font-bold text-slate-800 text-base">{student.name}</p>
                        <p className="text-xs font-semibold text-slate-500 mt-0.5">{student.id}</p>
                      </td>
                      <td className="p-5 text-center">
                        <div className="inline-flex bg-slate-100 rounded-xl p-1 gap-1 border border-slate-200">
                          <button 
                            onClick={() => updateStatus(idx, 'Present')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              student.status === 'Present' ? 'bg-emerald-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Present
                          </button>
                          <button 
                            onClick={() => updateStatus(idx, 'Absent')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              student.status === 'Absent' ? 'bg-rose-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Absent
                          </button>
                          <button 
                            onClick={() => updateStatus(idx, 'Late')}
                            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              student.status === 'Late' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200'
                            }`}
                          >
                            Late
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end">
               <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                  Save Attendance
               </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ManageAttendance;
