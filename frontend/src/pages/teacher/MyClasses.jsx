import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MyClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await api.get('/teacher/classes');
        if (response.data.success) {
          setClasses(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch classes", error);
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-sky-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">My Classes</h2>
      <div className="grid gap-6">
        {classes.length === 0 ? (
          <div className="text-center py-8 text-slate-500">No classes scheduled yet.</div>
        ) : classes.map((cls) => (
          <div key={cls.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{cls.subject}: {cls.topic}</h3>
              <p className="text-slate-500 text-sm mt-1">Date: {cls.date} | Time: {cls.time}</p>
              <p className="text-slate-500 text-sm mt-1">Duration: {cls.duration} mins</p>
            </div>
            <div className="mt-4 md:mt-0">
              {cls.status === 'Live' ? (
                <button className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-sky-500/30 transition-all">
                  <i className="fas fa-video mr-2"></i> Join Live Class
                </button>
              ) : (
                <button className="bg-slate-100 text-slate-400 px-6 py-2.5 rounded-full font-bold cursor-not-allowed">
                  Scheduled
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyClasses;
