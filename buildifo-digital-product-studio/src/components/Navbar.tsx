import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowUpRight, Volume2, VolumeX, Menu, X, Layers, Code2, Rocket } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface NavbarProps {
  onOpenContact: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleAudio = () => {
    const state = soundFx.toggleSound();
    setSoundEnabled(state);
  };

  const navLinks = [
    { name: 'WORK', href: '#work' },
    { name: 'SERVICES', href: '#services' },
    { name: 'PROCESS', href: '#process' },
    { name: 'ABOUT', href: '#about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto rounded-full border transition-all duration-500 px-4 sm:px-6 py-3 flex items-center justify-between ${
            scrolled
              ? 'bg-black/60 backdrop-blur-2xl border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]'
              : 'bg-white/[0.03] backdrop-blur-xl border-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]'
          }`}
        >
          {/* Logo (Appears first in 200-500ms sequence) */}
          <motion.a
            href="#"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            onMouseEnter={() => soundFx.playTick(900)}
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-white/20 via-white/10 to-[#FF4E00]/30 p-[1px] shadow-lg shadow-[#FF4E00]/15 group-hover:shadow-[#FF4E00]/30 transition-all duration-300">
              <div className="w-full h-full bg-[#080808]/90 backdrop-blur-md rounded-[11px] flex items-center justify-center border border-white/10">
                <span className="font-display font-extrabold text-sm text-transparent bg-clip-text bg-gradient-to-r from-white to-[#FF4E00]">
                  B
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-sm tracking-wider text-white flex items-center gap-1.5">
                BUILDIFO
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00] animate-pulse shadow-[0_0_8px_#FF4E00]"></span>
              </span>
              <span className="text-[10px] text-zinc-400 font-mono tracking-tight hidden sm:inline">
                STUDIO • EST. 2026
              </span>
            </div>
          </motion.a>

          {/* Desktop Nav Links (Staggered appearance) */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] backdrop-blur-xl border border-white/[0.08] rounded-full px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            {navLinks.map((link, idx) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, delay: 0.3 + idx * 0.05 }}
                  onMouseEnter={() => soundFx.playTick(1000 + idx * 100)}
                  className={`relative px-3.5 py-1 text-xs font-medium rounded-full transition-all duration-300 ${
                    isActive
                      ? 'text-white bg-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]'
                      : 'text-zinc-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="activeNavTab"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/20"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.a>
              );
            })}
          </div>

          {/* Right Controls: Sound Toggle + CTA */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Audio Toggle */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, delay: 0.45 }}
              onClick={toggleAudio}
              title={soundEnabled ? 'Disable UI Sound Synthesizer' : 'Enable Subtle UI Audio Feedback'}
              className={`p-2 rounded-full border transition-all text-xs flex items-center justify-center backdrop-blur-xl ${
                soundEnabled
                  ? 'bg-[#FF4E00]/15 border-[#FF4E00]/40 text-[#FF4E00] shadow-[0_0_12px_rgba(255,78,0,0.3)]'
                  : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
              }`}
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            </motion.button>

            {/* Magnetic Start Project CTA Button */}
            <motion.button
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              onClick={() => {
                soundFx.playSuccess();
                onOpenContact();
              }}
              onMouseEnter={() => soundFx.playTick(1200)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative group overflow-hidden rounded-full bg-[#FF4E00] hover:bg-[#FF4E00]/90 text-white font-medium text-xs px-4 py-2 sm:px-5 sm:py-2.5 flex items-center gap-2 shadow-[0_0_24px_rgba(255,78,0,0.35)] hover:shadow-[0_0_35px_rgba(255,78,0,0.55)] transition-all duration-300 border border-white/20"
            >
              <span className="relative z-10 font-semibold tracking-wide">Start a Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 relative z-10 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-[#FF4E00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 hover:text-white backdrop-blur-xl"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden pointer-events-auto max-w-lg mx-auto px-4 mt-2"
          >
            <div className="bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-2xl p-4 shadow-2xl shadow-black space-y-2">
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm text-zinc-300 hover:text-white hover:bg-white/5 font-mono"
                >
                  <span>{link.name}</span>
                  <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                </motion.a>
              ))}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenContact();
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#FF4E00] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,78,0,0.4)]"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
