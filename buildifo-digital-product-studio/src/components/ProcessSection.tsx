import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PROCESS_STEPS } from '../data';
import { Sparkles, CheckCircle, ArrowRight, Clock, Award, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ProcessSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const activeStep = PROCESS_STEPS[activeStepIndex];

  return (
    <section id="process" className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (PHASE 14 Intro) */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 14 • SYSTEMATIC PRODUCT JOURNEY</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Predictable Velocity. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              The 6-Phase Engineering Pipeline
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            A battle-tested methodology transforming ambitious digital product briefs into production-grade reality within 6 to 12 weeks.
          </p>
        </div>

        {/* 6-Step Horizontal / Vertical Progress Track */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {PROCESS_STEPS.map((step, idx) => {
            const isActive = activeStepIndex === idx;
            const isCompleted = idx < activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => {
                  soundFx.playTick(800 + idx * 100);
                  setActiveStepIndex(idx);
                }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between group backdrop-blur-xl ${
                  isActive
                    ? 'bg-[#FF4E00]/15 border-[#FF4E00] shadow-[0_0_25px_rgba(255,78,0,0.25),inset_0_1px_0_rgba(255,255,255,0.2)] scale-[1.03]'
                    : isCompleted
                    ? 'bg-white/[0.04] border-white/15 text-zinc-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]'
                    : 'bg-white/[0.02] border-white/[0.06] text-zinc-400 hover:bg-white/[0.05] hover:border-white/10'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs font-mono font-bold ${isActive ? 'text-[#FF4E00]' : 'text-zinc-400'}`}>
                    {step.number}
                  </span>
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#FF4E00] animate-pulse" />
                  )}
                  {isCompleted && (
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                  )}
                </div>
                <div>
                  <div className={`text-xs font-display font-bold ${isActive ? 'text-white' : 'text-zinc-200'}`}>
                    {step.title}
                  </div>
                  <div className="text-[10px] font-mono text-zinc-400 mt-0.5">
                    {step.duration}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* PHASE 14: Active Step Deep Dive Card (Brightens, scales, reveals details) */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.number}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-white/[0.04] border border-white/15 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              {/* Left Column: Description & Subtitle */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono font-extrabold text-[#FF4E00] bg-[#FF4E00]/10 px-3 py-1 rounded-full border border-[#FF4E00]/20">
                    STEP {activeStep.number}
                  </span>
                  <span className="text-xs font-mono text-zinc-300 flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-zinc-400" />
                    Estimated Duration: {activeStep.duration}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-display font-bold text-white">
                  {activeStep.title}: {activeStep.subtitle}
                </h3>

                <p className="text-zinc-300 text-sm sm:text-base font-light leading-relaxed">
                  {activeStep.description}
                </p>

                <div className="pt-2 space-y-2">
                  <div className="text-xs font-mono text-[#FF4E00] uppercase tracking-wider">
                    KEY EXECUTION FOCUS:
                  </div>
                  {activeStep.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Tangible Deliverables Box */}
              <div className="lg:col-span-6 bg-black/60 rounded-2xl p-6 border border-white/10 space-y-4 backdrop-blur-md">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <span className="text-xs font-mono font-bold text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-amber-400" />
                    TANGIBLE DELIVERABLES
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    100% REPO HANDOFF
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeStep.deliverables.map((deliv, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-medium text-white flex items-center gap-2.5 backdrop-blur-sm"
                    >
                      <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400 font-mono">
                  <span>CLIENT REVIEW GATEWAY</span>
                  <span className="text-[#FF4E00]">Formal Sign-off Required</span>
                </div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};
