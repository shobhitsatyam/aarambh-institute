import React from 'react';

const AcademicCalendar = () => {
  const events = [
    { id: 1, date: '15', month: 'Nov', year: '2026', title: 'Mid-Term Examinations Begin', type: 'Exam', description: 'Theory exams for all batches.' },
    { id: 2, date: '25', month: 'Dec', year: '2026', title: 'Winter Vacation Starts', type: 'Holiday', description: 'Institute remains closed.' },
    { id: 3, date: '05', month: 'Jan', year: '2027', title: 'Classes Resume', type: 'Academic', description: 'Second half of the term begins.' },
    { id: 4, date: '26', month: 'Jan', year: '2027', title: 'Republic Day', type: 'Holiday', description: 'National holiday.' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Academic Calendar</h2>
        <p className="text-sm text-slate-500">Track important dates, holidays, and examination schedules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Event List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-bold text-slate-800 mb-4">Upcoming Events</h3>
          
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-shadow group">
              
              {/* Date Box */}
              <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:border-rose-200 group-hover:bg-rose-50 transition-colors">
                <span className="text-2xl font-black text-rose-500 leading-none">{event.date}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{event.month}</span>
              </div>
              
              {/* Event Details */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-rose-500 transition-colors">{event.title}</h4>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    event.type === 'Holiday' ? 'bg-emerald-50 text-emerald-600' :
                    event.type === 'Exam' ? 'bg-rose-50 text-rose-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-slate-500">{event.description}</p>
                <p className="text-xs font-semibold text-slate-400 mt-2"><i className="far fa-clock mr-1"></i> Year {event.year}</p>
              </div>
              
            </div>
          ))}
        </div>

        {/* Right Side - Info Widget */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-xl font-bold mb-2">Sync to Calendar</h3>
              <p className="text-indigo-100 text-sm mb-6 leading-relaxed">
                Never miss an important date. Sync the academic calendar directly to your Google or Apple calendar.
              </p>
              <button className="w-full bg-white text-indigo-600 font-bold py-3 rounded-xl shadow-lg hover:-translate-y-0.5 transition-transform flex items-center justify-center gap-2">
                <i className="fas fa-sync-alt"></i> Sync Now
              </button>
            </div>
            <i className="far fa-calendar-check absolute -right-6 -bottom-6 text-[120px] text-white/10"></i>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4">Legend</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-rose-500"></div> Examinations
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div> Holidays
              </li>
              <li className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                <div className="w-3 h-3 rounded-full bg-indigo-500"></div> Academic Events
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicCalendar;
