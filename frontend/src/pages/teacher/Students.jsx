import React from 'react';

const Students = () => {
  return (
    <div>
      <h2 className="text-3xl font-black text-slate-800 mb-6">My Students</h2>
      <div className="nested-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <select className="border border-slate-200 rounded-lg px-4 py-2 bg-white outline-none focus:border-sky-400">
            <option>Mathematics 101 - Section A</option>
            <option>Physics Fundamentals</option>
          </select>
          <button className="btn-glow-primary px-4 py-2 rounded-lg font-bold transition-all text-sm">
            <i className="fas fa-check-double mr-1"></i> Mark All Present
          </button>
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100 text-slate-500 text-sm">
            <tr>
              <th className="p-4 font-semibold">Student Name</th>
              <th className="p-4 font-semibold">Roll No</th>
              <th className="p-4 font-semibold">Attendance</th>
              <th className="p-4 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 modern-table-row">
              <td className="p-4 font-semibold text-slate-700">Aditya Ravi</td>
              <td className="p-4 text-slate-500">BBOSE-10-001</td>
              <td className="p-4"><span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold">Present</span></td>
              <td className="p-4">
                <button className="text-slate-400 hover:text-sky-500"><i className="fas fa-edit"></i></button>
              </td>
            </tr>
            <tr className="border-b border-slate-50 modern-table-row">
              <td className="p-4 font-semibold text-slate-700">Priya Singh</td>
              <td className="p-4 text-slate-500">BBOSE-10-002</td>
              <td className="p-4"><span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold">Absent</span></td>
              <td className="p-4">
                <button className="text-slate-400 hover:text-sky-500"><i className="fas fa-edit"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
