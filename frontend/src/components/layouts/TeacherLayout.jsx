import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const TeacherLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top of the main container when route changes
  useEffect(() => {
    const mainContainer = document.getElementById('main-scroll-container');
    if (mainContainer) {
      mainContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname]);

  const menuItems = [
    { icon: 'fa-home', label: 'Dashboard', path: '/teacher' },
    { icon: 'fa-chalkboard', label: 'My Classes', path: '/teacher/classes' },
    { icon: 'fa-clipboard-check', label: 'Assignments', path: '/teacher/assignments' },
    { icon: 'fa-users', label: 'Students', path: '/teacher/students' },
  ];

  return (
    <div className="flex h-screen bg-[#e2e8f0] font-sans">
      {/* Sidebar */}
      <aside className={`glass-sidebar text-slate-300 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col z-20`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-800">
          {isSidebarOpen && <span className="font-bold text-xl tracking-wider text-white"><span className="text-sky-500">T</span>EACHER</span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            <i className={`fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto">
          {menuItems.map((item, idx) => {
            const isActive = location.pathname === item.path;
            return (
              <Link key={idx} to={item.path} className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
                <i className={`fas ${item.icon} ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-slate-800">
          <Link to="/login" className="flex items-center gap-4 px-3 py-3 rounded-xl text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-300">
            <i className={`fas fa-sign-out-alt ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
            {isSidebarOpen && <span className="font-semibold text-sm">Logout</span>}
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative nested-card-container m-3">
        
        {/* Top Header */}
        <header className="h-16 glass-header rounded-2xl flex items-center justify-between px-8 sticky top-0 z-10 mb-4">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-72 border border-slate-200 focus-within:border-sky-400 focus-within:ring-2 focus-within:ring-sky-100 transition-all">
            <i className="fas fa-search text-slate-400 text-sm"></i>
            <input type="text" placeholder="Search students, classes..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative">
              <button onClick={() => setShowNotifications(!showNotifications)} className="relative text-slate-500 hover:text-sky-500 transition-colors">
                <i className="far fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-sky-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">2</span>
              </button>
              
              {/* Dropdown Menu */}
              <div className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 ${showNotifications ? 'block' : 'hidden'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                  <h4 className="font-bold text-slate-800">Alerts</h4>
                  <button onClick={() => { navigate('/teacher/notifications', { state: { from: location.pathname } }); setShowNotifications(false); }} className="text-xs text-sky-500 font-bold hover:underline">View All</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/teacher/assignments'); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800"><i className="fas fa-file-upload text-sky-500 mr-1"></i> Assignment Submitted</p>
                    <p className="text-xs text-slate-500 mt-1">Priya submitted Physics Assignment.</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/teacher/classes'); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800"><i className="fas fa-video text-rose-500 mr-1"></i> Class Starting Soon</p>
                    <p className="text-xs text-slate-500 mt-1">Chemistry 101 starts in 15 mins.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 border-l border-slate-200 pl-6 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700 group-hover:text-sky-500 transition-colors">Prof. Sharma</p>
                <p className="text-xs text-slate-500">Mathematics Dept.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-white shadow-sm">
                <img src="https://ui-avatars.com/api/?name=Prof+Sharma&background=0284c7&color=ffffff" alt="Profile" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </header>

        {/* Dynamic Content via Outlet */}
        <main id="main-scroll-container" className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TeacherLayout;
