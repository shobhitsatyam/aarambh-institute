import React, { useState } from 'react';

const ManageQueries = () => {
  const [activeTab, setActiveTab] = useState('Contact Us');
  const [selectedQuery, setSelectedQuery] = useState(null);

  const tabs = ['Contact Us', 'Registration Forms', 'Home Page', 'Join Us'];

  // Dummy data representing different sources
  const queries = [
    { id: '#QRY-501', source: 'Contact Us', name: 'Rahul Sharma', email: 'rahul@example.com', phone: '9876543210', status: 'New', date: 'Oct 24, 2026', message: 'I want to know the fee structure for BBOSE 12th.' },
    { id: '#QRY-502', source: 'Contact Us', name: 'Priya Singh', email: 'priya@example.com', phone: '9876543211', status: 'Contacted', date: 'Oct 23, 2026', message: 'Do you offer weekend batches for Medical Prep?' },
    { id: '#QRY-601', source: 'Registration Forms', name: 'Amit Kumar', email: 'amit@example.com', phone: '9876543212', status: 'New', date: 'Oct 24, 2026', message: 'Submitted admission form for NIOS 10th.' },
    { id: '#QRY-701', source: 'Home Page', name: 'Neha Gupta', email: 'neha@example.com', phone: '9876543213', status: 'Resolved', date: 'Oct 20, 2026', message: 'Requested callback from popup form.' },
    { id: '#QRY-801', source: 'Join Us', name: 'Dr. Verma', email: 'verma@example.com', phone: '9876543214', status: 'New', date: 'Oct 24, 2026', message: 'Interested in joining as a Mathematics Faculty.' },
  ];

  const filteredQueries = queries.filter(q => q.source === activeTab);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Manage Queries</h2>
          <p className="text-sm text-slate-500">Handle leads, contact requests, and applications from all sources.</p>
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        
        {/* Custom Tab Navigation */}
        <div className="flex overflow-x-auto border-b border-slate-100 bg-slate-50/30 scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-all border-b-2 relative ${
                activeTab === tab 
                ? 'text-indigo-600 border-indigo-600 bg-indigo-50/50' 
                : 'text-slate-500 border-transparent hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {tab}
              {/* Badge for 'New' items */}
              {queries.filter(q => q.source === tab && q.status === 'New').length > 0 && (
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex gap-3">
            <select className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-sm text-slate-600 font-semibold outline-none focus:border-indigo-400">
              <option>All Status</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Resolved</option>
            </select>
          </div>
          
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder={`Search ${activeTab}...`} className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Contact Details</th>
                <th className="p-5 font-bold border-b border-slate-100">Message / Request</th>
                <th className="p-5 font-bold border-b border-slate-100">Date</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredQueries.map((query, idx) => (
                <tr key={idx} className={`transition-colors border-b border-slate-50 last:border-0 group ${
                  query.status === 'New' ? 'bg-indigo-50/20 hover:bg-indigo-50/50' : 'hover:bg-slate-50'
                }`}>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{query.name}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5"><i className="fas fa-envelope mr-1 text-slate-400"></i> {query.email}</p>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5"><i className="fas fa-phone-alt mr-1 text-slate-400"></i> {query.phone}</p>
                  </td>
                  <td className="p-5">
                    <p className="text-slate-600 line-clamp-2 max-w-sm">{query.message}</p>
                  </td>
                  <td className="p-5 font-semibold text-slate-600">{query.date}</td>
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      query.status === 'New' ? 'bg-rose-100 text-rose-700' :
                      query.status === 'Contacted' ? 'bg-amber-100 text-amber-700' :
                      'bg-emerald-100 text-emerald-700'
                    }`}>
                      {query.status}
                    </span>
                  </td>
                  <td className="p-5 text-right">
                    <button 
                      onClick={() => setSelectedQuery(query)}
                      className="text-indigo-600 hover:text-white font-bold text-sm bg-indigo-50 hover:bg-indigo-600 px-4 py-2 rounded-lg transition-colors"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
              {filteredQueries.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500 font-semibold">
                    No queries found for {activeTab}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Query Modal */}
      {selectedQuery && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-xl shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setSelectedQuery(null)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="flex items-center justify-between mb-6 pr-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <i className="fas fa-user-circle text-indigo-500 text-2xl"></i> {selectedQuery.name}
              </h3>
              <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold">
                Source: {selectedQuery.source}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Email</p>
                <p className="font-bold text-slate-700 text-sm flex items-center gap-2">
                  <i className="fas fa-envelope text-indigo-400"></i> {selectedQuery.email}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Phone</p>
                <p className="font-bold text-slate-700 text-sm flex items-center gap-2">
                  <i className="fas fa-phone-alt text-indigo-400"></i> {selectedQuery.phone}
                </p>
              </div>
            </div>

            <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 mb-8">
              <p className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-2">Message</p>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                "{selectedQuery.message}"
              </p>
              <p className="text-xs font-semibold text-slate-400 mt-3 text-right">Received on {selectedQuery.date}</p>
            </div>
            
            <form className="space-y-5 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Update Lead Status</label>
                  <select defaultValue={selectedQuery.status} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-indigo-500 transition-colors appearance-none font-bold">
                    <option value="New">New</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Resolved">Resolved</option>
                  </select>
                </div>
                <div className="flex-1 flex items-end">
                  <button type="button" onClick={() => setSelectedQuery(null)} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-indigo-600/30">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageQueries;
