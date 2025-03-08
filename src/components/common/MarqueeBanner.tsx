import React from 'react';
import './marquee.css'; // Import your custom CSS file

const MarqueeBanner = () => {
    return (
      <div className="bg-[#00D066] text-white overflow-hidden py-2 flex items-center justify-center">
        {/* Add 'marquee-animation' for mobile view and 'no-animation' for large screens */}
        <div className="whitespace-nowrap flex items-center marquee-animation sm:no-animation">
          <span className="inline-block mx-4 text-base sm:text-sm md:text-base">
            2-3 hours mutual fund masterclass, we cover everything related to mutual fund investing.
          </span>
        </div>
      </div>
    );
  };

export default MarqueeBanner;
