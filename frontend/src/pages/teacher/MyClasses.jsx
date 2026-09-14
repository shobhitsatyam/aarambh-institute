import React from 'react';

const MyClasses = () => {
  const classes = [
    { id: 1, name: 'Mathematics 101 - Section A', batch: 'BBOSE 10th', time: '09:00 AM - 10:30 AM', students: 45, status: 'Live' },
    { id: 2, name: 'Physics Fundamentals', batch: 'NIOS 12th', time: '11:30 AM - 12:30 PM', students: 30, status: 'Upcoming' },
    { id: 3, name: 'Advanced Calculus', batch: 'BBOSE 12th', time: '02:00 PM - 04:00 PM', students: 28, status: 'Upcoming' },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-800 mb-6">My Classes</h2>
      <div className="grid gap-6">
        {classes.map((cls) => (
          <div key={cls.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{cls.name}</h3>
              <p className="text-slate-500 text-sm mt-1">Batch: {cls.batch} | Time: {cls.time}</p>
              <p className="text-slate-500 text-sm mt-1">Enrolled Students: {cls.students}</p>
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
