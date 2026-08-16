import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Globe2, ShieldCheck, Cpu, Code2, Rocket, Award, Terminal } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const AboutSection: React.FC = () => {
  const statementLines = [
    "We are a modern digital technology & creative agency",
    "building products that shape the future of business.",
    "We combine design craft with technical precision."
  ];

  return (
    <section id="about" className="relative py-32 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Badge */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>SECTION 16 • ABOUT BUILDIFO</span>
          </motion.div>
        </div>

        {/* Narrative & Story Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Main Statement */}
          <div className="lg:col-span-8 space-y-6">
            <h2 className="text-3xl sm:text-5xl xl:text-6xl font-display font-extrabold text-white tracking-tight leading-[1.15]">
              {statementLines.map((line, idx) => (
                <div key={idx} className="overflow-hidden">
                  <motion.div
                    initial={{ y: '100%', opacity: 0 }}
                    whileInView={{ y: '0%', opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.65,
                      delay: 0.1 + idx * 0.15,
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
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl"
            >
              BUILDIFO was founded on the belief that the boundary between design and engineering should not exist. We partner with visionaries, early-stage startups, and global enterprises to conceptualize, engineer, and scale standout SaaS platforms, web applications, mobile ecosystems, and AI products that generate real business velocity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4"
            >
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm font-display mb-1">
                  <Terminal className="w-4 h-4 text-[#FF4E00]" />
                  <span>Principal-Led Teams</span>
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  You work directly with senior architects and design leads from kickoff to launch.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl">
                <div className="flex items-center gap-2.5 text-white font-bold text-sm font-display mb-1">
                  <Rocket className="w-4 h-4 text-emerald-400" />
                  <span>Zero Tech Debt</span>
                </div>
                <p className="text-xs text-zinc-400 font-light">
                  Modular, type-safe, and thoroughly documented codebases ready for immediate scaling.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Card: Studio Model & Culture */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-4 rounded-3xl bg-white/[0.03] border border-white/15 p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl space-y-6"
          >
            <div className="flex items-center gap-4 pb-6 border-b border-white/10">
              <div className="w-12 h-12 rounded-2xl bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] flex items-center justify-center shadow-lg">
                <Globe2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white font-display">BUILDIFO Studio</h4>
                <p className="text-xs text-zinc-400 font-mono">Distributed Digital Collective</p>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-300">
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Direct Slack & Async Comms</span>
                <span className="text-emerald-400 font-mono font-bold">ACTIVE SYNC</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Fixed-Price Milestone Sprints</span>
                <span className="text-[#FF4E00] font-mono font-bold">NO SURPRISES</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between backdrop-blur-sm">
                <span>Full IP & Source Code Transfer</span>
                <ShieldCheck className="w-4 h-4 text-sky-400" />
              </div>
            </div>

            <div className="pt-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">
                STUDIO COLLABORATION MODEL
              </div>
              <p className="text-xs text-zinc-300 mt-1 font-mono">
                Distributed Remote • Global Timezone Alignment
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
