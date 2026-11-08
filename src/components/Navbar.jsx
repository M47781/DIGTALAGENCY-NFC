import React from "react";
import { ArrowLeft } from "lucide-react";

export function Navbar({ onOrderClick }) {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#" className="flex items-center gap-3">
          <img
            src="/logo.png"
            alt="Digital Agency"
            className="h-8 sm:h-10 w-auto object-contain"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              if (e.currentTarget.nextElementSibling) {
                e.currentTarget.nextElementSibling.style.display = "flex";
              }
            }}
          />
          <div className="hidden items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#16C9E0] via-[#8B55E8] to-[#FF08D9] flex items-center justify-center text-white font-bold text-xs shadow-2xs">
              DA
            </div>
            <span className="font-extrabold tracking-tight text-base text-black">
              DIGITAL AGENCY
            </span>
          </div>
        </a>

        {/* Right Action: Clean Arabic Button */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOrderClick}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#FF08D9] hover:bg-[#e007bf] transition-all shadow-md shadow-[#FF08D9]/20 active:scale-98 font-arabic"
          >
            <span>اطلب الآن</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </header>
  );
}
