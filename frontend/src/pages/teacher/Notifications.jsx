import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import api from '../../services/api';

const Notifications = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await api.get('/teacher/notifications');
        if (response.data.success) {
          setNotifications(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate(location.state?.from || '/teacher')} className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-50 hover:text-sky-500 transition-colors shadow-sm">
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-3xl font-black text-slate-800">Notifications</h2>
      </div>

      {loading ? (
        <div className="p-8 flex justify-center"><div className="animate-spin text-sky-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>
      ) : notifications.length === 0 ? (
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 text-center">
          <div className="text-5xl text-sky-200 mb-4"><i className="fas fa-bell-slash"></i></div>
          <h3 className="text-xl font-bold text-slate-700">No new notifications.</h3>
          <p className="text-slate-500 mt-2">You are all caught up!</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
          <div className="space-y-4">
            {notifications.map((notif) => (
              <div key={notif.id} className="flex gap-4 p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center text-xl shrink-0">
                  <i className={`fas ${notif.icon || 'fa-bell'}`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{notif.title}</h4>
                  <p className="text-sm text-slate-600 mt-1">{notif.message}</p>
                  <p className="text-xs text-slate-400 mt-2 font-semibold">{notif.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
