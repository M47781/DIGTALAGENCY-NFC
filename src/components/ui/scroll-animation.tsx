"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowUp, ChevronDown } from "lucide-react";

/**
 * Top Gradient Scroll Progress Bar
 * Tracks page scroll depth with ultra-smooth spring physics
 */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="global-scroll-progress-bar"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
}

/**
 * Scroll Reveal Component
 * Smoothly animates elements into view when scrolled to
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.65,
  distance = 32,
  className = "",
  once = true,
}: ScrollRevealProps) {
  const getInitial = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "scale":
        return { opacity: 0, scale: 0.94, y: 16 };
      case "fade":
      default:
        return { opacity: 0 };
    }
  };

  const getAnimate = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      case "scale":
        return { opacity: 1, scale: 1, y: 0 };
      case "fade":
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once, margin: "-50px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Smooth cubic-bezier
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}

/**
 * Stagger Container
 * Orchestrates child items to reveal sequentially when scrolled into view
 */
export function StaggerContainer({
  children,
  className = "",
  stagger = 0.12,
  delayChildren = 0.05,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface StaggerItemProps {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}

/**
 * Stagger Item
 * Individual child in a StaggerContainer
 */
export function StaggerItem({
  children,
  className = "",
  distance = 28,
}: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: distance, scale: 0.97 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated Hero Scroll Down Prompt
 * Invites the user to scroll down with a bouncing mouse indicator
 */
export function ScrollDownPrompt({ targetId = "products" }: { targetId?: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="hero-scroll-prompt-wrap">
      <a
        href={`#${targetId}`}
        onClick={handleClick}
        className="hero-scroll-prompt"
        aria-label="التمرير للأسفل لاستكشاف البطاقات"
      >
        <div className="mouse-scroll-shape">
          <div className="mouse-scroll-wheel" />
        </div>
        <div className="scroll-prompt-text-group">
          <span className="scroll-prompt-text">استكشف البطاقات والخيارات</span>
          <ChevronDown size={14} className="scroll-chevron-bounce" />
        </div>
      </a>
    </div>
  );
}

/**
 * Floating Back-to-Top Button
 * Appears after scrolling down 350px and glides user smoothly back to top
 */
export function BackToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      type="button"
      onClick={scrollToTop}
      className="back-to-top-btn"
      aria-label="العودة إلى أعلى الصفحة"
      initial={{ opacity: 0, scale: 0.8, y: 10 }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.8,
        y: visible ? 0 : 10,
        pointerEvents: visible ? "auto" : "none",
      }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <ArrowUp size={18} strokeWidth={2.5} />
    </motion.button>
  );
}
