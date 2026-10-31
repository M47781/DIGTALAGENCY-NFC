import React, { useState, useEffect, useRef } from "react";
import {
  CompareSlider,
  CompareSliderAfter,
  CompareSliderBefore,
  CompareSliderHandle,
} from "@/components/ui/compare-slider";

interface CardCompareSliderProps {
  className?: string;
  autoPlay?: boolean;
}

export function CardCompareSlider({
  className = "",
  autoPlay = true,
}: CardCompareSliderProps) {
  const [sliderValue, setSliderValue] = useState(50);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const resumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const baseOffsetRef = useRef<number>(0);

  // Smooth continuous oscillation between 18% and 82%
  useEffect(() => {
    if (!isPlaying || isUserInteracting) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      return;
    }

    const duration = 4800; // 4.8 seconds for complete loop cycle
    startTimeRef.current = performance.now();

    // Calculate current phase so animation resumes smoothly from current sliderValue
    const currentFraction = (sliderValue - 18) / (82 - 18); // 0 to 1
    const clampedFraction = Math.max(0, Math.min(1, currentFraction));
    baseOffsetRef.current = Math.acos(1 - 2 * clampedFraction) / (2 * Math.PI);

    const animate = (now: number) => {
      if (!startTimeRef.current) startTimeRef.current = now;
      const elapsed = now - startTimeRef.current;
      const t = (elapsed / duration + baseOffsetRef.current) % 1;

      // Cosine ease-in-out wave for buttery smooth motion
      const wave = (1 - Math.cos(t * 2 * Math.PI)) / 2;
      const newValue = 18 + wave * (82 - 18);

      setSliderValue(Math.round(newValue * 10) / 10);
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, isUserInteracting]);

  const handlePointerDown = () => {
    setIsUserInteracting(true);
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
  };

  const handlePointerUp = () => {
    // Resume auto-play after 2.5 seconds of inactivity
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
    }
    resumeTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
    }, 2500);
  };

  const handleValueChange = (val: number) => {
    setSliderValue(val);
  };

  return (
    <div className={`card-compare-wrapper ${className}`}>
      {/* Compare Slider Box */}
      <div
        className="compare-slider-viewport"
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
      >
        <CompareSlider
          value={sliderValue}
          onValueChange={handleValueChange}
          className="size-full"
          interaction="drag"
          orientation="horizontal"
        >
          {/* Layer Before: Black Official Card */}
          <CompareSliderBefore>
            <div className="slider-card-layer black-layer">
              <img
                src="/card-black.png"
                alt="بطاقة NFC القياسية"
                className="slider-card-img"
              />
            </div>
          </CompareSliderBefore>

          {/* Layer After: White Custom Card */}
          <CompareSliderAfter>
            <div className="slider-card-layer white-layer">
              <img
                src="/card-white.png"
                alt="بطاقة NFC المخصصة"
                className="slider-card-img"
              />
            </div>
          </CompareSliderAfter>

          {/* Drag Handle with glowing pulse */}
          <CompareSliderHandle className="compare-handle-custom" />
        </CompareSlider>
      </div>

      {/* Control Bar & Helper Info */}
      <div className="compare-control-bar">
        <div className="card-legend-item">
          <span className="legend-indicator black" />
          <span>بطاقة NFC القياسية</span>
        </div>

        <div className="card-legend-item">
          <span className="legend-indicator purple" />
          <span>بطاقة NFC المخصصة</span>
        </div>
      </div>
    </div>
  );
}

export default CardCompareSlider;
