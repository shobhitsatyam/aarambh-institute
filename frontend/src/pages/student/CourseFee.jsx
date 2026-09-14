import React, { useState } from 'react';

const CourseFee = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  const feeDetails = {
    totalFee: 45000,
    paidAmount: 15000,
    pendingAmount: 30000,
    courseName: 'Medical Prep - 11th & 12th',
    installments: [
      { id: 1, amount: 15000, dueDate: 'Aug 15, 2026', status: 'Paid', receiptNo: 'REC-00124' },
      { id: 2, amount: 15000, dueDate: 'Nov 15, 2026', status: 'Pending', receiptNo: null },
      { id: 3, amount: 15000, dueDate: 'Feb 15, 2027', status: 'Pending', receiptNo: null },
    ]
  };

  const handlePayClick = (installment) => {
    setSelectedInstallment(installment);
    setShowPaymentModal(true);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Course Fee & Payments</h2>
        <p className="text-sm text-slate-500">Track your fee installments and make online payments.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Stats Cards */}
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-indigo-100 font-bold uppercase tracking-wider text-xs mb-1">Total Course Fee</p>
            <h3 className="text-4xl font-black mb-6 flex items-center">
              <span className="text-2xl mr-1">₹</span>{feeDetails.totalFee.toLocaleString()}
            </h3>
            <p className="text-sm font-semibold text-indigo-50">Course: {feeDetails.courseName}</p>
          </div>
          <i className="fas fa-wallet absolute -right-6 -bottom-6 text-[120px] text-white/10"></i>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Amount Paid</p>
            <h3 className="text-4xl font-black mb-6 flex items-center text-emerald-500">
              <span className="text-2xl mr-1">₹</span>{feeDetails.paidAmount.toLocaleString()}
            </h3>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-500 rounded-full"
                style={{ width: `${(feeDetails.paidAmount / feeDetails.totalFee) * 100}%` }}
              ></div>
            </div>
          </div>
          <i className="fas fa-check-circle absolute -right-6 -bottom-6 text-[120px] text-slate-50 group-hover:scale-110 transition-transform"></i>
        </div>

        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <p className="text-slate-500 font-bold uppercase tracking-wider text-xs mb-1">Pending Amount</p>
            <h3 className="text-4xl font-black mb-6 flex items-center text-rose-500">
              <span className="text-2xl mr-1">₹</span>{feeDetails.pendingAmount.toLocaleString()}
            </h3>
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold py-2.5 rounded-xl transition-colors">
              View Payment Schedule
            </button>
          </div>
          <i className="fas fa-exclamation-circle absolute -right-6 -bottom-6 text-[120px] text-slate-50 group-hover:scale-110 transition-transform"></i>
        </div>
      </div>

      {/* Installments Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-800">Fee Installments</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-5 font-bold border-b border-slate-100">Installment</th>
                <th className="p-5 font-bold border-b border-slate-100">Due Date</th>
                <th className="p-5 font-bold border-b border-slate-100">Amount</th>
                <th className="p-5 font-bold border-b border-slate-100">Status</th>
                <th className="p-5 font-bold border-b border-slate-100 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {feeDetails.installments.map((inst, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 transition-colors border-b border-slate-50 last:border-0">
                  <td className="p-5 font-bold text-slate-800">Installment {inst.id}</td>
                  <td className="p-5 font-semibold text-slate-500">{inst.dueDate}</td>
                  <td className="p-5 font-black text-slate-700">₹{inst.amount.toLocaleString()}</td>
                  <td className="p-5">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                      inst.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inst.status}
                    </span>
                    {inst.receiptNo && (
                      <p className="text-xs font-semibold text-slate-400 mt-1">Receipt: {inst.receiptNo}</p>
                    )}
                  </td>
                  <td className="p-5 text-right">
                    {inst.status === 'Paid' ? (
                      <button className="text-emerald-600 hover:text-emerald-700 font-bold text-sm bg-emerald-50 hover:bg-emerald-100 px-4 py-2 rounded-lg transition-colors">
                        <i className="fas fa-download mr-1"></i> Receipt
                      </button>
                    ) : (
                      <button 
                        onClick={() => handlePayClick(inst)}
                        className="text-white font-bold text-sm bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-600/30 px-6 py-2 rounded-lg transition-colors"
                      >
                        Pay Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Processing Modal Mock */}
      {showPaymentModal && selectedInstallment && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 w-full max-w-md shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button onClick={() => setShowPaymentModal(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-100">
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center text-2xl mx-auto mb-4">
                <i className="fas fa-lock"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800">Secure Checkout</h3>
              <p className="text-sm text-slate-500 mt-1">Process your course fee payment securely.</p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-6 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500">Installment</span>
                <span className="font-bold text-slate-800">#{selectedInstallment.id}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-slate-500">Course</span>
                <span className="font-bold text-slate-800 text-right">{feeDetails.courseName}</span>
              </div>
              <div className="border-t border-slate-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-slate-800">Total Amount</span>
                <span className="font-black text-indigo-600 text-xl">₹{selectedInstallment.amount.toLocaleString()}</span>
              </div>
            </div>

            <button type="button" onClick={() => {
              alert('This is a mock UI. In production, this would redirect to Razorpay/Stripe.');
              setShowPaymentModal(false);
            }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg mt-2 flex items-center justify-center gap-2">
              <i className="fas fa-credit-card"></i> Proceed to Payment Gateway
            </button>
            <p className="text-xs text-center text-slate-400 mt-4 font-semibold">
              <i className="fas fa-shield-alt mr-1"></i> 100% Secure & Encrypted Payments
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFee;
