import React from 'react';

const LiveClasses = () => {
  const upcomingClasses = [
    { id: 1, title: 'Advanced Physics (Mechanics)', instructor: 'Prof. Sharma', time: '10:00 AM Today', duration: '1.5 Hours', link: '#' },
    { id: 2, title: 'Organic Chemistry Revision', instructor: 'Dr. Singh', time: '02:00 PM Today', duration: '2 Hours', link: '#' },
    { id: 3, title: 'Mathematics - Calculus Ch-4', instructor: 'Mr. Verma', time: '09:00 AM Tomorrow', duration: '1 Hour', link: '#' },
  ];

  const recordedClasses = [
    { id: 1, title: 'Physics: Kinematics Part 3', date: 'Oct 23, 2026', duration: '1h 45m', thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&q=80' },
    { id: 2, title: 'Chemistry: Atomic Structure', date: 'Oct 22, 2026', duration: '2h 10m', thumbnail: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=500&q=80' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Live Classes</h2>
        <div className="bg-white border border-slate-200 rounded-lg p-1 flex">
          <button className="px-4 py-1.5 rounded-md bg-rose-50 text-rose-600 font-bold text-sm">Upcoming</button>
          <button className="px-4 py-1.5 rounded-md text-slate-500 hover:text-slate-700 font-bold text-sm transition-colors">Recorded</button>
        </div>
      </div>

      {/* Upcoming Classes */}
      <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Schedule</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {upcomingClasses.map((cls, idx) => (
          <div key={idx} className="nested-card overflow-hidden hover:shadow-lg transition-all group">
            <div className="flex justify-between items-start mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl">
                <i className="fas fa-video"></i>
              </div>
              <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-full text-xs font-bold tracking-wider">
                {cls.duration}
              </span>
            </div>
            
            <h4 className="font-bold text-slate-800 text-lg mb-2 leading-tight">{cls.title}</h4>
            <p className="text-sm font-semibold text-slate-500 mb-6 flex items-center gap-2">
              <i className="fas fa-chalkboard-teacher text-rose-400"></i> {cls.instructor}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-sm font-bold text-slate-700">
                <i className="far fa-clock text-rose-500 mr-1"></i> {cls.time}
              </div>
              <button className="bg-rose-500 hover:bg-rose-600 text-white px-5 py-2 rounded-xl text-sm font-bold transition-colors shadow-sm">
                Join
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Recorded Sessions */}
      <h3 className="text-lg font-bold text-slate-800 mb-4">Recent Recordings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recordedClasses.map((rec) => (
          <div key={rec.id} className="nested-card overflow-hidden p-0 hover:shadow-xl transition-all duration-300 group cursor-pointer">
            <div className="h-48 relative overflow-hidden">
              <img src={rec.thumbnail} alt={rec.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-rose-500 text-xl shadow-lg transform group-hover:scale-110 transition-transform">
                  <i className="fas fa-play ml-1"></i>
                </div>
              </div>
              <span className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs font-bold backdrop-blur-sm">
                {rec.duration}
              </span>
            </div>
            <div className="p-5">
              <h4 className="font-bold text-slate-800 mb-2 group-hover:text-rose-500 transition-colors">{rec.title}</h4>
              <p className="text-xs font-semibold text-slate-500">
                <i className="far fa-calendar-alt mr-1"></i> {rec.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveClasses;
