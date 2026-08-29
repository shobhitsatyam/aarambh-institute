import React from 'react';
import { Link } from 'react-router-dom';

const BannerOne = () => {
    return (
        <div
            className="relative h-[180px] flex items-center justify-between px-[60px] text-white max-w-7xl mx-auto my-5 rounded overflow-hidden max-lg:px-10 max-lg:my-[15px] max-md:flex-col max-md:justify-center max-md:text-center max-md:h-auto max-md:py-[30px] max-md:px-5 max-md:mx-[15px] max-sm:p-[25px_15px] max-sm:m-2.5 bg-no-repeat bg-center bg-cover"
            style={{ backgroundImage: "url('/assets/images/banner/banner-one.webp')" }}
        >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            <div className="relative z-10 flex-1 max-md:mb-5">
                <h1 className="m-0 text-[22px] font-medium max-lg:text-xl max-md:text-lg max-sm:text-base">Bihar Board of Open Schooling and Examination (BBOSE)</h1>
                <p className="mt-[5px] mb-0 text-sm max-lg:text-[13px] max-md:mt-2 max-sm:text-xs">10th, 12th में फेल / कम अंक वाले छात्र 60 दिन में अच्छे अंक से पास करे।</p>
            </div>
            <div className="relative z-10 ml-5 max-md:ml-0">
                <Link to="/register" className="inline-flex items-center gap-1.5 py-[9px] px-[18px] bg-accent text-white rounded text-[13px] font-semibold transition-colors hover:bg-accent-dark no-underline max-lg:py-2 max-lg:px-4 max-lg:text-xs max-sm:py-1.5 max-sm:px-3.5 max-sm:text-[11px]">Apply Online Now <i className="fas fa-arrow-right"></i></Link>
            </div>
        </div>
    );
};

export default BannerOne;