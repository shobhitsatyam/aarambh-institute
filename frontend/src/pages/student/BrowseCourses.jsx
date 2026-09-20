import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const BrowseCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const response = await api.get('/student/courses');
      if (response.data.success) {
        setCourses(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch courses", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
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
        itemType: 'course'
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
        description: "Course Purchase",
        order_id: order.id,
        handler: async function (response) {
          // 4. Verify Payment on Backend
          try {
            const verifyRes = await api.post('/payment/verify', {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              itemId: id,
              itemType: 'course',
              amountPaid: price
            });

            if (verifyRes.data.success) {
              alert("Payment successful! Course unlocked.");
              fetchCourses(); // refresh the list
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

  if (loading) return <div className="p-8 flex justify-center"><div className="animate-spin text-indigo-500 text-3xl"><i className="fas fa-circle-notch"></i></div></div>;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-50 text-indigo-600 flex items-center justify-center text-xl shadow-inner">
              <i className="fas fa-graduation-cap"></i>
            </div>
            Browse Courses
          </h2>
          <p className="text-slate-500 mt-1 font-medium ml-1">Explore our premium and free courses, including live and recorded classes.</p>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {courses.length === 0 ? (
          <div className="col-span-full text-center p-8 text-slate-500">No courses available.</div>
        ) : courses.map(course => (
          <div key={course.id} className="relative group rounded-[2rem] p-[2.5px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(99,102,241,0.2)] transition-all duration-500 hover:-translate-y-2 h-full flex flex-col">
            
            {/* Animated Rotating Border (only if premium/locked) */}
            {!course.is_purchased && (
              <div className="absolute inset-0 rounded-[2rem] overflow-hidden z-0">
                 <div className="absolute -inset-[100%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_70%,#eab308_80%,#f59e0b_100%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
            )}

            {/* Actual Card Content */}
            <div className="relative bg-white rounded-[calc(2rem-2px)] p-7 h-full flex flex-col z-10 border border-slate-100 group-hover:border-transparent transition-colors duration-500">
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-sm border bg-indigo-50 text-indigo-500 border-indigo-100/50">
                  <i className="fas fa-graduation-cap"></i>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100 shadow-sm">
                    {course.duration}
                  </span>
                  {!course.is_free && !course.is_purchased && (
                    <span className="text-xs font-bold text-amber-600 bg-amber-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <i className="fas fa-lock text-[10px]"></i> ₹{course.price}
                    </span>
                  )}
                  {(!course.is_free && course.is_purchased) && (
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <i className="fas fa-unlock text-[10px]"></i> Purchased
                    </span>
                  )}
                </div>
              </div>
              
              <h3 className="font-black text-slate-800 text-xl mb-2 leading-tight group-hover:text-indigo-600 transition-colors">{course.title}</h3>
              <p className="text-sm text-slate-500 mb-4">{course.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                 {course.includes_live_classes ? <span className="bg-rose-50 text-rose-600 px-2 py-1 rounded-lg text-xs font-bold"><i className="fas fa-video"></i> Live Classes</span> : null}
                 {course.includes_recorded_classes ? <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded-lg text-xs font-bold"><i className="fas fa-play-circle"></i> VOD</span> : null}
              </div>

              <div className="flex-1 flex items-end mt-2">
                <div className="w-full flex items-center justify-between pt-5 border-t border-slate-100">
                  {course.is_purchased ? (
                    <button onClick={() => alert("Opening Course contents...")} className="w-full h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 shadow-sm hover:bg-indigo-600 hover:text-white hover:shadow-[0_8px_20px_rgba(79,70,229,0.3)]">
                      <i className="fas fa-door-open"></i> Go to Course
                    </button>
                  ) : (
                    <button onClick={() => handleBuy(course.id, course.price)} className="w-full h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white flex items-center justify-center gap-2 text-sm font-bold transition-all duration-300 shadow-[0_8px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_10px_25px_rgba(245,158,11,0.5)] hover:-translate-y-0.5">
                      Enroll Now (₹{course.price})
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

export default BrowseCourses;
