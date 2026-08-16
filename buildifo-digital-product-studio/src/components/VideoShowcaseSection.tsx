import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, Pause, Volume2, Sliders, Film, Layers, Scissors, Wand2, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const VideoShowcaseSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scrubPosition, setScrubPosition] = useState<number>(45);
  const [selectedLUT, setSelectedLUT] = useState<'cinematic' | 'noir' | 'cyberpunk'>('cinematic');

  // Auto scrub timeline when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setScrubPosition(prev => (prev >= 98 ? 2 : prev + 0.4));
    }, 50);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlayback = () => {
    soundFx.playTick(isPlaying ? 600 : 1200);
    setIsPlaying(!isPlaying);
  };

  const lutFilters = {
    cinematic: 'contrast(115%) saturate(125%) hue-rotate(-5deg)',
    noir: 'grayscale(100%) contrast(140%) brightness(95%)',
    cyberpunk: 'saturate(180%) hue-rotate(30deg) contrast(120%)'
  };

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
            <span>PHASE 13 • VIDEO & MOTION CHOREOGRAPHY SHOWCASE</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Cinematic Non-Linear Editing. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Browser-Native Video & Motion Suite
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            Interactive non-linear timeline simulation with real-time audio waveform mastering, WebGPU color grading LUTs, and multi-track keyframing.
          </p>
        </div>

        {/* PHASE 13: Video NLE Editor Master Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-white/[0.03] border border-white/15 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl relative"
        >
          {/* Top NLE Window Bar */}
          <div className="flex flex-wrap items-center justify-between pb-4 border-b border-white/10 mb-4 gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              </div>
              <span className="text-xs font-mono font-bold text-white">VORTEX STUDIO NLE v4.2</span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded-md backdrop-blur-md">
                4K UHD 60FPS • PRORES 4444 XQ
              </span>
            </div>

            {/* LUT Switcher */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-400">COLOR LUT:</span>
              {(['cinematic', 'noir', 'cyberpunk'] as const).map(lut => (
                <button
                  key={lut}
                  onClick={() => {
                    soundFx.playTick(1100);
                    setSelectedLUT(lut);
                  }}
                  className={`text-[10px] font-mono px-3 py-1 rounded-full transition-colors backdrop-blur-md ${
                    selectedLUT === lut
                      ? 'bg-[#FF4E00] text-white font-bold shadow-[0_0_15px_rgba(255,78,0,0.35)]'
                      : 'bg-white/[0.04] border border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.08]'
                  }`}
                >
                  {lut.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Video Preview Canvas (Reveals First) */}
          <div className="relative aspect-[21/9] sm:aspect-[16/8] rounded-2xl overflow-hidden bg-black border border-white/10 group mb-4 shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80"
              alt="Video Timeline Preview"
              referrerPolicy="no-referrer"
              loading="lazy"
              style={{ filter: lutFilters[selectedLUT] }}
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Play/Pause Center Overlay */}
            <div
              onClick={togglePlayback}
              className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors cursor-pointer"
            >
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#FF4E00] hover:bg-[#FF4E00]/90 text-white flex items-center justify-center shadow-2xl shadow-[#FF4E00]/50 backdrop-blur-md transition-colors"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
              </motion.button>
            </div>

            {/* Timecode HUD */}
            <div className="absolute bottom-3 left-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-xs font-mono text-white flex items-center gap-3">
              <span className="text-[#FF4E00]">
                {Math.floor(scrubPosition / 25)}:
                {String(Math.floor(scrubPosition % 60)).padStart(2, '0')}:
                {String(Math.floor((scrubPosition * 30) % 30)).padStart(2, '0')}
              </span>
              <span className="text-zinc-500">|</span>
              <span className="text-zinc-400">00:03:45:00 TOTAL</span>
            </div>

            <div className="absolute top-3 right-4 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md border border-white/10 text-[10px] font-mono text-emerald-400 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              WEBGPU RENDER ENGINE ACTIVE
            </div>
          </div>

          {/* Video Timeline & Audio Waveforms (Reveals after video frame) */}
          <div className="space-y-2 bg-black/60 p-3 sm:p-4 rounded-2xl border border-white/10 backdrop-blur-md">
            
            {/* Timeline Scrubber Ruler */}
            <div
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const pos = ((e.clientX - rect.left) / rect.width) * 100;
                setScrubPosition(Math.max(0, Math.min(100, pos)));
              }}
              className="relative h-6 bg-white/[0.04] rounded-lg cursor-pointer flex items-center px-2 overflow-hidden select-none"
            >
              <div className="flex justify-between w-full text-[9px] font-mono text-zinc-500">
                <span>00:00</span>
                <span>00:30</span>
                <span>01:00</span>
                <span>01:30</span>
                <span>02:00</span>
                <span>02:30</span>
                <span>03:00</span>
              </div>
              {/* Playhead Marker */}
              <div
                style={{ left: `${scrubPosition}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#FF4E00] z-20 shadow-[0_0_8px_#FF4E00]"
              >
                <div className="w-3 h-3 bg-[#FF4E00] rounded-sm -translate-x-[5px] -translate-y-1 rotate-45" />
              </div>
            </div>

            {/* Video Track 01 */}
            <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center px-3 justify-between relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-2 z-10">
                <Film className="w-3.5 h-3.5 text-[#FF4E00]" />
                <span className="text-[10px] font-mono text-zinc-200">V1 • MAIN_HERO_TAKEOFF.MOV</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 z-10">PRORES 4444</span>
              <div
                style={{ left: `${scrubPosition}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#FF4E00] z-20"
              />
            </div>

            {/* Video Track 02 (FX & Titles) */}
            <div className="h-8 rounded-xl bg-white/[0.03] border border-white/10 flex items-center px-3 justify-between relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-2 z-10">
                <Wand2 className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[10px] font-mono text-sky-200">V2 • MOTION_CHOREOGRAPHY_OVERLAYS</span>
              </div>
              <span className="text-[9px] font-mono text-zinc-400 z-10">ALPHA CHANNEL</span>
              <div
                style={{ left: `${scrubPosition}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#FF4E00] z-20"
              />
            </div>

            {/* Audio Track A1 (Waveform oscillations) */}
            <div className="h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center px-3 relative overflow-hidden backdrop-blur-sm">
              <div className="flex items-center gap-2 z-10 mr-4">
                <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-mono text-amber-200">A1 • MASTER_SCORE_5.1</span>
              </div>
              
              {/* Waveform Visualization */}
              <div className="flex-1 flex items-center justify-around h-6 gap-0.5">
                {[40, 70, 90, 60, 30, 80, 100, 75, 45, 95, 80, 60, 40, 85, 95, 70, 50, 80, 100, 65, 45, 80, 90, 60, 40, 85].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isPlaying ? [`${h * 0.3}%`, `${h}%`, `${h * 0.5}%`] : `${h * 0.6}%`
                    }}
                    transition={{
                      duration: 0.8 + (i % 3) * 0.2,
                      repeat: Infinity,
                      repeatType: 'reverse'
                    }}
                    className="w-1 bg-gradient-to-t from-[#FF4E00] to-amber-300 rounded-full opacity-80"
                  />
                ))}
              </div>

              <div
                style={{ left: `${scrubPosition}%` }}
                className="absolute top-0 bottom-0 w-0.5 bg-[#FF4E00] z-20"
              />
            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
