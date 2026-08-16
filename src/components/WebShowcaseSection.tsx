import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe, ExternalLink, ArrowRight, Layers, Monitor, ShieldCheck, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const WebShowcaseSection: React.FC = () => {
  const [hoveredMockup, setHoveredMockup] = useState<number | null>(null);

  const mockups = [
    {
      id: 0,
      title: 'Aura Aerospace • 3D Telemetry Platform',
      tag: 'WEBGL FLAGSHIP',
      url: 'https://aura-aerospace.io',
      image: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      stats: '100 Lighthouse • 0.4s LCP',
      accent: '#FF4E00'
    },
    {
      id: 1,
      title: 'Prism Treasury • High-Speed Fintech Portal',
      tag: 'SSR ENTERPRISE',
      url: 'https://prism-global.io',
      image: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&w=1200&q=80',
      stats: '60 FPS Transitions • Sub-millisecond State',
      accent: '#10B981'
    },
    {
      id: 2,
      title: 'Vortex Cinema • Cloud Creative Suite',
      tag: 'CANVAS & WEBGPU',
      url: 'https://vortex-studio.app',
      image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
      stats: 'WebAssembly Timeline • 4K Shaders',
      accent: '#F43F5E'
    }
  ];

  return (
    <section className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 11 • WEB DEVELOPMENT SHOWCASE</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Layered Depth & 60FPS Fluidity. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Interactive Web Mockup Architecture
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            Multi-planar composition with progressive depth rendering. Hover over any browser container to bring it to the foreground.
          </p>
        </div>

        {/* PHASE 11: Layered Mockup Stage (Front first, 2nd later, 3rd later with 3D perspective) */}
        <div className="relative min-h-[500px] lg:min-h-[580px] w-full flex items-center justify-center perspective-2000 py-6">
          
          {mockups.map((m, idx) => {
            const isHovered = hoveredMockup === idx;
            const hasHover = hoveredMockup !== null;
            const isDimmed = hasHover && !isHovered;

            // Compute layered positions (Idx 0 front, 1 mid, 2 back)
            let zIndex = 30 - idx * 10;
            let initialX = (idx - 1) * 60;
            let initialY = idx * 25;
            let rotateZ = (idx - 1) * 3;
            let scale = 1 - idx * 0.08;

            if (isHovered) {
              zIndex = 50;
              scale = 1.04;
              rotateZ = 0;
              initialY = -10;
            }

            return (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 60 + idx * 30, scale: 0.85 }}
                whileInView={{ opacity: 1, y: initialY, scale }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.65,
                  delay: 0.15 + idx * 0.18, // Staggered entrance
                  ease: [0.16, 1, 0.3, 1]
                }}
                animate={{
                  scale,
                  rotateZ,
                  y: initialY,
                  opacity: isDimmed ? 0.45 : 1,
                  filter: isDimmed ? 'blur(2px)' : 'blur(0px)'
                }}
                onMouseEnter={() => {
                  soundFx.playTick(1000 + idx * 120);
                  setHoveredMockup(idx);
                }}
                onMouseLeave={() => setHoveredMockup(null)}
                style={{
                  zIndex,
                  transformStyle: 'preserve-3d'
                }}
                className="absolute w-full max-w-2xl sm:max-w-3xl rounded-3xl bg-white/[0.04] border border-white/15 p-3 sm:p-5 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl transition-all duration-400 cursor-pointer"
              >
                {/* Browser Top Nav */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="text-[11px] font-mono text-zinc-400 ml-2 hidden sm:inline">{m.url}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md"
                      style={{
                        color: m.accent,
                        borderColor: `${m.accent}40`,
                        backgroundColor: `${m.accent}15`
                      }}
                    >
                      {m.tag}
                    </span>
                  </div>
                </div>

                {/* Screenshot / Content */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                  <img
                    src={m.image}
                    alt={m.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex items-end p-4 sm:p-6">
                    <div>
                      <h4 className="text-lg sm:text-xl font-display font-bold text-white">
                        {m.title}
                      </h4>
                      <p className="text-xs font-mono text-zinc-300 mt-1 flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-[#FF4E00]" />
                        <span>{m.stats}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
};
