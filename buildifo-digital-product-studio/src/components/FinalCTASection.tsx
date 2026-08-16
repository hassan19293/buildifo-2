import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowUpRight, Calendar, MessageSquare, ShieldCheck, Zap } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface FinalCTASectionProps {
  onOpenContact: () => void;
}

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onOpenContact }) => {
  const [isBtnHovered, setIsBtnHovered] = useState(false);

  return (
    <section id="contact" className="relative py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      
      {/* PHASE 19: Atmospheric Ambient Climax Glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 0.45, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="w-[750px] sm:w-[950px] h-[550px] bg-gradient-to-tr from-[#FF4E00]/25 via-amber-600/20 to-orange-500/15 rounded-full blur-[160px] animate-ambient-glow"
        />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* PHASE 19: Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-6 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#FF4E00] animate-pulse" />
          <span>PHASE 19 • READY TO BUILD THE FUTURE</span>
        </motion.div>

        {/* SECTION 19: Large Climax Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-display font-extrabold text-white tracking-tight leading-[1.08] mb-6 uppercase"
        >
          READY TO BUILD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
            SOMETHING EXTRAORDINARY?
          </span>
        </motion.h2>

        {/* SECTION 19: Supporting Text */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-base sm:text-xl text-zinc-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Let’s create your next digital product together.
        </motion.p>

        {/* SECTION 19: Main Climax CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto"
        >
          <motion.button
            onClick={() => {
              soundFx.playSuccess();
              onOpenContact();
            }}
            onMouseEnter={() => {
              setIsBtnHovered(true);
              soundFx.playTick(1300);
            }}
            onMouseLeave={() => setIsBtnHovered(false)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="w-full sm:w-auto relative group overflow-hidden rounded-full p-[1px] bg-[#FF4E00] shadow-[0_15px_40px_rgba(255,78,0,0.4)] hover:shadow-[0_20px_50px_rgba(255,78,0,0.6)] transition-all duration-300"
          >
            <div className="px-9 py-4 rounded-full bg-[#FF4E00] flex items-center justify-center gap-3 transition-colors duration-300">
              <span className="text-base font-bold text-white tracking-wider uppercase font-display">START A PROJECT</span>
              <ArrowUpRight className="w-5 h-5 text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>
          </motion.button>
        </motion.div>

        {/* Studio Capacity Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-zinc-300 bg-white/[0.03] px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-xl inline-flex shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>2 OF 3 SPRINT SLOTS AVAILABLE</span>
          </div>
          <span>•</span>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#FF4E00]" />
            <span>DIRECT FOUNDER / PARTNER INVOLVEMENT</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};
