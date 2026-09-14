import React, { useState } from 'react';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-slate-800">My Profile</h2>
        <button 
          onClick={() => setIsEditing(!isEditing)} 
          className="bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold shadow-sm transition-colors"
        >
          {isEditing ? 'Cancel Edit' : 'Edit Profile'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-rose-500 to-orange-400"></div>
            
            <div className="relative z-10 mt-12 mb-4">
              <div className="w-32 h-32 mx-auto rounded-full bg-white p-1 shadow-lg border-4 border-white relative group cursor-pointer">
                <img src="https://ui-avatars.com/api/?name=Aditya+Ravi&background=ffffff&color=be123c&size=128" alt="Profile" className="w-full h-full rounded-full object-cover" />
                {isEditing && (
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <i className="fas fa-camera text-xl"></i>
                  </div>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-800">Aditya Ravi</h3>
            <p className="text-sm font-semibold text-rose-500 mb-6">Enrolled: BBOSE 10th</p>
            
            <div className="grid grid-cols-2 gap-4 text-left border-t border-slate-100 pt-6">
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Student ID</p>
                <p className="text-sm font-semibold text-slate-700">#STU-2026</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Joined</p>
                <p className="text-sm font-semibold text-slate-700">Aug 2026</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h3 className="text-lg font-bold text-slate-800 mb-6">Personal Information</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                  <input 
                    type="text" 
                    defaultValue="Aditya Ravi" 
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                  <input 
                    type="email" 
                    defaultValue="aditya@example.com" 
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    defaultValue="+91 98765 43210" 
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Date of Birth</label>
                  <input 
                    type="date" 
                    defaultValue="2005-08-15" 
                    disabled={!isEditing}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed" 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Address</label>
                  <textarea 
                    defaultValue="123, Learning Street, Education City, Bihar 800001" 
                    disabled={!isEditing}
                    rows="3"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-rose-500 transition-colors disabled:opacity-70 disabled:cursor-not-allowed resize-none" 
                  ></textarea>
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <button type="button" className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-rose-500/30">
                    Save Changes
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
