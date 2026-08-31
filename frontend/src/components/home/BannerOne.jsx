import React from 'react';
import { Link } from 'react-router-dom';

const BannerOne = () => {
    return (
        <div className="group relative h-[250px] flex items-center justify-between px-[60px] w-[95%] max-w-[1400px] mx-auto my-12 rounded-3xl overflow-hidden shadow-[0_15px_40px_rgba(0,0,0,0.2)] transition-all duration-500 hover:shadow-[0_25px_50px_rgba(225,29,72,0.15)] hover:-translate-y-2 max-lg:px-10 max-md:flex-col max-md:justify-center max-md:text-center max-md:h-auto max-md:py-[50px] max-md:px-8 max-md:mx-4 max-sm:p-[40px_20px]">
            
            {/* Background Image with Hover Scale */}
            <div 
                className="absolute inset-0 bg-no-repeat bg-center bg-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.08] z-0"
                style={{ backgroundImage: "url('/assets/images/banner/banner-one.webp')" }}
            ></div>
            
            {/* Rich Gradient Overlay for Premium Look and Text Clarity */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-slate-900/40 to-slate-950/60 z-0 transition-opacity duration-500 group-hover:opacity-100"></div>

            <div className="relative z-10 flex-1 max-md:mb-8">
                <h2 className="m-0 !text-white text-[32px] font-bold tracking-wide drop-shadow-[0_4px_6px_rgba(0,0,0,1)] max-lg:text-[28px] max-md:text-[24px] max-sm:text-[20px]">
                    Bihar Board of Open Schooling and Examination (BBOSE)
                </h2>
                <p className="mt-4 mb-0 !text-white/95 text-[17px] font-medium drop-shadow-[0_2px_4px_rgba(0,0,0,1)] max-lg:text-[16px] max-md:mt-3 max-sm:text-[15px]">
                    10th, 12th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।
                </p>
            </div>
            
            <div className="relative z-10 ml-8 max-md:ml-0">
                <Link to="/register" className="inline-flex items-center gap-3 py-4 px-10 bg-gradient-to-r from-[#e11d48] to-[#be123c] !text-white rounded-full text-[16px] font-bold tracking-widest uppercase shadow-[0_6px_20px_rgba(225,29,72,0.5)] transition-all duration-300 hover:shadow-[0_8px_30px_rgba(225,29,72,0.7)] hover:-translate-y-1 hover:from-[#be123c] hover:to-[#9f1239] no-underline max-lg:py-3.5 max-lg:px-8 max-sm:py-3 max-sm:px-6 max-sm:text-[14px]">
                    Apply Online Now <i className="fas fa-arrow-right transition-transform duration-300 group-hover:translate-x-2"></i>
                </Link>
            </div>
        </div>
    );
};

export default BannerOne;