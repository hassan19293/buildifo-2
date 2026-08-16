import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface Chapter05StudioProps {
  setCursorState: (state: CursorState, text?: string) => void;
  onProceedToApproach: () => void;
}

export const Chapter05Studio: React.FC<Chapter05StudioProps> = ({
  setCursorState,
  onProceedToApproach,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const subtleDrift = useTransform(scrollYProgress, [0, 1], [-15, 15]);

  return (
    <section
      id="studio"
      ref={sectionRef}
      className="relative min-h-[140vh] bg-[#ECE7DC]/90 text-[#1E1C1A] py-28 sm:py-36 overflow-hidden paper-grain backdrop-blur-[2px]"
    >
      {/* Warm Table Lamp Ambient Radiance */}
      <div
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] pointer-events-none rounded-full blur-3xl opacity-35"
        style={{ background: 'radial-gradient(circle, #F5D7A1 0%, rgba(236, 231, 220, 0) 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* Chapter Header Microtype */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1E1C1A]/15 pb-6 mb-16 sm:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#1E1C1A] inline-block" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#1E1C1A]">
              Chapter 05: The Physical Atelier
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1E1C1A]/60 mt-2 sm:mt-0">
            Material: Oiled Oak, Linen, Printed Proofs & Low Halogen
          </div>
        </div>

        {/* Desktop View (lg+) */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-16 items-center mb-24">
          {/* Left Column: Intimate Manifesto & Physical Philosophy */}
          <div className="lg:col-span-5 space-y-6">
            <span className="inter text-[9px] font-bold tracking-[0.2em] text-[#7D766C] uppercase block">
              HUMAN HANDS & COMPUTATION
            </span>
            <h2 className="big-shoulders text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#1E1C1A] uppercase leading-[0.95]">
              We work with books, physical materials, and silent code.
            </h2>
            <div className="space-y-4 inter text-sm sm:text-base text-[#1E1C1A]/80 leading-relaxed font-normal">
              <p>
                Our Islamabad studio is an architectural workshop before it is a software house. We examine paper weights, test physical switch resistances, debate typographic kerning under 3000K warm lamps, and prototype with wood joinery before compiling a single line of production code.
              </p>
              <p className="text-xs sm:text-sm text-[#7D766C] leading-relaxed italic border-l-2 border-[#1E1C1A]/20 pl-4">
                “When software respects the quiet physical world, technology ceases to be an intrusion and becomes an enduring material artifact.”
              </p>
            </div>

            {/* Studio Principles */}
            <div className="pt-6 border-t border-[#1E1C1A]/10 grid grid-cols-2 gap-4 inter text-xs text-[#1E1C1A]/80">
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">PRACTICE</span>
                <span className="font-bold block">Aesthetic Rigor</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">SCALE</span>
                <span className="font-bold block">Selective Commissions</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">OUTPUT</span>
                <span className="font-bold block">Museum & Enterprise Grade</span>
              </div>
              <div className="space-y-1">
                <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">DISCIPLINE</span>
                <span className="font-bold block">Zero Generic AI Bloat</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Photography of Physical Books, Wood & Studio Objects */}
          <div className="lg:col-span-7 relative">
            <motion.div
              style={{ y: subtleDrift }}
              className="relative shadow-2xl border border-[#1E1C1A]/10 overflow-hidden bg-[#ded6c7]"
              onMouseEnter={() => setCursorState('view', 'ATELIER')}
              onMouseLeave={() => setCursorState('default')}
            >
              <img
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85"
                alt="Editorial physical studio with open books, natural oak table, paper notebooks and quiet lighting"
                className="w-full h-[440px] sm:h-[540px] object-cover filter contrast-[1.03] brightness-[0.98] hover:scale-[1.015] transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#1E1C1A]/70 via-[#1E1C1A]/30 to-transparent text-[#F5F3EE] flex justify-between items-end inter text-[10px] uppercase font-semibold">
                <span className="tracking-widest">
                  ATELIER TABLE ARCHIVE / ISLAMABAD
                </span>
                <span className="tracking-widest text-[#F5F3EE]/80">
                  NATURAL LIGHT & TACTILE PROOFS
                </span>
              </div>
            </motion.div>

            {/* Overlapping Secondary Material Proof Crop */}
            <div className="hidden sm:block absolute -bottom-10 -left-10 w-48 h-48 bg-[#DED6C7] p-2 border border-[#1E1C1A]/15 shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=500&q=80"
                alt="Material swatch proof"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>

        {/* Mobile & Tablet Vertical Storytelling Flow (<lg) */}
        <div className="lg:hidden space-y-12 mb-20">
          <div className="space-y-6">
            <span className="inter text-[10px] font-bold tracking-[0.2em] text-[#7D766C] uppercase block">
              HUMAN HANDS & COMPUTATION
            </span>
            <h2 className="big-shoulders text-[clamp(36px,8vw,56px)] font-black tracking-tight text-[#1E1C1A] uppercase leading-[0.95]">
              We work with books, physical materials, and silent code.
            </h2>
            <div className="space-y-4 inter text-sm sm:text-base text-[#1E1C1A]/80 leading-relaxed font-normal">
              <p>
                Our Islamabad studio is an architectural workshop before it is a software house. We examine paper weights, test physical switch resistances, debate typographic kerning under 3000K warm lamps, and prototype with wood joinery before compiling a single line of production code.
              </p>
              <p className="text-xs sm:text-sm text-[#7D766C] leading-relaxed italic border-l-2 border-[#1E1C1A]/20 pl-4">
                “When software respects the quiet physical world, technology ceases to be an intrusion and becomes an enduring material artifact.”
              </p>
            </div>
          </div>

          <div className="w-full aspect-[16/10] sm:aspect-[16/9] relative shadow-2xl border border-[#1E1C1A]/10 overflow-hidden bg-[#ded6c7]">
            <img
              src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1600&q=85"
              alt="Editorial physical studio"
              className="w-full h-full object-cover filter contrast-[1.03] brightness-[0.98]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-[#1E1C1A]/75 via-[#1E1C1A]/35 to-transparent text-[#F5F3EE] flex justify-between items-end inter text-[9px] uppercase font-semibold">
              <span className="tracking-widest">ATELIER ARCHIVE / ISLAMABAD</span>
              <span className="tracking-widest text-[#F5F3EE]/80">TACTILE PROOFS</span>
            </div>
          </div>

          {/* Horizontal Smooth Momentum Material Swatches */}
          <div className="space-y-3">
            <div className="flex items-center justify-between inter text-[9px] font-bold tracking-widest text-[#7D766C] uppercase">
              <span>PHYSICAL MATERIAL SWATCHES</span>
              <span className="text-[#1E1C1A]/60">SWIPE TO EXPLORE →</span>
            </div>

            <div className="flex gap-4 overflow-x-auto pb-4 pt-1 -mx-6 px-6 no-scrollbar snap-x snap-mandatory">
              {[
                { name: 'Oiled Oak Plinth', spec: '24mm Solid European Oak', tag: 'MAT-01' },
                { name: 'Parchment Cotton', spec: '350gsm Rough Press', tag: 'MAT-02' },
                { name: 'Cold-Rolled Steel', spec: 'Carbonized 4mm Plate', tag: 'MAT-03' },
                { name: 'Low Halogen 3000K', spec: 'CRI 98 Studio Luminaire', tag: 'MAT-04' },
                { name: 'Brushed Concrete', spec: 'Aggregate Architectural Cast', tag: 'MAT-05' },
              ].map((swatch, idx) => (
                <div
                  key={idx}
                  className="shrink-0 w-64 p-4 bg-[#E2DBD0] border border-[#1E1C1A]/15 shadow-sm snap-start space-y-2 select-none"
                >
                  <div className="flex items-center justify-between inter text-[9px] font-mono-tech uppercase text-[#7D766C]">
                    <span>{swatch.tag}</span>
                    <span className="w-2 h-2 rounded-full bg-[#1E1C1A]" />
                  </div>
                  <h4 className="big-shoulders text-2xl font-bold uppercase text-[#1E1C1A] tracking-tight">
                    {swatch.name}
                  </h4>
                  <p className="inter text-xs text-[#1E1C1A]/70">{swatch.spec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Single-Column Artifact Gallery */}
          <div className="space-y-4 pt-4 border-t border-[#1E1C1A]/15">
            <span className="inter text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">
              STUDIO ARTIFACT GALLERY
            </span>
            <div className="space-y-6">
              <div className="w-full aspect-[16/9] relative border border-[#1E1C1A]/15 shadow-md overflow-hidden bg-[#DED6C7]">
                <img
                  src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1000&q=80"
                  alt="Material proof print"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-3 text-[9px] font-mono-tech uppercase text-[#1E1C1A] bg-[#F5F3EE]/90 px-2 py-0.5">
                  ARTIFACT 01 // PRESS PROOF 1:1
                </div>
              </div>
            </div>
          </div>

          {/* Studio Principles */}
          <div className="pt-6 border-t border-[#1E1C1A]/15 grid grid-cols-2 gap-4 inter text-xs text-[#1E1C1A]/80">
            <div className="space-y-1">
              <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">PRACTICE</span>
              <span className="font-bold block">Aesthetic Rigor</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">SCALE</span>
              <span className="font-bold block">Selective Commissions</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">OUTPUT</span>
              <span className="font-bold block">Museum Grade</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] font-bold tracking-widest text-[#7D766C] uppercase block">DISCIPLINE</span>
              <span className="font-bold block">Zero AI Bloat</span>
            </div>
          </div>
        </div>

        {/* Transition prompt toward Chapter 06 Process Wall */}
        <div className="pt-8 border-t border-[#1E1C1A]/15 flex items-center justify-between">
          <span className="inter text-[10px] font-semibold tracking-widest text-[#1E1C1A]/60 uppercase">
            MOVING TO: PHYSICAL PROCESS PIN-UP WALL 06
          </span>
          <button
            onClick={() => {
              soundEngine.playPaper();
              onProceedToApproach();
            }}
            onMouseEnter={() => setCursorState('view', 'WALL')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 inter text-[10px] font-bold tracking-[0.2em] text-[#1E1C1A] uppercase hover:opacity-75 transition-opacity cursor-pointer border-b border-[#1E1C1A]/30 pb-0.5"
          >
            <span>INSPECT PROCESS WALL</span>
            <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
