import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { STATS } from '../data';
import { Sparkles, ShieldCheck, HeartHandshake, Award, Cpu, Code2, Globe2 } from 'lucide-react';

export const AboutAndStatsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax for supporting visual in opposite direction (PHASE 15)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const visualY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  // Animated counter hook
  const [hasAnimated, setHasAnimated] = useState(false);

  const statementLines = [
    "We believe software shouldn't just function.",
    "It should feel weightless, intuitive,",
    "and undeniably alive through motion."
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* PHASE 15: Calm Cinematic Statement Reveal (Line by line) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          
          <div className="lg:col-span-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-6 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
              <span>PHASE 15 • OUR PHILOSOPHY</span>
            </motion.div>

            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              {statementLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.7,
                      delay: 0.15 + idx * 0.15,
                      ease: [0.16, 1, 0.3, 1]
                    }}
                    className={idx === 2 ? 'text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400' : 'text-zinc-100'}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-base sm:text-lg text-zinc-300 font-light mt-8 leading-relaxed max-w-2xl"
            >
              BUILDIFO is an elite collective of senior product architects, design system leads, and motion choreographers. We operate without junior delegates, bloated overhead, or corporate hand-waving—delivering Tier-1 digital products with unmatched speed and craft.
            </motion.p>
          </div>

          {/* Supporting Parallax Visual (Moves opposite direction: Phase 15) */}
          <motion.div
            style={{ y: visualY }}
            className="lg:col-span-4 rounded-3xl bg-white/[0.04] border border-white/15 p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl space-y-4"
          >
            <div className="flex items-center gap-3 pb-4 border-b border-white/10">
              <div className="w-10 h-10 rounded-2xl bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] flex items-center justify-center">
                <Globe2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Global Studio Model</h4>
                <p className="text-xs text-zinc-400 font-mono">SF • London • Tokyo</p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-zinc-300">
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Principal-Only Engineering</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Sub-50ms Interaction Guarantee</span>
                <Cpu className="w-4 h-4 text-[#FF4E00]" />
              </div>
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Strict Non-Disclosure & IP Security</span>
                <HeartHandshake className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </motion.div>

        </div>

        {/* PHASE 16: Statistics Upward Counting Sequence */}
        <div
          onMouseEnter={() => setHasAnimated(true)}
          className="pt-16 border-t border-white/[0.08]"
        >
          <div className="mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
              PHASE 16 • VERIFIED IMPACT METRICS
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, idx) => (
              <StatCounterCard
                key={stat.id}
                stat={stat}
                delay={idx * 0.12}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

// Animated Number Counter Sub-component
const StatCounterCard: React.FC<{ stat: typeof STATS[0]; delay: number }> = ({ stat, delay }) => {
  const [count, setCount] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = stat.value;
    const duration = 1600; // ms
    const stepTime = 25;
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
      ref={cardRef}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, delay }
      }}
      viewport={{ once: true }}
      onViewportEnter={() => setInView(true)}
      className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-xl hover:border-[#FF4E00]/40 transition-all duration-300"
    >
      <div className="text-3xl sm:text-4xl font-display font-extrabold text-white flex items-center">
        {stat.prefix}
        {count}
        {stat.suffix}
      </div>
      <div className="text-xs font-mono font-bold text-[#FF4E00] mt-2">
        {stat.label}
      </div>
      <div className="text-xs text-zinc-400 font-light mt-1">
        {stat.description}
      </div>
    </motion.div>
  );
};
