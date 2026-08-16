import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Layers, Lightbulb, Target, MessageSquare, Zap, HeartHandshake, CheckCircle2 } from 'lucide-react';
import { WHY_BUILDIFO_POINTS } from '../data';
import { soundFx } from '../utils/audio';

export const WhyUsSection: React.FC = () => {
  const icons = [Layers, Lightbulb, Target, MessageSquare, Zap, HeartHandshake];

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
            <span>SECTION 13 • THE BUILDIFO ADVANTAGE</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Why Ambitious Founders & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Enterprises Partner with BUILDIFO
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            We operate as an extension of your leadership team, combining world-class design craft with rigorous full-stack engineering.
          </p>
        </div>

        {/* Key Strengths Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_BUILDIFO_POINTS.map((point, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <motion.div
                key={point.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: idx * 0.08 }}
                onMouseEnter={() => soundFx.playTick(1000 + idx * 50)}
                whileHover={{ y: -4 }}
                className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.08)] flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-[#FF4E00] group-hover:scale-110 transition-transform shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-mono font-bold text-zinc-500 group-hover:text-white px-3 py-1 rounded-full bg-white/5 border border-white/10 transition-colors">
                      {point.number}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-200 transition-colors">
                    {point.title}
                  </h3>
                  <div className="text-xs font-mono text-[#FF4E00] mt-1 font-medium">
                    {point.subtitle}
                  </div>

                  <p className="text-sm text-zinc-300 mt-4 font-light leading-relaxed">
                    {point.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-2 text-xs font-mono text-zinc-400">
                  <CheckCircle2 className="w-4 h-4 text-[#FF4E00]" />
                  <span>CORE PRINCIPLE</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
