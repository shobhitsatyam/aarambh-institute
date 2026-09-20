import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Scroll to top of the main container when route changes
  useEffect(() => {
    setTimeout(() => {
      const mainContainer = document.getElementById('main-scroll-container');
      if (mainContainer) {
        mainContainer.scrollTop = 0;
      }
    }, 10);
  }, [location.pathname]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('admin_session');
    navigate('/login');
  };

  const mainNavItems = [
    { icon: 'fa-tachometer-alt', label: 'Dashboard', path: '/admin-dashboard' },
    { icon: 'fa-user-clock', label: 'Pending Admissions', path: '/admin/pending-admissions' },
    { icon: 'fa-user-graduate', label: 'Students', path: '/admin/students' },
    { icon: 'fa-video', label: 'Live Classes', path: '/admin/live-classes' },
    { icon: 'fa-book-open', label: 'Study Materials', path: '/admin/materials' },
    { icon: 'fa-graduation-cap', label: 'Courses', path: '/admin/courses' },
    { icon: 'fa-file-alt', label: 'Exams', path: '/admin/exams' },
  ];

  const adminNavItems = [
    { icon: 'fa-chalkboard-teacher', label: 'Teachers', path: '/admin/teachers' },
    { icon: 'fa-calendar-alt', label: 'Calendar', path: '/admin/calendar' },
    { icon: 'fa-clipboard-check', label: 'Attendance', path: '/admin/attendance' },
    { icon: 'fa-headset', label: 'Support Tickets', path: '/admin/tickets' },
    { icon: 'fa-question-circle', label: 'Doubt Sessions', path: '/admin/doubts' },
    { icon: 'fa-envelope-open-text', label: 'Queries & Leads', path: '/admin/queries' },
    { icon: 'fa-bullhorn', label: 'Notifications', path: '/admin/notifications' },
    { icon: 'fa-money-bill-wave', label: 'Finance', path: '/admin/finance' },
    { icon: 'fa-exchange-alt', label: 'Program Switches', path: '/admin/switch-program' },
    { icon: 'fa-blog', label: 'Blogs', path: '/admin/blogs' },
    { icon: 'fa-tags', label: 'Blog Categories', path: '/admin/blog-categories' },
    { icon: 'fa-cog', label: 'Settings', path: '/admin/settings' }, // Placeholder
  ];

  return (
    <div className="flex h-screen bg-[#e2e8f0] font-sans">
      {/* Sidebar */}
      <aside className={`glass-sidebar text-slate-300 transition-all duration-300 ${isSidebarOpen ? 'w-64' : 'w-20'} flex flex-col z-20`}>
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700/50">
          {isSidebarOpen && <span className="font-bold text-xl tracking-wider text-white">ADMIN<span className="text-indigo-400">PANEL</span></span>}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white transition-colors">
            <i className={`fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>
        
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3 overflow-y-auto custom-scrollbar">
          <p className={`text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3 ${!isSidebarOpen && 'hidden'}`}>Main Menu</p>
          {mainNavItems.map((item, idx) => {
            const isActive = location.pathname === item.path || (location.pathname === '/admin' && item.path === '/admin-dashboard');
            return (
              <Link 
                key={`main-${idx}`} 
                to={item.path} 
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                title={!isSidebarOpen ? item.label : ""}
              >
                <i className={`fas ${item.icon} ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
            )
          })}

          <p className={`text-xs font-bold text-slate-500 uppercase tracking-widest mb-2 px-3 mt-6 ${!isSidebarOpen && 'hidden'}`}>Administration</p>
          {adminNavItems.map((item, idx) => {
             const isActive = location.pathname === item.path;
             return (
              <Link 
                key={`admin-${idx}`} 
                to={item.path} 
                className={`flex items-center gap-4 px-3 py-3 rounded-xl transition-all duration-300 ${isActive ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                title={!isSidebarOpen ? item.label : ""}
              >
                <i className={`fas ${item.icon} ${isSidebarOpen ? 'text-lg w-5 text-center' : 'text-xl mx-auto'}`}></i>
                {isSidebarOpen && <span className="font-semibold text-sm">{item.label}</span>}
              </Link>
             )
          })}
        </nav>

        <div className="p-4 border-t border-slate-700/50">
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
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-bold text-slate-800 hidden sm:block">Admin Portal</h2>
          </div>
          
          <div className="flex items-center gap-5 relative">
            
            {/* Click Outside Overlay */}
            {(showQuickAdd || showNotifications || showProfileMenu) && (
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => { setShowQuickAdd(false); setShowNotifications(false); setShowProfileMenu(false); }}
              ></div>
            )}

            {/* Quick Add Menu */}
            <div className="relative z-50">
              <button 
                onClick={() => { setShowQuickAdd(!showQuickAdd); setShowNotifications(false); setShowProfileMenu(false); }} 
                className="bg-indigo-50 text-indigo-600 hover:bg-indigo-100 px-4 py-2 rounded-full text-sm font-bold transition-colors shadow-sm border border-indigo-100 hidden md:flex items-center gap-2"
              >
                 <i className="fas fa-plus"></i> Quick Add
              </button>
              
              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden ${showQuickAdd ? 'block' : 'hidden'}`}>
                <div className="py-2">
                  <button onClick={() => { navigate('/admin/students'); setShowQuickAdd(false); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2">
                    <i className="fas fa-user-graduate w-4"></i> Add Student
                  </button>
                  <button onClick={() => { navigate('/admin/teachers'); setShowQuickAdd(false); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2">
                    <i className="fas fa-chalkboard-teacher w-4"></i> Add Teacher
                  </button>
                  <button onClick={() => { navigate('/admin/live-classes'); setShowQuickAdd(false); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2">
                    <i className="fas fa-video w-4"></i> Schedule Class
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={() => { navigate('/admin/notifications'); setShowQuickAdd(false); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2">
                    <i className="fas fa-bullhorn w-4"></i> Send Broadcast
                  </button>
                </div>
              </div>
            </div>

            <div className="h-6 w-px bg-slate-200 mx-2"></div>
            
            {/* Notification Menu */}
            <div className="relative z-50">
              <button 
                onClick={() => { setShowNotifications(!showNotifications); setShowQuickAdd(false); setShowProfileMenu(false); }} 
                className="relative text-slate-500 hover:text-indigo-600 transition-colors"
              >
                <i className="far fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping"></span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
              </button>
              
              <div className={`absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 ${showNotifications ? 'block' : 'hidden'}`}>
                <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
                  <h4 className="font-bold text-slate-800">Alerts</h4>
                  <button onClick={() => { navigate('/admin/notifications', { state: { from: location.pathname } }); setShowNotifications(false); }} className="text-xs text-indigo-600 font-bold hover:underline">View All</button>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-slate-50 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/tickets'); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800 text-rose-500"><i className="fas fa-headset mr-1"></i> New Ticket</p>
                    <p className="text-xs text-slate-500 mt-1">Rahul asked a question about fees.</p>
                  </div>
                  <div className="p-4 hover:bg-slate-50 cursor-pointer transition-colors" onClick={() => { navigate('/admin/queries'); setShowNotifications(false); }}>
                    <p className="text-sm font-bold text-slate-800 text-emerald-500"><i className="fas fa-user-plus mr-1"></i> New Lead</p>
                    <p className="text-xs text-slate-500 mt-1">A new student submitted the contact form.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Menu */}
            <div className="relative z-50">
              <div 
                className="flex items-center gap-3 pl-2 cursor-pointer group"
                onClick={() => { setShowProfileMenu(!showProfileMenu); setShowQuickAdd(false); setShowNotifications(false); }}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center border-2 border-white shadow-sm overflow-hidden">
                   <img src="https://ui-avatars.com/api/?name=Admin+User&background=4f46e5&color=ffffff" alt="Admin" className="w-full h-full object-cover" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-bold text-slate-700 group-hover:text-indigo-600 transition-colors leading-tight">Super Admin</p>
                </div>
                <i className={`fas fa-chevron-down text-xs text-slate-400 group-hover:text-indigo-600 transition-transform ${showProfileMenu ? 'rotate-180' : ''}`}></i>
              </div>

              <div className={`absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden ${showProfileMenu ? 'block' : 'hidden'}`}>
                <div className="p-4 border-b border-slate-100 bg-slate-50">
                  <p className="text-sm font-bold text-slate-800">Super Admin</p>
                  <p className="text-xs font-semibold text-slate-500 truncate">admin@aarambh.com</p>
                </div>
                <div className="py-2">
                  <button onClick={() => { navigate('/admin/change-password'); setShowProfileMenu(false); }} className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 flex items-center gap-2">
                    <i className="fas fa-key w-4"></i> Change Password
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button onClick={handleLogout} className="w-full text-left px-4 py-2 text-sm font-bold text-rose-600 hover:bg-rose-50 flex items-center gap-2">
                    <i className="fas fa-sign-out-alt w-4"></i> Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content (Outlet) */}
        <main id="main-scroll-container" className="flex-1 overflow-y-auto p-8">
            <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
