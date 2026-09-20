import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const ManageFinance = () => {
  const [data, setData] = useState({
    totalCollection: 0,
    pendingDues: 0,
    fullyPaidStudents: 0,
    transactions: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFinanceStats = async () => {
      try {
        const response = await api.get('/admin/finance');
        if (response.data.success) {
          setData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching finance stats:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchFinanceStats();
  }, []);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Finance & Fee Collection</h2>
          <p className="text-sm text-slate-500">Track institute revenue, pending fees, and recent transactions.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-bold shadow-sm transition-colors flex items-center gap-2">
            <i className="fas fa-download"></i> Export CSV
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 text-white shadow-lg shadow-emerald-200 relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center text-xl mb-4">
              <i className="fas fa-rupee-sign"></i>
            </div>
            <p className="text-sm font-bold text-emerald-100 mb-1 uppercase tracking-wider">Total Collection</p>
            <h4 className="text-3xl font-black">₹{Number(data.totalCollection).toLocaleString()}</h4>
          </div>
          <i className="fas fa-chart-line absolute -right-6 -bottom-6 text-[100px] text-white/10 group-hover:scale-110 transition-transform"></i>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Pending Dues</p>
            <h4 className="text-3xl font-black text-slate-800">₹{Number(data.pendingDues).toLocaleString()}</h4>
          </div>
          <p className="text-xs font-semibold text-rose-500 mt-4 flex items-center gap-1">
            <i className="fas fa-clock"></i> Action required
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Fully Paid Students</p>
            <h4 className="text-3xl font-black text-slate-800">{data.fullyPaidStudents}</h4>
          </div>
          <button className="text-indigo-600 hover:text-indigo-700 font-bold text-sm bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors mt-4 w-fit">
            View List
          </button>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Recent Transactions</h3>
          <div className="flex items-center bg-white border border-slate-200 rounded-xl px-4 py-2 w-full sm:w-64 focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <i className="fas fa-search text-slate-400"></i>
            <input type="text" placeholder="Search by TRX ID or Name..." className="bg-transparent border-none outline-none ml-3 w-full text-sm text-slate-700 placeholder-slate-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Transaction ID</th>
                <th className="p-5 font-bold border-b border-slate-100">Student & Course</th>
                <th className="p-5 font-bold border-b border-slate-100">Date & Method</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Amount</th>
                <th className="p-5 font-bold border-b border-slate-100 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {data.transactions.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No recent transactions found.</td>
                </tr>
              ) : data.transactions.map((trx, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0 group">
                  <td className="p-5 font-bold text-slate-700 font-mono">{trx.id}</td>
                  <td className="p-5">
                    <p className="font-bold text-slate-800">{trx.student}</p>
                    <p className="text-xs font-semibold text-slate-500">{trx.course}</p>
                  </td>
                  <td className="p-5">
                    <p className="font-semibold text-slate-700">{trx.date}</p>
                    <p className="text-xs font-semibold text-slate-500">{trx.method}</p>
                  </td>
                  <td className="p-5 text-right font-black text-slate-800 text-base">
                    ₹{Number(trx.amount).toLocaleString()}
                  </td>
                  <td className="p-5 text-center">
                    {trx.status === 'Success' ? (
                      <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
                        <i className="fas fa-check-circle"></i> Success
                      </span>
                    ) : (
                      <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-xs font-bold flex items-center justify-center gap-1 w-max mx-auto">
                        <i className="fas fa-times-circle"></i> Failed
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default ManageFinance;
