"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink, Sparkles } from "lucide-react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "@/lib/utils";

export interface WorkCardItem {
  id: string;
  name: string;
  category: string;
  src: string;
  alt: string;
  url: string;
  badge?: string;
}

export const defaultWorkCards: WorkCardItem[] = [
  {
    id: "digital-agency",
    name: "Digital Agency",
    category: "البطاقة الرسمية • الجيل الذكي",
    src: "/work-digital-agency.png?v=2",
    alt: "بطاقة Digital Agency الذكية NFC",
    url: "https://linkdigitalbio.vercel.app/?utm_source=ig&utm_medium=social&utm_content=link_in_bio&fbclid=PAb21jcAVSCI1leHRuA2FlbQIxMQBwZG9mAnNydGMGYXBwX2lkDzU2NzA2NzM0MzM1MjQyNwABp5fkWhwvWLstfAFEmj4o--esNuJ-Y4wWIf-Qv1-hL9jNxqIYt5J6HYs4Gmqr_aem_fpt9i4KqXz5d7e_-XotOQQ",
    badge: "الرسمية • في المركز",
  },
  {
    id: "location-algerie",
    name: "Location Algérie",
    category: "خدمات وكراء السيارات",
    src: "/work-location-algerie.png?v=2",
    alt: "بطاقة Location Algérie",
    url: "https://locationalgeriefr.vecel.app",
    badge: "كراء وتأجير",
  },
  {
    id: "techinnov",
    name: "TechInnov Incubator",
    category: "حاضنة أعمال USTHB Start-UPs",
    src: "/work-techinnov.png?v=2",
    alt: "بطاقة حاضنة الأعمال TechInnov",
    url: "https://yakdan.vercel.app",
    badge: "حاضنة مشاريع",
  },
  {
    id: "djamal-amouri",
    name: "المؤسسة الجزائرية لترقية الإستثمار",
    category: "Algerian Foundation Communication",
    src: "/work-djamal-amouri.png?v=2",
    alt: "بطاقة Algerian Foundation Communication",
    url: "https://djamalamouri.vercel.app/",
    badge: "اتصال واستثمار",
  },
];

interface Skiper49Props {
  cards?: WorkCardItem[];
  className?: string;
  showNavigation?: boolean;
  showPagination?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}

export function Skiper49({
  cards = defaultWorkCards,
  className,
  showNavigation = true,
  showPagination = true,
  autoplay = true,
  loop = true,
}: Skiper49Props) {
  // Multiply list for continuous infinite loop without gaps
  const displayCards = loop ? [...cards, ...cards] : cards;

  return (
    <div className={cn("skiper49-work-carousel-wrap", className)}>
      <Carousel_003
        cards={displayCards}
        showNavigation={showNavigation}
        showPagination={showPagination}
        autoplay={autoplay}
        loop={loop}
      />
    </div>
  );
}

interface CarouselProps {
  cards: WorkCardItem[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
}

export function Carousel_003({
  cards,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
}: CarouselProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={cn("relative w-full max-w-5xl mx-auto px-4", className)}
    >
      <div className="work-carousel-container">
        <Swiper
          spaceBetween={16}
          autoplay={
            autoplay
              ? {
                  delay: 3200,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          initialSlide={0}
          loop={loop}
          touchRatio={1.15}
          resistanceRatio={0.85}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 65,
            modifier: 1,
            slideShadows: false,
          }}
          breakpoints={{
            320: {
              spaceBetween: 12,
              coverflowEffect: {
                rotate: 12,
                stretch: 0,
                depth: 50,
                modifier: 1,
                slideShadows: false,
              },
            },
            640: {
              spaceBetween: 18,
              coverflowEffect: {
                rotate: 16,
                stretch: 0,
                depth: 75,
                modifier: 1,
                slideShadows: false,
              },
            },
            1024: {
              spaceBetween: 28,
              coverflowEffect: {
                rotate: 20,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: false,
              },
            },
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                  el: ".work-swiper-pagination",
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".work-swiper-button-next",
                  prevEl: ".work-swiper-button-prev",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={`${card.id}-${index}`} className="work-swiper-slide">
              <a
                href={card.url}
                target="_blank"
                rel="noopener noreferrer"
                className="work-card-pure-float"
                title={`انقر لتجربة الرابط الحي لـ ${card.name}`}
              >
                {/* Pure Physical NFC Card - Transparent layout, large real dimensions */}
                <img
                  src={card.src}
                  alt={card.alt}
                  className="work-card-floating-img"
                  loading="lazy"
                  draggable={false}
                />

                {/* Clean Meta below the Card */}
                <div className="work-card-floating-label">
                  <div className="work-card-client-title">{card.name}</div>
                  <div className="work-card-client-tag">{card.category}</div>
                </div>
              </a>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Chevrons */}
        {showNavigation && (
          <div className="work-carousel-nav-controls">
            <button
              type="button"
              className="work-swiper-button-prev"
              aria-label="البطاقة السابقة"
            >
              <ChevronRight size={20} strokeWidth={2.5} />
            </button>
            <button
              type="button"
              className="work-swiper-button-next"
              aria-label="البطاقة التالية"
            >
              <ChevronLeft size={20} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* Custom Pagination Bullets */}
        {showPagination && (
          <div className="work-swiper-pagination" />
        )}

        {/* Mobile Touch Swipe Indicator */}
        <div className="work-mobile-swipe-hint">
          <span className="swipe-hint-icon">⇄</span>
          <span>مرّر باللمس لاستعراض البطاقات • انقر لفتح الرابط الحي</span>
        </div>
      </div>
    </motion.div>
  );
}

export default Skiper49;
