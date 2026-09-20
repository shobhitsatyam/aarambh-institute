import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Attendance = () => {
  const [stats, setStats] = useState({ overall: 0, present: 0, absent: 0, late: 0, totalClasses: 0 });
  const [recentRecords, setRecentRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const { data: result } = await api.get('/student/attendance');
        
        if (result.success) {
          const records = result.data;
          setRecentRecords(records);
          
          const total = records.length;
          const present = records.filter(r => r.status === 'Present').length;
          const absent = records.filter(r => r.status === 'Absent').length;
          const late = records.filter(r => r.status === 'Late').length;
          const overall = total > 0 ? Math.round((present / total) * 100) : 0;
          
          setStats({ overall, present, absent, late, totalClasses: total });
        }
      } catch (error) {
        console.error('Error fetching attendance:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAttendance();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white">
              <i className="fas fa-fingerprint"></i>
            </div>
            My Attendance
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Track your class presence with real-time analytics.</p>
        </div>
      </div>

      {/* NEW HERO ANALYTICS DASHBOARD */}
      <div className="relative group rounded-[3rem] p-[3px] shadow-[0_15px_50px_rgba(99,102,241,0.2)] hover:shadow-[0_30px_60px_rgba(99,102,241,0.4)] transition-all duration-700 mb-16">
        {/* Animated Background Border */}
        <div className="absolute inset-0 rounded-[3rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_40%,#ffffff_60%,#ffffff_80%,transparent_100%)] opacity-50 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
        
        {/* VIBRANT MID-TONE BACKGROUND */}
        <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-fuchsia-500 rounded-[calc(3rem-3px)] overflow-hidden z-10 p-1">
          {/* Inner Mesh Gradient Background */}
          <div className="absolute inset-0 z-0">
            <div className="absolute top-[-20%] right-[-10%] w-[70%] h-[70%] bg-blue-400/40 blur-[100px] rounded-full mix-blend-overlay"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-pink-400/40 blur-[100px] rounded-full mix-blend-overlay"></div>
            {/* Subtle noise texture */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
          </div>

          <div className="relative z-10 bg-white/10 backdrop-blur-2xl rounded-[calc(3rem-7px)] p-6 sm:p-8 border border-white/20 shadow-[inset_0_0_30px_rgba(255,255,255,0.1)]">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              
              {/* Left Side: Circular Progress */}
              <div className="flex flex-col items-center justify-center relative">
                <h3 className="absolute top-0 left-0 text-transparent bg-clip-text bg-gradient-to-r from-indigo-100 to-fuchsia-200 font-black text-xl flex items-center gap-3 tracking-wide drop-shadow-md">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-md border border-fuchsia-200/30 shadow-sm text-sm">
                    <i className="fas fa-chart-pie text-fuchsia-200"></i>
                  </div>
                  Overall Score
                </h3>
                
                <div className="relative w-40 h-40 mt-12 group-hover:scale-105 transition-transform duration-700">
                  {/* Glowing Rings behind */}
                  <div className="absolute inset-0 rounded-full border border-fuchsia-200/20 shadow-[inset_0_0_50px_rgba(232,121,249,0.2)]"></div>
                  <div className="absolute inset-3 rounded-full border border-indigo-200/30 border-dashed animate-[spin_20s_linear_infinite]"></div>
                  
                  {/* The SVG Circle */}
                  <svg className="w-full h-full transform -rotate-90 relative z-10 overflow-visible drop-shadow-[0_0_20px_rgba(232,121,249,0.4)]">
                    <defs>
                      <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c7d2fe" />
                        <stop offset="100%" stopColor="#fbcfe8" />
                      </linearGradient>
                      <filter id="neonGlow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>
                    <circle cx="128" cy="128" r="105" stroke="rgba(232,121,249,0.15)" strokeWidth="20" fill="transparent" />
                    <circle 
                      cx="128" 
                      cy="128" 
                      r="105" 
                      stroke="url(#scoreGradient)" 
                      strokeWidth="20" 
                      fill="transparent" 
                      strokeDasharray="660" 
                      strokeDashoffset="99" 
                      strokeLinecap="round" 
                      filter="url(#neonGlow)"
                      className="transition-all duration-1500"
                    />
                  </svg>

                  {/* Center Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center z-20">
                    <span className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-indigo-50 to-fuchsia-200 tracking-tighter leading-none drop-shadow-xl">
                      {stats.overall}<span className="text-3xl text-fuchsia-300 ml-1">%</span>
                    </span>
                    <span className="text-[10px] font-black text-indigo-700 uppercase tracking-[0.3em] mt-2 bg-indigo-100 px-4 py-1.5 rounded-full shadow-lg border border-indigo-200">
                      Excellent
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Detailed Breakdown Bars */}
              <div className="flex flex-col justify-center space-y-4">
                
                {/* Present Bar */}
                <div className="group/bar relative bg-white/20 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-emerald-500 flex items-center justify-center text-lg">
                        <i className="fas fa-check"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Attended</p>
                        <h4 className="text-xl font-black text-white">{stats.present} <span className="text-xs font-bold text-white/80">classes</span></h4>
                      </div>
                    </div>
                    <span className="text-white font-black text-lg drop-shadow-md">85%</span>
                  </div>
                  <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/10">
                    <div className="h-full bg-emerald-400 rounded-full shadow-[0_0_10px_rgba(52,211,153,0.8)] w-[85%] group-hover/bar:w-[88%] transition-all duration-1000 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 animate-[translateX_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                {/* Absent Bar */}
                <div className="group/bar relative bg-white/20 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-rose-500 flex items-center justify-center text-lg">
                        <i className="fas fa-times"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Missed</p>
                        <h4 className="text-xl font-black text-white">{stats.absent} <span className="text-xs font-bold text-white/80">classes</span></h4>
                      </div>
                    </div>
                    <span className="text-white font-black text-lg drop-shadow-md">10%</span>
                  </div>
                  <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/10">
                    <div className="h-full bg-rose-400 rounded-full shadow-[0_0_10px_rgba(251,113,133,0.8)] w-[10%] group-hover/bar:w-[12%] transition-all duration-1000 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 animate-[translateX_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

                {/* Late Bar */}
                <div className="group/bar relative bg-white/20 backdrop-blur-md rounded-2xl p-5 border border-white/30 hover:bg-white/30 transition-all duration-300 hover:-translate-y-1 shadow-[0_8px_30px_rgba(0,0,0,0.1)]">
                  <div className="flex justify-between items-end mb-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white shadow-sm text-amber-500 flex items-center justify-center text-lg">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <p className="text-[10px] font-black text-white/70 uppercase tracking-widest mb-1">Late</p>
                        <h4 className="text-xl font-black text-white">{stats.late} <span className="text-xs font-bold text-white/80">classes</span></h4>
                      </div>
                    </div>
                    <span className="text-white font-black text-lg drop-shadow-md">5%</span>
                  </div>
                  <div className="h-3 w-full bg-black/10 rounded-full overflow-hidden shadow-inner border border-white/10">
                    <div className="h-full bg-amber-400 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.8)] w-[5%] group-hover/bar:w-[7%] transition-all duration-1000 relative overflow-hidden">
                      <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-white/50 animate-[translateX_2s_infinite]"></div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Timeline Records (Replacing Table) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 mt-20 gap-4">
        <h3 className="text-4xl font-black text-slate-800 flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-600 flex items-center justify-center shadow-inner text-xl border border-white">
            <i className="fas fa-stream"></i>
          </div>
          Timeline Records
        </h3>
        <button className="text-indigo-600 hover:text-white font-black text-sm bg-indigo-50 hover:bg-indigo-600 px-8 py-3.5 rounded-xl transition-all border border-indigo-100 hover:border-indigo-600 shadow-sm hover:shadow-[0_10px_25px_rgba(99,102,241,0.3)] hover:-translate-y-0.5">
          View Full History <i className="fas fa-angle-right ml-2"></i>
        </button>
      </div>
      
      <div className="space-y-6 relative before:absolute before:inset-0 before:ml-10 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-indigo-500/20 before:via-purple-500/20 before:to-transparent">
        {recentRecords.map((record, idx) => (
          <div key={idx} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            
            {/* Timeline Marker */}
            <div className="flex items-center justify-center w-20 h-20 rounded-full border-[8px] border-slate-50 bg-white shadow-xl shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 group-hover:scale-125 group-hover:rotate-12 transition-all duration-500">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-black text-white shadow-[inset_0_2px_10px_rgba(255,255,255,0.4)] border border-white/50 ${
                record.status === 'Present' ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_15px_rgba(16,185,129,0.5)]' :
                record.status === 'Absent' ? 'bg-gradient-to-br from-rose-400 to-rose-600 shadow-[0_0_15px_rgba(244,63,94,0.5)]' :
                'bg-gradient-to-br from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]'
              }`}>
                <i className={`fas ${record.status === 'Present' ? 'fa-check' : record.status === 'Absent' ? 'fa-times' : 'fa-exclamation'}`}></i>
              </div>
            </div>

            {/* Timeline Card */}
            <div className="w-[calc(100%-6rem)] md:w-[calc(50%-5rem)] p-2">
              <div className="relative group/card rounded-[2rem] p-[2px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)] hover:-translate-y-1 transition-all duration-500">
                
                <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                  <div className={`absolute -inset-[100%] animate-[spin_3s_linear_infinite] opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 ${
                    record.status === 'Present' ? 'bg-[conic-gradient(from_0deg,transparent_70%,#10b981_80%,#047857_100%)]' :
                    record.status === 'Absent' ? 'bg-[conic-gradient(from_0deg,transparent_70%,#f43f5e_80%,#be123c_100%)]' :
                    'bg-[conic-gradient(from_0deg,transparent_70%,#f59e0b_80%,#b45309_100%)]'
                  }`}></div>
                </div>

                <div className="relative bg-white rounded-[calc(2rem-2px)] p-8 z-10 border border-slate-100 group-hover/card:border-transparent transition-colors duration-500 overflow-hidden">
                  
                  {/* Dynamic Status Background Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2 ${
                    record.status === 'Present' ? 'bg-emerald-500' :
                    record.status === 'Absent' ? 'bg-rose-500' :
                    'bg-amber-500'
                  }`}></div>

                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-slate-500 bg-slate-50 px-4 py-1.5 rounded-full border border-slate-100 mb-3 shadow-sm">
                        <i className="far fa-calendar-alt text-indigo-400"></i> {record.date} <span className="text-slate-300">|</span> <i className="far fa-clock text-indigo-400"></i> {record.time}
                      </span>
                      <h4 className="text-2xl font-black text-slate-800 group-hover/card:text-indigo-600 transition-colors">{record.subject}</h4>
                    </div>
                    <div className={`px-5 py-2.5 rounded-xl text-xs font-black shadow-sm flex items-center gap-2 border ${
                      record.status === 'Present' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                      record.status === 'Absent' ? 'bg-rose-50 text-rose-600 border-rose-200' :
                      'bg-amber-50 text-amber-600 border-amber-200'
                    }`}>
                      <span className={`w-2 h-2 rounded-full ${
                        record.status === 'Present' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' :
                        record.status === 'Absent' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.8)]' :
                        'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                      }`}></span>
                      {record.status}
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Attendance;
