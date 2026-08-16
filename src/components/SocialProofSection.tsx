import React from 'react';
import { motion } from 'motion/react';
import { CATEGORY_MARKS } from '../data';
import { soundFx } from '../utils/audio';

export const SocialProofSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 border-y border-white/[0.08] bg-black/40 backdrop-blur-2xl overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Label */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-widest text-zinc-400 mb-2.5 bg-white/[0.04] px-3.5 py-1 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]" />
            <span>DOMAIN EXPERTISE & PRODUCT CATEGORIES</span>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.45, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-sm sm:text-base text-zinc-300 font-light"
          >
            Architected for modern technology verticals and venture-backed digital product ecosystems
          </motion.p>
        </div>

        {/* Horizontal Collection of Category Marks */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {CATEGORY_MARKS.map((mark, idx) => (
            <motion.div
              key={mark.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{
                duration: 0.4,
                delay: 0.1 + idx * 0.08,
                ease: [0.16, 1, 0.3, 1]
              }}
              onMouseEnter={() => soundFx.playTick(1100 + idx * 50)}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/[0.07] hover:border-white/20 transition-all duration-300 group cursor-default backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
            >
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-[#FF4E00] tracking-wider transition-colors duration-300 mb-1">
                {mark.code}
              </span>
              <span className="font-display font-semibold text-xs sm:text-sm text-zinc-300 group-hover:text-white transition-colors duration-300 text-center">
                {mark.name}
              </span>
              <span className="text-[9px] text-zinc-400 group-hover:text-zinc-300 text-center mt-1 transition-colors duration-300 hidden sm:block">
                {mark.desc}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
