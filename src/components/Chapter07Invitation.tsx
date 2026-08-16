import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface Chapter07InvitationProps {
  onOpenInquiry: () => void;
  setCursorState: (state: CursorState, text?: string) => void;
  onReturnToStart: () => void;
}

export const Chapter07Invitation: React.FC<Chapter07InvitationProps> = ({
  onOpenInquiry,
  setCursorState,
  onReturnToStart,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const textScale = useTransform(scrollYProgress, [0.2, 0.8], [0.95, 1.05]);
  const lightBloom = useTransform(scrollYProgress, [0.4, 0.9], [0.3, 0.75]);

  return (
    <section
      id="invitation"
      ref={containerRef}
      className="relative min-h-[150vh] bg-[#F5F3EE]/85 text-[#080808] py-28 sm:py-36 overflow-hidden paper-grain backdrop-blur-[2px]"
    >
      {/* Massive Architectural Portal of Warm Daylight (Visual Bookend) */}
      <motion.div
        style={{
          opacity: lightBloom,
          background: 'radial-gradient(ellipse 90% 70% at 50% 30%, rgba(255, 255, 255, 0.95) 0%, rgba(245, 243, 238, 0.2) 65%, transparent 100%)',
        }}
        className="absolute inset-0 pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-between min-h-[120vh]">
        {/* Chapter Header Microtype */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#080808]/15 pb-6 mb-16 sm:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_8px_#C8FF00]" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#080808]">
              Chapter 07: Invitation
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold opacity-50 mt-2 sm:mt-0">
            Material: Architectural Glass, Exterior Daylight & Open Horizon
          </div>
        </div>

        {/* Monumental Integrated Architectural Typography: LET'S BUILD SOMETHING. */}
        {/* Desktop View (lg+) */}
        <motion.div style={{ scale: textScale }} className="hidden lg:block my-auto py-12">
          <div className="space-y-0 select-none">
            <div className="overflow-hidden">
              <span className="block big-shoulders text-[12vw] font-black leading-[0.82] tracking-tighter text-[#080808] uppercase">
                LET&apos;S
              </span>
            </div>
            <div className="overflow-hidden">
              <span className="block big-shoulders text-[12vw] font-black leading-[0.82] tracking-tighter text-[#080808] uppercase">
                BUILD
              </span>
            </div>
            <div className="overflow-hidden flex flex-row items-baseline justify-between gap-6 flex-wrap">
              <span className="block big-shoulders text-[12vw] font-black leading-[0.82] tracking-tighter text-[#080808] uppercase">
                SOMETHING.
              </span>

              {/* Spatial Action Trigger & Briefing Channel */}
              <div className="max-w-md pb-12">
                <p className="inter text-base sm:text-lg text-[#080808]/80 leading-relaxed font-normal mb-6">
                  We accept a strictly limited number of architectural technology and system commissions per year. Every engagement receives total studio focus.
                </p>

                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      soundEngine.playThud();
                      onOpenInquiry();
                    }}
                    onMouseEnter={() => setCursorState('enter', 'COMMISSION')}
                    onMouseLeave={() => setCursorState('default')}
                    className="px-6 py-3.5 bg-[#080808] text-[#F5F3EE] inter text-[11px] uppercase tracking-[0.2em] font-bold hover:bg-[#201e1a] transition-all flex items-center justify-between gap-4 cursor-pointer shadow-lg min-h-[44px]"
                  >
                    <span>INITIATE COMMISSION BRIEF</span>
                    <span className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
                  </button>

                  <a
                    href="mailto:contact@buildifo.com"
                    onMouseEnter={() => setCursorState('view', 'EMAIL')}
                    onMouseLeave={() => setCursorState('default')}
                    className="px-6 py-3.5 border border-[#080808]/30 text-[#080808] inter text-[11px] uppercase tracking-[0.2em] font-bold hover:border-[#080808] hover:bg-[#080808]/5 transition-colors text-center cursor-pointer min-h-[44px] flex items-center"
                  >
                    DIRECT STUDIO DISPATCH
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Mobile & Tablet One-Column Flow (<lg) */}
        <div className="lg:hidden my-auto py-8 space-y-8">
          <div className="space-y-0 select-none">
            <span className="block big-shoulders text-[clamp(54px,14vw,84px)] font-black leading-[0.85] tracking-tighter text-[#080808] uppercase">
              LET&apos;S
            </span>
            <span className="block big-shoulders text-[clamp(54px,14vw,84px)] font-black leading-[0.85] tracking-tighter text-[#080808] uppercase">
              BUILD
            </span>
            <span className="block big-shoulders text-[clamp(54px,14vw,84px)] font-black leading-[0.85] tracking-tighter text-[#080808] uppercase">
              SOMETHING.
            </span>
          </div>

          <p className="inter text-sm sm:text-base text-[#080808]/80 leading-relaxed font-normal">
            We accept a strictly limited number of architectural technology and system commissions per year. Every engagement receives total studio focus.
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={() => {
                soundEngine.playThud();
                onOpenInquiry();
              }}
              className="w-full h-14 bg-[#080808] text-[#F5F3EE] inter text-xs uppercase tracking-[0.2em] font-bold hover:bg-[#201e1a] transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
            >
              <span>INITIATE COMMISSION BRIEF</span>
              <span className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
            </button>

            <a
              href="mailto:contact@buildifo.com"
              className="w-full h-14 border border-[#080808]/30 text-[#080808] inter text-xs uppercase tracking-[0.2em] font-bold hover:border-[#080808] hover:bg-[#080808]/5 transition-colors flex items-center justify-center cursor-pointer"
            >
              DIRECT STUDIO DISPATCH
            </a>
          </div>
        </div>

        {/* Studio Coordinates & Architectural Ledger Footer */}
        <div className="pt-16 pb-8 border-t border-[#080808]/15 mt-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center sm:text-left inter text-xs text-[#080808]/70 uppercase tracking-wider mb-12">
            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#080808]/40 block mb-1">ATELIER BASE</span>
              <span className="font-bold text-[#080808] block">Islamabad, Pakistan</span>
              <span className="text-[10px] opacity-70 block font-mono-tech">33.6844° N, 73.0479° E</span>
            </div>

            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#080808]/40 block mb-1">GLOBAL DISPATCH</span>
              <span className="font-bold text-[#080808] block">London / New York / Berlin</span>
              <span className="text-[10px] opacity-70 block font-mono-tech">52.5200° N, 13.4050° E</span>
            </div>

            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#080808]/40 block mb-1">CURRENT STATUS</span>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-0.5">
                <div className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_4px_#C8FF00]" />
                <span className="font-bold text-[#080808]">Accepting Q3/Q4 Briefs</span>
              </div>
              <span className="text-[10px] opacity-70 block">2 Available Comm Slots</span>
            </div>

            <div>
              <span className="text-[9px] font-bold tracking-widest text-[#080808]/40 block mb-1">WAYFINDING</span>
              <button
                onClick={() => {
                  soundEngine.playClick(600);
                  onReturnToStart();
                }}
                onMouseEnter={() => setCursorState('view', 'TOP')}
                onMouseLeave={() => setCursorState('default')}
                className="text-[#080808] hover:opacity-60 transition-opacity font-bold cursor-pointer border-b-2 border-[#080808] pb-0.5 min-h-[44px]"
              >
                RETURN TO 01 THRESHOLD ↑
              </button>
            </div>
          </div>

          <footer className="pt-6 border-t border-[#080808]/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left inter text-[10px] uppercase tracking-[0.2em] font-semibold opacity-40">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
              <span>Studio Coordinates: 52.5200° N, 13.4050° E</span>
              <span className="hidden sm:inline opacity-30">|</span>
              <span>Project Index 2026</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Scroll through space</span>
              <div className="w-[1px] h-3 bg-[#080808] opacity-30" />
              <span>Press Release 24/07</span>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
