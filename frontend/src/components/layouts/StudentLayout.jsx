import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const StudentLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('lms_remembered_email');
    navigate('/login');
  };

  const navItems = [
    { icon: 'fa-home', label: 'Dashboard', path: '/student-dashboard' },
    { icon: 'fa-user', label: 'Profile', path: '/student/profile' },
    { icon: 'fa-video', label: 'Live Classes', path: '/student/live-classes' },
    { icon: 'fa-book', label: 'Study Materials', path: '/student/materials' },
    { icon: 'fa-layer-group', label: 'My Subjects', path: '/student/subjects' },
    { icon: 'fa-clipboard-check', label: 'Attendance', path: '/student/attendance' },
    { icon: 'fa-file-alt', label: 'Exams', path: '/student/exams' },
    { icon: 'fa-calendar-alt', label: 'Calendar', path: '/student/calendar' },
    { icon: 'fa-wallet', label: 'Course Fee', path: '/student/fees' },
    { icon: 'fa-exchange-alt', label: 'Switch Program', path: '/student/switch-program' },
    { icon: 'fa-headset', label: 'Support Tickets', path: '/student/tickets' },
    { icon: 'fa-question-circle', label: 'Doubt Session', path: '/student/doubts' },
    { icon: 'fa-bell', label: 'Notifications', path: '/student/notifications' },
    { icon: 'fa-comment-dots', label: 'Feedback', path: '/student/feedback' },
  ];

  return (
    <div className="flex h-screen bg-[#e2e8f0] font-sans">
      {/* Sidebar */}
      <aside className={`glass-sidebar text-slate-300 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col z-20`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          {isSidebarOpen && <span className="font-bold text-xl tracking-wider text-white"><span className="text-rose-500">A</span>ARAMBH</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            <i className={`fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto custom-scrollbar">
          {navItems.map((item, idx) => {
            // Simple active state check. In a real app, you might want more exact matching.
            const isActive = location.pathname === item.path || (location.pathname === '/student' && item.path === '/student-dashboard');
            
            return (
              <Link 
                key={idx} 
                to={item.path} 
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                title={!isSidebarOpen ? item.label : ""}
              >
                <i className={`fas ${item.icon} ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
            )
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-700">
          <a href="#" onClick={handleLogout} className="flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-300" title={!isSidebarOpen ? "Logout" : ""}>
            <i className={`fas fa-sign-out-alt ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
            {isSidebarOpen && <span className="font-semibold text-sm">Logout</span>}
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative nested-card-container m-3">
        
        {/* Top Header */}
        <header className="h-16 glass-header rounded-2xl flex items-center justify-between px-8 sticky top-0 z-10 mb-4">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-64 border border-slate-200 focus-within:border-rose-400 focus-within:ring-2 focus-within:ring-rose-100 transition-all">
            <i className="fas fa-search text-slate-400 text-sm"></i>
            <input type="text" placeholder="Search..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-500 hover:text-rose-500 transition-colors">
                <i className="far fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">3</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 ${showNotifications ? 'block' : 'hidden'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                  <h4 className="font-bold text-slate-800">Notifications</h4>
                  <button onClick={() => { navigate('/student/notifications', { state: { from: location.pathname } }); setShowNotifications(false); }} className="text-xs text-rose-500 font-bold hover:underline">View All</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/student/notifications', { state: { from: location.pathname } }); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800">Holiday Announcement</p>
                    <p className="text-xs text-slate-500 mt-1">Institute closed on Oct 26th.</p>
                  </div>
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/student/notifications', { state: { from: location.pathname } }); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800">New Study Material</p>
                    <p className="text-xs text-slate-500 mt-1">Chapter 4 Notes uploaded.</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/student/fees'); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800 text-rose-500">Fee Reminder</p>
                    <p className="text-xs text-slate-500 mt-1">2nd installment due next week.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700 group-hover:text-rose-500 transition-colors">Aditya Ravi</p>
                <p className="text-xs text-slate-500">Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-orange-400 p-[2px]">
                <img src="https://ui-avatars.com/api/?name=Aditya+Ravi&background=ffffff&color=be123c" alt="Profile" className="w-full h-full rounded-full border-2 border-white object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content (Outlet) */}
        <main className="flex-1 overflow-y-auto p-8">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
