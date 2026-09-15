import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: result } = await api.get('/student/profile');
        
        if (result.success) {
          setProfileData(result.data);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  const data = profileData || {
    id: 1,
    full_name: 'Student',
    mobile: '9999999999',
    email: 'student@example.com',
    board: 'Unknown',
    class: 'Unknown'
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">My Profile</h2>
          <p className="text-slate-500 mt-1 font-medium">Manage your personal information and preferences.</p>
        </div>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className={`px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5 ${
            isEditing 
              ? 'bg-slate-800 text-white hover:bg-slate-900 shadow-slate-800/20' 
              : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:text-indigo-600 hover:shadow-indigo-500/10'
          }`}
        >
          <i className={`fas ${isEditing ? 'fa-times' : 'fa-pen'}`}></i>
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-4 flex flex-col">
          <div className="premium-glass-card flex-1 p-8 text-center relative flex flex-col items-center group">
            
            {/* Animated Gradient Avatar Ring */}
            <div className="relative w-36 h-36 mt-4 mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-[spin_4s_linear_infinite] opacity-40 group-hover:opacity-100 blur-md transition-opacity duration-700"></div>
              <div className="absolute inset-1 bg-white rounded-full z-10"></div>
              <div className="absolute inset-2 z-20 rounded-full overflow-hidden shadow-inner cursor-pointer">
                <img src="https://ui-avatars.com/api/?name=Aditya+Ravi&background=f8fafc&color=4f46e5&size=150" alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                {isEditing && (
                  <div className="absolute inset-0 bg-slate-900/60 flex flex-col items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-sm">
                    <i className="fas fa-camera text-xl mb-1"></i>
                    <span className="text-[10px] font-bold tracking-wider uppercase">Update</span>
                  </div>
                )}
              </div>
            </div>
            
              <h3 className="text-2xl font-black text-slate-800 tracking-tight">{data.full_name}</h3>
            <p className="text-indigo-600 font-semibold text-sm mt-1 mb-8 bg-indigo-50 px-4 py-1 rounded-full border border-indigo-100 inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Enrolled: {data.board} {data.class}
            </p>
            
            <div className="w-full space-y-3 mt-auto">
              <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">
                    <i className="fas fa-id-badge"></i>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Student ID</span>
                </div>
                <span className="text-sm font-black text-slate-800">#STU-{data.id}</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-slate-50/80 rounded-2xl border border-slate-100 hover:bg-white hover:shadow-md hover:border-slate-200 transition-all duration-300">
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xs">
                    <i className="fas fa-calendar-check"></i>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider">Joined</span>
                </div>
                <span className="text-sm font-black text-slate-800">Aug 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-shadow duration-500 relative h-full">
            
            <h3 className="text-xl font-bold text-slate-800 mb-8 flex items-center gap-3 border-b border-slate-100 pb-5">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                <i className="far fa-address-card"></i>
              </div>
              Personal Information
            </h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Full Name</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500 transition-colors">
                      <i className="far fa-user text-sm"></i>
                    </div>
                    <input 
                      type="text" 
                      defaultValue={data.full_name} 
                      disabled={!isEditing}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 font-medium shadow-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Email Address</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500 transition-colors">
                      <i className="far fa-envelope text-sm"></i>
                    </div>
                    <input 
                      type="email" 
                      defaultValue={data.email} 
                      disabled={!isEditing}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 font-medium shadow-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Phone Number</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500 transition-colors">
                      <i className="fas fa-phone-alt text-sm"></i>
                    </div>
                    <input 
                      type="tel" 
                      defaultValue={data.mobile} 
                      disabled={!isEditing}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 font-medium shadow-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Date of Birth</label>
                  <div className="relative group/input">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500 transition-colors">
                      <i className="far fa-calendar-alt text-sm"></i>
                    </div>
                    <input 
                      type="date" 
                      defaultValue="2005-08-15" 
                      disabled={!isEditing}
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 font-medium shadow-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed" 
                    />
                  </div>
                </div>
                
                <div className="md:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 uppercase tracking-wider ml-1">Address</label>
                  <div className="relative group/input">
                    <div className="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within/input:text-indigo-500 transition-colors">
                      <i className="fas fa-map-marker-alt text-sm"></i>
                    </div>
                    <textarea 
                      defaultValue="123, Learning Street, Education City, Bihar 800001" 
                      disabled={!isEditing}
                      rows="3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-slate-800 font-medium shadow-sm outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed resize-none" 
                    ></textarea>
                  </div>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-6 mt-6">
                  <button type="button" className="btn-glow-primary px-8 py-3.5 rounded-xl font-bold flex items-center gap-2 shadow-[0_8px_20px_rgba(79,70,229,0.25)]">
                    <i className="fas fa-check-circle"></i> Save Changes
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
