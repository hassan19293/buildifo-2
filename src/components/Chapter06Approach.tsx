import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { PROCESS_STAGES } from '../data/processWall';
import { ProcessStageData, CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Chapter06ApproachProps {
  setCursorState: (state: CursorState, text?: string) => void;
  onProceedToInvitation: () => void;
}

export const Chapter06Approach: React.FC<Chapter06ApproachProps> = ({
  setCursorState,
  onProceedToInvitation,
}) => {
  const [activeStage, setActiveStage] = useState<ProcessStageData>(PROCESS_STAGES[0]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleSelectStage = (stage: ProcessStageData) => {
    soundEngine.playPaper();
    setActiveStage(stage);
  };

  const scrollWall = (direction: 'left' | 'right') => {
    soundEngine.playClick(800);
    if (!scrollContainerRef.current) return;
    const offset = direction === 'left' ? -350 : 350;
    scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      id="approach"
      className="relative min-h-[150vh] bg-[#DDD6C8]/90 text-[#1E1C1A] py-28 sm:py-36 overflow-hidden paper-grain backdrop-blur-[2px]"
    >
      {/* Soft Directional Natural Daylight from Top Left */}
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40"
        style={{
          background: 'linear-gradient(115deg, rgba(255, 255, 255, 0.7) 0%, rgba(221, 214, 200, 0.1) 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* Chapter Header Microtype */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-[#1E1C1A]/15 pb-6 mb-16 sm:mb-20">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#1E1C1A] inline-block" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#1E1C1A]">
              Chapter 06: Process Wall
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#1E1C1A]/60 mt-2 sm:mt-0">
            Material: Pinned Tracing Paper, Ink Annotations & Cork Wall
          </div>
        </div>

        {/* Section Intro & Wall Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <h2 className="big-shoulders text-[clamp(36px,8vw,60px)] font-black tracking-tight text-[#1E1C1A] uppercase leading-[0.95]">
              The Pin-Up Wall.
            </h2>
            <p className="inter text-sm sm:text-base text-[#1E1C1A]/80 mt-3 leading-relaxed font-normal">
              Six physical points along our design and engineering lifecycle. Walk the wall, inspect field sketches, and read live workshop margin annotations.
            </p>
          </div>

          {/* Desktop Navigation Controls */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={() => scrollWall('left')}
              onMouseEnter={() => setCursorState('view', 'PREV')}
              onMouseLeave={() => setCursorState('default')}
              className="p-3 border border-[#1E1C1A]/20 hover:border-[#1E1C1A] transition-colors cursor-pointer bg-white/40 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4 text-[#1E1C1A]" />
            </button>
            <button
              onClick={() => scrollWall('right')}
              onMouseEnter={() => setCursorState('view', 'NEXT')}
              onMouseLeave={() => setCursorState('default')}
              className="p-3 border border-[#1E1C1A]/20 hover:border-[#1E1C1A] transition-colors cursor-pointer bg-white/40 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4 text-[#1E1C1A]" />
            </button>
          </div>
        </div>

        {/* Desktop Pinboard: Horizontal Lateral Panning Track (lg+) */}
        <div
          ref={scrollContainerRef}
          className="hidden lg:flex gap-8 overflow-x-auto pb-8 pt-4 no-scrollbar scroll-smooth select-none cursor-grab active:cursor-grabbing"
        >
          {PROCESS_STAGES.map((stage) => {
            const isCurrent = activeStage.id === stage.id;

            return (
              <motion.div
                key={stage.id}
                onClick={() => handleSelectStage(stage)}
                onMouseEnter={() => setCursorState('view', stage.title)}
                onMouseLeave={() => setCursorState('default')}
                animate={{
                  y: isCurrent ? -8 : 0,
                }}
                className={`flex-shrink-0 w-[360px] bg-[#F5F1E9] p-6 border transition-all duration-300 relative shadow-md ${
                  isCurrent
                    ? 'border-[#1E1C1A] shadow-xl'
                    : 'border-[#1E1C1A]/15 opacity-80 hover:opacity-100 hover:border-[#1E1C1A]/40'
                }`}
              >
                {/* Physical Push-Pin Graphic Element */}
                <div className="absolute -top-2.5 left-8 w-5 h-5 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1E1C1A] shadow-sm border border-white/60" />
                </div>

                {/* Stage Header */}
                <div className="flex items-start justify-between border-b border-[#1E1C1A]/10 pb-4 mb-4">
                  <div>
                    <span className="inter text-[9px] tracking-[0.2em] text-[#7D766C] uppercase font-bold">
                      STAGE {stage.step} / 06
                    </span>
                    <h3 className="big-shoulders text-3xl font-black tracking-tight text-[#1E1C1A] uppercase mt-0.5">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="inter text-[9px] uppercase text-[#7D766C] font-semibold tracking-wider text-right">
                    {stage.materialTone}
                  </span>
                </div>

                {/* Pinned Artifact Photo Crop */}
                <div className="relative overflow-hidden mb-4 border border-[#1E1C1A]/10 bg-[#E8E1D3]">
                  <img
                    src={stage.sketchUrl}
                    alt={stage.title}
                    className="w-full h-44 object-cover filter contrast-[1.05]"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#1E1C1A]/90 text-[#F5F3EE] text-[8px] inter uppercase tracking-widest font-bold">
                    {stage.artifactType}
                  </div>
                </div>

                {/* Stage Field Notes */}
                <p className="inter text-xs text-[#1E1C1A]/85 leading-relaxed mb-4">
                  {stage.fieldNotes}
                </p>

                {/* Margin Ink Annotations */}
                <div className="pt-3 border-t border-[#1E1C1A]/10 space-y-1.5">
                  <div className="inter text-[8px] font-bold tracking-widest text-[#7D766C] uppercase">
                    FIELD MARGIN NOTES:
                  </div>
                  {stage.annotations.map((ann, aIdx) => (
                    <div
                      key={aIdx}
                      className="inter text-[10px] text-[#1E1C1A]/80 flex items-start gap-1.5"
                    >
                      <span className="text-[#7D766C] font-bold">•</span>
                      <span>{ann}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile & Tablet Vertical Pinboard (<lg) */}
        <div className="lg:hidden space-y-8 mb-12">
          {PROCESS_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="w-full bg-[#F5F1E9] p-6 border border-[#1E1C1A]/20 relative shadow-md space-y-4"
            >
              <div className="absolute -top-2.5 left-6 w-5 h-5 flex items-center justify-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#1E1C1A] shadow-sm border border-white/60" />
              </div>

              <div className="absolute -top-2 right-6 w-12 h-4 bg-[#E0D8C8]/80 rotate-2 border-t border-b border-[#1E1C1A]/10" />

              <div className="flex items-start justify-between border-b border-[#1E1C1A]/10 pb-3">
                <div>
                  <span className="inter text-[10px] tracking-[0.2em] text-[#7D766C] uppercase font-bold">
                    STAGE {stage.step} / 06
                  </span>
                  <h3 className="big-shoulders text-3xl font-black tracking-tight text-[#1E1C1A] uppercase mt-0.5">
                    {stage.title}
                  </h3>
                </div>
                <span className="inter text-[10px] uppercase text-[#7D766C] font-semibold tracking-wider text-right">
                  {stage.materialTone}
                </span>
              </div>

              <div className="relative aspect-[16/10] overflow-hidden border border-[#1E1C1A]/10 bg-[#E8E1D3]">
                <img
                  src={stage.sketchUrl}
                  alt={stage.title}
                  className="w-full h-full object-cover filter contrast-[1.05]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-[#1E1C1A]/90 text-[#F5F3EE] text-[9px] inter uppercase tracking-widest font-bold">
                  {stage.artifactType}
                </div>
              </div>

              <p className="inter text-xs sm:text-sm text-[#1E1C1A]/85 leading-relaxed">
                {stage.fieldNotes}
              </p>

              <div className="pt-3 border-t border-[#1E1C1A]/10 space-y-1.5">
                <div className="inter text-[9px] font-bold tracking-widest text-[#7D766C] uppercase">
                  FIELD MARGIN NOTES:
                </div>
                {stage.annotations.map((ann, aIdx) => (
                  <div
                    key={aIdx}
                    className="inter text-xs text-[#1E1C1A]/80 flex items-start gap-2"
                  >
                    <span className="text-[#7D766C] font-bold">•</span>
                    <span>{ann}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Transition prompt to Chapter 07 Exit / Invitation */}
        <div className="mt-20 pt-8 border-t border-[#1E1C1A]/15 flex items-center justify-between">
          <span className="inter text-[10px] font-semibold tracking-widest text-[#1E1C1A]/60 uppercase">
            MOVING TO: ARCHITECTURAL PORTAL 07 (DAYLIGHT EXIT)
          </span>
          <button
            onClick={() => {
              soundEngine.playClick(900);
              onProceedToInvitation();
            }}
            onMouseEnter={() => setCursorState('enter', 'EXIT')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 inter text-[10px] font-bold tracking-[0.2em] text-[#1E1C1A] uppercase hover:opacity-75 transition-opacity cursor-pointer border-b border-[#1E1C1A]/30 pb-0.5"
          >
            <span>STEP INTO DAYLIGHT</span>
            <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
