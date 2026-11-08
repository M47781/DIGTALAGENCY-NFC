import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Wifi, Sparkles, RotateCw, ShieldCheck, QrCode } from "lucide-react";

export function ProductCard3D({ selectedType, customName, isAr }) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // Mouse move tilt effect
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const isPersonalized = selectedType === "personalized";

  return (
    <div className="relative w-full flex flex-col items-center justify-center select-none py-6">
      
      {/* Background Animated Gradient Aura (Cyan #16C9E0, Purple #8B55E8, Magenta #FF08D9) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <div className="w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-gradient-to-tr from-[#16C9E0]/20 via-[#8B55E8]/20 to-[#FF08D9]/20 blur-3xl animate-pulse-glow"></div>
      </div>

      {/* 3D Stage Container */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className="relative z-10 w-full max-w-[420px] aspect-[1.586/1] perspective-1200 cursor-grab active:cursor-grabbing transition-transform duration-200"
      >
        {/* Floating & Rotating Card Envelope */}
        <div
          className={`w-full h-full transform-style-3d transition-transform duration-700 ease-out ${
            autoRotate && !isHovered ? "animate-slow-rotate" : ""
          }`}
          style={{
            transform: isHovered
              ? `perspective(1200px) rotateX(${tilt.x}deg) rotateY(${tilt.y + (isFlipped ? 180 : 0)}deg) scale3d(1.03, 1.03, 1.03)`
              : `perspective(1200px) rotateY(${isFlipped ? 180 : 0}deg)`,
          }}
        >
          
          {/* ================= RECTO (FRONT SIDE) ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-7 backface-hidden shadow-2xl flex flex-col justify-between overflow-hidden border ${
              isPersonalized
                ? "bg-gradient-to-br from-white via-[#F8FAFC] to-[#EDF2F7] border-gray-200/90 text-[#111111]"
                : "bg-gradient-to-br from-[#1A1A1A] via-[#111111] to-[#0A0A0A] border-white/10 text-white"
            }`}
          >
            {/* Shimmer Specular Light Streak */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none"></div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#16C9E0]/20 via-[#8B55E8]/10 to-transparent rounded-full blur-xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#FF08D9]/20 via-transparent to-transparent rounded-full blur-xl pointer-events-none"></div>

            {/* Top Bar on Card: NFC Icon & Agency Brand */}
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {/* Contactless NFC Icon with radiating wave rings */}
                <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
                  <span className="absolute inset-0 rounded-full bg-[#16C9E0]/30 animate-nfc-wave"></span>
                  <Wifi className={`w-4 h-4 rotate-90 ${isPersonalized ? "text-[#8B55E8]" : "text-[#16C9E0]"}`} />
                </div>
                <span className="text-[10px] font-semibold tracking-widest uppercase opacity-75">
                  NFC SMART CARD
                </span>
              </div>

              {/* Digital Agency Logo / Emblem on Card */}
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-[#16C9E0] via-[#8B55E8] to-[#FF08D9] flex items-center justify-center shadow-sm">
                  <span className="text-[9px] font-black text-white">DA</span>
                </div>
                <span className="text-xs font-bold tracking-tight">
                  DIGITAL <span className="text-[#16C9E0]">AGENCY</span>
                </span>
              </div>
            </div>

            {/* Center: Chip Graphic & Holographic Thread */}
            <div className="relative z-10 my-auto flex items-center justify-between">
              <div className="flex items-center gap-3">
                {/* Gold / Silver EMV Microchip Graphic */}
                <div className={`w-11 h-8 rounded-md border flex items-center justify-center p-1 relative shadow-inner ${
                  isPersonalized
                    ? "bg-gradient-to-br from-amber-100 via-amber-200 to-amber-300 border-amber-400/60"
                    : "bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 border-amber-500/70"
                }`}>
                  <div className="w-full h-full border border-black/20 rounded-[3px] flex flex-col justify-around">
                    <div className="h-[1px] bg-black/20 w-full"></div>
                    <div className="h-[1px] bg-black/20 w-full"></div>
                  </div>
                </div>

                {/* Subtle NFC Wave line */}
                <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-[#8B55E8] to-transparent"></div>

                <div className="text-[11px] font-mono tracking-wider opacity-60">
                  TAP TO SHARE
                </div>
              </div>

              {/* Holographic Badge */}
              <div className="px-2.5 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase border border-current/20 bg-white/5 backdrop-blur-sm">
                {isPersonalized ? "CUSTOM EDITION" : "BLACK SIGNATURE"}
              </div>
            </div>

            {/* Bottom on Card: Cardholder Name & Serial */}
            <div className="relative z-10 flex items-end justify-between pt-2">
              <div>
                <p className="text-[10px] font-mono tracking-widest uppercase opacity-60">
                  {isPersonalized ? "NOM PERSONNALISÉ" : "CARTE OFFICIELLE"}
                </p>
                <p className="text-sm sm:text-base font-bold tracking-wide uppercase mt-0.5 truncate max-w-[220px]">
                  {customName ? customName : isPersonalized ? "VOTRE NOM ICI" : "AMIRA BENALI"}
                </p>
              </div>

              <div className="text-right">
                <p className="text-[9px] font-mono tracking-widest opacity-50">ÉDITION 2026</p>
                <p className="text-[11px] font-mono tracking-wider text-[#16C9E0]">DA-NFC-9942</p>
              </div>
            </div>
          </div>

          {/* ================= VERSO (BACK SIDE) ================= */}
          <div
            className={`absolute inset-0 w-full h-full rounded-2xl p-6 sm:p-7 backface-hidden shadow-2xl flex flex-col justify-between overflow-hidden border [transform:rotateY(180deg)] ${
              isPersonalized
                ? "bg-gradient-to-br from-white via-[#F8FAFC] to-[#E2E8F0] border-gray-200/90 text-[#111111]"
                : "bg-gradient-to-br from-[#111111] via-[#161616] to-[#0D0D0D] border-white/10 text-white"
            }`}
          >
            {/* Magnetic Stripe Top */}
            <div className="w-[calc(100%+3.5rem)] -mx-7 h-10 bg-gradient-to-r from-[#1E1E1E] via-[#2D2D2D] to-[#1E1E1E] border-y border-black/40 flex items-center justify-end px-7">
              <span className="text-[8px] font-mono tracking-widest text-gray-500 uppercase">
                ENCRYPTED NFC TAG • DIGITAL AGENCY
              </span>
            </div>

            {/* Middle Section: QR Code & Security Tag */}
            <div className="flex items-center justify-between gap-4 py-2">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-lg bg-white p-1.5 flex items-center justify-center shadow-md">
                  {/* Styled QR Code */}
                  <div className="w-full h-full grid grid-cols-4 gap-0.5 p-0.5 bg-black rounded-sm">
                    <div className="bg-white col-span-2 row-span-2"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white"></div>
                    <div className="bg-white"></div>
                    <div className="bg-black"></div>
                    <div className="bg-white col-span-2"></div>
                  </div>
                </div>

                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider">
                    Scan de secours
                  </p>
                  <p className="text-[9px] opacity-70 mt-0.5">
                    Fonctionne même sur les appareils sans NFC
                  </p>
                </div>
              </div>

              {/* Digital Agency Official Seal */}
              <div className="text-right">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8B55E8]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>GARANTIE À VIE</span>
                </div>
                <p className="text-[9px] font-mono opacity-50 mt-1">NTAG216 • 888 BYTES</p>
              </div>
            </div>

            {/* Bottom Verso: Legal & Instructions */}
            <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[8px] opacity-60 font-mono">
              <span>DIGITAL-AGENCY.DZ</span>
              <span>CONÇU EN ALGÉRIE 🇩🇿</span>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Interactive Controls Below 3D Card */}
      <div className="relative z-20 mt-6 flex items-center gap-3 flex-wrap justify-center">
        {/* Flip Button */}
        <button
          type="button"
          onClick={() => setIsFlipped(!isFlipped)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-gray-200 text-gray-800 shadow-sm hover:border-[#8B55E8] hover:text-[#8B55E8] transition-all hover:scale-102"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? (isAr ? "الوجه الأمامي" : "Voir le Recto") : (isAr ? "الوجه الخلفي (QR)" : "Voir le Verso (QR)")}</span>
        </button>

        {/* Auto Rotate Toggle */}
        <button
          type="button"
          onClick={() => setAutoRotate(!autoRotate)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
            autoRotate
              ? "bg-[#8B55E8]/10 border-[#8B55E8]/30 text-[#8B55E8]"
              : "bg-gray-100 border-gray-200 text-gray-600 hover:text-black"
          }`}
        >
          <span className={`w-2 h-2 rounded-full ${autoRotate ? "bg-[#8B55E8]" : "bg-gray-400"}`}></span>
          <span>{autoRotate ? (isAr ? "دوران تلقائي: مفعل" : "Rotation 3D : Active") : (isAr ? "دوران تلقائي: معطل" : "Rotation 3D : Pause")}</span>
        </button>
      </div>

    </div>
  );
}
