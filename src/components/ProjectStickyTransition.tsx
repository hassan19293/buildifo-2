import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, CheckCircle2, Cpu, Smartphone, Layout, ArrowRight, Eye } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const ProjectStickyTransition: React.FC = () => {
  const [activeStateIndex, setActiveStateIndex] = useState<number>(0);

  const states = [
    {
      id: '01',
      title: 'STATE 01: Information Architecture & Wireframe',
      shortTitle: '01 Wireframe',
      icon: Layout,
      desc: 'Mapping multi-agent vector routing pipelines, canvas node connections, and low-latency interaction hierarchies on an 8pt architectural matrix.',
      metrics: '34 Core User Flows Mapped',
      badge: 'BLUEPRINT PHASE',
      accent: '#FF4E00'
    },
    {
      id: '02',
      title: 'STATE 02: UI Design & Design System Tokens',
      shortTitle: '02 UI System',
      icon: Layers,
      desc: 'Developing high-contrast obsidian surfaces, tokenized color spaces, glowing state indicators, and micro-typography for deep developer focus.',
      metrics: '180+ Reusable UI Tokens',
      badge: 'DESIGN TOKENS',
      accent: '#A855F7'
    },
    {
      id: '03',
      title: 'STATE 03: Mobile Interface & Compact Ergonomics',
      shortTitle: '03 Mobile UI',
      icon: Smartphone,
      desc: 'Engineered with thumb-zone ergonomic interaction zones, responsive telemetry cards, and instantaneous biometric agent authentication on iOS & Android.',
      metrics: '60–120 FPS Native Flow',
      badge: 'MOBILE ECOSYSTEM',
      accent: '#EC4899'
    },
    {
      id: '04',
      title: 'STATE 04: Production Engine & Live Sub-40ms Telemetry',
      shortTitle: '04 Final Product',
      icon: Cpu,
      desc: 'Live WebSocket multi-tenant telemetry streams, instant vector query execution, automated failover guards, and sub-40ms response latency.',
      metrics: '140K+ Daily Devs Active',
      badge: 'LIVE PRODUCTION',
      accent: '#10B981'
    }
  ];

  const currentState = states[activeStateIndex];

  return (
    <section id="evolution" className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      {/* Background Ambient Glow */}
      <div
        className="absolute top-1/2 left-3/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: currentState.accent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Tag */}
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 08 • CINEMATIC PROJECT EVOLUTION</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            How a Product Evolves: <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              From Wireframe to Production Reality
            </span>
          </h2>
        </div>

        {/* Sticky Showcase Layout (Phase 08 Left + Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* LEFT SIDE: Project Narrative & Interactive State Buttons */}
          <div className="lg:col-span-5 flex flex-col space-y-6">
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                  CASE STUDY EVOLUTION
                </span>
                <span className="text-xs font-mono text-zinc-400">NOVA INTELLIGENCE</span>
              </div>

              <h3 className="text-2xl font-display font-bold text-white mb-2">
                NOVA AI SaaS Platform
              </h3>
              <p className="text-sm text-zinc-300 font-light leading-relaxed mb-6">
                Follow the precise step-by-step engineering and design transformation from initial architectural wireframing to enterprise cloud deployment.
              </p>

              {/* State Step Selectors */}
              <div className="space-y-2.5">
                {states.map((st, idx) => {
                  const isActive = activeStateIndex === idx;
                  const Icon = st.icon;
                  return (
                    <button
                      key={st.id}
                      onClick={() => {
                        soundFx.playTick(800 + idx * 150);
                        setActiveStateIndex(idx);
                      }}
                      className={`w-full text-left p-3.5 rounded-2xl border transition-all duration-300 flex items-center justify-between group backdrop-blur-xl ${
                        isActive
                          ? 'bg-white/[0.08] border-white/25 shadow-[0_10px_25px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.15)]'
                          : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 text-zinc-400'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors backdrop-blur-md"
                          style={{
                            backgroundColor: isActive ? `${st.accent}30` : 'rgba(255,255,255,0.05)',
                            color: isActive ? st.accent : '#9CA3AF'
                          }}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                            {st.shortTitle}
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500">
                            {st.badge}
                          </div>
                        </div>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId="activeIndicatorPill"
                          className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                          style={{ backgroundColor: st.accent, color: st.accent }}
                        />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Active State Details Box */}
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                  <span>ACTIVE METRIC</span>
                  <span className="text-[#FF4E00] font-bold">{currentState.metrics}</span>
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {currentState.desc}
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT SIDE: Large Morphing Visual Showcase (fade + scale + blur + slide) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/11] rounded-3xl bg-white/[0.03] border border-white/15 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl overflow-hidden">
              
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-zinc-400 ml-2">nova-evolution://{currentState.shortTitle.toLowerCase().replace(/\s+/g, '-')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md"
                    style={{
                      color: currentState.accent,
                      borderColor: `${currentState.accent}40`,
                      backgroundColor: `${currentState.accent}15`
                    }}
                  >
                    {currentState.badge}
                  </span>
                </div>
              </div>

              {/* Animated State Transformation Canvas (Fade, scale, blur, slide) */}
              <div className="relative w-full h-[calc(100%-48px)] rounded-2xl overflow-hidden bg-black/60 border border-white/10 flex items-center justify-center p-4 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  
                  {/* STATE 01: Wireframe */}
                  {currentState.id === '01' && (
                    <motion.div
                      key="state-01-wireframe"
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', x: -20 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
                      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', x: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full border border-dashed border-white/30 rounded-xl p-4 bg-white/[0.02] flex flex-col justify-between"
                    >
                      <div className="grid grid-cols-12 gap-3 h-full">
                        <div className="col-span-3 border border-dashed border-white/20 rounded-lg p-2 flex flex-col gap-2">
                          <div className="h-3 w-16 bg-white/20 rounded" />
                          <div className="h-2 w-full bg-white/10 rounded" />
                          <div className="h-2 w-4/5 bg-white/10 rounded" />
                          <div className="h-2 w-3/5 bg-white/10 rounded" />
                        </div>
                        <div className="col-span-9 border border-dashed border-white/20 rounded-lg p-3 flex flex-col justify-between">
                          <div className="flex justify-between items-center">
                            <div className="h-4 w-32 bg-[#FF4E00]/30 rounded" />
                            <div className="h-3 w-12 bg-white/20 rounded-full" />
                          </div>
                          <div className="grid grid-cols-3 gap-2 my-auto">
                            <div className="h-16 border border-dashed border-white/15 rounded flex items-center justify-center text-[10px] font-mono text-zinc-500">
                              NODE_A
                            </div>
                            <div className="h-16 border border-dashed border-white/15 rounded flex items-center justify-center text-[10px] font-mono text-zinc-500">
                              VECTOR_INDEX
                            </div>
                            <div className="h-16 border border-dashed border-white/15 rounded flex items-center justify-center text-[10px] font-mono text-zinc-500">
                              LLM_STREAM
                            </div>
                          </div>
                          <div className="h-6 border border-dashed border-[#FF4E00]/30 rounded flex items-center justify-center text-[10px] font-mono text-[#FF4E00]">
                            AGENT_COGNITIVE_PIPELINE
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 02: UI Design */}
                  {currentState.id === '02' && (
                    <motion.div
                      key="state-02-ui"
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', x: -20 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
                      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', x: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full rounded-xl p-4 bg-white/[0.04] border border-purple-500/30 flex flex-col justify-between shadow-xl backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between pb-3 border-b border-purple-500/20">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-400" />
                          <span className="text-xs font-bold text-white">Obsidian Design System v2.4</span>
                        </div>
                        <span className="text-[10px] font-mono text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                          TOKENS ACTIVE
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3 my-auto">
                        <div className="bg-white/[0.03] p-3 rounded-lg border border-purple-500/20">
                          <div className="text-[10px] font-mono text-purple-400">PRIMARY ACCENT</div>
                          <div className="h-4 rounded bg-gradient-to-r from-[#FF4E00] to-purple-500 mt-2" />
                        </div>
                        <div className="bg-white/[0.03] p-3 rounded-lg border border-purple-500/20">
                          <div className="text-[10px] font-mono text-purple-400">TYPOGRAPHY</div>
                          <div className="text-xs font-bold text-white mt-1">Syne + Plus Jakarta</div>
                        </div>
                        <div className="bg-white/[0.03] p-3 rounded-lg border border-purple-500/20">
                          <div className="text-[10px] font-mono text-purple-400">SPATIAL GRID</div>
                          <div className="text-xs font-bold text-white mt-1">8pt Precision Grid</div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-lg bg-black/60 border border-white/10 flex items-center justify-between text-[11px] text-zinc-300">
                        <span>Micro-interactions: Spring stiffness 380, Damping 30</span>
                        <CheckCircle2 className="w-4 h-4 text-purple-400" />
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 03: Mobile Interface */}
                  {currentState.id === '03' && (
                    <motion.div
                      key="state-03-mobile"
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', x: -20 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
                      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', x: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center gap-6"
                    >
                      {/* Compact iPhone Mockup */}
                      <div className="w-56 h-[90%] rounded-3xl bg-black/80 border-2 border-pink-500/40 p-3 flex flex-col justify-between shadow-2xl relative overflow-hidden backdrop-blur-xl">
                        <div className="w-16 h-3 bg-zinc-800 rounded-full mx-auto mb-2" />
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono text-pink-400">NOVA MOBILE</div>
                          <div className="p-2 rounded-lg bg-pink-950/30 border border-pink-500/20 text-[10px] text-white">
                            ⚡ Fast Agent Trigger (Hold Screen)
                          </div>
                          <div className="h-12 bg-black/40 rounded-lg p-2 border border-white/5">
                            <div className="text-[9px] text-zinc-400">Telemetry Stream</div>
                            <div className="text-xs font-bold text-[#FF4E00] font-mono">0.038s Query</div>
                          </div>
                        </div>
                        <div className="w-16 h-1 bg-white/20 rounded-full mx-auto mt-2" />
                      </div>

                      <div className="hidden sm:flex flex-col gap-2 max-w-[200px] text-xs text-zinc-400 font-mono">
                        <div className="text-white font-bold">Touch Ergonomics</div>
                        <div>✓ 120Hz ProMotion Sync</div>
                        <div>✓ Biometric Instant Passkey</div>
                        <div>✓ Offline SQLite Store</div>
                      </div>
                    </motion.div>
                  )}

                  {/* STATE 04: Production Final */}
                  {currentState.id === '04' && (
                    <motion.div
                      key="state-04-final"
                      initial={{ opacity: 0, scale: 0.94, filter: 'blur(8px)', x: -20 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
                      exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)', x: 20 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full rounded-xl p-4 bg-white/[0.04] border border-emerald-500/40 flex flex-col justify-between shadow-2xl backdrop-blur-md"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                          <span className="text-xs font-bold text-white font-mono">NOVA v1.0.4 PRODUCTION CLOUD</span>
                        </div>
                        <div className="text-[10px] font-mono text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                          SUB-40MS ENGINE
                        </div>
                      </div>

                      <div className="grid grid-cols-12 gap-3 my-2">
                        <div className="col-span-8 bg-black/60 rounded-lg p-3 border border-emerald-500/20">
                          <div className="text-[10px] font-mono text-zinc-400 mb-1">REALTIME TOKEN FLUX</div>
                          <div className="flex items-end gap-1 h-16">
                            {[30, 60, 45, 90, 80, 100, 70, 85, 95, 60, 75, 110, 85].map((val, i) => (
                              <div
                                key={i}
                                style={{ height: `${(val / 110) * 100}%` }}
                                className="flex-1 bg-emerald-400 rounded-t-sm opacity-90 transition-all duration-300"
                              />
                            ))}
                          </div>
                        </div>

                        <div className="col-span-4 bg-black/60 rounded-lg p-3 border border-emerald-500/20 flex flex-col justify-between">
                          <div>
                            <div className="text-[9px] font-mono text-zinc-400">ACTIVE USERS</div>
                            <div className="text-lg font-bold text-white font-display">140,284</div>
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400">
                            +340% MRR Surge
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-emerald-500/20 pt-2">
                        <span>DEPLOYMENT: GLOBAL MULTI-REGION</span>
                        <span className="text-emerald-300">STATUS: 100% HEALTHY</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
