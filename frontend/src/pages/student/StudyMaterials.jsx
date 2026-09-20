import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const StudyMaterials = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      const response = await api.get('/student/materials');
      if (response.data.success) {
        setMaterials(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch materials", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleBuy = async (id, price) => {
    try {
      // 1. Load Razorpay script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Razorpay SDK failed to load. Are you online?");
        return;
      }

      // 2. Create Order on Backend
      const orderRes = await api.post('/payment/create-order', {
        amount: price,
        itemId: id,
        itemType: 'material'
      });

      if (!orderRes.data.success) {
        alert("Failed to create order");
        return;
      }

      const { order, key_id } = orderRes.data;

      // 3. Initialize Razorpay Checkout
      const options = {
        key: key_id,
        amount: order.amount,
        currency: order.currency,
        name: "Aarambh Institute",
        description: "Study Material Purchase",
        order_id: order.id,
        handler: async function (response) {
          // 4. Verify Payment on Backend
          try {
            const verifyRes = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              itemId: id,
              itemType: 'material',
              amountPaid: price
            });

            if (verifyRes.data.success) {
              alert("Payment successful! Material unlocked.");
              fetchMaterials(); // refresh the list
            }
          } catch (error) {
            alert(error.response?.data?.message || "Payment verification failed.");
          }
        },
        prefill: {
          name: "Student Name",
          email: "student@example.com",
          contact: "9999999999"
        },
        theme: {
          color: "#4f46e5"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      alert("Something went wrong");
    }
  };

  const filteredMaterials = activeTab === 'All' ? materials : materials.filter(m => m.type === activeTab);

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-book-open"></i>
            </div>
            Study Materials
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">Access your notes, lectures, and premium resources.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-4 scrollbar-hide">
        {['All', 'PDF', 'Document', 'Video'].map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap flex items-center gap-2 ${
              activeTab === tab 
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_10px_25px_rgba(99,102,241,0.4)] hover:-translate-y-0.5' 
                : 'bg-white border border-slate-200/80 text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:shadow-sm hover:-translate-y-0.5'
            }`}
          >
            {tab === 'All' && <i className="fas fa-layer-group text-xs opacity-70"></i>}
            {tab === 'PDF' && <i className="fas fa-file-pdf text-xs opacity-70"></i>}
            {tab === 'Document' && <i className="fas fa-file-word text-xs opacity-70"></i>}
            {tab === 'Video' && <i className="fas fa-play-circle text-xs opacity-70"></i>}
            {tab}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {filteredMaterials.length === 0 ? (
          <div className="col-span-full text-center p-8 text-slate-500">No materials available.</div>
        ) : filteredMaterials.map(mat => (
          <div key={mat.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
            
            {/* Animated Rotating Border (only if premium/locked) */}
            {!mat.is_purchased && (
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                 <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#eab308_80%,#f59e0b_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}

            {/* Actual Card Content */}
            <div className="relative bg-white rounded-[calc(2rem-2px)] p-7 h-full flex flex-col z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border ${
                  mat.type === 'PDF' ? 'bg-rose-50 text-rose-500 border-rose-100/50' :
                  mat.type === 'Video' ? 'bg-indigo-50 text-indigo-500 border-indigo-100/50' :
                  'bg-emerald-50 text-emerald-500 border-emerald-100/50'
                }`}>
                  <i className={`fas ${mat.type === 'PDF' ? 'fa-file-pdf' : mat.type === 'Video' ? 'fa-play-circle' : 'fa-file-word'}`}></i>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                    {mat.course}
                  </span>
                  {!mat.is_free && !mat.is_purchased && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <i className="fas fa-lock text-[10px]"></i> ₹{mat.price}
                    </span>
                  )}
                  {(!mat.is_free && mat.is_purchased) && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <i className="fas fa-unlock text-[10px]"></i> Purchased
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-black text-slate-800 text-xl mb-3 leading-tight group-hover:text-indigo-600 transition-colors">{mat.title}</h3>
              
              <div className="flex-1 flex items-end mt-4">
                <div className="w-full flex items-center justify-between pt-5 border-t border-slate-100">
                  <div className="text-xs font-semibold text-slate-500 flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <i className="fas fa-database text-slate-400"></i> {mat.size}
                    </span>
                  </div>
                  
                  {mat.is_purchased ? (
                    <button onClick={() => alert(mat.type === 'Video' ? "Opening video player..." : "Downloading material...")} className={`px-4 h-10 rounded-xl flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm ${
                      mat.type === 'Video' 
                        ? 'bg-indigo-50 text-indigo-600 hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)]' 
                        : 'bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white hover:shadow-[0_8px_20px_rgba(225,29,72,0.3)]'
                    }`}>
                      <i className={`fas ${mat.type === 'Video' ? 'fa-play' : 'fa-download'}`}></i> 
                      {mat.type === 'Video' ? 'Play' : 'Download'}
                    </button>
                  ) : (
                    <button onClick={() => handleBuy(mat.id, mat.price)} className="px-5 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center gap-2 text-sm font-bold transition-all duration-300 shadow-[0_8px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_25px_rgba(245,158,11,0.5)] hover:-translate-y-0.5">
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudyMaterials;
