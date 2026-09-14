import React, { useState } from 'react';

const AcademicCalendar = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  
  const events = [
    { id: 1, date: '15', month: 'Nov', year: '2026', title: 'Mid-Term Examinations Begin', type: 'Exam', description: 'Theory exams for all batches.' },
    { id: 2, date: '25', month: 'Dec', year: '2026', title: 'Winter Vacation Starts', type: 'Holiday', description: 'Institute remains closed.' },
    { id: 3, date: '05', month: 'Jan', year: '2027', title: 'Classes Resume', type: 'Academic', description: 'Second half of the term begins.' },
    { id: 4, date: '26', month: 'Jan', year: '2027', title: 'Republic Day', type: 'Holiday', description: 'National holiday.' },
  ];

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Calendar</h2>
          <p className="text-sm text-slate-500">Add, edit, or remove academic events and holidays.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/30 transition-all hover:-translate-y-0.5 whitespace-nowrap"
        >
          <i className="fas fa-calendar-plus mr-2"></i> Add Event
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side - Event List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-slate-800">Current Schedule</h3>
          </div>
          
          {events.map((event) => (
            <div key={event.id} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex gap-6 hover:shadow-md transition-shadow group relative">
              
              {/* Date Box */}
              <div className="w-20 h-20 rounded-xl bg-slate-50 border border-slate-100 flex flex-col items-center justify-center shrink-0 group-hover:border-indigo-200 group-hover:bg-indigo-50 transition-colors">
                <span className="text-2xl font-black text-indigo-500 leading-none">{event.date}</span>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{event.month}</span>
              </div>
              
              {/* Event Details */}
              <div className="flex-1 flex flex-col justify-center">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">{event.title}</h4>
                  <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                    event.type === 'Holiday' ? 'bg-emerald-50 text-emerald-600' :
                    event.type === 'Exam' ? 'bg-rose-50 text-rose-600' :
                    'bg-indigo-50 text-indigo-600'
                  }`}>
                    {event.type}
                  </span>
                </div>
                <p className="text-sm text-slate-500 pr-12">{event.description}</p>
                <p className="text-xs font-semibold text-slate-400 mt-2"><i className="far fa-clock mr-1"></i> Year {event.year}</p>
              </div>

              {/* Action Buttons */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors">
                  <i className="fas fa-edit"></i>
                </button>
                <button className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white flex items-center justify-center transition-colors">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side - Info Widget */}
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h4 className="font-bold text-slate-800 mb-4">Event Types</h4>
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

      {/* Add Event Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowAddModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <i className="fas fa-calendar-plus text-indigo-500"></i> Create New Event
            </h3>
            
            <form className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Title</label>
                <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" placeholder="e.g. Winter Vacation" />
              </div>
              
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Start Date</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Event Type</label>
                  <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none">
                    <option>Academic</option>
                    <option>Exam</option>
                    <option>Holiday</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description</label>
                <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors resize-none" placeholder="Add event details..."></textarea>
              </div>

              <button type="button" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30 mt-4">
                Publish Event
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicCalendar;
