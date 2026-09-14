import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(location.state?.from || '/teacher')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-sky-500 transition-colors shadow-sm">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-slate-800">Notifications</h2>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
        <div className="text-5xl text-sky-200 mb-4"><i className="fas fa-bell-slash"></i></div>
        <h3 className="text-xl font-bold text-slate-700">No new notifications.</h3>
        <p className="text-slate-500 mt-2">You are all caught up!</p>
      </div>
    </div>
  );
};

export default Notifications;
