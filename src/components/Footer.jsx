import React from "react";
import { ShieldCheck, MapPin } from "lucide-react";

export function Footer({ isAr, setLang }) {
  return (
    <footer className="w-full bg-[#0B0C0E] text-white border-t border-white/10 pt-14 pb-10 mt-16 sm:mt-20 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center gap-8">

        {/* Top Brand Showcase */}
        <div className="flex flex-col items-center text-center gap-3">
          <div className="relative group">
            {/* Soft Ambient Neon Glow */}
            <div className="absolute -inset-2 rounded-2xl bg-gradient-to-r from-[#16C9E0]/30 via-[#FF08D9]/40 to-[#8B55E8]/30 blur-xl opacity-80 group-hover:opacity-100 transition-opacity"></div>

            <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-[#14161C] border border-white/15 shadow-2xl flex items-center justify-center p-2.5 transition-transform duration-300 group-hover:scale-105">
              <img
                src="/logo-emblem.png"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = "/logo-digital.png";
                }}
                alt="Digital Agency Logo"
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="font-black tracking-tight text-xl text-white font-sans">
              DIGITAL AGENCY
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed">
            {isAr
              ? "الجيل الجديد من بطاقات الأعمال الذكية NFC في الجزائر. تواصل عصري، سريع، واحترافي بدون أي تطبيق."
              : "La carte de visite connectée d'exception conçue en Algérie. Partagez votre univers professionnel d'un simple geste."}
          </p>
        </div>

        {/* Feature / Trust Pills Row */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap text-xs text-gray-300 font-medium">
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/213772136223"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#14161C] border border-white/10 shadow-xs hover:border-emerald-500/50 hover:bg-[#1a1d24] hover:text-emerald-400 transition-all active:scale-98"
          >
            <img
              src="/whatsapp.png"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/whatsapp-icon.png";
              }}
              alt="WhatsApp"
              className="w-4 h-4 object-contain"
            />
            <span className="text-gray-300">{isAr ? "خدمة العملاء :" : "Support :"}</span>
            <span dir="ltr" className="font-mono font-bold text-white">
              +213 772 13 62 23
            </span>
          </a>

          {/* Location */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14161C] border border-white/10 shadow-xs text-gray-300">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>{isAr ? "الجزائر العاصمة" : "Alger, Algérie"}</span>
          </div>

          {/* Chip Guarantee */}
          <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#14161C] border border-white/10 shadow-xs text-gray-300">
            <ShieldCheck className="w-4 h-4 text-[#FF08D9]" />
            <span>{isAr ? "شريحة NTAG216 أصلية" : "Puce NTAG216 Certifiée"}</span>
          </div>
        </div>

        {/* Interactive Language Toggle Control */}
        {setLang && (
          <div className="flex flex-col items-center gap-2">
            <div className="inline-flex items-center p-1 rounded-xl bg-[#14161C] border border-white/10 text-xs font-semibold shadow-inner">
              <button
                type="button"
                onClick={() => setLang("ar")}
                className={`px-4 py-1.5 rounded-lg transition-all ${isAr
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                العربية
              </button>

              <button
                type="button"
                onClick={() => setLang("fr")}
                className={`px-4 py-1.5 rounded-lg transition-all ${!isAr
                    ? "bg-white text-black font-bold shadow-xs"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                Français
              </button>
            </div>
          </div>
        )}

        {/* Bottom Line / Copyright */}
        <div className="pt-6 border-t border-white/10 w-full max-w-md flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <span>
            © {new Date().getFullYear()} DIGITAL AGENCY. {isAr ? "جميع الحقوق محفوظة." : "Tous droits réservés."}
          </span>
          <span className="text-[11px] font-mono text-gray-500">
            {isAr ? "صُنع في الجزائر 🇩🇿" : "Conçu en Algérie 🇩🇿"}
          </span>
        </div>

      </div>
    </footer>
  );
}
