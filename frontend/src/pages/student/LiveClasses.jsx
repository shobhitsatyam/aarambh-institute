import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const LiveClasses = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [upcomingClasses, setUpcomingClasses] = useState([]);
  const [recordedClasses, setRecordedClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const { data: result } = await api.get('/student/classes');
        
        if (result.success) {
          const classes = result.data;
          
          const upcoming = classes.filter(cls => cls.status === 'Upcoming' || cls.status === 'Live').map(cls => ({
            id: cls.id,
            title: `${cls.subject} - ${cls.topic}`,
            instructor: cls.instructor,
            time: cls.status === 'Live' ? 'Live Now' : `${cls.date} ${cls.time}`,
            duration: cls.duration,
            link: cls.link || '#'
          }));
          
          const recorded = classes.filter(cls => cls.status === 'Recorded').map(cls => ({
            id: cls.id,
            title: `${cls.subject}: ${cls.topic}`,
            date: cls.date,
            duration: cls.duration,
            thumbnail: cls.thumbnail || 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80',
            link: cls.link || '#'
          }));
          
          setUpcomingClasses(upcoming);
          setRecordedClasses(recorded);
        }
      } catch (error) {
        console.error('Error fetching classes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header & Segmented Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-video"></i>
            </div>
            Live Classes
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">Join your interactive sessions and view past recordings.</p>
        </div>
        <div className="bg-slate-100/80 p-1.5 rounded-2xl flex border border-slate-200/60 shadow-inner inline-flex self-start">
          <button 
            onClick={() => setActiveTab('upcoming')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'upcoming' 
                ? 'bg-white text-indigo-600 shadow-[0_2px_10px_rgba(0,0,0,0.08)]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            Upcoming
          </button>
          <button 
            onClick={() => setActiveTab('recorded')}
            className={`px-6 py-2 rounded-xl font-bold text-sm transition-all ${
              activeTab === 'recorded' 
                ? 'bg-white text-indigo-600 shadow-[0_2px_10px_rgba(0,0,0,0.08)]' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
            }`}
          >
            Recorded
          </button>
        </div>
      </div>

      {/* Upcoming Classes */}
      {activeTab === 'upcoming' && (
        <div className="mb-14 animate-[fadeIn_0.5s_ease-out]">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-slate-800">Upcoming Schedule</h3>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {upcomingClasses.map((cls, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(99,102,241,0.12)] hover:-translate-y-2 hover:border-indigo-100 transition-all duration-500 group relative overflow-hidden flex flex-col h-full">
              {/* Subtle top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-sm border border-indigo-100/50">
                  <i className="fas fa-satellite-dish"></i>
                </div>
                <span className="bg-slate-50 border border-slate-200 text-slate-600 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-sm flex items-center gap-1.5">
                  <i className="far fa-clock"></i> {cls.duration}
                </span>
              </div>
              
              <h4 className="font-black text-slate-800 text-xl mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{cls.title}</h4>
              <p className="text-sm font-semibold text-slate-500 mb-8 flex items-center gap-2">
                <i className="fas fa-chalkboard-teacher text-indigo-400"></i> {cls.instructor}
              </p>
              
              <div className="flex items-center justify-between pt-5 border-t border-slate-100 mt-auto">
                <div className="text-sm font-black text-slate-700 flex flex-col">
                  <span className="text-[10px] text-slate-400 uppercase tracking-widest mb-0.5">Time</span>
                  <span className="flex items-center gap-1.5 text-indigo-600">
                     {cls.time}
                  </span>
                </div>
                <button className="bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-sm group-hover:shadow-[0_8px_20px_rgba(99,102,241,0.25)] flex items-center gap-2">
                  Join <i className="fas fa-arrow-right text-xs"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}

      {/* Recorded Sessions */}
      {activeTab === 'recorded' && (
        <div className="animate-[fadeIn_0.5s_ease-out]">
        <div className="flex items-center gap-3 mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recent Recordings</h3>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recordedClasses.map((rec) => (
            <div key={rec.id} className="bg-white rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(244,63,94,0.12)] hover:-translate-y-2 hover:border-rose-100 transition-all duration-500 group cursor-pointer">
              <div className="h-52 relative overflow-hidden">
                <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl shadow-[0_0_30px_rgba(255,255,255,0.3)] transform group-hover:scale-110 group-hover:bg-rose-500 transition-all duration-500 border border-white/40 group-hover:border-rose-500">
                    <i className="fas fa-play ml-1.5"></i>
                  </div>
                </div>
                
                <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg border border-white/10">
                  {rec.duration}
                </span>
              </div>
              
              <div className="p-7">
                <h4 className="font-bold text-slate-800 text-lg mb-3 leading-tight group-hover:text-rose-600 transition-colors line-clamp-2">{rec.title}</h4>
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                    <i className="far fa-calendar-alt text-slate-400 mr-1.5"></i> {rec.date}
                  </p>
                  <button className="text-rose-500 font-bold text-sm opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Watch Now <i className="fas fa-arrow-right text-xs ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default LiveClasses;
