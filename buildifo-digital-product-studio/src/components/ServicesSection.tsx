import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SERVICES } from '../data';
import { ServiceItem } from '../types';
import { Sparkles, ArrowRight, CheckCircle, Database, Globe, Smartphone, Film, Palette, Cpu, Play, Sliders, Activity } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface ServicesSectionProps {
  onOpenContact: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenContact }) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>('saas');
  const activeService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  // Dynamic background accent colors based on selected service
  const serviceAccents: Record<string, string> = {
    saas: '#FF4E00',
    web: '#38BDF8',
    mobile: '#EC4899',
    video: '#F43F5E',
    design: '#A855F7',
    ai: '#10B981'
  };

  const currentAccent = serviceAccents[activeService.id] || '#FF4E00';

  return (
    <section id="services" className="relative py-28 bg-[#050505] border-t border-white/[0.08] transition-colors duration-1000 overflow-hidden">
      
      {/* Background ambient light shifting tone with active service (PHASE 09) */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full blur-[160px] opacity-15 pointer-events-none transition-colors duration-1000"
        style={{ backgroundColor: currentAccent }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header (PHASE 09 Intro) */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 09 • INTERACTIVE SERVICES SHOWCASE</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Full-Spectrum Digital Mastery. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Interactive Domain Capabilities
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-2xl">
            Select a discipline below to explore our live interactive prototype architectures, motion workflows, and technical deliverables.
          </p>
        </div>

        {/* Interactive Services Grid: Left Menu + Right Live Morphing Visual (400–700ms transition) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: Service Selector List */}
          <div className="lg:col-span-5 space-y-3">
            {SERVICES.map((srv, idx) => {
              const isSelected = srv.id === selectedServiceId;
              const accent = serviceAccents[srv.id];
              return (
                <button
                  key={srv.id}
                  onClick={() => {
                    soundFx.playTick(900 + idx * 100);
                    setSelectedServiceId(srv.id);
                  }}
                  className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-400 flex items-center justify-between group backdrop-blur-xl ${
                    isSelected
                      ? 'bg-white/[0.08] border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)] scale-[1.01]'
                      : 'bg-white/[0.02] border-white/[0.08] hover:bg-white/[0.05] hover:border-white/20 text-zinc-400'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors backdrop-blur-md"
                      style={{
                        backgroundColor: isSelected ? `${accent}30` : 'rgba(255,255,255,0.04)',
                        color: isSelected ? accent : '#9CA3AF'
                      }}
                    >
                      {srv.type === 'saas' && <Database className="w-5 h-5" />}
                      {srv.type === 'web' && <Globe className="w-5 h-5" />}
                      {srv.type === 'mobile' && <Smartphone className="w-5 h-5" />}
                      {srv.type === 'video' && <Film className="w-5 h-5" />}
                      {srv.type === 'design' && <Palette className="w-5 h-5" />}
                      {srv.type === 'ai' && <Cpu className="w-5 h-5" />}
                    </div>

                    <div>
                      <h3 className={`text-sm sm:text-base font-display font-bold ${isSelected ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                        {srv.title}
                      </h3>
                      <p className="text-xs text-zinc-500 line-clamp-1 mt-0.5">
                        {srv.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isSelected && (
                      <motion.div
                        layoutId="activeServiceDot"
                        className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]"
                        style={{ backgroundColor: accent, color: accent }}
                      />
                    )}
                    <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-white translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Interactive Morphing Visual Showcase */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white/[0.03] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl relative overflow-hidden">
              
              {/* Header inside display */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/10 mb-6">
                <div>
                  <span
                    className="text-xs font-mono font-bold px-3 py-1 rounded-full border inline-block mb-1 backdrop-blur-md"
                    style={{
                      color: currentAccent,
                      borderColor: `${currentAccent}40`,
                      backgroundColor: `${currentAccent}15`
                    }}
                  >
                    DOMAIN SHOWCASE: {activeService.title.toUpperCase()}
                  </span>
                  <p className="text-xs text-zinc-400 mt-1">
                    {activeService.subtitle}
                  </p>
                </div>

                <button
                  onClick={() => {
                    soundFx.playSuccess();
                    onOpenContact();
                  }}
                  className="text-xs font-semibold text-white px-4 py-2 rounded-full bg-[#FF4E00] hover:bg-[#FF4E00]/90 shadow-[0_0_20px_rgba(255,78,0,0.35)] transition-all flex items-center gap-2"
                >
                  <span>Commission Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Dynamic Interactive Stage with 400–700ms morphing animation */}
              <div className="relative aspect-[16/10] w-full rounded-2xl bg-black/60 border border-white/10 overflow-hidden flex items-center justify-center p-4 backdrop-blur-md">
                <AnimatePresence mode="wait">
                  
                  {/* 1. SAAS DASHBOARD VISUAL */}
                  {activeService.type === 'saas' && (
                    <motion.div
                      key="service-saas"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                          <div className="text-[10px] font-mono text-zinc-400">MRR VELOCITY</div>
                          <div className="text-lg font-bold text-white font-mono mt-1">$482,900</div>
                          <div className="text-[9px] text-[#FF4E00] font-mono mt-0.5">+42.8% this month</div>
                        </div>
                        <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                          <div className="text-[10px] font-mono text-zinc-400">CHURN RATE</div>
                          <div className="text-lg font-bold text-white font-mono mt-1">0.42%</div>
                          <div className="text-[9px] text-emerald-400 font-mono mt-0.5">Top Decile Tier</div>
                        </div>
                        <div className="bg-white/[0.04] p-3 rounded-xl border border-white/10 backdrop-blur-md">
                          <div className="text-[10px] font-mono text-zinc-400">GLOBAL API CALLS</div>
                          <div className="text-lg font-bold text-white font-mono mt-1">84.2M</div>
                          <div className="text-[9px] text-zinc-300 font-mono mt-0.5">99.999% SLA</div>
                        </div>
                      </div>

                      {/* Interactive Live Chart Wave */}
                      <div className="bg-white/[0.03] p-3.5 rounded-xl border border-white/10 my-2 backdrop-blur-md">
                        <div className="flex items-center justify-between text-[11px] text-zinc-400 mb-2">
                          <span>Live Ingestion & Processing Pipeline</span>
                          <span className="text-[#FF4E00] font-mono">1.2ms Sync</span>
                        </div>
                        <div className="flex items-end gap-1.5 h-20">
                          {[35, 55, 40, 75, 90, 65, 80, 95, 70, 85, 100, 90, 80, 95, 110, 88].map((h, i) => (
                            <motion.div
                              key={i}
                              animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
                              transition={{ duration: 1.5 + (i % 4) * 0.3, repeat: Infinity, repeatType: 'reverse' }}
                              className="flex-1 rounded-t-sm bg-gradient-to-t from-[#FF4E00] to-orange-400"
                            />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2">
                        <span>ARCHITECTURE: POSTGRES • REDIS • K8S</span>
                        <span className="text-emerald-400">CLUSTER: 12 NODES ONLINE</span>
                      </div>
                    </motion.div>
                  )}

                  {/* 2. WEB DEVELOPMENT VISUAL */}
                  {activeService.type === 'web' && (
                    <motion.div
                      key="service-web"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="w-full bg-white/[0.04] rounded-xl border border-white/10 p-3 shadow-xl backdrop-blur-md">
                        <div className="flex items-center justify-between pb-2 border-b border-white/10">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            <span className="w-2 h-2 rounded-full bg-amber-500" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-[10px] font-mono text-zinc-400 ml-2">https://flagship-experience.io</span>
                          </div>
                          <span className="text-[9px] font-mono text-sky-400 bg-sky-500/20 px-2 py-0.5 rounded">
                            LCP: 0.4s (100 Lighthouse)
                          </span>
                        </div>
                        <div className="p-4 text-center my-3 bg-white/[0.03] rounded-lg border border-white/10">
                          <h4 className="text-lg font-display font-bold text-white">Dynamic 3D Narrative Canvas</h4>
                          <p className="text-xs text-zinc-400 mt-1">60FPS Motion Choreography & WebGL Shaders</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs font-mono text-zinc-300">
                        <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10 backdrop-blur-md">
                          <span className="text-sky-400 font-bold">✓ SSR & SSG Edge</span>
                          <p className="text-[10px] text-zinc-400 mt-1">Multi-region edge rendering</p>
                        </div>
                        <div className="p-3 bg-white/[0.03] rounded-lg border border-white/10 backdrop-blur-md">
                          <span className="text-sky-400 font-bold">✓ Accessibility AA+</span>
                          <p className="text-[10px] text-zinc-400 mt-1">Screen reader & keyboard navigation</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 3. MOBILE APP VISUAL */}
                  {activeService.type === 'mobile' && (
                    <motion.div
                      key="service-mobile"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex items-center justify-center gap-6"
                    >
                      <div className="w-52 h-[92%] rounded-3xl bg-black/80 border-2 border-pink-500/40 p-3 flex flex-col justify-between shadow-2xl backdrop-blur-xl">
                        <div className="w-12 h-2.5 bg-zinc-800 rounded-full mx-auto" />
                        <div className="space-y-2">
                          <div className="text-[10px] font-mono text-pink-400">FINTECH MOBILE PAY</div>
                          <div className="p-2.5 bg-pink-950/40 border border-pink-500/30 rounded-xl">
                            <div className="text-[9px] text-zinc-400">Instant Settlement</div>
                            <div className="text-base font-bold text-white font-mono">$12,450.00</div>
                          </div>
                          <div className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                            <span>✓ Biometric FaceID Verified</span>
                          </div>
                        </div>
                        <div className="w-14 h-1 bg-white/20 rounded-full mx-auto" />
                      </div>
                      <div className="space-y-2 text-xs font-mono text-zinc-300">
                        <div className="text-pink-400 font-bold">Native Capabilities</div>
                        <div>• 120Hz Fluid Gestures</div>
                        <div>• Offline SQLite Sync</div>
                        <div>• Zero-Latency Haptics</div>
                        <div>• Direct App Store CI/CD</div>
                      </div>
                    </motion.div>
                  )}

                  {/* 4. VIDEO & MOTION VISUAL */}
                  {activeService.type === 'video' && (
                    <motion.div
                      key="service-video"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-rose-500/30 flex items-center justify-center group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-rose-900/30 to-purple-900/30" />
                        <div className="p-3 rounded-full bg-rose-600/80 text-white shadow-xl shadow-rose-600/40">
                          <Play className="w-5 h-5 ml-0.5" />
                        </div>
                        <div className="absolute bottom-2 left-3 text-[10px] font-mono text-zinc-300">
                          00:04:18:22 • 4K PRORES 4444
                        </div>
                      </div>

                      {/* Video Timeline Scrubber */}
                      <div className="bg-white/[0.04] p-2.5 rounded-lg border border-white/10 backdrop-blur-md">
                        <div className="flex items-center justify-between text-[9px] font-mono text-rose-400 mb-1">
                          <span>TIMELINE TRACKS</span>
                          <span>MASTER AUDIO 48kHz</span>
                        </div>
                        <div className="h-2 bg-black rounded-full overflow-hidden relative">
                          <div className="h-full bg-rose-500 w-2/3" />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* 5. DESIGN SYSTEM VISUAL */}
                  {activeService.type === 'design' && (
                    <motion.div
                      key="service-design"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-purple-500/30 backdrop-blur-md">
                          <div className="text-[9px] font-mono text-purple-300">COLOR TOKENS</div>
                          <div className="flex gap-1 mt-2">
                            <div className="w-5 h-5 rounded bg-[#FF4E00]" />
                            <div className="w-5 h-5 rounded bg-purple-500" />
                            <div className="w-5 h-5 rounded bg-pink-500" />
                          </div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-purple-500/30 backdrop-blur-md">
                          <div className="text-[9px] font-mono text-purple-300">RADII FORMULAS</div>
                          <div className="text-xs font-mono text-white mt-2">R_in = R_out - P</div>
                        </div>
                        <div className="p-3 rounded-xl bg-white/[0.04] border border-purple-500/30 backdrop-blur-md">
                          <div className="text-[9px] font-mono text-purple-300">WCAG CONTRAST</div>
                          <div className="text-xs font-mono text-emerald-400 mt-2">14.8 : 1 (AAA)</div>
                        </div>
                      </div>

                      <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs text-zinc-300 backdrop-blur-md">
                        <span>Figma Token Studio Sync • React Component Library</span>
                        <Palette className="w-4 h-4 text-purple-400" />
                      </div>
                    </motion.div>
                  )}

                  {/* 6. AI AGENT ARCHITECTURE */}
                  {activeService.type === 'ai' && (
                    <motion.div
                      key="service-ai"
                      initial={{ opacity: 0, scale: 0.92, filter: 'blur(10px)', y: 15 }}
                      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
                      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)', y: -15 }}
                      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full flex flex-col justify-between"
                    >
                      <div className="p-3 rounded-xl bg-white/[0.04] border border-emerald-500/30 backdrop-blur-md">
                        <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
                          <span className="text-xs font-mono font-bold text-emerald-400">AUTONOMOUS MULTI-AGENT GRAPH</span>
                          <span className="text-[10px] font-mono text-zinc-400">LATENCY: 22ms</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2 my-3 text-center">
                          <div className="p-2 rounded bg-black/60 border border-emerald-500/20 text-[10px] font-mono text-white">
                            EMBEDDING_INGEST
                          </div>
                          <div className="p-2 rounded bg-black/60 border border-emerald-500/20 text-[10px] font-mono text-emerald-400">
                            TOOL_ORCHESTRATOR
                          </div>
                          <div className="p-2 rounded bg-black/60 border border-emerald-500/20 text-[10px] font-mono text-white">
                            STREAM_VALIDATOR
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 border-t border-white/10 pt-2">
                        <span>GEMINI 2.0 FLASH • PINECONE VECTOR • FASTAPI</span>
                        <span className="text-emerald-400">AUTO-FAILOVER: ENABLED</span>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>

              {/* Service Features Breakdown */}
              <div className="mt-6 pt-6 border-t border-white/[0.08]">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-3">
                  INCLUDED DELIVERABLES & CORE CAPABILITIES
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeService.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-zinc-300">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
