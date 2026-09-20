import React from 'react';

const AcademicCalendar = () => {
  const events = [];

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-rose-100 to-orange-50 text-rose-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(225,29,72,0.2)] border border-white">
              <i className="far fa-calendar-alt"></i>
            </div>
            Academic Calendar
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Track important dates, holidays, and examination schedules.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left Side - Event List */}
        <div className="lg:col-span-2 space-y-6">
          <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner text-lg border border-slate-200">
              <i className="fas fa-list-ul"></i>
            </div>
            Upcoming Events
          </h3>
          
          <div className="space-y-6">
            {events.length === 0 ? (
              <div className="bg-white rounded-[2rem] border border-slate-100 p-12 text-center shadow-sm flex flex-col items-center justify-center h-full">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                  <i className="far fa-calendar-times text-4xl text-slate-300"></i>
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-2">No Upcoming Events</h3>
                <p className="text-slate-500 font-medium">The academic calendar has not been updated by the administration yet.</p>
              </div>
            ) : (
              events.map((event) => (
                <div key={event.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] hover:-translate-y-2 transition-all duration-500">
                  <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                     <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#6366f1_80%,#ec4899_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="relative bg-white rounded-[calc(2rem-2px)] p-6 z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500 flex gap-6 overflow-hidden">
                    
                    {/* Dynamic Glow Strip */}
                    <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all duration-500 ${
                      event.type === 'Holiday' ? 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                      event.type === 'Exam' ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' :
                      'bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.5)]'
                    }`}></div>

                    {/* Date Box */}
                    <div className="w-24 h-24 rounded-[1.5rem] bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-500 ml-2">
                      <span className="text-3xl font-black text-slate-800 leading-none group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:to-fuchsia-600 transition-all">{event.date}</span>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1">{event.month}</span>
                    </div>
                    
                    {/* Event Details */}
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-black text-slate-800 text-xl group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase shadow-sm border ${
                          event.type === 'Holiday' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                          event.type === 'Exam' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                          'bg-indigo-50 text-indigo-600 border-indigo-100'
                        }`}>
                          {event.type}
                        </span>
                      </div>
                      <p className="text-sm font-semibold text-slate-500">{event.description}</p>
                      <p className="text-[11px] font-bold text-slate-400 mt-3 uppercase tracking-wider"><i className="far fa-clock mr-1"></i> Year {event.year}</p>
                    </div>
                    
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side - Info Widget */}
        <div className="space-y-8 mt-[72px]">
          
          <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_15px_50px_rgba(99,102,241,0.2)] hover:shadow-[0_30px_60px_rgba(99,102,241,0.4)] hover:-translate-y-2 transition-all duration-700">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
            <div className="relative bg-gradient-to-br from-indigo-600 via-indigo-700 to-purple-800 rounded-[calc(2.5rem-2px)] p-10 text-white overflow-hidden z-10 border border-indigo-500/30">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 rounded-[1.25rem] bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,0.3)] border border-white/30 group-hover:rotate-12 transition-transform duration-500">
                  <i className="fas fa-sync-alt"></i>
                </div>
                <h3 className="text-2xl font-black mb-3">Sync to Calendar</h3>
                <p className="text-indigo-100 text-sm mb-8 leading-relaxed font-medium">
                  Never miss an important date. Sync the academic calendar directly to your Google or Apple calendar.
                </p>
                <button className="w-full bg-white text-indigo-700 font-black py-4 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 group/btn">
                  <i className="fas fa-mobile-alt group-hover/btn:animate-bounce"></i> Sync Now
                </button>
              </div>
              <i className="far fa-calendar-check absolute -right-6 -bottom-6 text-[140px] text-white opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"></i>
            </div>
          </div>

          <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition-shadow duration-500">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#6366f1_80%,#ec4899_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            <div className="relative bg-white rounded-[calc(2.5rem-2px)] p-8 z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
              <h4 className="font-black text-slate-800 mb-6 text-xl flex items-center gap-3">
                <i className="fas fa-info-circle text-slate-400"></i> Legend
              </h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 text-sm font-bold text-slate-600 hover:text-rose-600 transition-colors cursor-pointer group/legend">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center border border-rose-100 group-hover/legend:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"></div>
                  </div>
                  Examinations
                </li>
                <li className="flex items-center gap-4 text-sm font-bold text-slate-600 hover:text-emerald-600 transition-colors cursor-pointer group/legend">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center border border-emerald-100 group-hover/legend:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
                  </div>
                  Holidays
                </li>
                <li className="flex items-center gap-4 text-sm font-bold text-slate-600 hover:text-indigo-600 transition-colors cursor-pointer group/legend">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center border border-indigo-100 group-hover/legend:scale-110 transition-transform">
                    <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></div>
                  </div>
                  Academic Events
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AcademicCalendar;
