import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Play, Sparkles, Activity, ShieldCheck, Zap, Terminal, Layers, Compass } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface HeroSectionProps {
  onOpenContact: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenContact, onExploreWork }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Phase 02: Mouse interaction & 3D Parallax state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring interpolation for natural depth
  const springConfig = { damping: 25, stiffness: 120 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Multi-plane parallax offsets
  const bgX = useTransform(smoothMouseX, [-1, 1], [-8, 8]);
  const bgY = useTransform(smoothMouseY, [-1, 1], [-8, 8]);
  
  const midX = useTransform(smoothMouseX, [-1, 1], [-12, 12]);
  const midY = useTransform(smoothMouseY, [-1, 1], [-12, 12]);

  const fgX = useTransform(smoothMouseX, [-1, 1], [-18, 18]);
  const fgY = useTransform(smoothMouseY, [-1, 1], [-18, 18]);

  const cardRotateX = useTransform(smoothMouseY, [-1, 1], [6, -6]);
  const cardRotateY = useTransform(smoothMouseX, [-1, 1], [-8, 8]);

  // Phase 04: Scroll-linked exit transitions
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });

  const headlineScrollY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const visualScrollY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const visualScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.92]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.1]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth) * 2 - 1;
      const y = (e.clientY / innerHeight) * 2 - 1;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Magnetic button state
  const [btnOffset, setBtnOffset] = useState({ x: 0, y: 0 });
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  const handleBtnMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnOffset({ x: x * 0.35, y: y * 0.35 });
  };

  const handleBtnMouseLeave = () => {
    setBtnOffset({ x: 0, y: 0 });
    setIsBtnHovered(false);
  };

  // Headline lines for staggered reveals (800ms–1200ms)
  const headlineLines = [
    { text: 'WE BUILD', highlight: false },
    { text: 'DIGITAL', highlight: true },
    { text: 'PRODUCTS.', highlight: false }
  ];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center pt-28 pb-20 overflow-hidden"
    >
      {/* PHASE 01: Ambient Background & Glow (0ms–200ms) */}
      <motion.div
        style={{ x: bgX, y: bgY }}
        className="absolute inset-0 pointer-events-none z-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ duration: 1.8, delay: 0.1, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[550px] bg-gradient-to-tr from-[#FF4E00]/25 via-amber-500/15 to-transparent rounded-full blur-[160px] animate-ambient-glow"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
      </motion.div>

      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <motion.div
            style={{ y: headlineScrollY }}
            className="lg:col-span-7 flex flex-col items-start text-left"
          >
            {/* 500ms–800ms: Hero Eyebrow / Label */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] backdrop-blur-xl border border-white/10 mb-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]"
            >
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4E00] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4E00]"></span>
              </span>
              <span className="text-[11px] font-mono font-medium tracking-wider text-zinc-300 uppercase">
                DIGITAL PRODUCTS • WEB • MOBILE • CREATIVE
              </span>
            </motion.div>

            {/* 800ms–1200ms: Staggered Headline Reveal */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-display font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              {headlineLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.65,
                      delay: 0.8 + idx * 0.12,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={line.highlight ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400' : 'text-white'}
                  >
                    {line.text}
                  </motion.div>
                </div>
              ))}
            </h1>

            {/* 1200ms–1500ms: Supporting Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-xl mb-8"
            >
              We design and build SaaS platforms, websites, mobile apps and high-impact digital experiences for ambitious businesses.
            </motion.p>

            {/* 1500ms–1800ms: Primary and Secondary CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-wrap items-center gap-4 w-full sm:w-auto"
            >
              {/* Secondary CTA: VIEW OUR WORK */}
              <button
                onClick={() => {
                  soundFx.playSwoosh();
                  onExploreWork();
                }}
                onMouseEnter={() => soundFx.playTick(900)}
                className="px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-white/15 hover:border-white/30 text-sm font-semibold text-white transition-all duration-300 flex items-center gap-2 group backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]"
              >
                <span>VIEW OUR WORK</span>
                <Compass className="w-4 h-4 text-zinc-300 group-hover:rotate-45 transition-transform duration-300" />
              </button>

              {/* Primary Magnetic Button: START A PROJECT */}
              <motion.button
                onMouseMove={handleBtnMouseMove}
                onMouseEnter={() => {
                  setIsBtnHovered(true);
                  soundFx.playTick(1200);
                }}
                onMouseLeave={handleBtnMouseLeave}
                onClick={() => {
                  soundFx.playSuccess();
                  onOpenContact();
                }}
                animate={{
                  x: isBtnHovered ? btnOffset.x : 0,
                  y: isBtnHovered ? btnOffset.y : 0,
                  scale: isBtnHovered ? 1.04 : 1
                }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="relative group rounded-full p-[1px] bg-gradient-to-r from-white/30 via-[#FF4E00] to-orange-500 shadow-[0_0_30px_rgba(255,78,0,0.35)] hover:shadow-[0_0_45px_rgba(255,78,0,0.55)] transition-shadow duration-300"
              >
                <div className="relative z-10 px-7 py-3.5 rounded-full bg-[#FF4E00] flex items-center gap-3 overflow-hidden transition-colors duration-300">
                  <span className="font-bold text-sm tracking-wide text-white">START A PROJECT</span>
                  <motion.div
                    animate={{ x: isBtnHovered ? 3 : 0, y: isBtnHovered ? -3 : 0 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </motion.div>
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-orange-400 to-[#FF4E00] opacity-0 group-hover:opacity-100 blur-sm transition-opacity duration-300" />
              </motion.button>
            </motion.div>

            {/* Quick Metrics Trust Bar (Honest Capability Positioning) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="mt-12 pt-6 border-t border-white/[0.08] grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg"
            >
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-white">06</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Core Disciplines</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-[#FF4E00]">100%</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Type-Safe Stack</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold font-display text-white">&lt;24h</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Discovery SLA</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Hero Interactive 3D Visual Experience (1800ms–2400ms+) */}
          <motion.div
            style={{ y: visualScrollY, scale: visualScale }}
            className="lg:col-span-5 relative perspective-1000"
          >
            {/* 1800ms–2400ms: Hero Visual Enters with blur, scale, sharpen */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)', y: 30 }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', y: 0 }}
              transition={{ duration: 1.0, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                x: midX,
                y: midY,
                transformStyle: 'preserve-3d'
              }}
              className="relative w-full aspect-[4/3] rounded-3xl bg-white/[0.03] border border-white/15 p-4 sm:p-6 backdrop-blur-2xl shadow-[0_30px_70px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.15)] group"
            >
              {/* Top Window Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  <span className="text-[11px] font-mono text-zinc-400 ml-2">buildifo-core.v2.engine</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  ACTIVE 120 FPS
                </div>
              </div>

              {/* Central Simulated Interactive Canvas / Architecture */}
              <div className="grid grid-cols-12 gap-3 h-[calc(100%-48px)]">
                {/* Left Panel */}
                <div className="col-span-4 bg-black/50 rounded-xl p-3 border border-white/5 flex flex-col justify-between backdrop-blur-md">
                  <div className="space-y-2">
                    <div className="text-[10px] font-mono text-zinc-400">NODE STATUS</div>
                    <div className="h-1.5 rounded-full bg-[#FF4E00]/50 w-3/4 animate-pulse" />
                    <div className="h-1.5 rounded-full bg-white/20 w-1/2" />
                    <div className="h-1.5 rounded-full bg-white/20 w-5/6" />
                  </div>
                  <div className="p-2 rounded-lg bg-white/[0.04] border border-white/10">
                    <div className="text-[9px] font-mono text-[#FF4E00]">GPU STREAM</div>
                    <div className="text-sm font-bold text-white font-mono mt-0.5">38.4 ms</div>
                  </div>
                </div>

                {/* Right Main Panel */}
                <div className="col-span-8 bg-black/50 rounded-xl p-3 border border-white/5 flex flex-col justify-between overflow-hidden relative backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-medium text-white">Multi-Agent Vector Mesh</span>
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                  </div>

                  {/* Animated Waveform / Vector Graph Lines */}
                  <div className="my-2 h-24 flex items-end justify-between gap-1 px-1">
                    {[40, 65, 30, 85, 95, 45, 70, 60, 90, 75, 50, 100, 80, 65].map((height, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          height: [`${height * 0.4}%`, `${height}%`, `${height * 0.6}%`],
                          backgroundColor: i % 2 === 0 ? '#FF4E00' : '#FFAA00'
                        }}
                        transition={{
                          duration: 2 + (i % 3) * 0.5,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut',
                          delay: i * 0.08
                        }}
                        className="w-full rounded-t-sm opacity-80"
                      />
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-2 border-t border-white/5">
                    <span>99.98% RETENTION</span>
                    <span className="text-[#FF4E00]">LATENCY: 12ms</span>
                  </div>
                </div>
              </div>

              {/* Floating UI Widget 1 (Foreground Parallax: 8-18px) */}
              <motion.div
                initial={{ opacity: 0, x: 40, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.1, ease: 'easeOut' }}
                style={{ x: fgX, y: fgY }}
                className="absolute -bottom-6 -left-6 bg-black/80 border border-white/15 p-3.5 rounded-2xl shadow-2xl backdrop-blur-2xl flex items-center gap-3 w-52 pointer-events-none"
              >
                <div className="p-2 rounded-xl bg-[#FF4E00]/20 text-[#FF4E00]">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">Production Guard</div>
                  <div className="text-[9px] text-zinc-400 font-mono">Zero-Downtime CI/CD</div>
                </div>
              </motion.div>

              {/* Floating UI Widget 2 (Foreground Parallax Top Right) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: -20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.3, ease: 'easeOut' }}
                style={{ x: fgX, y: fgY }}
                className="absolute -top-6 -right-4 bg-black/80 border border-white/15 p-3 rounded-2xl shadow-2xl backdrop-blur-2xl flex items-center gap-2.5 pointer-events-none"
              >
                <div className="w-2 h-2 rounded-full bg-[#FF4E00] animate-ping" />
                <span className="text-[11px] font-mono font-medium text-white">
                  MOTION ORCHESTRATOR • ON
                </span>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};
