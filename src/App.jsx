import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Zap,
  ArrowUpRight,
  ArrowLeft,
  ArrowLeftRight,
  Sparkles,
  Wifi,
  Check,
  Phone,
  Link as LinkIcon,
  UserPlus,
  UserCheck,
  MessageCircle,
  Globe,
  Briefcase,
  Smartphone,
  RefreshCw,
  ShieldCheck,
  Lock,
  Plus,
  Menu,
  X,
} from "lucide-react";
import { CardCompareSlider } from "@/components/card-compare-slider";
import { FaqAccordion } from "@/components/ui/faq-chat-accordion";
import { defaultData as faqItems } from "@/components/ui/faq-chat-accordion-demo";
import { Skiper49 } from "@/components/ui/skiper49";
import {
  ScrollProgressBar,
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  BackToTopButton,
} from "@/components/ui/scroll-animation";

const WHATSAPP_NUMBER = "213772136223";

function WhatsAppIcon({ size = 20, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ display: "inline-block", verticalAlign: "middle", flexShrink: 0 }}
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413z" />
    </svg>
  );
}

function HeroCardShowcase() {
  const [activeTab, setActiveTab] = useState("official"); // "official" | "custom"
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef(null);

  // Auto-loop change animation: smoothly alternates between official and custom cards
  useEffect(() => {
    if (isHovering) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev === "official" ? "custom" : "official"));
    }, 3200);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 14;

    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div className="hero-card-showcase">
      {/* 1. Top Tabs matching user reference with loop indicator */}
      <div className="hero-two-tabs" role="tablist">
        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "official"}
          className={`hero-tab-pill ${activeTab === "official" ? "is-active" : ""}`}
          onClick={() => setActiveTab("official")}
        >
          <span className="hero-tab-indicator" />
          <span>البطاقة الرسمية (Digital Agency)</span>
        </button>

        <button
          type="button"
          role="tab"
          aria-selected={activeTab === "custom"}
          className={`hero-tab-pill ${activeTab === "custom" ? "is-active" : ""}`}
          onClick={() => setActiveTab("custom")}
        >
          <span className="hero-tab-indicator" />
          <span>البطاقة المخصصة بشعارك</span>
        </button>
      </div>

      {/* 2. 3D Display Stage */}
      <div className="hero-card-viewport">
        {/* Ambient Halo & Orbital Dashed Ring */}
        <div className="ambient-card-glow" />
        <div className="card-orbit-ring" />

        {/* Top-Left Badge with Sharp Vector Icon */}
        <div className="floating-badge badge-top-left">
          <div className="badge-icon">
            <Zap size={13} strokeWidth={2.5} fill="currentColor" />
          </div>
          <span>NFC + QR مدمج</span>
        </div>

        {/* Floating 3D Card with Mouse Tilt and Smooth Loop Transition */}
        <div
          className="hero-card-3d-motion"
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={() => setActiveTab((prev) => (prev === "official" ? "custom" : "official"))}
          title="انقر للتبديل بين البطاقة الرسمية والمخصصة"
          style={
            isHovering
              ? {
                  transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.04, 1.04, 1.04)`,
                  animation: "none",
                  transition: "transform 0.08s ease-out",
                }
              : undefined
          }
        >
          <div className="hero-card-stage">
            <img
              src="/card-black.png"
              alt="البطاقة الرسمية (Digital Agency)"
              className={`hero-main-card-img ${activeTab === "official" ? "card-visible" : "card-hidden"}`}
              draggable={false}
            />
            <img
              src="/card-white.png"
              alt="البطاقة المخصصة بشعارك"
              className={`hero-main-card-img ${activeTab === "custom" ? "card-visible" : "card-hidden"}`}
              draggable={false}
            />
          </div>
          <div className="card-ground-shadow" />
        </div>

        {/* Bottom-Right Badge with Sharp Vector Icon */}
        <div className="floating-badge badge-bottom-right">
          <div className="badge-icon">
            <ArrowUpRight size={14} strokeWidth={2.5} />
          </div>
          <span>مشاركة فورية بلمسة</span>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [selectedProduct, setSelectedProduct] = useState("normal"); // "normal" | "custom"
  const [quantity, setQuantity] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    company: "",
    notes: "",
  });
  const [error, setError] = useState("");

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const pricePerUnit = selectedProduct === "normal" ? 2200 : 3500;
  const totalPrice = useMemo(() => {
    const qty = Math.max(1, Number(quantity) || 1);
    return pricePerUnit * qty;
  }, [pricePerUnit, quantity]);

  const scrollToOrder = (type) => {
    setSelectedProduct(type);
    const element = document.getElementById("order");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      setError("يرجى إدخال اسمك ورقم الهاتف للتواصل.");
      return;
    }
    setError("");

    const productLabel =
      selectedProduct === "normal"
        ? "بطاقة NFC القياسية (2 200 دج)"
        : "بطاقة NFC المخصصة بشعارك (3 500 دج)";

    const messageLines = [
      "مرحباً Digital Agency 👋",
      "أريد تأكيد طلب بطاقة عمل ذكية NFC :",
      "━━━━━━━━━━━━━━━━━━",
      `👤 الاسم واللقب : ${form.name}`,
      `📞 رقم الهاتف : ${form.phone}`,
      form.company.trim() ? `🏢 الشركة / النشاط : ${form.company}` : null,
      `💳 نوع البطاقة : ${productLabel}`,
      `🔢 الكمية : ${quantity}`,
      `💰 الإجمالي التقديري : ${totalPrice.toLocaleString("fr-FR")} دج`,
      form.notes.trim() ? `📝 تفاصيل الشعار / ملاحظات : ${form.notes}` : null,
      "━━━━━━━━━━━━━━━━━━",
      "يرجى التواصل معي لتأكيد تفاصيل الطلب والتوصيل.",
    ].filter(Boolean);

    const fullMessage = messageLines.join("\n");
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="app-container" dir="rtl">
      {/* Top Animated Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* ================= HEADER ================= */}
      <div className="header-wrapper">
        <header className="header section-wrap">
          <a href="#top" className="brand-logo" aria-label="Digital Agency">
            <img src="/logo.png" alt="Digital Agency" className="brand-logo-img" />
          </a>

          <nav className="nav-links">
            <a href="#work">أعمالنا وشركاؤنا</a>
            <a href="#products">البطاقات والأسعار</a>
            <a href="#compare">مقارنة تفاعلية</a>
            <a href="#demo">تجربة حية</a>
            <a href="#features">المميزات</a>
            <a href="#how">كيف تعمل</a>
            <a href="#faq">الأسئلة الشائعة</a>
          </nav>

          <div className="header-actions-group">
            <a href="#order" className="header-cta-btn">
              <ArrowLeft size={16} strokeWidth={2.5} />
              <span>اطلب بطاقتك</span>
            </a>

            <button
              type="button"
              className="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <X size={22} strokeWidth={2.4} />
              ) : (
                <Menu size={22} strokeWidth={2.4} />
              )}
            </button>
          </div>
        </header>

        {/* ================= MOBILE NAVIGATION DRAWER ================= */}
        <div
          className={`mobile-nav-drawer ${mobileMenuOpen ? "is-open" : ""}`}
          aria-hidden={!mobileMenuOpen}
        >
          <div
            className="mobile-nav-backdrop"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav className="mobile-nav-content">
            <div className="mobile-nav-header">
              <span className="mobile-nav-label">القائمة الرئيسية والتنقل السريع</span>
              <button
                type="button"
                className="mobile-nav-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="إغلاق"
              >
                <X size={20} strokeWidth={2.4} />
              </button>
            </div>

            <div className="mobile-nav-links">
              <a
                href="#work"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><Sparkles size={18} /></span>
                <span className="nav-item-title">أعمالنا وشركاؤنا</span>
                <span className="nav-item-badge">نماذج حية</span>
              </a>

              <a
                href="#products"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><Zap size={18} /></span>
                <span className="nav-item-title">البطاقات والأسعار</span>
              </a>

              <a
                href="#compare"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><ArrowLeftRight size={18} /></span>
                <span className="nav-item-title">مقارنة تفاعلية 360°</span>
              </a>

              <a
                href="#demo"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><Smartphone size={18} /></span>
                <span className="nav-item-title">تجربة حية على الهاتف</span>
              </a>

              <a
                href="#features"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><Globe size={18} /></span>
                <span className="nav-item-title">مميزات البطاقة الذكية</span>
              </a>

              <a
                href="#how"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><Wifi size={18} /></span>
                <span className="nav-item-title">كيف تعمل في 3 خطوات</span>
              </a>

              <a
                href="#faq"
                className="mobile-nav-item"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="nav-item-icon"><MessageCircle size={18} /></span>
                <span className="nav-item-title">الأسئلة الأكثر شيوعاً</span>
              </a>
            </div>

            <div className="mobile-nav-actions">
              <a
                href="#order"
                className="mobile-nav-order-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowLeft size={18} strokeWidth={2.5} />
                <span>اطلب بطاقتك الآن (الدفع عند الاستلام)</span>
              </a>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noreferrer"
                className="mobile-nav-wa-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                <WhatsAppIcon size={20} />
                <span>محادثة فورية عبر واتساب</span>
              </a>
            </div>
          </nav>
        </div>
      </div>

      <main id="top">
        {/* ================= HERO SECTION ================= */}
        <section className="hero section-wrap">
          <div className="hero-grid">
            <motion.div
              className="hero-content"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <motion.div
                className="hero-announcement-badge"
                initial={{ opacity: 0, y: -14, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="hero-badge-pill">
                  <span className="hero-badge-radar">
                    <span className="hero-radar-ring" />
                    <span className="hero-radar-dot" />
                  </span>
                  <span>NFC 2026</span>
                </span>
                <span className="hero-badge-title">
                  الجيل الجديد من <span className="hero-badge-gradient-text">بطاقات الأعمال الذكية</span>
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                شبكتك المهنية الرقمية.<br />
                <span className="gradient-text">بلمسة واحدة وذكية.</span>
              </motion.h1>

              <motion.p
                className="hero-subtitle"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                بطاقة عمل ذكية بتقنية NFC تشارك هويتك الرقمية، حساباتك، وأرقامك فوراً بمجرد تقريبها من أي هاتف ذكي. أسهل في الاستخدام، أكثر فخامة، وتترك انطباعاً احترافياً لا يُنسى.
              </motion.p>

              <motion.div
                className="hero-actions"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <motion.a
                  href="#order"
                  className="btn-primary"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft size={17} strokeWidth={2.5} />
                  اطلب بطاقتك الآن
                </motion.a>
                <motion.a
                  href="#compare"
                  className="btn-secondary"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeftRight size={17} strokeWidth={2.2} />
                  قارن بين التصميمين
                </motion.a>
              </motion.div>

              <motion.div
                className="hero-trust"
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="trust-icons">
                  <div className="trust-badge-circle" title="جودة استثنائية">
                    <Sparkles size={16} strokeWidth={2.2} />
                  </div>
                  <div className="trust-badge-circle" title="سرعة فائقة">
                    <Zap size={16} strokeWidth={2.2} fill="currentColor" />
                  </div>
                  <div className="trust-badge-circle" title="تقنية NFC">
                    <Wifi size={16} strokeWidth={2.2} />
                  </div>
                </div>
                <p>تفتح ملفك الرقمي فوراً في متصفح العميل بدون الحاجة لتثبيت أي تطبيق.</p>
              </motion.div>
            </motion.div>

            {/* Hero 3D Card Showcase (Matching User Reference) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              <HeroCardShowcase />
            </motion.div>
          </div>
        </section>

        {/* ================= TICKER BAR ================= */}
        <div className="ticker-section">
          <div className="ticker-track">
            {Array.from({ length: 6 }).map((_, i) => (
              <div className="ticker-item" key={i}>
                <span>بطاقات NFC الذكية</span>
                <span className="ticker-star"><Sparkles size={13} /></span>
                <span>هوية رقمية متطورة</span>
                <span className="ticker-star"><Sparkles size={13} /></span>
                <span>تواصل بلمسة واحدة</span>
                <span className="ticker-star"><Sparkles size={13} /></span>
                <span>متوافقة مع جميع الهواتف</span>
                <span className="ticker-star"><Sparkles size={13} /></span>
                <span>بدون أي تطبيق</span>
                <span className="ticker-star"><Sparkles size={13} /></span>
              </div>
            ))}
          </div>
        </div>

        {/* ================= OUR WORK / CLIENT SHOWCASE SECTION ================= */}
        <section className="work-section" id="work">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">معرض أعمالنا الحصرية</div>
                <h2>نماذج حقيقية من بطاقات عملائنا</h2>
                <p>
                  استكشف بطاقات NFC الذكية التي صممناها ونفذناها. <strong>انقر على أي بطاقة لتجربة رابط ملفها الرقمي الحي مباشرة!</strong>
                </p>
              </div>
            </ScrollReveal>

            <Skiper49 />
          </div>
        </section>

        {/* ================= PRODUCTS SECTION ================= */}
        <section className="products-section" id="products">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">خيارات تناسب طموحك</div>
                <h2>اختر البطاقة التي تمثل هويتك</h2>
                <p>نقدم لك خيارين متطورين يتميزان بنفس التجربة الرقمية الذكية مع خيارات تصميم تناسب ذوقك.</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="product-cards-grid" stagger={0.16}>
              {/* Product 1: Normal Black */}
              <StaggerItem className="product-item">
                <div className="product-visual-stage">
                  <div className="product-stage-glow" />
                  <img
                    src="/card-black.png"
                    alt="بطاقة NFC القياسية"
                    className="product-card-img"
                  />
                </div>

                <div className="product-details">
                  <div className="product-title-group">
                    <h3>بطاقة NFC القياسية</h3>
                    <p>تصميم أسود مات فخم مع شعار Digital Agency والدوائر المضيئة، جاهزة للاستخدام الفوري.</p>
                  </div>
                  <div className="price-tag">
                    <span className="price-amount">2&nbsp;200</span>
                    <span className="price-unit">دج / للبطاقة</span>
                  </div>
                </div>

                <ul className="features-bullet-list">
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> الوجه الأمامي: شعار Digital Agency مع تقنية NFC</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> الوجه الخلفي: إرشادات اللمس + كود QR ذكي للطوارئ</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> ملف شخصي رقمي تفاعلي كامل باسمك ومعلوماتك</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> إمكانية تعديل وتحديث بياناتك في أي وقت</li>
                </ul>

                <button
                  type="button"
                  className="product-order-btn"
                  onClick={() => scrollToOrder("normal")}
                >
                  اختر هذه البطاقة <ArrowLeft size={16} strokeWidth={2.5} />
                </button>
              </StaggerItem>

              {/* Product 2: Custom White */}
              <StaggerItem className="product-item featured">
                <div className="featured-ribbon">الأكثر طلباً وملاءمة للشركات</div>

                <div className="product-visual-stage">
                  <div className="product-stage-glow" />
                  <img
                    src="/card-white.png"
                    alt="بطاقة NFC المخصصة بشعارك"
                    className="product-card-img"
                  />
                </div>

                <div className="product-details">
                  <div className="product-title-group">
                    <h3>بطاقة NFC المخصصة</h3>
                    <p>مصممة بالكامل بهوية شركتك، شعارك الخاص، وألوانك المفضلة مع طباعة عالية الدقة.</p>
                  </div>
                  <div className="price-tag">
                    <span className="price-amount">3&nbsp;500</span>
                    <span className="price-unit">دج / للبطاقة</span>
                  </div>
                </div>

                <ul className="features-bullet-list">
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> تصميم حصري يحمل شعارك واسمك وألوانك الخاصة</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> الوجه الخلفي: كود QR ذكي مخصص مدمج بهويتك</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> طباعة فاخرة عالية الدقة مقاومة للخدش والتآكل</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> ملف رقمي مخصص بالكامل بألوان وشعار علامتك التجارية</li>
                  <li><span className="bullet-check"><Check size={13} strokeWidth={3} /></span> دعم فني مباشر ومساعدة في ضبط روابطك وبياناتك</li>
                </ul>

                <button
                  type="button"
                  className="product-order-btn"
                  onClick={() => scrollToOrder("custom")}
                >
                  طلب البطاقة المخصصة <ArrowLeft size={16} strokeWidth={2.5} />
                </button>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ================= COMPARE SLIDER SECTION (Photo 2) ================= */}
        <section className="compare-section" id="compare">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">مقارنة تفاعلية مباشرة</div>
                <h2>اسحب وقارن بين التصميمين</h2>
                <p>
                  حرّك المقبض يميناً ويساراً للمقارنة بين <strong>بطاقة NFC القياسية</strong> و <strong>بطاقة NFC المخصصة</strong> بكل سهولة.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="scale" delay={0.12}>
              <div className="compare-card-container">
                <CardCompareSlider autoPlay={true} />
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ================= LIVE DEMO SECTION ================= */}
        <section className="live-demo-section" id="demo">
          <div className="section-wrap">
            <div className="live-demo-box">
              <ScrollReveal direction="right" delay={0.05} className="demo-copy">
                <div className="badge-tag">تجربة تفاعلية حيّة</div>
                <h2>ماذا يحدث عند تقريب البطاقة من الهاتف؟</h2>
                <p>
                  في جزء من الثانية، وبدون الحاجة لفتح الكاميرا أو تشغيل أي تطبيق إضافي، يتلقى هاتف عميلك إشعاراً ذكياً يفتح صفحة ملفك المهني الموحد بكل أناقة.
                </p>

                <ul className="features-bullet-list" style={{ marginTop: "24px" }}>
                  <li><span className="bullet-check"><Zap size={13} strokeWidth={2.5} fill="currentColor" /></span> يفتح الملف فوراً في متصفح الهاتف (Safari / Chrome)</li>
                  <li><span className="bullet-check"><Phone size={13} strokeWidth={2.5} /></span> زر فوري لحفظ رقمك وبياناتك في دليل الهاتف بلمسة واحدة</li>
                  <li><span className="bullet-check"><LinkIcon size={13} strokeWidth={2.5} /></span> روابط مباشرة لواتساب، الموقع الإلكتروني، وشبكات التواصل</li>
                </ul>

                <div style={{ marginTop: "28px" }}>
                  <a href="#order" className="btn-primary">
                    <ArrowLeft size={17} strokeWidth={2.5} />
                    احصل على بطاقتك الآن
                  </a>
                </div>
              </ScrollReveal>

              {/* Phone Mockup Screen */}
              <ScrollReveal direction="left" delay={0.15} className="demo-phone-preview">
                <div className="phone-mockup-frame">
                  <div className="phone-speaker-notch" />
                  <div className="phone-nfc-toast">
                    <Zap size={14} strokeWidth={2.5} fill="currentColor" />
                    <span>تم التعرف على بطاقة NFC</span>
                  </div>

                  <div className="phone-screen-content">
                    <div className="phone-avatar">
                      <img src="/favicon.png" alt="Emblem" />
                    </div>
                    <div className="phone-profile-name">Digital Agency</div>

                    <div className="phone-link-btn featured">
                      <span>حفظ جهة الاتصال</span>
                      <UserPlus size={15} strokeWidth={2.2} />
                    </div>
                    <div className="phone-link-btn">
                      <span>محادثة واتساب مباشرة</span>
                      <MessageCircle size={15} strokeWidth={2.2} />
                    </div>
                    <div className="phone-link-btn">
                      <span>الاتصال بالهاتف</span>
                      <Phone size={15} strokeWidth={2.2} />
                    </div>
                    <div className="phone-link-btn">
                      <span>زيارة الموقع الإلكتروني</span>
                      <Globe size={15} strokeWidth={2.2} />
                    </div>
                    <div className="phone-link-btn">
                      <span>حساب LinkedIn</span>
                      <Briefcase size={15} strokeWidth={2.2} />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ================= FEATURES SECTION ================= */}
        <section className="features-section" id="features">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">تقنية متقدمة وسهلة</div>
                <h2>كل عالمك المهني في بطاقة واحدة</h2>
                <p>استبدل بطاقاتك الورقية ببطاقة ذكية واحدة تدوم معك مدى الحياة وتحفظ بياناتك دائماً محدثة.</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="features-grid" stagger={0.1}>
              <StaggerItem className="feature-box">
                <div className="feature-icon-wrap"><Zap size={26} strokeWidth={2.2} /></div>
                <h3>مشاركة فورية</h3>
                <p>بمجرد تقريب البطاقة من هاتف العميل، تظهر كل بياناتك وروابطك على شاشته في ثانية واحدة.</p>
              </StaggerItem>

              <StaggerItem className="feature-box">
                <div className="feature-icon-wrap"><Smartphone size={26} strokeWidth={2.2} /></div>
                <h3>بدون أي تطبيق</h3>
                <p>لا يحتاج شريكك أو عميلك لتحميل أي تطبيق؛ يفتح ملفك الرقمي مباشرة في متصفح الهاتف.</p>
              </StaggerItem>

              <StaggerItem className="feature-box">
                <div className="feature-icon-wrap"><Globe size={26} strokeWidth={2.2} /></div>
                <h3>ملف رقمي موحد</h3>
                <p>اجمع في صفحة واحدة رقم هاتفك، بريدك، موقعك، واتساب، وحساباتك على شبكات التواصل.</p>
              </StaggerItem>

              <StaggerItem className="feature-box">
                <div className="feature-icon-wrap"><RefreshCw size={26} strokeWidth={2.2} /></div>
                <h3>تحديث دائم مدى الحياة</h3>
                <p>غيّرت رقم هاتفك أو عنوان مكتبك؟ حدّث معلوماتك مباشرة دون الحاجة لإعادة طباعة بطاقة جديدة.</p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ================= HOW IT WORKS SECTION ================= */}
        <section className="how-section" id="how">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">بساطة لا مثيل لها</div>
                <h2>كيف تعمل بطاقتك الذكية؟</h2>
                <p>ثلاث خطوات بسيطة فقط تبهر بها عملاءك في أي لقاء أو مؤتمر.</p>
              </div>
            </ScrollReveal>

            <StaggerContainer className="steps-grid" stagger={0.12}>
              <StaggerItem className="step-card">
                <div className="step-top-row">
                  <span className="step-number">01</span>
                  <div className="step-icon-badge"><Wifi size={22} strokeWidth={2.2} /></div>
                </div>
                <h3>قرّب البطاقة</h3>
                <p>ضع بطاقة NFC بالقرب من الجزء العلوي أو الخلفي لهاتف العميل (يدعم iPhone و Android).</p>
              </StaggerItem>

              <StaggerItem className="step-card">
                <div className="step-top-row">
                  <span className="step-number">02</span>
                  <div className="step-icon-badge"><Sparkles size={22} strokeWidth={2.2} /></div>
                </div>
                <h3>يفتح الملف فوراً</h3>
                <p>يظهر إشعار فوري يفتح صفحة ملفك التعريفي الاحترافي في ثانية واحدة مع صورة وتفاصيلك.</p>
              </StaggerItem>

              <StaggerItem className="step-card">
                <div className="step-top-row">
                  <span className="step-number">03</span>
                  <div className="step-icon-badge"><UserCheck size={22} strokeWidth={2.2} /></div>
                </div>
                <h3>حفظ جهة الاتصال</h3>
                <p>يقوم العميل بالضغط على "حفظ جهة الاتصال" لتُخزن بياناتك كاملة في دليل هاتفه بضغطة زر.</p>
              </StaggerItem>
            </StaggerContainer>
          </div>
        </section>

        {/* ================= ORDER SECTION ================= */}
        <section className="order-section" id="order">
          <div className="section-wrap">
            <div className="order-container">
              {/* Order Info Left */}
              <ScrollReveal direction="right" delay={0.05} className="order-info">
                <div className="badge-tag">طلب سهل ومباشر</div>
                <h2>احصل على بطاقتك الذكية اليوم</h2>
                <p>
                  املأ النموذج بالمعلومات الأساسية واضغط على إرسال الطلب. سنستقبل رسالتك مباشرة عبر تطبيق واتساب لتأكيد تفاصيل التصميم والتوصيل لكافة ولايات الوطن.
                </p>

                <div className="guarantee-box">
                  <ShieldCheck size={22} strokeWidth={2.2} style={{ color: "var(--purple-primary)", flexShrink: 0 }} />
                  <span><strong>ضمان وراحة بال :</strong> لا يتطلب الطلب أي دفع إلكتروني مسبق. يتم تأكيد طلبك أولاً مع فريقنا، والدفع عند استلام بطاقتك.</span>
                </div>
              </ScrollReveal>

              {/* Order Form Right */}
              <ScrollReveal direction="left" delay={0.12} className="order-form-card">
                <h3 className="form-title">نموذج الطلب السريع</h3>

                <form onSubmit={handleOrderSubmit} className="form-grid">
                  <div className="form-row-2col">
                    <div className="input-field">
                      <label htmlFor="client-name">الاسم واللقب *</label>
                      <input
                        id="client-name"
                        type="text"
                        required
                        placeholder="مثال: محمد بن علي"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </div>

                    <div className="input-field">
                      <label htmlFor="client-phone">رقم الهاتف *</label>
                      <input
                        id="client-phone"
                        type="tel"
                        required
                        placeholder="07 XX XX XX XX"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="client-company">اسم الشركة أو النشاط المهني (اختياري)</label>
                    <input
                      id="client-company"
                      type="text"
                      placeholder="مثال: Digital Agency أو حر"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                    />
                  </div>

                  <div className="form-row-2col">
                    <div className="input-field">
                      <label htmlFor="client-product">نوع البطاقة المطلوبة</label>
                      <select
                        id="client-product"
                        value={selectedProduct}
                        onChange={(e) => setSelectedProduct(e.target.value)}
                      >
                        <option value="normal">بطاقة NFC القياسية — 2 200 دج</option>
                        <option value="custom">بطاقة NFC المخصصة بشعارك — 3 500 دج</option>
                      </select>
                    </div>

                    <div className="input-field">
                      <label htmlFor="client-qty">الكمية</label>
                      <input
                        id="client-qty"
                        type="number"
                        min="1"
                        max="100"
                        value={quantity}
                        onChange={(e) => setQuantity(Math.max(1, Math.min(100, Number(e.target.value) || 1)))}
                      />
                    </div>
                  </div>

                  <div className="input-field">
                    <label htmlFor="client-notes">ملاحظات إضافية أو تفاصيل الشعار (اختياري)</label>
                    <textarea
                      id="client-notes"
                      rows="3"
                      placeholder="الألوان المرغوبة، معلومات إضافية تود إرفاقها، أو استفسار لفريقنا…"
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    />
                  </div>

                  <div className="order-summary-box">
                    <span>الإجمالي التقديري للطلب :</span>
                    <strong className="order-total-price">
                      {totalPrice.toLocaleString("fr-FR")} دج
                    </strong>
                  </div>

                  {error && <div className="form-error-msg">{error}</div>}

                  <button type="submit" className="submit-order-btn">
                    <WhatsAppIcon size={20} />
                    <span>إرسال الطلب عبر واتساب</span>
                  </button>

                  <p className="order-security-note">
                    <Lock size={14} strokeWidth={2} style={{ verticalAlign: "middle", marginLeft: "6px" }} />
                    سيتم توجيهك إلى واتساب برسالة منظمة جاهزة للإرسال دون تعقيد.
                  </p>
                </form>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ================= FAQ SECTION ================= */}
        <section className="faq-section" id="faq">
          <div className="section-wrap">
            <ScrollReveal direction="up">
              <div className="section-header">
                <div className="badge-tag">إجابات واضحة</div>
                <h2>الأسئلة الأكثر شيوعاً</h2>
                <p>كل ما تحتاج لمعرفته حول استخدام بطاقات NFC الذكية من Digital Agency.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.12}>
              <div className="faq-chat-accordion-wrap">
                <FaqAccordion
                  data={faqItems}
                  className="max-w-[780px] mx-auto"
                  timestamp="محدثة للإجابة على كل استفساراتكم الشائعة"
                />
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}
      <footer className="footer-wrap">
        <div className="section-wrap footer-inner">
          <div className="footer-brand">
            <img src="/logo.png" alt="Digital Agency Logo" />
            <span className="footer-tagline">| حلول الهوية الرقمية والبطاقات الذكية</span>
          </div>

          <div className="footer-links">
            <a href="#work">أعمالنا</a>
            <a href="#products">البطاقات</a>
            <a href="#compare">مقارنة التصميمين</a>
            <a href="#demo">التجربة الحية</a>
            <a href="#features">المميزات</a>
            <a href="#how">كيف تعمل</a>
            <a href="#order">طلب بطاقة</a>
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
              <WhatsAppIcon size={16} />
              <span>واتساب مباشر</span>
              <ArrowUpRight size={15} strokeWidth={2.2} />
            </a>
          </div>

          <div className="footer-copyright">
            جميع الحقوق محفوظة © {new Date().getFullYear()} Digital Agency — رواد تقنية NFC في الجزائر.
          </div>
        </div>
      </footer>

      {/* ================= FLOATING WHATSAPP BUTTON ================= */}
      <a
        className="whatsapp-float-btn"
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label="تواصل معنا عبر واتساب"
      >
        <WhatsAppIcon size={28} />
      </a>

      {/* ================= FLOATING BACK TO TOP BUTTON ================= */}
      <BackToTopButton />
    </div>
  );
}
