import React, { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { GalleryShowcase } from "./components/GalleryShowcase";
import { ProductOptions } from "./components/ProductOptions";
import { OrderForm } from "./components/OrderForm";
import { OrderConfirmationModal } from "./components/OrderConfirmationModal";
import { Footer } from "./components/Footer";
import { PriceTag } from "./components/PriceTag";

export default function App() {
  const [lang, setLang] = useState("ar"); // Default to Arabic
  const [selectedType, setSelectedType] = useState("standard"); // "standard" | "personalized"
  const [customName, setCustomName] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [completedOrder, setCompletedOrder] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);

  const isAr = lang === "ar";

  // Synchronize document language and direction
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isAr ? "rtl" : "ltr";
  }, [lang, isAr]);

  // Scroll to order form smoothly
  const handleScrollToOrder = () => {
    const el = document.getElementById("commander");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Listen to scroll for sticky mobile checkout bar
  useEffect(() => {
    const handleScroll = () => {
      const orderEl = document.getElementById("commander");
      if (orderEl) {
        const rect = orderEl.getBoundingClientRect();
        setShowStickyBar(window.scrollY > 400 && rect.top > window.innerHeight);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      dir={isAr ? "rtl" : "ltr"}
      className={`min-h-screen bg-white text-[#111111] ${isAr ? "font-arabic" : "font-sans"
        } selection:bg-[#16C9E0]/20 selection:text-black flex flex-col`}
    >
      {/* Main Single-Product Stage (Apple / Reference Layout) */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          {/* ================= LEFT COLUMN: PRODUCT PHOTOGRAPHY & LANGUAGE (Cols 1-6) ================= */}
          <div className="lg:col-span-6 lg:sticky lg:top-6 flex flex-col gap-2 sm:gap-2.5">
            {/* Small Language Buttons Upside Image Bloc */}
            <div className="flex items-center justify-between px-0.5">
              <span className="text-[11px] font-black tracking-widest text-black uppercase font-mono">
                DIGITAL AGENCY NFC
              </span>
              <div className="inline-flex items-center p-0.5 rounded-xl bg-gray-100 border border-gray-200 text-xs font-semibold shadow-2xs">
                <button
                  type="button"
                  onClick={() => setLang("ar")}
                  className={`px-3 py-1 rounded-lg transition-all ${isAr
                      ? "bg-white text-black font-bold shadow-xs"
                      : "text-gray-500 hover:text-black"
                    }`}
                >
                  العربية
                </button>
                <button
                  type="button"
                  onClick={() => setLang("fr")}
                  className={`px-3 py-1 rounded-lg transition-all ${!isAr
                      ? "bg-white text-black font-bold shadow-xs"
                      : "text-gray-500 hover:text-black"
                    }`}
                >
                  Français
                </button>
              </div>
            </div>

            <GalleryShowcase isAr={isAr} selectedType={selectedType} />
          </div>

          {/* ================= RIGHT COLUMN: PRODUCT DETAILS & CHECKOUT (Cols 7-12) ================= */}
          <div className="lg:col-span-6 flex flex-col gap-3 sm:gap-3.5">

            {/* Product Title Only (Notes, Stars and Big Price Bloc Removed) */}
            <h1 className="text-xl sm:text-2xl font-black text-gray-950 tracking-tight leading-snug">
              {isAr ? "Carte DIGITAL AGENCY NFC — بطاقة ذكية" : "Carte DIGITAL AGENCY NFC"}
            </h1>

            {/* Product Options Selector (Standard vs Personalized) Directly Under Title */}
            <ProductOptions
              selectedType={selectedType}
              setSelectedType={setSelectedType}
              customName={customName}
              setCustomName={setCustomName}
              customTitle={customTitle}
              setCustomTitle={setCustomTitle}
              isAr={isAr}
            />

            {/* Simple Order Form (Checkout) */}
            <OrderForm
              selectedType={selectedType}
              customName={customName}
              customTitle={customTitle}
              onOrderSuccess={(orderData) => setCompletedOrder(orderData)}
              isAr={isAr}
            />

          </div>

        </div>
      </main>

      {/* 2. Redesigned Minimalist Footer */}
      <Footer isAr={isAr} setLang={setLang} />

      {/* 3. Floating WhatsApp Direct Contact Button */}
      <a
        href="https://wa.me/213772136223?text=%D9%85%D8%B1%D8%AD%D8%A8%D8%A7%20Digital%20Agency%D8%8C%20%D8%A3%D8%B1%D9%8A%D8%AF%20%D8%B7%D9%84%D8%A8%20%D8%A8%D8%B7%D8%A7%D9%82%D8%A9%20NFC"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 hidden sm:flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-white font-bold text-xs shadow-lg hover:bg-[#20ba59] transition-all hover:scale-105 active:scale-95 font-arabic"
        title="تواصل معنا عبر واتساب"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
        </span>
        <img
          src="/whatsapp.png"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/whatsapp-icon.png";
          }}
          alt="WhatsApp"
          className="w-5 h-5 object-contain"
        />
        <span>تواصل عبر واتساب</span>
      </a>

      {/* 4. Sticky Mobile Checkout Pill */}
      {showStickyBar && (
        <div className="fixed bottom-4 inset-x-4 z-40 lg:hidden flex items-center justify-between p-3 rounded-2xl bg-black/95 backdrop-blur-md text-white shadow-xl border border-white/10 animate-fadeIn font-arabic">
          <div>
            <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
              {selectedType === "standard" ? "ستاندار" : "مخصصة"}
            </p>
            <PriceTag
              amount={selectedType === "standard" ? 2800 : 4000}
              isAr={isAr}
              numClassName="text-base font-black text-white font-mono"
              curClassName="text-xs text-gray-300 font-arabic"
            />
          </div>

          <button
            type="button"
            onClick={handleScrollToOrder}
            className="px-4 py-2 rounded-xl bg-[#FF08D9] hover:bg-[#e007bf] text-white font-bold text-xs flex items-center gap-1.5 active:scale-95 transition-transform shadow-md"
          >
            <span>{isAr ? "اطلب الآن" : "Commander"}</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. Order Confirmation Modal */}
      {completedOrder && (
        <OrderConfirmationModal
          order={completedOrder}
          onClose={() => setCompletedOrder(null)}
          isAr={isAr}
        />
      )}
    </div>
  );
}
