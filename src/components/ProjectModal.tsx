import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';
import { X, ExternalLink, CheckCircle, Sparkles, ArrowRight, ShieldCheck, Cpu, Layers } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenContact: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenContact }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'states' | 'tech'>('overview');

  useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playTick(600);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-4xl bg-black/60 border border-white/15 rounded-3xl shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl overflow-hidden z-10 my-8"
        >
          {/* Header Image & Close Button */}
          <div className="relative aspect-[21/9] w-full bg-black">
            <img
              src={project.heroImage}
              alt={project.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 text-white transition-colors backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title Overlay */}
            <div className="absolute bottom-4 left-6 sm:left-8 right-6">
              <span className="text-xs font-mono text-zinc-300 bg-white/[0.08] px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                {project.number} • {project.category}
              </span>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-white mt-2">
                {project.title}
              </h2>
            </div>
          </div>

          {/* Modal Navigation Tabs */}
          <div className="flex border-b border-white/10 px-6 sm:px-8 bg-white/[0.02]">
            {(['overview', 'states', 'tech'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  soundFx.playTick(1000);
                  setActiveTab(tab);
                }}
                className={`py-3.5 px-4 text-xs font-mono font-medium transition-colors border-b-2 capitalize ${
                  activeTab === tab
                    ? 'text-white border-[#FF4E00] font-bold'
                    : 'text-zinc-400 border-transparent hover:text-white'
                }`}
              >
                {tab === 'overview' ? 'Project Brief' : tab === 'states' ? 'Evolution Stages' : 'Stack & Architecture'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">THE CHALLENGE & EXECUTION</h3>
                  <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md">
                      <div className="text-xl sm:text-2xl font-bold font-display text-white">
                        {m.value}
                      </div>
                      <div className="text-xs font-mono text-[#FF4E00] mt-1">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div>
                  <h3 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">SHIPPED DELIVERABLES</h3>
                  <div className="grid grid-cols-2 gap-2.5">
                    {project.deliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'states' && (
              <div className="space-y-4">
                <p className="text-xs text-zinc-400 font-mono">
                  THE 4-STAGE SYSTEM EVOLUTION DEVELOPED FOR THIS CASE STUDY:
                </p>
                {(project.states || [
                  { stage: '01', title: 'Low-Fidelity Architecture', description: 'Core user journey routing & database schemas.' },
                  { stage: '02', title: 'High-Fidelity UI Design', description: 'Dark obsidian token palette and micro-typography.' },
                  { stage: '03', title: 'Mobile Touch Ergonomics', description: 'Fluid 120Hz gesture interaction and offline stores.' },
                  { stage: '04', title: 'Production Cloud Deployment', description: 'Sub-40ms WebSocket telemetry and zero-downtime CI/CD.' }
                ]).map((st, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex items-start gap-4 backdrop-blur-md">
                    <span className="w-8 h-8 rounded-xl bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] text-xs font-mono font-bold flex items-center justify-center shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-white">{st.title}</h4>
                      <p className="text-xs text-zinc-400 mt-1 font-light">{st.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'tech' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 backdrop-blur-md">
                  <div className="text-xs font-mono text-[#FF4E00] font-bold">FRONTEND & MOTION</div>
                  <p className="text-xs text-zinc-300">React 19 • Next.js App Router • Tailwind CSS • Motion • WebGL Shaders</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 backdrop-blur-md">
                  <div className="text-xs font-mono text-amber-400 font-bold">BACKEND & INFRASTRUCTURE</div>
                  <p className="text-xs text-zinc-300">TypeScript • Node.js • PostgreSQL / Supabase • Redis Caching • Docker • Cloud Run</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2 backdrop-blur-md">
                  <div className="text-xs font-mono text-emerald-400 font-bold">PERFORMANCE & SECURITY</div>
                  <p className="text-xs text-zinc-300">100 Lighthouse Performance • Sub-50ms SLA • End-to-End Encryption • SOC2 Ready</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-6 sm:p-8 bg-black/40 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs font-mono text-zinc-400">
              CLIENT: <span className="text-white font-bold">{project.client}</span> ({project.year})
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
                className="px-5 py-2.5 rounded-full text-xs font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="px-6 py-2.5 rounded-full bg-[#FF4E00] hover:bg-[#ff6220] text-white text-xs font-bold transition-all shadow-lg shadow-[#FF4E00]/30 flex items-center gap-2"
              >
                <span>Commission Similar Build</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
