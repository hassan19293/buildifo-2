import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, ChevronUp, ChevronDown, Compass, Play, Zap, Info } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const MotionHUD: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPhase, setCurrentPhase] = useState<{ number: string; title: string; desc: string }>({
    number: '01',
    title: 'Cinematic Entrance & Hero',
    desc: '0ms–2400ms entrance sequence with 3D depth parallax'
  });

  const phases = [
    { number: '01–04', title: 'Page Load & Hero 3D Parallax', hash: '#hero', desc: 'Timed 0–2400ms entrance, depth layers & magnetic CTA' },
    { number: '05', title: 'Social Proof Stagger', hash: '#work', desc: '80–120ms staggered logo reveals' },
    { number: '06–07', title: 'Selected Work & Hover Physics', hash: '#work', desc: 'Sequential project intro with delayed visual reveal' },
    { number: '08', title: 'Sticky Project Evolution', hash: '#evolution', desc: 'Wireframe ➔ UI ➔ Mobile ➔ Production' },
    { number: '09', title: 'Interactive Services Matrix', hash: '#services', desc: 'Tone shift & 400–700ms morphing visuals' },
    { number: '10–13', title: 'Domain Showcases (SaaS, Web, Mobile, Video)', hash: '#showcases', desc: 'Layered 3D browsers, tilted phones & NLE video suite' },
    { number: '14', title: '6-Phase Process Pipeline', hash: '#process', desc: 'Active step progression & deliverables' },
    { number: '15–16', title: 'Philosophy & Stat Counters', hash: '#about', desc: 'Line-by-line typography & upwards counting numbers' },
    { number: '17', title: 'Testimonials Carousel', hash: '#faq', desc: 'Fluid horizontal slide & rating transitions' },
    { number: '18', title: 'FAQ Accordion', hash: '#faq', desc: 'Smooth height animation & rotating icons' },
    { number: '19–20', title: 'Final Climax CTA & Calm Footer', hash: '#contact', desc: 'Ambient atmospheric glow & global world clocks' }
  ];

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Expanded HUD Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mb-3 w-80 sm:w-96 rounded-3xl bg-black/75 border border-white/15 p-4 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl text-white space-y-3"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#FF4E00] animate-pulse" />
                <span className="text-xs font-mono font-bold text-zinc-200">
                  MASTER MOTION JOURNEY (20 PHASES)
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#FF4E00]">120 FPS</span>
            </div>

            <div className="max-h-64 overflow-y-auto space-y-1.5 pr-1">
              {phases.map((ph, idx) => (
                <a
                  key={idx}
                  href={ph.hash}
                  onClick={() => {
                    soundFx.playTick(1000 + idx * 50);
                    setIsOpen(false);
                  }}
                  className="block p-2.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-[#FF4E00]/50 transition-colors group backdrop-blur-md"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-white group-hover:text-[#FF4E00] transition-colors">
                      PHASE {ph.number}: {ph.title}
                    </span>
                    <span className="text-[9px] font-mono text-zinc-500 group-hover:text-zinc-300">JUMP ➔</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 font-light mt-0.5">{ph.desc}</p>
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 text-[10px] font-mono text-zinc-400 flex items-center justify-between">
              <span>CHOREOGRAPHY: HARDWARE ACCELERATED</span>
              <span className="text-emerald-400">WCAG AA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating HUD Trigger Button */}
      <button
        onClick={() => {
          soundFx.playTick(1200);
          setIsOpen(!isOpen)}
        }
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/80 border border-white/15 hover:border-white/30 shadow-[0_10px_30px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] backdrop-blur-2xl transition-all duration-300 group"
      >
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF4E00] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF4E00]"></span>
        </span>
        <span className="text-[11px] font-mono text-zinc-300 group-hover:text-white font-medium">
          Motion Flow Navigator
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-zinc-400" /> : <ChevronUp className="w-3.5 h-3.5 text-zinc-400" />}
      </button>
    </div>
  );
};
