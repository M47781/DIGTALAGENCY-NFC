import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Play,
  Pause,
} from "lucide-react";
import { GALLERY_ITEMS } from "../data/gallery";

export function GalleryShowcase({ isAr, selectedType = "standard" }) {
  const [currentIndex, setCurrentIndex] = useState(selectedType === "personalized" ? 1 : 0);
  const [isPaused, setIsPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Synchronize when user selects Standard vs Personalized card
  useEffect(() => {
    if (selectedType === "personalized") {
      setCurrentIndex(1);
    } else {
      setCurrentIndex(0);
    }
  }, [selectedType]);

  // Continuous auto-looping slideshow (loops through all images)
  useEffect(() => {
    if (isPaused || lightboxOpen) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
    }, 3800);

    return () => clearInterval(interval);
  }, [isPaused, lightboxOpen]);

  const currentItem = GALLERY_ITEMS[currentIndex] || GALLERY_ITEMS[0];

  const handlePrev = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? GALLERY_ITEMS.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % GALLERY_ITEMS.length);
  };

  return (
    <div className="w-full flex flex-col gap-2">
      
      {/* Main Display Stage with Auto-Looping Carousel (Exact 1199x1312 aspect ratio, no cropping) */}
      <div
        className="relative w-full aspect-[1199/1312] rounded-2xl sm:rounded-3xl overflow-hidden bg-black border border-gray-200/90 shadow-2xs flex items-center justify-center group select-none cursor-pointer"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onClick={() => setLightboxOpen(true)}
      >
        
        {/* Active Looping Image with Smooth Fade & Scale Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="relative w-full h-full flex items-center justify-center"
          >
            <img
              src={currentItem.src}
              alt={currentItem.title}
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain object-center"
            />
          </motion.div>
        </AnimatePresence>

        {/* Previous Arrow Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-2.5 sm:left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-gray-900 flex items-center justify-center shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all active:scale-95"
          aria-label={isAr ? "الصورة السابقة" : "Image précédente"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Next Arrow Button */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-2.5 sm:right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/85 hover:bg-white text-gray-900 flex items-center justify-center shadow-md backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-all active:scale-95"
          aria-label={isAr ? "الصورة التالية" : "Image suivante"}
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Top-Right Fullscreen Zoom Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setLightboxOpen(true);
          }}
          className="absolute top-3 right-3 z-20 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-black/40 hover:bg-black/60 text-white flex items-center justify-center backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity"
          title={isAr ? "تكبير" : "Agrandir"}
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        {/* Bottom Loop Indicator Dots Bar (Clean, modern pagination dots) */}
        <div
          className="absolute bottom-3 inset-x-0 z-20 flex items-center justify-center gap-1.5 px-3 py-1.5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow-sm">
            {GALLERY_ITEMS.map((item, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all duration-300 rounded-full ${
                    isActive
                      ? "w-4 sm:w-5 h-1.5 bg-[#FF08D9] shadow-xs"
                      : "w-1.5 h-1.5 bg-white/60 hover:bg-white"
                  }`}
                  aria-label={`Image ${idx + 1}`}
                />
              );
            })}
          </div>
        </div>

      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/20 text-white hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div
              className="relative max-w-4xl max-h-[88vh] rounded-2xl overflow-hidden p-2 flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={currentItem.src}
                alt={currentItem.title}
                className="w-full h-full max-h-[82vh] object-contain drop-shadow-2xl"
              />
              <p className="text-xs text-gray-300 text-center mt-3 font-medium">
                {currentItem.title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
