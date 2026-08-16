import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Code2, Layers, Cpu, Smartphone, SmartphoneNfc, Figma, Film, Video, Bot, Globe, Server } from 'lucide-react';
import { TECH_STACK } from '../data';
import { soundFx } from '../utils/audio';

export const TechnologySection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Atom':
      case 'Globe':
        return <Globe className="w-5 h-5 text-sky-400" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-white" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-blue-400" />;
      case 'Server':
        return <Server className="w-5 h-5 text-emerald-400" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-cyan-400" />;
      case 'SmartphoneNfc':
        return <SmartphoneNfc className="w-5 h-5 text-teal-400" />;
      case 'Figma':
        return <Figma className="w-5 h-5 text-purple-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-pink-400" />;
      case 'Video':
        return <Video className="w-5 h-5 text-rose-400" />;
      case 'Bot':
        return <Bot className="w-5 h-5 text-[#FF4E00]" />;
      default:
        return <Cpu className="w-5 h-5 text-white" />;
    }
  };

  return (
    <section className="relative py-24 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
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
            <span>SECTION 12 • MODERN TECHNOLOGY STACK</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Engineered on Battle-Tested Foundations. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Modern Full-Stack Technologies
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            We build with the fastest, most scalable frameworks, creative toolkits, and AI models available.
          </p>
        </div>

        {/* Clean Tech Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {TECH_STACK.map((tech, idx) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onMouseEnter={() => soundFx.playTick(1100 + idx * 30)}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/20 transition-all duration-300 backdrop-blur-xl group flex flex-col justify-between shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.06)]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {getIcon(tech.icon)}
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase">
                    {tech.category}
                  </span>
                </div>

                <h3 className="text-base font-bold font-display text-white group-hover:text-[#FF4E00] transition-colors">
                  {tech.name}
                </h3>
                <p className="text-xs text-zinc-400 mt-2 font-light line-clamp-2">
                  {tech.description}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-zinc-500">
                <span>PRODUCTION READY</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
