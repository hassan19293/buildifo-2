import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight } from 'lucide-react';
import { ProjectData, CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ProjectModalProps {
  project: ProjectData | null;
  onClose: () => void;
  setCursorState: (state: CursorState, text?: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  setCursorState,
}) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808]/90 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playClick(600);
            onClose();
          }}
          className="fixed inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-3xl min-h-screen bg-[#121210] text-[#F5F3EE] border-l border-white/15 p-6 sm:p-12 z-10 shadow-2xl overflow-y-auto"
        >
          {/* Close Action Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: project.accentColor }} />
              <span className="text-[10px] font-mono-tech tracking-widest text-[#A6A39B] uppercase">
                EXHIBITION CURATOR FILE / {project.year}
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick(500);
                onClose();
              }}
              onMouseEnter={() => setCursorState('close', 'CLOSE')}
              onMouseLeave={() => setCursorState('default')}
              className="p-2 border border-white/15 hover:border-white/40 text-[#F5F3EE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Project Title & Metadata */}
          <div className="space-y-4 mb-10">
            <h2 className="big-shoulders text-4xl sm:text-6xl font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.9]">
              {project.title}
            </h2>
            <div className="inter text-xs text-[#A6A39B] uppercase font-semibold tracking-wider">
              CLIENT: <span className="text-[#F5F3EE] font-bold">{project.client}</span>
            </div>
          </div>

          {/* Primary Hero Image Crop */}
          <div className="mb-10 border border-white/10 overflow-hidden shadow-2xl">
            <img
              src={project.heroImage}
              alt={project.title}
              className="w-full h-80 object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Core Summary & Solution */}
          <div className="space-y-8 mb-12 inter text-sm sm:text-base leading-relaxed text-[#A6A39B]">
            <div>
              <h4 className="inter text-[10px] font-bold tracking-[0.2em] text-[#F5F3EE] uppercase mb-2">
                THE SPATIAL CHALLENGE
              </h4>
              <p className="text-xs sm:text-sm text-[#A6A39B] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div>
              <h4 className="inter text-[10px] font-bold tracking-[0.2em] text-[#F5F3EE] uppercase mb-2">
                THE ARCHITECTURAL SOLUTION
              </h4>
              <p className="text-xs sm:text-sm text-[#A6A39B] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Secondary Imagery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            <div className="border border-white/10 overflow-hidden">
              <img
                src={project.secondaryImage}
                alt="Secondary project angle"
                className="w-full h-52 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2 bg-[#0c0c0b] inter text-[9px] font-semibold text-[#A6A39B] uppercase tracking-widest">
                FIG. A — TACTILE INTERFACE DETAIL
              </div>
            </div>
            <div className="border border-white/10 overflow-hidden">
              <img
                src={project.detailImage}
                alt="Detail project angle"
                className="w-full h-52 object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="p-2 bg-[#0c0c0b] inter text-[9px] font-semibold text-[#A6A39B] uppercase tracking-widest">
                FIG. B — PHYSICAL MATERIAL GRAIN
              </div>
            </div>
          </div>

          {/* Stats & Benchmarks */}
          {project.stats && (
            <div className="mb-10 pt-6 border-t border-white/10">
              <h4 className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase mb-4">
                PHYSICAL RUNTIME BENCHMARKS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.stats.map((s, idx) => (
                  <div key={idx} className="bg-[#0c0c0b] p-4 border border-white/10">
                    <span className="inter text-[9px] font-bold text-[#A6A39B] uppercase block">
                      {s.label}
                    </span>
                    <span className="text-base font-mono-tech font-bold text-[#F5F3EE] block mt-1">
                      {s.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap gap-2">
            {project.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 bg-[#181816] text-[#A6A39B] border border-white/10 inter text-[9px] font-bold tracking-wider uppercase"
              >
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
