import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const CourseFee = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [feeDetails, setFeeDetails] = useState({
    totalFee: 0,
    paidAmount: 0,
    pendingAmount: 0,
    courseName: 'Loading...',
    installments: []
  });

  const fetchFees = async () => {
    try {
      const { data: result } = await api.get('/student/fees');
      
      if (result.success) {
        setFeeDetails({
          totalFee: result.data.totalFee,
          paidAmount: result.data.paidAmount,
          pendingAmount: result.data.pendingAmount,
          courseName: 'Medical Prep - 11th & 12th', // Assuming course name is static or fetched elsewhere
          installments: result.data.installments
        });
      }
    } catch (error) {
      console.error('Error fetching fees:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFees();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const handlePayClick = (installment) => {
    setSelectedInstallment(installment);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    setProcessing(true);
    try {
      const res = await loadRazorpayScript();
      if (!res) {
        alert('Razorpay SDK failed to load. Are you online?');
        setProcessing(false);
        return;
      }

      const { data: orderData } = await api.post('/payment/create-order', {
        amount: selectedInstallment.amount,
        itemId: selectedInstallment.id, 
        itemType: 'course' 
      });

      if (!orderData.success) {
        alert('Failed to create order. Please try again.');
        setProcessing(false);
        return;
      }

      const options = {
        key: 'rzp_test_placeholder', // Usually fetched from env or backend
        amount: orderData.order.amount,
        currency: orderData.order.currency,
        name: 'Aarambh Institute',
        description: `Payment for Installment #${selectedInstallment.id}`,
        order_id: orderData.order.id,
        handler: async function (response) {
          try {
            const verifyRes = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              itemId: selectedInstallment.id,
              itemType: 'course',
              amountPaid: selectedInstallment.amount
            });

            if (verifyRes.data.success) {
              alert('Payment Successful!');
              setShowPaymentModal(false);
              fetchFees(); // Refresh data
            } else {
              alert(verifyRes.data.message || 'Payment Verification Failed!');
            }
          } catch (error) {
            console.error('Verify error:', error);
            alert(error.response?.data?.message || 'An error occurred during verification.');
          }
        },
        prefill: {
          name: 'Student Name', // Should ideally come from user profile
          email: 'student@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#6366f1'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('An error occurred while processing the payment.');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-800 tracking-tight flex items-center gap-4">
            <div className="w-12 h-12 rounded-[1.25rem] bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-2xl shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white">
              <i className="fas fa-wallet"></i>
            </div>
            Course Fee & Payments
          </h2>
          <p className="text-slate-500 mt-2 font-medium ml-2 text-lg">Track your fee installments and make online payments.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        {/* Total Course Fee Card */}
        <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_15px_50px_rgba(99,102,241,0.2)] hover:shadow-[0_30px_60px_rgba(99,102,241,0.4)] hover:-translate-y-2 transition-all duration-700 h-full">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
             <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          <div className="relative bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 rounded-[calc(2.5rem-2px)] p-8 text-white h-full overflow-hidden flex flex-col justify-between z-10 border border-indigo-400/30">
            <div className="absolute top-0 right-0 w-48 h-48 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
              <p className="text-indigo-100 font-black uppercase tracking-[0.2em] text-[10px] mb-2 drop-shadow-sm">Total Course Fee</p>
              <h3 className="text-4xl lg:text-5xl font-black mb-4 flex items-start drop-shadow-md leading-none">
                <span className="text-2xl mr-2 mt-1 opacity-80">₹</span>{parseFloat(feeDetails.totalFee).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </h3>
              <p className="text-sm font-bold text-indigo-50/90 bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl inline-block border border-white/20">
                Course: {feeDetails.courseName}
              </p>
            </div>
            <i className="fas fa-wallet absolute -right-6 -bottom-6 text-[140px] text-white opacity-10 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"></i>
          </div>
        </div>

        {/* Amount Paid Card */}
        <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(16,185,129,0.2)] hover:-translate-y-2 transition-all duration-700 h-full">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
             <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#10b981_80%,#047857_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] p-8 h-full flex flex-col justify-between z-10 border border-white group-hover:border-transparent transition-colors duration-500 overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Amount Paid</p>
              <h3 className="text-4xl lg:text-5xl font-black mb-6 flex items-start text-emerald-500 leading-none">
                <span className="text-2xl mr-2 mt-1 opacity-80 text-emerald-600">₹</span>{parseFloat(feeDetails.paidAmount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </h3>
              
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden shadow-inner relative">
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)] transition-all duration-1000"
                  style={{ width: `${(feeDetails.paidAmount / feeDetails.totalFee) * 100}%` }}
                ></div>
              </div>
            </div>
            <i className="fas fa-check-circle absolute -right-6 -bottom-6 text-[140px] text-slate-50 opacity-50 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700"></i>
          </div>
        </div>

        {/* Pending Amount Card */}
        <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(244,63,94,0.2)] hover:-translate-y-2 transition-all duration-700 h-full">
          <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
             <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#f43f5e_80%,#be123c_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
          <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] p-8 h-full flex flex-col justify-between z-10 border border-white group-hover:border-transparent transition-colors duration-500 overflow-hidden">
            <div className="relative z-10">
              <p className="text-slate-400 font-black uppercase tracking-[0.2em] text-[10px] mb-2">Pending Amount</p>
              <h3 className="text-4xl lg:text-5xl font-black mb-6 flex items-start text-rose-500 leading-none">
                <span className="text-2xl mr-2 mt-1 opacity-80 text-rose-600">₹</span>{parseFloat(feeDetails.pendingAmount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
              </h3>
              <button className="w-full bg-slate-900 hover:bg-slate-800 text-white text-sm font-black py-4 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5">
                View Payment Schedule
              </button>
            </div>
            <i className="fas fa-exclamation-circle absolute -right-6 -bottom-6 text-[140px] text-slate-50 opacity-50 group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-700"></i>
          </div>
        </div>
      </div>

      {/* Advanced Installments Table */}
      <div className="flex items-center gap-4 mb-8">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center shadow-inner text-lg border border-slate-200">
            <i className="fas fa-file-invoice-dollar"></i>
          </div>
          Fee Installments
        </h3>
        <div className="h-px bg-gradient-to-r from-slate-200 to-transparent flex-1"></div>
      </div>

      <div className="relative group rounded-[2.5rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-shadow duration-700">
        
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
           <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        <div className="relative bg-white/90 backdrop-blur-xl rounded-[calc(2.5rem-2px)] overflow-hidden z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">
                  <th className="p-6 border-b border-slate-100 pl-8">Installment</th>
                  <th className="p-6 border-b border-slate-100">Due Date</th>
                  <th className="p-6 border-b border-slate-100">Amount</th>
                  <th className="p-6 border-b border-slate-100">Status</th>
                  <th className="p-6 border-b border-slate-100 text-right pr-8">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {feeDetails.installments.map((inst, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors border-b border-slate-50 last:border-0 group/row">
                    <td className="p-6 pl-8">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500 font-bold border border-indigo-100 group-hover/row:scale-110 transition-transform">
                          #{inst.id}
                        </div>
                        <span className="font-black text-slate-800 text-base">Installment {inst.id}</span>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-slate-500 group-hover/row:text-slate-800 transition-colors">
                      <i className="far fa-calendar-alt mr-2 opacity-50"></i>{inst.dueDate}
                    </td>
                    <td className="p-6 font-black text-slate-800 text-lg">
                      <span className="text-slate-400 text-sm mr-1">₹</span>{parseFloat(inst.amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </td>
                    <td className="p-6">
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] font-black shadow-sm uppercase tracking-wider border ${
                        inst.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        <span className={`w-2 h-2 rounded-full ${
                          inst.status === 'Paid' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]' : 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.8)]'
                        }`}></span>
                        {inst.status}
                      </span>
                      {inst.receiptNo && (
                        <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest"><i className="fas fa-receipt mr-1"></i> {inst.receiptNo}</p>
                      )}
                    </td>
                    <td className="p-6 text-right pr-8">
                      {inst.status === 'Paid' ? (
                        <button className="text-emerald-600 hover:text-white font-black text-sm bg-emerald-50 hover:bg-emerald-500 px-6 py-3 rounded-xl transition-all border border-emerald-100 hover:border-emerald-500 shadow-sm hover:shadow-[0_10px_25px_rgba(16,185,129,0.3)] hover:-translate-y-0.5 group/btn">
                          <i className="fas fa-download mr-2 opacity-70 group-hover/btn:animate-bounce"></i> Receipt
                        </button>
                      ) : (
                        <button 
                          onClick={() => handlePayClick(inst)}
                          className="text-white font-black text-sm bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:shadow-[0_15px_35px_rgba(99,102,241,0.6)] px-8 py-3 rounded-xl transition-all hover:-translate-y-0.5 border border-indigo-400/30"
                        >
                          Pay Now <i className="fas fa-arrow-right ml-2 opacity-50"></i>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Payment Processing Modal Mock (Premium Glassmorphism) */}
      {showPaymentModal && selectedInstallment && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="relative group rounded-[2.5rem] p-[2.5px] w-full max-w-md shadow-[0_30px_60px_rgba(0,0,0,0.5)] animate-in fade-in zoom-in duration-300">
            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden z-0">
               <div className="absolute -inset-[100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_60%,#6366f1_80%,#d946ef_100%)] opacity-100"></div>
            </div>
            
            <div className="relative bg-white/95 backdrop-blur-2xl rounded-[calc(2.5rem-2px)] p-10 z-10 border border-white">
              <button onClick={() => setShowPaymentModal(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-800 transition-colors w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-100 shadow-sm border border-transparent hover:border-slate-200">
                <i className="fas fa-times text-xl"></i>
              </button>
              
              <div className="text-center mb-10">
                <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center text-3xl mx-auto mb-6 shadow-[inset_0_2px_10px_rgba(255,255,255,1),0_4px_15px_rgba(99,102,241,0.2)] border border-white relative overflow-hidden">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
                  <i className="fas fa-lock relative z-10"></i>
                </div>
                <h3 className="text-2xl font-black text-slate-800">Secure Checkout</h3>
                <p className="text-sm font-semibold text-slate-500 mt-2">Process your course fee payment securely.</p>
              </div>

              <div className="bg-slate-50/80 backdrop-blur-sm p-6 rounded-[1.5rem] border border-slate-100/80 mb-8 space-y-4 shadow-inner">
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Installment</span>
                  <span className="font-black text-slate-800 bg-white px-3 py-1 rounded-lg shadow-sm border border-slate-100">#{selectedInstallment.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">Course</span>
                  <span className="font-bold text-slate-800 text-right">{feeDetails.courseName}</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex justify-between items-center mt-2">
                  <span className="font-black text-slate-800 text-sm uppercase tracking-wider">Total Amount</span>
                  <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 text-3xl drop-shadow-sm">₹{parseFloat(selectedInstallment.amount).toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                </div>
              </div>

              <button 
                type="button" 
                onClick={processPayment} 
                disabled={processing}
                className="w-full bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white font-black py-5 rounded-[1.25rem] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:-translate-y-0.5 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
              >
                {processing ? (
                  <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> Processing...</>
                ) : (
                  <><i className="fas fa-credit-card"></i> Proceed to Gateway</>
                )}
              </button>
              <p className="text-[10px] font-black text-center text-slate-400 mt-6 uppercase tracking-widest flex items-center justify-center gap-2">
                <i className="fas fa-shield-alt text-emerald-500"></i> 100% Secure & Encrypted
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseFee;
