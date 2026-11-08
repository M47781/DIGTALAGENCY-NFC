import React, { useState } from "react";
import { Check, HelpCircle, X, Edit3 } from "lucide-react";
import { PriceTag } from "./PriceTag";

export function ProductOptions({
  selectedType,
  setSelectedType,
  customName,
  setCustomName,
  customTitle,
  setCustomTitle,
  isAr,
}) {
  const [activeTooltip, setActiveTooltip] = useState(null); // "standard" | "personalized" | null

  return (
    <div className="w-full flex flex-col gap-2.5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <label className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">
          {isAr ? "اختر نوع بطاقتك" : "Choisissez votre carte"}
        </label>
      </div>

      {/* Grid of the 2 Product Cards */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-3">

        {/* ================= OPTION 1: STANDARD NFC CARD ================= */}
        <div
          onClick={() => setSelectedType("standard")}
          className={`relative rounded-2xl p-3.5 sm:p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${selectedType === "standard"
            ? "border-2 border-[#FF08D9] bg-white shadow-sm ring-2 ring-[#FF08D9]/20"
            : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
        >
          {/* Top Row: Mini Preview Thumbnail & Info Tooltip (?) */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            {/* Visual Thumbnail: Real Standard Black Card Design */}
            <div className="w-14 h-9 sm:w-16 sm:h-10 rounded-lg bg-gray-950 border border-white/10 p-0.5 flex items-center justify-center shadow-xs overflow-hidden">
              <img
                src="/card-black.png"
                alt="Carte Standard Digital Agency"
                loading="eager"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info (?) Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltip("standard");
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF08D9] hover:bg-gray-100 transition-colors"
              title="Détails de la carte Standard"
            >
              <HelpCircle className="w-3.5 h-3.5 stroke-[1.8]" />
            </button>
          </div>

          {/* Middle Row: Radio Check & Title */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${selectedType === "standard"
                  ? "bg-[#FF08D9] border-[#FF08D9] text-white"
                  : "border-gray-300 bg-white"
                  }`}
              >
                {selectedType === "standard" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span className="font-bold text-xs sm:text-sm text-gray-900">
                {isAr ? "ستاندار القياسية" : "Standard"}
              </span>
            </div>

            <p className="text-[11px] text-gray-500 leading-tight">
              {isAr ? "شعارنا - Logo Digital Agency" : "Logo DIGITAL AGENCY - شعارنا"}
            </p>
          </div>

          {/* Bottom Row: Price */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-baseline justify-between" dir="ltr">
            <PriceTag
              amount={2800}
              isAr={isAr}
              numClassName="text-sm sm:text-base font-extrabold text-gray-950 font-mono"
              curClassName="text-xs font-semibold text-gray-500 font-arabic"
            />
          </div>
        </div>

        {/* ================= OPTION 2: PERSONALIZED NFC CARD ================= */}
        <div
          onClick={() => setSelectedType("personalized")}
          className={`relative rounded-2xl p-3.5 sm:p-4 cursor-pointer transition-all duration-200 flex flex-col justify-between select-none ${selectedType === "personalized"
            ? "border-2 border-[#FF08D9] bg-white shadow-sm ring-2 ring-[#FF08D9]/20"
            : "border border-gray-200 bg-white hover:border-gray-300"
            }`}
        >
          {/* Top Row: Mini Preview Thumbnail & Info Tooltip (?) */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            {/* Visual Thumbnail: Real Personalized White Card Design */}
            <div className="w-14 h-9 sm:w-16 sm:h-10 rounded-lg bg-gray-100 border border-gray-200 p-0.5 flex items-center justify-center shadow-xs overflow-hidden">
              <img
                src="/card-white.png"
                alt="Carte Personnalisée Your Logo"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Info (?) Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setActiveTooltip("personalized");
              }}
              className="w-6 h-6 rounded-full flex items-center justify-center text-gray-400 hover:text-[#FF08D9] hover:bg-gray-100 transition-colors"
              title="Détails de la carte Personnalisée"
            >
              <HelpCircle className="w-3.5 h-3.5 stroke-[1.8]" />
            </button>
          </div>

          {/* Middle Row: Radio Check & Title */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full flex items-center justify-center border transition-all ${selectedType === "personalized"
                  ? "bg-[#FF08D9] border-[#FF08D9] text-white"
                  : "border-gray-300 bg-white"
                  }`}
              >
                {selectedType === "personalized" && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span className="font-bold text-xs sm:text-sm text-gray-900">
                {isAr ? "مخصصة بهويتك" : "Personnalisée"}
              </span>
            </div>

            {/* Explicit Feature Point: QR code + Logo + Nom gravé */}
            <div className="flex flex-col gap-0.5 mt-0.5">
              <span className="text-[11px] font-black text-[#FF08D9] leading-tight">
                QR code + Logo + {isAr ? "نقش الاسم" : "Nom gravé"}
              </span>
              <p className="text-[10px] text-gray-500 leading-tight">
                {isAr ? "شعارك، كود QR واسمك محفور" : "Gravure logo, nom & QR code"}
              </p>
            </div>
          </div>

          {/* Bottom Row: Price */}
          <div className="mt-3 pt-2.5 border-t border-gray-100 flex items-baseline justify-between" dir="ltr">
            <PriceTag
              amount={4000}
              isAr={isAr}
              numClassName="text-sm sm:text-base font-extrabold text-gray-950 font-mono"
              curClassName="text-xs font-semibold text-gray-500 font-arabic"
            />
          </div>
        </div>

      </div>

      {/* Dynamic Personalization Drawer (When Personalized is Selected) */}
      {selectedType === "personalized" && (
        <div className="p-3.5 sm:p-4 rounded-2xl bg-[#FF08D9]/5 border border-[#FF08D9]/20 flex flex-col gap-2.5 transition-all duration-300">
          <div className="flex items-center justify-between text-xs font-bold text-gray-950">
            <div className="flex items-center gap-2">
              <Edit3 className="w-3.5 h-3.5 text-[#FF08D9]" />
              <span>
                {isAr ? "تفاصيل البطاقة المخصصة :" : "Détails de gravure :"}
              </span>
            </div>
            <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-[#FF08D9] text-white font-mono">
              QR + LOGO + NOM
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                {isAr ? "الاسم الكامل المطبوع" : "Nom complet à graver"}
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={isAr ? "مثال: أميرة بن علي" : "Ex: Amira Benali"}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-gray-700 mb-1">
                {isAr ? "المهنة / اسم الشركة" : "Fonction / Entreprise"}
              </label>
              <input
                type="text"
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                placeholder={isAr ? "مثال: مهندس معماري" : "Ex: Architecte / Studio"}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-white text-xs text-gray-900 focus:outline-none focus:border-[#FF08D9] focus:ring-1 focus:ring-[#FF08D9] transition-all"
              />
            </div>
          </div>

          <p className="text-[10px] text-gray-600">
            {isAr
              ? "💬 كود QR، شعارك واسمك مشمولين. سنتواصل معك فور تأكيد الطلب عبر واتساب لتأكيد نموذج الطباعة (BAT)."
              : "💬 QR code, logo HD et nom gravé inclus. Notre équipe vous contactera sur WhatsApp pour valider le Bon À Tirer (BAT)."}
          </p>
        </div>
      )}

      {/* Info Tooltip Micro-Modal */}
      {activeTooltip && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="relative w-full max-w-sm bg-white rounded-2xl p-5 shadow-xl border border-gray-200 flex flex-col gap-3">
            <button
              type="button"
              onClick={() => setActiveTooltip(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <h4 className="font-bold text-sm text-gray-900 flex items-center gap-1.5">
              <span>{activeTooltip === "standard" ? (isAr ? "بطاقة ستاندار —" : "Carte Standard —") : (isAr ? "بطاقة مخصصة —" : "Carte Personnalisée —")}</span>
              <PriceTag amount={activeTooltip === "standard" ? 2800 : 4000} isAr={isAr} numClassName="font-mono" curClassName="font-arabic" />
            </h4>

            {/* Card Mockup Visual in Tooltip Modal */}
            <div className="w-full h-32 rounded-xl bg-gray-50 border border-gray-100 p-1 flex items-center justify-center overflow-hidden">
              <img
                src={activeTooltip === "standard" ? "/card-black.png" : "/card-white.png"}
                alt={activeTooltip === "standard" ? "Standard" : "Personnalisée"}
                className="w-full h-full object-contain"
              />
            </div>

            <ul className="text-xs text-gray-600 flex flex-col gap-2">
              {activeTooltip === "standard" ? (
                <>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "تصميم Digital Agency الرسمي بلون أسود ساتان فاخر." : "Design officiel Digital Agency en noir mat satiné de luxe."}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "شريحة NTAG216 أصلية عالية المدى (متوافقة مع جميع الهواتف)." : "Puce originale NTAG216 haute portée (compatible tous smartphones)."}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "ملف تعريف رقمي جاهز للاستخدام فورياً بدون أي تطبيق." : "Profil numérique professionnel prêt à l'emploi en quelques secondes."}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "حفر ليزر عالي الدقة لشعارك وهويتك التجارية الخاصة." : "Gravure laser haute précision de votre logo et identité visuelle."}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "طباعة مخصصة لاسمك، مهنتك ومعلومات الاتصال." : "Impression sur-mesure de votre nom, poste et coordonnées."}</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{isAr ? "تأكيد نموذج رقمي (BAT) عبر واتساب قبل بدء الطباعة." : "Validation d'un Bon À Tirer (BAT) numérique sur WhatsApp avant gravure."}</span>
                  </li>
                </>
              )}
            </ul>

            <button
              type="button"
              onClick={() => setActiveTooltip(null)}
              className="mt-2 w-full py-2.5 rounded-xl bg-[#FF08D9] text-white text-xs font-bold hover:bg-[#e007bf] transition-colors shadow-xs"
            >
              {isAr ? "حسناً، فهمت" : "Compris"}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
