import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface Chapter02RevealProps {
  setCursorState: (state: CursorState, text?: string) => void;
  onSelectWork: () => void;
}

export const Chapter02Reveal: React.FC<Chapter02RevealProps> = ({
  setCursorState,
  onSelectWork,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax and spatial drifts
  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  // Transition into darkness for Chapter 03
  const transitionToDark = useTransform(
    scrollYProgress,
    [0.82, 0.98],
    ['rgba(245, 243, 238, 0.88)', 'rgba(20, 20, 18, 0.92)']
  );

  return (
    <motion.section
      id="reveal"
      ref={sectionRef}
      style={{ backgroundColor: transitionToDark }}
      className="relative min-h-[160vh] text-[#080808] paper-grain py-24 sm:py-32 overflow-hidden transition-colors duration-500 backdrop-blur-[2px]"
    >
      {/* Background Subtle Daylight Wash */}
      <div
        className="absolute top-0 right-0 w-2/3 h-full pointer-events-none opacity-30"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, rgba(240, 235, 222, 0.05) 80%)',
        }}
      />

      {/* Vertical architectural edge annotation */}
      <div className="hidden lg:flex absolute left-4 top-1/3 -translate-y-1/2 flex-col items-center gap-3 opacity-20 pointer-events-none select-none">
        <span className="writing-vertical-rl transform rotate-180 inter text-[10px] tracking-[0.5em] font-bold">
          SYSTEMS_ACTIVE
        </span>
        <div className="h-24 w-[1px] bg-[#080808]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* Chapter Header Microtype */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#080808]/15 pb-6 mb-12 sm:mb-16">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#080808]">
              Chapter 02: Reveal
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold opacity-50 mt-2 sm:mt-0">
            Material: Paper, Plaster & Linen / Diffuse Daylight
          </div>
        </div>

        {/* Hero Editorial Composition */}
        {/* Desktop View (lg+) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-center mb-28">
          {/* Left Column: Monumental Headline & Narrative */}
          <div className="lg:col-span-6 z-10 space-y-8">
            <h1 className="big-shoulders text-[60px] sm:text-[85px] lg:text-[105px] leading-[0.85] font-black tracking-tighter uppercase text-[#080808]">
              The Physical<br />Nature of<br />Technology
            </h1>

            <div className="flex gap-8 sm:gap-12 items-start">
              <div className="w-[1px] bg-[#080808] opacity-20 h-32 shrink-0" />
              <div className="max-w-[360px] space-y-6">
                <p className="inter text-sm sm:text-base leading-relaxed opacity-80 font-normal">
                  We reject the digital vacuum. Our work lives in the intersection of architectural permanence and ephemeral data. Chapter 02 explores the transition from raw structural threshold to the refined editorial workspace.
                </p>
                <div
                  onClick={() => {
                    soundEngine.playClick(800);
                    onSelectWork();
                  }}
                  onMouseEnter={() => setCursorState('view', 'EXPLORE')}
                  onMouseLeave={() => setCursorState('default')}
                  className="flex items-center gap-3 group cursor-pointer w-fit min-h-[44px]"
                >
                  <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold border-b-2 border-[#080808] pb-1 group-hover:opacity-70 transition-opacity">
                    Enter Environment
                  </span>
                  <svg
                    className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Layered Architectural Materials */}
          <div className="lg:col-span-6 relative flex items-center justify-end">
            <div className="relative w-full max-w-[500px] h-[460px] sm:h-[560px] flex items-center justify-end">
              {/* Brushed Concrete Plate with Polygon Mask */}
              <motion.div
                style={{ y: imageY }}
                className="absolute -left-4 sm:-left-8 top-12 sm:top-16 w-[260px] sm:w-[360px] h-[340px] sm:h-[440px] concrete-mask shadow-directional flex flex-col justify-end p-6 sm:p-8 overflow-hidden bg-[#E2DFD8]/95 border border-[#080808]/10 backdrop-blur-sm"
              >
                {/* Dot Matrix Texture Overlay */}
                <div
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <div className="relative z-10">
                  <span className="inter text-[9px] uppercase tracking-widest block mb-1 opacity-50 font-semibold">
                    Subject 02-A
                  </span>
                  <span className="inter text-xs font-bold text-[#080808]">
                    Brushed Concrete Plate
                  </span>
                </div>
              </motion.div>

              {/* Carbonized Architectural Monolith */}
              <div
                onMouseEnter={() => setCursorState('view', 'THRESHOLD')}
                onMouseLeave={() => setCursorState('default')}
                className="w-[280px] sm:w-[380px] h-[420px] sm:h-[520px] bg-[#080808] shadow-editorial relative overflow-hidden group transition-transform duration-500 hover:scale-[1.01]"
              >
                <div
                  className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                    backgroundSize: '8px 8px',
                  }}
                />

                {/* Monumental Ghost Numeral 02 */}
                <div className="absolute top-0 right-0 p-6 sm:p-8 flex flex-col items-end pointer-events-none">
                  <span className="big-shoulders text-7xl sm:text-8xl font-black text-[#F5F3EE] opacity-10 leading-none">
                    02
                  </span>
                  <div className="h-28 sm:h-36 w-[1px] bg-[#F5F3EE] opacity-20 mt-3" />
                </div>

                {/* Monolith Captions */}
                <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-8 text-[#F5F3EE] pr-4">
                  <span className="inter text-[9px] uppercase tracking-[0.2em] font-semibold text-[#C8FF00] block mb-1">
                    MATERIALITY STUDY
                  </span>
                  <h3 className="big-shoulders text-2xl sm:text-3xl font-bold uppercase mb-2 tracking-tight text-[#F5F3EE]">
                    Architectural Threshold
                  </h3>
                  <p className="inter text-[11px] opacity-60 max-w-[220px] uppercase tracking-wider leading-relaxed">
                    Controlled daylighting through carbonized steel framing. Materiality: Oak, Glass, Shadow.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Editorial Flow (<lg) */}
        <div className="lg:hidden space-y-8 mb-20">
          <h1 className="big-shoulders text-[clamp(48px,10vw,64px)] leading-[0.88] font-black tracking-tighter uppercase text-[#080808]">
            The Physical<br />Nature of<br />Technology
          </h1>

          <div className="w-full aspect-[16/10] sm:aspect-[16/9] bg-[#080808] shadow-lg relative overflow-hidden border border-[#080808]/15">
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px)',
                backgroundSize: '8px 8px',
              }}
            />
            <div className="w-full h-full bg-[#121210] flex items-center justify-center relative">
              <div
                className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                  backgroundImage: 'radial-gradient(#F5F3EE 1px, transparent 1px)',
                  backgroundSize: '16px 16px',
                }}
              />
              <div className="relative z-10 text-center p-6">
                <span className="text-[clamp(11px,1.5vw,12px)] font-mono-tech uppercase tracking-widest text-[#C8FF00] block mb-2">
                  MATERIALITY STUDY // SPECIMEN 02-B
                </span>
                <span className="big-shoulders text-3xl sm:text-4xl font-bold uppercase tracking-tight text-[#F5F3EE] block">
                  Architectural Threshold
                </span>
                <p className="inter text-xs text-[#A6A39B] max-w-sm mx-auto mt-2">
                  Controlled daylighting through carbonized steel framing. Oak, Glass, Shadow.
                </p>
              </div>
            </div>
            <div className="absolute top-3 right-4 big-shoulders text-4xl font-black text-[#F5F3EE] opacity-15">
              02
            </div>
          </div>

          <div className="space-y-6 pt-2">
            <p className="inter text-[clamp(16px,2.5vw,18px)] text-[#080808]/80 leading-relaxed font-normal">
              We reject the digital vacuum. Our work lives in the intersection of architectural permanence and ephemeral data. Chapter 02 explores the transition from raw structural threshold to the refined editorial workspace.
            </p>
            <button
              onClick={() => {
                soundEngine.playClick(800);
                onSelectWork();
              }}
              onMouseEnter={() => setCursorState('view', 'EXPLORE')}
              onMouseLeave={() => setCursorState('default')}
              className="flex items-center gap-3 group cursor-pointer w-fit min-h-[44px] py-2"
            >
              <span className="inter text-[clamp(11px,1.5vw,12px)] uppercase tracking-[0.2em] font-bold border-b-2 border-[#080808] pb-1 group-hover:opacity-70 transition-opacity">
                Enter Environment
              </span>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* The Three Spatial Moments */}
        <div className="pt-12 sm:pt-16 border-t border-[#080808]/15 space-y-16 sm:space-y-24">
          {/* Spatial Moment 01: DIGITAL EXPERIENCES */}
          <div className="flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-4 sm:gap-6 lg:gap-16 max-w-4xl">
            <div className="flex items-baseline gap-4">
              <span className="inter text-[clamp(11px,1.5vw,12px)] font-bold text-[#080808]/40 tracking-widest">01 /</span>
              <h3 className="big-shoulders text-[clamp(36px,7vw,70px)] font-bold tracking-tight text-[#080808] uppercase leading-[0.9]">
                Digital Experiences
              </h3>
            </div>
            <div className="max-w-md pl-4 border-l border-[#080808]/20 space-y-3">
              <p className="inter text-[clamp(16px,2.5vw,18px)] text-[#080808]/80 leading-relaxed font-normal">
                Brand flagships, tactile spatial web applications, and editorial interactive platforms engineered for sensual human engagement and high retention.
              </p>
              <div className="flex flex-wrap gap-2 inter text-[clamp(11px,1.5vw,12px)] uppercase tracking-wider font-semibold text-[#080808]/60">
                <span>Spatial UI</span> • <span>WebGL Canvas</span> • <span>Kinetic Physics</span>
              </div>
            </div>
          </div>

          {/* Spatial Moment 02: INTELLIGENT SYSTEMS */}
          <div className="flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-4 sm:gap-6 lg:gap-16 max-w-4xl lg:ml-auto lg:pr-8">
            <div className="flex items-baseline gap-4">
              <span className="inter text-[clamp(11px,1.5vw,12px)] font-bold text-[#080808]/40 tracking-widest">02 /</span>
              <h3 className="big-shoulders text-[clamp(36px,7vw,70px)] font-bold tracking-tight text-[#080808] uppercase leading-[0.9]">
                Intelligent Systems
              </h3>
            </div>
            <div className="max-w-md pl-4 border-l border-[#080808]/20 space-y-3">
              <p className="inter text-[clamp(16px,2.5vw,18px)] text-[#080808]/80 leading-relaxed font-normal">
                Edge neural models, deterministic cognitive workflows, and sensor-driven hardware actuation that predict and respond to intent with zero friction.
              </p>
              <div className="flex flex-wrap gap-2 inter text-[clamp(11px,1.5vw,12px)] uppercase tracking-wider font-semibold text-[#080808]/60">
                <span>Local Inference</span> • <span>Sensor Fusion</span> • <span>Perimeter AI</span>
              </div>
            </div>
          </div>

          {/* Spatial Moment 03: SOFTWARE INFRASTRUCTURE */}
          <div className="flex flex-col lg:flex-row items-start lg:items-baseline justify-between gap-4 sm:gap-6 lg:gap-16 max-w-4xl lg:mx-auto">
            <div className="flex items-baseline gap-4">
              <span className="inter text-[clamp(11px,1.5vw,12px)] font-bold text-[#080808]/40 tracking-widest">03 /</span>
              <h3 className="big-shoulders text-[clamp(36px,7vw,70px)] font-bold tracking-tight text-[#080808] uppercase leading-[0.9]">
                Software Infrastructure
              </h3>
            </div>
            <div className="max-w-md pl-4 border-l border-[#080808]/20 space-y-3">
              <p className="inter text-[clamp(16px,2.5vw,18px)] text-[#080808]/80 leading-relaxed font-normal">
                CRDT-backed offline-first storage ledgers, micro-latency event brokers, and hardware-integrated POS & IoT operating systems built for zero downtime.
              </p>
              <div className="flex flex-wrap gap-2 inter text-[clamp(11px,1.5vw,12px)] uppercase tracking-wider font-semibold text-[#080808]/60">
                <span>CRDT Sync</span> • <span>Sub-ms Latency</span> • <span>Hardened Core</span>
              </div>
            </div>
          </div>
        </div>

        {/* Transition prompt toward Chapter 03 Gallery */}
        <div className="mt-28 pt-8 border-t border-[#080808]/15 flex items-center justify-between">
          <span className="inter text-[10px] font-semibold tracking-widest text-[#080808]/60 uppercase">
            APPROACHING: EXHIBITION GALLERY 03
          </span>
          <button
            onClick={() => {
              soundEngine.playThud();
              onSelectWork();
            }}
            onMouseEnter={() => setCursorState('view', 'GALLERY')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 inter text-[10px] font-bold tracking-[0.2em] text-[#080808] uppercase hover:opacity-75 transition-opacity cursor-pointer border-b border-[#080808] pb-0.5"
          >
            <span>ENTER EXHIBITION</span>
            <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>
    </motion.section>
  );
};
