import React from 'react';

const Assignments = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Assignments & Grading</h2>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="text-5xl text-sky-200 mb-4"><i className="fas fa-clipboard-list"></i></div>
        <h3 className="text-xl font-bold text-slate-700">No pending assignments to grade.</h3>
        <p className="text-slate-500 mt-2">You're all caught up! Enjoy your day.</p>
        <button className="mt-6 bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-sky-500/30 transition-all">
          <i className="fas fa-plus mr-2"></i> Create New Assignment
        </button>
      </div>
    </div>
  );
};

export default Assignments;
