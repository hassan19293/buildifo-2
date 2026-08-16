import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'motion/react';
import { STATS } from '../data';
import { Sparkles, TrendingUp, CheckCircle2 } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const StatsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>SECTION 14 • STUDIO CAPABILITIES & STANDARDS</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Defined by High Engineering Standards
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-3 font-light">
            Architectural benchmarks, technical precision, and core capabilities that drive our digital craftsmanship.
          </p>
        </div>

        {/* Statistics Grid with Animated Count Up */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((stat, idx) => (
            <StatCounterCard
              key={stat.id}
              stat={stat}
              delay={idx * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

interface StatCounterCardProps {
  stat: typeof STATS[0];
  delay: number;
}

const StatCounterCard: React.FC<StatCounterCardProps> = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 1500;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = end / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView, stat.value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onViewportEnter={() => setInView(true)}
      transition={{ duration: 0.5, delay }}
      onMouseEnter={() => soundFx.playTick(1200)}
      whileHover={{ y: -4 }}
      className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between group"
    >
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-mono text-[#FF4E00] uppercase tracking-wider bg-[#FF4E00]/10 px-2.5 py-1 rounded-full border border-[#FF4E00]/20">
            CORE CAPABILITY
          </span>
          <TrendingUp className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
        </div>

        <div className="text-4xl sm:text-5xl font-display font-extrabold text-white flex items-center tracking-tight">
          <span>{count}</span>
          <span className="text-[#FF4E00]">{stat.suffix}</span>
        </div>

        <div className="text-base font-bold font-display text-white mt-2 group-hover:text-orange-200 transition-colors">
          {stat.label}
        </div>

        <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
          {stat.description}
        </p>
      </div>

      <div className="pt-4 mt-6 border-t border-white/5 flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
        <span>ARCHITECTURAL STANDARD</span>
      </div>
    </motion.div>
  );
};
