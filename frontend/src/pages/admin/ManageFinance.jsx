import React from 'react';

const ManageFinance = () => {
  const transactions = [
    { id: '#TRX-901', student: 'Rahul Sharma', course: 'BBOSE 10th', amount: 15000, date: 'Oct 24, 2026', status: 'Success', method: 'UPI' },
    { id: '#TRX-902', student: 'Priya Singh', course: 'NIOS 12th', amount: 20000, date: 'Oct 23, 2026', status: 'Success', method: 'Card' },
    { id: '#TRX-903', student: 'Amit Kumar', course: 'Medical Prep', amount: 15000, date: 'Oct 23, 2026', status: 'Failed', method: 'UPI' },
    { id: '#TRX-904', student: 'Neha Gupta', course: 'BBOSE 12th', amount: 12000, date: 'Oct 21, 2026', status: 'Success', method: 'Net Banking' },
  ];

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
            <p className="text-sm font-bold text-emerald-100 mb-1 uppercase tracking-wider">Total Collection (This Month)</p>
            <h4 className="text-3xl font-black">₹4,25,000</h4>
          </div>
          <i className="fas fa-chart-line absolute -right-6 -bottom-6 text-[100px] text-white/10 group-hover:scale-110 transition-transform"></i>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-exclamation-circle"></i>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Pending Dues</p>
            <h4 className="text-3xl font-black text-slate-800">₹1,15,000</h4>
          </div>
          <p className="text-xs font-semibold text-rose-500 mt-4 flex items-center gap-1">
            <i className="fas fa-arrow-up"></i> 12% higher than last month
          </p>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-500 flex items-center justify-center text-xl mb-4">
              <i className="fas fa-users"></i>
            </div>
            <p className="text-sm font-bold text-slate-500 mb-1 uppercase tracking-wider">Fully Paid Students</p>
            <h4 className="text-3xl font-black text-slate-800">452</h4>
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
              {transactions.map((trx, idx) => (
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
                    ₹{trx.amount.toLocaleString()}
                  </td>
                  <td className="p-5 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      trx.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                    }`}>
                      {trx.status}
                    </span>
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
