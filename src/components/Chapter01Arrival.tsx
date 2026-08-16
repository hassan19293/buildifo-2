import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface Chapter01ArrivalProps {
  setCursorState: (state: CursorState, text?: string) => void;
  onExplore: () => void;
}

export const Chapter01Arrival: React.FC<Chapter01ArrivalProps> = ({
  setCursorState,
  onExplore,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Optical transitions
  const textScale = useTransform(scrollYProgress, [0, 0.7], [1, 1.2]);
  const textY = useTransform(scrollYProgress, [0, 0.8], [0, -80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 0.9, 0]);
  const daylightExpansion = useTransform(scrollYProgress, [0.3, 0.95], [0, 0.7]);

  return (
    <section
      id="arrival"
      ref={containerRef}
      className="relative min-h-[140vh] bg-transparent text-[#F5F3EE] overflow-hidden"
    >
      {/* Vertical architectural edge annotation */}
      <div className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col items-center gap-3 opacity-20 pointer-events-none select-none z-20">
        <span className="writing-vertical-rl transform rotate-180 inter text-[10px] tracking-[0.5em] font-bold text-[#F5F3EE]">
          THRESHOLD_01
        </span>
        <div className="h-24 w-[1px] bg-[#F5F3EE]" />
      </div>

      {/* Sticky Foreground Architectural Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">
        {/* Directional Daylight Geometric Beam from Doorway */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-screen opacity-60 transition-opacity duration-700"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 28% 42%, rgba(255, 246, 224, 0.18) 0%, rgba(255, 240, 210, 0.04) 50%, transparent 80%)',
          }}
        />

        {/* Cinematic daylight expansion as camera moves into room 02 */}
        <motion.div
          style={{ opacity: daylightExpansion }}
          className="absolute inset-0 bg-[#F5F3EE] pointer-events-none mix-blend-lighten"
        />

        {/* Architectural Foreground Typography & Spatial Alignment */}
        <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 flex flex-col justify-between pt-24 sm:pt-28 pb-8 sm:pb-12 lg:pb-16 pointer-events-none">
          {/* Top Micro-Metadata */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_8px_#C8FF00]" />
              <span className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5F3EE]">
                Chapter 01: Arrival
              </span>
            </div>
            <div className="inter text-[9px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A6A39B]/80">
              Studio Coordinates / 52.5200° N, 13.4050° E
            </div>
          </div>

          {/* Deep Architectural Typography "WE BUILD" */}
          <motion.div
            style={{ scale: textScale, y: textY, opacity: textOpacity }}
            className="my-auto pointer-events-auto py-4 sm:py-6"
          >
            {/* Desktop Composition (lg+) */}
            <div className="hidden lg:block space-y-0 select-none">
              <div className="overflow-hidden">
                <span className="block big-shoulders text-[13vw] font-black leading-[0.82] tracking-tighter text-[#F5F3EE] transform -translate-x-3 drop-shadow-2xl">
                  WE
                </span>
              </div>
              <div className="overflow-hidden flex items-baseline justify-between flex-wrap gap-4">
                <span className="block big-shoulders text-[13vw] font-black leading-[0.82] tracking-tighter text-[#F5F3EE] transform -translate-x-3 drop-shadow-2xl">
                  BUILD
                </span>
                {/* Asymmetric Technical Statement Column */}
                <div className="max-w-xs sm:max-w-sm pb-4 sm:pb-8 pr-2 backdrop-blur-[2px] bg-black/30 p-4 border border-white/10">
                  <p className="inter text-xs sm:text-sm text-[#A6A39B] font-normal leading-relaxed">
                    Physical and digital environments engineered with craft, material taste, and spatial depth.
                  </p>
                  <div className="mt-3 flex items-center gap-2 inter text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F5F3EE]/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
                    <span>ARCHITECTURAL PERMANENCE</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile & Tablet 1-Column Composition (<lg) */}
            <div className="lg:hidden flex flex-col space-y-4 select-none max-w-full">
              <div className="w-[75%] sm:w-[70%] max-w-full space-y-0">
                <span className="block big-shoulders text-[clamp(54px,16vw,100px)] font-black leading-[0.82] tracking-tight text-[#F5F3EE] drop-shadow-2xl">
                  WE
                </span>
                <span className="block big-shoulders text-[clamp(54px,16vw,100px)] font-black leading-[0.82] tracking-tight text-[#F5F3EE] drop-shadow-2xl">
                  BUILD
                </span>
              </div>

              {/* Metadata & Technical Statement Stacked Below */}
              <div className="max-w-md pt-2 space-y-2 backdrop-blur-[2px] bg-black/30 p-4 border border-white/10">
                <p className="inter text-xs sm:text-sm text-[#A6A39B] font-normal leading-relaxed">
                  Physical and digital environments engineered with craft, material taste, and spatial depth.
                </p>
                <div className="flex items-center gap-2 inter text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-[#F5F3EE]/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]" />
                  <span>ARCHITECTURAL PERMANENCE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Bottom Wayfinding & Cinematic Prompt */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between border-t border-white/10 pt-4 sm:pt-6 gap-4">
            <div className="flex items-center gap-4">
              <span className="inter text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A6A39B]">
                Material: Blackened Steel & Concrete / Doorway Sunlight
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick(650);
                onExplore();
              }}
              onMouseEnter={() => setCursorState('enter', 'ENTER')}
              onMouseLeave={() => setCursorState('default')}
              className="pointer-events-auto group flex items-center justify-between sm:justify-start gap-3 inter text-[10px] uppercase tracking-[0.2em] font-bold text-[#F5F3EE] hover:text-[#C8FF00] transition-colors cursor-pointer border-b border-[#F5F3EE]/30 pb-1 min-h-[44px]"
            >
              <span>STEP THROUGH</span>
              <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
