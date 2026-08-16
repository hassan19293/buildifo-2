import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { Sparkles, Smartphone, ShieldCheck, Zap, Bell, CreditCard, Compass, Wifi } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const MobileShowcaseSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tilt interaction
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 100 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 100 });

  const phoneTiltX = useTransform(springY, [-1, 1], [4, -4]);
  const phoneTiltY = useTransform(springX, [-1, 1], [-6, 6]);

  // Scroll differential speed (Parallax)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const p1Y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const p2Y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const p3Y = useTransform(scrollYProgress, [0, 1], [20, -20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX / innerWidth) * 2 - 1);
      mouseY.set((e.clientY / innerHeight) * 2 - 1);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={containerRef} className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 12 • MOBILE APP ENGINEERING SHOWCASE</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Fluid Micro-Haptics. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              120Hz Native Mobile Ecosystems
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light">
            Engineered with thumb-zone ergonomics, instant biometric authorization, and offline SQLite synchronization.
          </p>
        </div>

        {/* PHASE 12: 3 Phones with Rotational Entrance & Subtle Floating */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-6 items-center justify-items-center perspective-1000 py-6">
          
          {/* PHONE 1: PULSE Biometrics & Health */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateZ: -6, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: -3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: p1Y, rotateX: phoneTiltX, rotateY: phoneTiltY }}
            whileHover={{ scale: 1.05, rotateZ: 0 }}
            className="w-64 h-[460px] rounded-[36px] bg-black/80 border-2 border-white/20 p-3 flex flex-col justify-between shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Dynamic Island */}
            <div className="w-20 h-4 bg-zinc-900 rounded-full mx-auto flex items-center justify-end px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </div>

            {/* Screen Content */}
            <div className="space-y-3 px-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>PULSE BIOMETRICS</span>
                <Wifi className="w-3 h-3 text-emerald-400" />
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400">Daily Recovery Score</div>
                <div className="text-xl font-bold font-mono text-white mt-1">94% Optimal</div>
                <div className="text-[10px] text-[#FF4E00] font-mono mt-1">+12% vs 7-day avg</div>
              </div>
              <div className="space-y-1.5">
                <div className="text-[9px] font-mono text-zinc-500">BIOMETRIC TELEMETRY</div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between text-[11px] text-white">
                  <span>RESTING HEART RATE</span>
                  <span className="text-emerald-400 font-mono">54 BPM</span>
                </div>
                <div className="p-2 rounded-xl bg-white/[0.03] border border-white/5 flex justify-between text-[11px] text-white">
                  <span>DEEP SLEEP STAGE</span>
                  <span className="text-[#FF4E00] font-mono">3h 45m</span>
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-2" />
          </motion.div>

          {/* PHONE 2 (Center Hero): Nova AI Assistant */}
          <motion.div
            initial={{ opacity: 0, y: 70, rotateZ: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, y: -15, rotateZ: 0, scale: 1.05 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: p2Y, rotateX: phoneTiltX, rotateY: phoneTiltY }}
            whileHover={{ scale: 1.08 }}
            className="w-68 sm:w-72 h-[500px] rounded-[40px] bg-black/90 border-2 border-white/30 p-3.5 flex flex-col justify-between shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-3xl relative overflow-hidden group cursor-pointer z-20"
          >
            {/* Dynamic Island */}
            <div className="w-24 h-5 bg-zinc-900 rounded-full mx-auto flex items-center justify-between px-3">
              <span className="text-[8px] font-mono text-zinc-300">NOVA AGENT</span>
              <div className="w-1.5 h-1.5 rounded-full bg-[#FF4E00] animate-pulse" />
            </div>

            {/* Screen Content */}
            <div className="space-y-3 px-2">
              <div className="text-center pt-2">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF4E00] to-orange-400 mx-auto flex items-center justify-center text-white shadow-lg shadow-[#FF4E00]/30">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-sm font-bold text-white font-display mt-2">Autonomous Agent Online</h4>
                <p className="text-[10px] text-zinc-400 font-mono">Listening for voice prompts...</p>
              </div>

              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2 backdrop-blur-md">
                <div className="text-[10px] text-zinc-200">
                  "Refactor database schema for multi-tenant isolation and deploy to staging."
                </div>
                <div className="flex items-center justify-between text-[9px] font-mono text-emerald-400 pt-1 border-t border-white/10">
                  <span>✓ 4 PRs Merged</span>
                  <span>0.04s execution</span>
                </div>
              </div>

              {/* Animated Voice Orb */}
              <div className="h-10 flex items-center justify-center gap-1">
                {[20, 40, 70, 90, 60, 80, 45, 25].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h * 0.3}%`, `${h}%`, `${h * 0.4}%`] }}
                    transition={{ duration: 1 + (i % 3) * 0.3, repeat: Infinity, repeatType: 'reverse' }}
                    className="w-1 bg-gradient-to-t from-[#FF4E00] to-amber-300 rounded-full"
                  />
                ))}
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-28 h-1 bg-white/30 rounded-full mx-auto mt-2" />
          </motion.div>

          {/* PHONE 3: Aura Aerospace Mission Control */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotateZ: 6, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, rotateZ: 3, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ y: p3Y, rotateX: phoneTiltX, rotateY: phoneTiltY }}
            whileHover={{ scale: 1.05, rotateZ: 0 }}
            className="w-64 h-[460px] rounded-[36px] bg-black/80 border-2 border-white/20 p-3 flex flex-col justify-between shadow-[0_25px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl relative overflow-hidden group cursor-pointer"
          >
            {/* Dynamic Island */}
            <div className="w-20 h-4 bg-zinc-900 rounded-full mx-auto flex items-center justify-end px-2">
              <div className="w-1.5 h-1.5 rounded-full bg-sky-400" />
            </div>

            {/* Screen Content */}
            <div className="space-y-3 px-2">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span>ORBITAL TELEMETRY</span>
                <span className="text-sky-400 font-bold">LIVE</span>
              </div>
              <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 text-center backdrop-blur-md">
                <div className="text-[10px] font-mono text-zinc-400">Satellite Constellation</div>
                <div className="text-lg font-bold font-mono text-white mt-1">420km Alt</div>
                <div className="text-[10px] text-sky-400 font-mono mt-0.5">Velocity: 7.66 km/s</div>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 space-y-1">
                <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                  <span>DOWNLINK SIGNAL</span>
                  <span className="text-emerald-400">99.8% QOS</span>
                </div>
                <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full bg-[#FF4E00] w-4/5" />
                </div>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="w-24 h-1 bg-white/20 rounded-full mx-auto mt-2" />
          </motion.div>

        </div>

      </div>
    </section>
  );
};
