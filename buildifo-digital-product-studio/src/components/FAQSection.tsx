import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FAQ_ITEMS } from '../data';
import { Sparkles, Plus, Minus, HelpCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleFAQ = (id: string) => {
    soundFx.playTick(openId === id ? 800 : 1050);
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (PHASE 18 Intro) */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>PHASE 18 • FREQUENTLY ASKED INQUIRIES</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Clarity on Process, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Stack & Collaboration
            </span>
          </h2>
        </div>

        {/* Accordion List (PHASE 18 Smooth Layout & Icon Rotation) */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden backdrop-blur-2xl ${
                  isOpen
                    ? 'bg-white/[0.06] border-white/25 shadow-[0_15px_35px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.15)]'
                    : 'bg-white/[0.03] border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group focus:outline-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-zinc-400">
                      0{idx + 1}
                    </span>
                    <span className={`text-base sm:text-lg font-display font-semibold transition-colors ${isOpen ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                      {faq.question}
                    </span>
                  </div>

                  <motion.div
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className={`p-2 rounded-full border transition-colors shrink-0 ${
                      isOpen
                        ? 'bg-[#FF4E00] border-[#FF4E00] text-white shadow-[0_0_12px_rgba(255,78,0,0.4)]'
                        : 'bg-white/[0.04] border-white/10 text-zinc-400 group-hover:text-white'
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-zinc-300 font-light leading-relaxed border-t border-white/[0.06]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
