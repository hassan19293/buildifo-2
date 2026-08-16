import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectData, CursorState } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { soundEngine } from '../utils/soundEngine';

interface Chapter03WorkProps {
  onSelectProject: (project: ProjectData) => void;
  setCursorState: (state: CursorState, text?: string) => void;
  onProceedToSystem: () => void;
  onHoverProject?: (index: number | null) => void;
}

export const Chapter03Work: React.FC<Chapter03WorkProps> = ({
  onSelectProject,
  setCursorState,
  onProceedToSystem,
  onHoverProject,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const p1Y = useTransform(scrollYProgress, [0.1, 0.45], [40, -30]);
  const p2X = useTransform(scrollYProgress, [0.35, 0.7], [-30, 20]);
  const p3Y = useTransform(scrollYProgress, [0.6, 0.95], [50, -40]);

  const handleHover = (id: string | null, idx: number | null) => {
    setHoveredProjectId(id);
    if (onHoverProject) {
      onHoverProject(idx);
    }
  };

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative min-h-[220vh] bg-[#141412]/85 text-[#F5F3EE] py-28 sm:py-36 overflow-hidden concrete-grain backdrop-blur-[2px]"
    >
      {/* Gallery Overhead Spotlights */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 pointer-events-none rounded-full blur-3xl opacity-20"
        style={{ background: 'radial-gradient(circle, #F5F3EE 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-96 h-96 pointer-events-none rounded-full blur-3xl opacity-15"
        style={{ background: 'radial-gradient(circle, #D97736 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* Chapter Wayfinding / Museum Wall Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-24">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5F3EE]">
              Chapter 03: Selected Work
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A6A39B]/70 mt-2 sm:mt-0">
            Material: Charcoal & Stone Plinths / Gallery Spotlights
          </div>
        </div>

        {/* EXHIBIT 01: THE GRILL HOUSE */}
        <div className="mb-24 sm:mb-36 lg:mb-48">
          {/* Desktop Layout (lg+) */}
          <motion.div
            style={{ y: p1Y }}
            className="hidden lg:grid lg:grid-cols-12 gap-12 items-end"
          >
            {/* Museum Wall Metadata Plaque */}
            <div className="lg:col-span-4 space-y-6">
              <div className="space-y-2 border-l-2 border-[#D97736] pl-4">
                <span className="inter text-[9px] tracking-[0.2em] text-[#D97736] uppercase font-bold">
                  Exhibit Plinth 01
                </span>
                <h3 className="big-shoulders text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[0].title}
                </h3>
              </div>

              {/* Museum Wall Text Table */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].materials}</span>
                </div>
              </div>

              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed pt-2">
                {PROJECTS_DATA[0].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[0]);
                }}
                onMouseEnter={() => setCursorState('view', 'INSPECT')}
                onMouseLeave={() => setCursorState('default')}
                className="group inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#D97736] hover:text-[#F5F3EE] transition-colors pt-2 cursor-pointer border-b border-[#D97736]/40 pb-0.5 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all" />
              </button>
            </div>

            {/* Mounted Gallery Artwork Crop */}
            <div
              className="lg:col-span-8 relative cursor-pointer"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[0]);
              }}
              onMouseEnter={() => {
                handleHover(PROJECTS_DATA[0].id, 0);
                setCursorState('view', 'VIEW');
              }}
              onMouseLeave={() => {
                handleHover(null, null);
                setCursorState('default');
              }}
            >
              <div className="relative overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl">
                <img
                  src={PROJECTS_DATA[0].heroImage}
                  alt={PROJECTS_DATA[0].title}
                  className={`w-full h-[400px] sm:h-[560px] object-cover transition-transform duration-700 ease-out ${
                    hoveredProjectId === PROJECTS_DATA[0].id ? 'scale-[1.025]' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                  <span>SCALE: {PROJECTS_DATA[0].dimensions}</span>
                  <span className="text-[#D97736]">TAG: 01-HOSPITALITY-SPATIAL</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile & Tablet Visual Moment (<lg) */}
          <div className="lg:hidden space-y-6">
            <div className="space-y-4">
              <div className="border-l-2 border-[#D97736] pl-4 space-y-1">
                <span className="inter text-[10px] tracking-[0.2em] text-[#D97736] uppercase font-bold">
                  Exhibit Plinth 01
                </span>
                <h3 className="big-shoulders text-[clamp(36px,8vw,52px)] font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[0].title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[0].materials}</span>
                </div>
              </div>
            </div>

            <div
              className="w-full aspect-[5/4] relative cursor-pointer overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[0]);
              }}
            >
              <img
                src={PROJECTS_DATA[0].heroImage}
                alt={PROJECTS_DATA[0].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                <span>SCALE: {PROJECTS_DATA[0].dimensions}</span>
                <span className="text-[#D97736]">01-HOSPITALITY</span>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed">
                {PROJECTS_DATA[0].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[0]);
                }}
                className="inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#D97736] hover:text-[#F5F3EE] transition-colors cursor-pointer border-b border-[#D97736]/40 pb-1 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current" />
              </button>
            </div>
          </div>
        </div>

        {/* EXHIBIT 02: SYNAPSE AI ENGINE */}
        <div className="mb-24 sm:mb-36 lg:mb-48">
          {/* Desktop Layout (lg+) */}
          <motion.div
            style={{ x: p2X }}
            className="hidden lg:grid lg:grid-cols-12 gap-12 items-center"
          >
            {/* Mounted Gallery Artwork Crop */}
            <div
              className="lg:col-span-7 relative cursor-pointer"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[1]);
              }}
              onMouseEnter={() => {
                handleHover(PROJECTS_DATA[1].id, 1);
                setCursorState('view', 'VIEW');
              }}
              onMouseLeave={() => {
                handleHover(null, null);
                setCursorState('default');
              }}
            >
              <div className="relative overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl">
                <img
                  src={PROJECTS_DATA[1].heroImage}
                  alt={PROJECTS_DATA[1].title}
                  className={`w-full h-[380px] sm:h-[500px] object-cover filter contrast-[1.1] transition-transform duration-700 ease-out ${
                    hoveredProjectId === PROJECTS_DATA[1].id ? 'scale-[1.025]' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                  <span>SPECS: {PROJECTS_DATA[1].dimensions}</span>
                  <span className="text-[#8C9BAE]">TAG: 02-EDGE-COMPUTE</span>
                </div>
              </div>
            </div>

            {/* Museum Wall Metadata Plaque */}
            <div className="lg:col-span-5 space-y-6 lg:pl-6">
              <div className="space-y-2 border-l-2 border-[#8C9BAE] pl-4">
                <span className="inter text-[9px] tracking-[0.2em] text-[#8C9BAE] uppercase font-bold">
                  Exhibit Plinth 02
                </span>
                <h3 className="big-shoulders text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[1].title}
                </h3>
              </div>

              {/* Museum Wall Text Table */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].materials}</span>
                </div>
              </div>

              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed pt-2">
                {PROJECTS_DATA[1].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[1]);
                }}
                onMouseEnter={() => setCursorState('view', 'INSPECT')}
                onMouseLeave={() => setCursorState('default')}
                className="group inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#8C9BAE] hover:text-[#F5F3EE] transition-colors pt-2 cursor-pointer border-b border-[#8C9BAE]/40 pb-0.5 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all" />
              </button>
            </div>
          </motion.div>

          {/* Mobile & Tablet Visual Moment (<lg) */}
          <div className="lg:hidden space-y-6">
            <div className="space-y-4">
              <div className="border-l-2 border-[#8C9BAE] pl-4 space-y-1">
                <span className="inter text-[10px] tracking-[0.2em] text-[#8C9BAE] uppercase font-bold">
                  Exhibit Plinth 02
                </span>
                <h3 className="big-shoulders text-[clamp(36px,8vw,52px)] font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[1].title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[1].materials}</span>
                </div>
              </div>
            </div>

            <div
              className="w-full aspect-[5/4] relative cursor-pointer overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[1]);
              }}
            >
              <img
                src={PROJECTS_DATA[1].heroImage}
                alt={PROJECTS_DATA[1].title}
                className="w-full h-full object-cover filter contrast-[1.1]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                <span>SPECS: {PROJECTS_DATA[1].dimensions}</span>
                <span className="text-[#8C9BAE]">02-EDGE-COMPUTE</span>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed">
                {PROJECTS_DATA[1].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[1]);
                }}
                className="inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#8C9BAE] hover:text-[#F5F3EE] transition-colors cursor-pointer border-b border-[#8C9BAE]/40 pb-1 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current" />
              </button>
            </div>
          </div>
        </div>

        {/* EXHIBIT 03: AURA RESTAURANT OS */}
        <div className="mb-24">
          {/* Desktop Layout (lg+) */}
          <motion.div
            style={{ y: p3Y }}
            className="hidden lg:grid lg:grid-cols-12 gap-12 items-end"
          >
            {/* Museum Wall Metadata Plaque */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-2 border-l-2 border-[#9E9484] pl-4">
                <span className="inter text-[9px] tracking-[0.2em] text-[#9E9484] uppercase font-bold">
                  Exhibit Plinth 03
                </span>
                <h3 className="big-shoulders text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[2].title}
                </h3>
              </div>

              {/* Museum Wall Text Table */}
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 pt-4 border-t border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].materials}</span>
                </div>
              </div>

              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed pt-2">
                {PROJECTS_DATA[2].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[2]);
                }}
                onMouseEnter={() => setCursorState('view', 'INSPECT')}
                onMouseLeave={() => setCursorState('default')}
                className="group inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#9E9484] hover:text-[#F5F3EE] transition-colors pt-2 cursor-pointer border-b border-[#9E9484]/40 pb-0.5 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all" />
              </button>
            </div>

            {/* Mounted Gallery Artwork Crop */}
            <div
              className="lg:col-span-7 relative cursor-pointer"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[2]);
              }}
              onMouseEnter={() => {
                handleHover(PROJECTS_DATA[2].id, 2);
                setCursorState('view', 'VIEW');
              }}
              onMouseLeave={() => {
                handleHover(null, null);
                setCursorState('default');
              }}
            >
              <div className="relative overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl">
                <img
                  src={PROJECTS_DATA[2].heroImage}
                  alt={PROJECTS_DATA[2].title}
                  className={`w-full h-[400px] sm:h-[520px] object-cover transition-transform duration-700 ease-out ${
                    hoveredProjectId === PROJECTS_DATA[2].id ? 'scale-[1.025]' : 'scale-100'
                  }`}
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                  <span>SCALE: {PROJECTS_DATA[2].dimensions}</span>
                  <span className="text-[#9E9484]">TAG: 03-KITCHEN-CORE</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Mobile & Tablet Visual Moment (<lg) */}
          <div className="lg:hidden space-y-6">
            <div className="space-y-4">
              <div className="border-l-2 border-[#9E9484] pl-4 space-y-1">
                <span className="inter text-[10px] tracking-[0.2em] text-[#9E9484] uppercase font-bold">
                  Exhibit Plinth 03
                </span>
                <h3 className="big-shoulders text-[clamp(36px,8vw,52px)] font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
                  {PROJECTS_DATA[2].title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-3 border-y border-white/10 inter text-[10px] uppercase font-semibold text-[#A6A39B]">
                <div>
                  <span className="block opacity-40 text-[9px]">DISCIPLINE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].discipline}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">YEAR</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].year}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">ROLE</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].role}</span>
                </div>
                <div>
                  <span className="block opacity-40 text-[9px]">MATERIALS</span>
                  <span className="text-[#F5F3EE]">{PROJECTS_DATA[2].materials}</span>
                </div>
              </div>
            </div>

            <div
              className="w-full aspect-[5/4] relative cursor-pointer overflow-hidden bg-[#0c0c0a] border border-white/10 shadow-2xl"
              onClick={() => {
                soundEngine.playThud();
                onSelectProject(PROJECTS_DATA[2]);
              }}
            >
              <img
                src={PROJECTS_DATA[2].heroImage}
                alt={PROJECTS_DATA[2].title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between inter text-[9px] text-[#A6A39B] tracking-widest uppercase font-semibold">
                <span>SCALE: {PROJECTS_DATA[2].dimensions}</span>
                <span className="text-[#9E9484]">03-KITCHEN-CORE</span>
              </div>
            </div>

            <div className="space-y-4 pt-1">
              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed">
                {PROJECTS_DATA[2].summary}
              </p>

              <button
                onClick={() => {
                  soundEngine.playThud();
                  onSelectProject(PROJECTS_DATA[2]);
                }}
                className="inline-flex items-center gap-3 inter text-[10px] tracking-[0.2em] uppercase font-bold text-[#9E9484] hover:text-[#F5F3EE] transition-colors cursor-pointer border-b border-[#9E9484]/40 pb-1 min-h-[44px]"
              >
                <span>OPEN CURATOR DOSSIER</span>
                <span className="w-4 h-[1px] bg-current" />
              </button>
            </div>
          </div>
        </div>

        {/* Transition prompt to Chapter 04 System */}
        <div className="pt-8 border-t border-white/10 flex items-center justify-between">
          <span className="inter text-[10px] font-semibold tracking-widest text-[#A6A39B] uppercase">
            NEXT ENVIRONMENT: INDUSTRIAL MACHINE SPACE 04
          </span>
          <button
            onClick={() => {
              soundEngine.playClick(700);
              onProceedToSystem();
            }}
            onMouseEnter={() => setCursorState('inspect', 'MACHINE')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 inter text-[10px] font-bold tracking-[0.2em] text-[#F5F3EE] uppercase hover:text-[#C8FF00] transition-colors cursor-pointer border-b border-white/20 pb-0.5"
          >
            <span>INSPECT SYSTEM STACK</span>
            <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
