import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    activeStudents: 0,
    monthlyRevenue: 0,
    openTickets: 0,
    newQueries: 0,
    liveClassesToday: [],
    recentLeads: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/admin/dashboard');
        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch admin stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-black text-slate-800">Institute Overview</h2>
        <p className="text-slate-500 mt-1 font-semibold">Welcome back to the admin command center.</p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div className="premium-glass-card p-6 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-user-graduate"></i>
            </div>
            <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <i className="fas fa-arrow-up"></i> 12%
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">{stats.activeStudents}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Active Students</p>
        </div>

        <div className="premium-glass-card p-6 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <span className="text-emerald-500 font-bold text-sm bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <i className="fas fa-arrow-up"></i> Live
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">₹{parseFloat(stats.monthlyRevenue).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
        </div>

        <div className="premium-glass-card p-6 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-headset"></i>
            </div>
            <span className="text-rose-500 font-bold text-sm bg-rose-50 px-2 py-0.5 rounded flex items-center gap-1">
              Live
            </span>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">{stats.openTickets}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">Open Tickets</p>
        </div>

        <div className="premium-glass-card p-6 group">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i className="fas fa-question-circle"></i>
            </div>
          </div>
          <h3 className="text-3xl font-black text-slate-800 mb-1">{stats.newQueries}</h3>
          <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">New Queries</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        
        {/* Left Col - 2 spans */}
        <div className="xl:col-span-2 space-y-8">
          
          {/* Quick Actions */}
          <div className="nested-card p-8">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <button onClick={() => navigate('/admin/live-classes')} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-3 text-slate-600 group-hover:text-indigo-600">
                  <i className="fas fa-video"></i>
                </div>
                <span className="text-xs font-bold text-center">Schedule Class</span>
              </button>
              
              <button onClick={() => navigate('/admin/notifications')} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-600 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-3 text-slate-600 group-hover:text-emerald-600">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <span className="text-xs font-bold text-center">Broadcast</span>
              </button>

              <button onClick={() => navigate('/admin/students')} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 hover:bg-purple-50 hover:text-purple-600 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-3 text-slate-600 group-hover:text-purple-600">
                  <i className="fas fa-user-plus"></i>
                </div>
                <span className="text-xs font-bold text-center">Add Student</span>
              </button>

              <button onClick={() => navigate('/admin/materials')} className="flex flex-col items-center p-4 rounded-2xl bg-slate-50 hover:bg-amber-50 hover:text-amber-600 transition-colors group">
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center text-xl mb-3 text-slate-600 group-hover:text-amber-600">
                  <i className="fas fa-file-upload"></i>
                </div>
                <span className="text-xs font-bold text-center">Upload PDF</span>
              </button>
            </div>
          </div>

          {/* Today's Schedule */}
          <div className="nested-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Live Classes Today</h3>
              <button onClick={() => navigate('/admin/live-classes')} className="text-indigo-600 font-bold text-sm hover:underline">Manage All</button>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {stats.liveClassesToday.length === 0 ? (
                  <div className="text-center py-6 text-slate-500">No live classes scheduled for today.</div>
                ) : (
                  stats.liveClassesToday.map((cls, idx) => (
                    <div key={idx} className="flex gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 items-center">
                      <div className="text-center w-20">
                        <p className="text-xs font-bold text-slate-400">{cls.time}</p>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-slate-800">{cls.subject}</h4>
                        <p className="text-xs font-semibold text-slate-500">{cls.topic || 'Regular Class'}</p>
                      </div>
                      <div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${cls.status === 'Live' ? 'bg-emerald-100 text-emerald-600 animate-pulse' : 'bg-white text-slate-500 border border-slate-200'}`}>
                          {cls.status}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Right Col - 1 span */}
        <div className="lg:col-span-1 space-y-8">
          
          {/* Unresolved Issues Widget */}
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl shadow-rose-200 relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <i className="fas fa-exclamation-triangle"></i> Attention Required
              </h3>
              
              <div className="space-y-3">
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/admin/tickets')}>
                  <span className="text-sm font-semibold">Open Tickets</span>
                  <span className="bg-white text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/admin/queries')}>
                  <span className="text-sm font-semibold">New Website Leads</span>
                  <span className="bg-white text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">12</span>
                </div>
                <div className="bg-white/10 backdrop-blur rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/admin/doubts')}>
                  <span className="text-sm font-semibold">Unassigned Doubts</span>
                  <span className="bg-white text-rose-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                </div>
              </div>
            </div>
            <i className="fas fa-shield-alt absolute -right-6 -bottom-6 text-[120px] text-white/5"></i>
          </div>

          {/* Recent Queries Feed */}
          <div className="nested-card overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
              <h3 className="text-lg font-bold text-slate-800">Latest Leads</h3>
            </div>
            <div className="p-6 space-y-4">
              
              {stats.recentLeads.length === 0 ? (
                <div className="text-center py-6 text-slate-500">No recent leads found.</div>
              ) : (
                stats.recentLeads.map((lead, idx) => (
                  <div key={idx} className="flex gap-3 items-start border-b border-slate-50 pb-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-50 text-indigo-500 flex items-center justify-center shrink-0">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{lead.name}</h4>
                      <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{lead.message}</p>
                      <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase">{lead.time} • Contact Form</p>
                    </div>
                  </div>
                ))
              )}

              <button onClick={() => navigate('/admin/queries')} className="w-full text-indigo-600 font-bold text-sm hover:underline mt-2">
                View All Leads
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
