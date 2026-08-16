import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '../data';
import { Sparkles, ChevronLeft, ChevronRight, Quote, Star, CheckCircle } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const prevTestimonial = () => {
    soundFx.playTick(900);
    setDirection(-1);
    setCurrentIndex(prev => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextTestimonial = () => {
    soundFx.playTick(1100);
    setDirection(1);
    setCurrentIndex(prev => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (PHASE 17 Intro) */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
              <span>PHASE 17 • CLIENT PERSPECTIVES & FEEDBACK</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
              Voices of Collaboration. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
                Design & Engineering Reviews
              </span>
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevTestimonial}
              className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white transition-colors flex items-center justify-center group backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
            </button>
            <span className="text-xs font-mono text-zinc-400">
              0{currentIndex + 1} / 0{TESTIMONIALS.length}
            </span>
            <button
              onClick={nextTestimonial}
              className="p-3 rounded-full bg-white/[0.04] hover:bg-white/[0.1] border border-white/10 text-white transition-colors flex items-center justify-center group backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* PHASE 17: Fluid Card Slider (400–600ms horizontal slide + fade + settle) */}
        <div className="relative min-h-[320px] sm:min-h-[280px] flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={current.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -direction * 40, filter: 'blur(4px)' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full rounded-3xl bg-white/[0.04] border border-white/15 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Left: Quote & Impact */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-lg sm:text-2xl font-light text-zinc-100 leading-relaxed italic">
                    "{current.quote}"
                  </p>

                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-emerald-400 backdrop-blur-md">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Execution Focus: {current.metrics}</span>
                  </div>
                </div>

                {/* Right: Author Identity */}
                <div className="lg:col-span-4 lg:border-l lg:border-white/10 lg:pl-8 flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20 shadow-lg"
                  />
                  <div>
                    <h4 className="text-base font-bold font-display text-white">
                      {current.author}
                    </h4>
                    <p className="text-xs text-zinc-400">
                      {current.role}
                    </p>
                    <p className="text-xs font-mono text-[#FF4E00] font-medium mt-0.5">
                      {current.company}
                    </p>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
