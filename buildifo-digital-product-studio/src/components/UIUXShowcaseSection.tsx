import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Layers, Sliders, Palette, Check, MoveRight, Eye, Layout, Type, Box } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const UIUXShowcaseSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'tokens' | 'components' | 'typography'>('tokens');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const colorTokens = [
    { name: 'Brand Accent', token: '--color-brand-primary', hex: '#FF4E00', role: 'Primary CTA & Glowing Highlights' },
    { name: 'Surface 01', token: '--surface-layer-1', hex: '#0D0F12', role: 'Base Canvas Background' },
    { name: 'Glass Border', token: '--border-frosted-15', hex: 'rgba(255,255,255,0.15)', role: 'Multi-layer Translucent Borders' },
    { name: 'Emerald Active', token: '--status-active', hex: '#10B981', role: 'Telemetry & Online State' },
    { name: 'Electric Cyan', token: '--accent-cyan', hex: '#38BDF8', role: 'Telemetry Graph Peaks' },
    { name: 'Text High Contrast', token: '--text-primary', hex: '#FFFFFF', role: 'Display Headlines (WCAG AAA)' }
  ];

  const typographyScale = [
    { label: 'Display Hero', font: 'Syne / Display Extrabold', size: '72px / 1.05', tracking: '-0.03em', sample: 'Digital Precision' },
    { label: 'Section Title', font: 'Syne / Display Bold', size: '48px / 1.15', tracking: '-0.02em', sample: 'Architectural Craft' },
    { label: 'Subheading', font: 'Plus Jakarta Sans Medium', size: '20px / 1.4', tracking: '-0.01em', sample: 'Multi-tenant cloud systems designed for scale' },
    { label: 'Body Text', font: 'Plus Jakarta Sans Light', size: '16px / 1.6', tracking: 'normal', sample: 'Every pixel and micro-interaction is calibrated for seamless user ergonomics.' },
    { label: 'Data / Mono', font: 'JetBrains Mono Bold', size: '12px / 1.2', tracking: '+0.08em', sample: 'LATENCY: 18.4MS • STATUS_OK' }
  ];

  const copyToken = (token: string, hex: string) => {
    soundFx.playSuccess();
    setCopiedToken(token);
    navigator.clipboard?.writeText(hex);
    setTimeout(() => setCopiedToken(null), 2000);
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
            <span>PHASE 10 • UI/UX DESIGN & DESIGN SYSTEMS</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Systematic UI/UX Design. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Design Systems, Tokens & Wireframing
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            From atomic design token architectures to high-fidelity prototypes and user journey maps that make complex workflows effortless.
          </p>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { title: 'Design Systems', desc: 'Atomic component libraries & token engines', icon: Layout },
            { title: 'Wireframing', desc: 'Ergonomic user journey validation', icon: Box },
            { title: 'High-Fidelity UI', desc: 'Frosted glass styling with 60fps states', icon: Palette },
            { title: 'Interactive Prototypes', desc: 'Clickable end-to-end Figma workflows', icon: MoveRight }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl"
              >
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#FF4E00] mb-3">
                  <Icon className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-display">{item.title}</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Interactive Design System Visual Inspector */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white/[0.03] border border-white/15 p-6 sm:p-8 backdrop-blur-2xl shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)]"
        >
          {/* Top Inspector Bar */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/10 mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-[#FF4E00] shadow-[0_0_8px_#FF4E00]" />
              <span className="font-display font-bold text-sm text-white">BUILDIFO Design Tokens Master Repository</span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/10">
                FIGMA TOKENS SYNCED
              </span>
            </div>

            {/* Sub-tabs */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/10">
              {[
                { id: 'tokens', label: 'Color Tokens', icon: Palette },
                { id: 'components', label: 'Component Library', icon: Layout },
                { id: 'typography', label: 'Typography Scale', icon: Type }
              ].map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      soundFx.playTick(1000);
                      setActiveTab(tab.id as any);
                    }}
                    className={`flex items-center gap-2 text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all duration-300 ${
                      active
                        ? 'bg-[#FF4E00] text-white shadow-[0_0_15px_rgba(255,78,0,0.4)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Tab 1: Color Tokens & Swatches */}
          <AnimatePresence mode="wait">
            {activeTab === 'tokens' && (
              <motion.div
                key="tokens-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {colorTokens.map((c, idx) => (
                  <div
                    key={c.name}
                    onClick={() => copyToken(c.token, c.hex)}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-white/25 transition-all duration-300 group cursor-pointer relative overflow-hidden"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div
                        className="w-10 h-10 rounded-xl border border-white/20 shadow-inner flex items-center justify-center text-xs font-mono font-bold"
                        style={{ backgroundColor: c.hex }}
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white font-display">{c.name}</h4>
                        <span className="text-[10px] font-mono text-zinc-400">{c.hex}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                      <span className="truncate pr-2">{c.token}</span>
                      <span className="text-[#FF4E00] opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                        {copiedToken === c.token ? 'COPIED!' : 'CLICK TO COPY'}
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* Tab 2: Component Library Preview */}
            {activeTab === 'components' && (
              <motion.div
                key="components-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Interactive Buttons */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase">Button Variants</span>
                  <div className="space-y-2.5">
                    <button className="w-full py-2.5 px-4 rounded-full bg-[#FF4E00] text-white font-semibold text-xs shadow-[0_0_20px_rgba(255,78,0,0.35)] flex items-center justify-center gap-2">
                      <span>Primary Accent CTA</span>
                      <MoveRight className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-full py-2.5 px-4 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 backdrop-blur-md">
                      Secondary Glass Surface
                    </button>
                    <button className="w-full py-2.5 px-4 rounded-full bg-transparent hover:bg-white/5 text-zinc-400 hover:text-white font-mono text-xs border border-white/10">
                      Ghost Outline Action
                    </button>
                  </div>
                </div>

                {/* State Badges & Chips */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase">State Chips & Badges</span>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <span className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      ONLINE_ACTIVE
                    </span>
                    <span className="px-3 py-1 rounded-full bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] text-xs font-mono">
                      SYNC_PENDING
                    </span>
                    <span className="px-3 py-1 rounded-full bg-sky-500/15 border border-sky-500/30 text-sky-400 text-xs font-mono">
                      STREAM_99.8%
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-400 text-xs font-mono">
                      AI_AGENT_01
                    </span>
                  </div>
                </div>

                {/* Micro Toggles & Inputs */}
                <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-4">
                  <span className="text-xs font-mono text-zinc-400 uppercase">Interactive Form Controls</span>
                  <div className="space-y-3 pt-1">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-white">
                      <span>Telemetry Streaming</span>
                      <div className="w-9 h-5 rounded-full bg-[#FF4E00] p-0.5 flex justify-end">
                        <div className="w-4 h-4 rounded-full bg-white shadow-sm" />
                      </div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between text-xs text-white">
                      <span>Dark Theme Force</span>
                      <div className="w-9 h-5 rounded-full bg-zinc-700 p-0.5 flex justify-start">
                        <div className="w-4 h-4 rounded-full bg-zinc-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Tab 3: Typography Scale */}
            {activeTab === 'typography' && (
              <motion.div
                key="typography-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-3"
              >
                {typographyScale.map((t, idx) => (
                  <div
                    key={t.label}
                    className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-mono text-[#FF4E00] bg-[#FF4E00]/10 border border-[#FF4E00]/20 px-2.5 py-1 rounded-full shrink-0">
                        {t.size}
                      </span>
                      <div>
                        <div className="text-xs font-mono text-zinc-400">{t.label} • {t.font}</div>
                        <div className="text-lg sm:text-xl font-bold text-white mt-0.5">{t.sample}</div>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-zinc-500 shrink-0">TRACKING: {t.tracking}</span>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>

      </div>
    </section>
  );
};
