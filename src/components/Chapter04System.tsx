import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SYSTEM_LAYERS } from '../data/systemLayers';
import { SystemLayerData, CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface Chapter04SystemProps {
  setCursorState: (state: CursorState, text?: string) => void;
  onProceedToStudio: () => void;
  onSelectLayerIndex?: (index: number) => void;
}

export const Chapter04System: React.FC<Chapter04SystemProps> = ({
  setCursorState,
  onProceedToStudio,
  onSelectLayerIndex,
}) => {
  const [activeLayer, setActiveLayer] = useState<SystemLayerData>(SYSTEM_LAYERS[0]);
  const [hoveredLayerId, setHoveredLayerId] = useState<string | null>(null);

  const handleSelectLayer = (layer: SystemLayerData, index: number) => {
    soundEngine.playClick(750);
    setActiveLayer(layer);
    if (onSelectLayerIndex) {
      onSelectLayerIndex(index);
    }
  };

  return (
    <section
      id="system"
      className="relative min-h-[160vh] bg-[#0c0c0b]/85 text-[#F5F3EE] py-28 sm:py-36 overflow-hidden backdrop-blur-[2px]"
    >
      {/* Industrial Overhead Functional Spotlight */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none opacity-25"
        style={{
          background: 'radial-gradient(ellipse at top, rgba(245, 243, 238, 0.4) 0%, rgba(200, 255, 0, 0.03) 40%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-12">
        {/* Chapter Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/10 pb-6 mb-16 sm:mb-20">
          <div className="flex items-center gap-3">
            {/* The Restrained Pilot Indicator LED */}
            <div className="w-2 h-2 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_10px_#C8FF00] animate-pulse" />
            <span className="inter text-[11px] uppercase tracking-[0.2em] font-bold text-[#F5F3EE]">
              Chapter 04: System Architecture
            </span>
          </div>
          <div className="inter text-[10px] sm:text-[11px] uppercase tracking-[0.2em] font-semibold text-[#A6A39B]/70 mt-2 sm:mt-0">
            Material: Brushed Titanium, Anodized Steel & Embedded Relays
          </div>
        </div>

        {/* Section Intro */}
        <div className="max-w-2xl mb-16">
          <h2 className="big-shoulders text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-[#F5F3EE] uppercase leading-[0.95]">
            Engineered layer by layer.
          </h2>
          <p className="inter text-sm sm:text-base text-[#A6A39B] mt-4 leading-relaxed font-normal">
            A deterministic technology stack where sensory interface, local cache engines, and edge neural pipelines act as unified physical plates with zero cloud latency dependencies.
          </p>
        </div>

        {/* The Machine Table & 5 Interactive Physical Plates */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Left Column: Physical Machine Rack / Layer Stack */}
          <div className="lg:col-span-5 space-y-3 w-full">
            <div className="inter text-[9px] font-bold tracking-widest text-[#A6A39B] uppercase mb-4 flex items-center justify-between">
              <span>SELECT PHYSICAL PLATE TO ACTUATE IN 3D</span>
              <span>5 HARDWARE TIERS</span>
            </div>

            {SYSTEM_LAYERS.map((layer, idx) => {
              const isSelected = activeLayer.id === layer.id;
              const isHovered = hoveredLayerId === layer.id;

              return (
                <motion.div
                  key={layer.id}
                  onClick={() => handleSelectLayer(layer, idx)}
                  onMouseEnter={() => {
                    setHoveredLayerId(layer.id);
                    setCursorState('inspect', 'PLATE');
                  }}
                  onMouseLeave={() => {
                    setHoveredLayerId(null);
                    setCursorState('default');
                  }}
                  animate={{
                    x: isSelected ? 12 : isHovered ? 4 : 0,
                    scale: isSelected ? 1.01 : 1,
                  }}
                  transition={{ type: 'spring', damping: 25, stiffness: 350 }}
                  className={`relative p-4 sm:p-5 border cursor-pointer select-none transition-all duration-300 min-h-[48px] ${
                    isSelected
                      ? 'bg-[#181816] border-[#F5F3EE]/50 shadow-2xl z-20'
                      : 'bg-[#10100f]/90 border-white/10 hover:border-white/25 hover:bg-[#141412]'
                  }`}
                >
                  {/* Left Contact Pin / Accent Accent */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${
                      isSelected ? 'bg-[#C8FF00]' : 'bg-transparent'
                    }`}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <span
                        className={`text-xs font-mono-tech font-bold ${
                          isSelected ? 'text-[#C8FF00]' : 'text-[#A6A39B]'
                        }`}
                      >
                        {layer.index}
                      </span>
                      <div>
                        <h4
                          className={`big-shoulders text-2xl sm:text-3xl font-black tracking-tight uppercase ${
                            isSelected ? 'text-[#F5F3EE]' : 'text-[#A6A39B]'
                          }`}
                        >
                          {layer.name}
                        </h4>
                        <div className="inter text-[10px] tracking-wider text-[#A6A39B]/70 uppercase font-semibold">
                          {layer.category}
                        </div>
                      </div>
                    </div>

                    <div className="inter text-[9px] font-bold tracking-widest uppercase text-right">
                      {isSelected ? (
                        <span className="text-[#C8FF00] flex items-center gap-1.5 font-medium">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00] inline-block shadow-[0_0_4px_#C8FF00]" />
                          ACTUATED 3D
                        </span>
                      ) : (
                        <span className="text-[#A6A39B]/50">RACKED</span>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Physical Plate Inspection Deck & Telemetry */}
          <div className="lg:col-span-7 w-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayer.id}
                initial={{ opacity: 0, y: 15, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -15, scale: 0.98 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="bg-[#141412]/95 border border-white/15 p-5 sm:p-8 relative shadow-2xl w-full"
              >
                {/* Physical Plate Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b border-white/10 pb-5 sm:pb-6 mb-6 gap-3">
                  <div>
                    <div className="flex items-center gap-2 inter text-[10px] font-bold tracking-widest text-[#C8FF00] uppercase">
                      <span>INSPECTING LAYER {activeLayer.index}</span>
                      <span>/</span>
                      <span>05</span>
                    </div>
                    <h3 className="big-shoulders text-3xl sm:text-5xl font-black tracking-tight text-[#F5F3EE] uppercase mt-1">
                      {activeLayer.name}
                    </h3>
                  </div>

                  <div className="sm:text-right">
                    <span className="inter text-[9px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                      SURFACE FINISH
                    </span>
                    <span className="inter text-xs text-[#F5F3EE] font-semibold block mt-0.5">
                      {activeLayer.materialFinish}
                    </span>
                  </div>
                </div>

                {/* Tactical Machine Visualization Screen */}
                <div className="w-full h-[340px] sm:h-[400px] bg-[#0c0c0b] border border-white/10 relative overflow-hidden mb-6 flex flex-col justify-between p-4 sm:p-6 select-none">
                  {/* Technical Coordinate Grid Overlay */}
                  <div
                    className="absolute inset-0 opacity-15 pointer-events-none"
                    style={{
                      backgroundImage: 'linear-gradient(to right, #F5F3EE 1px, transparent 1px), linear-gradient(to bottom, #F5F3EE 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Top Schematic Status Bar */}
                  <div className="relative z-10 flex items-center justify-between inter text-[9px] font-mono-tech tracking-widest uppercase">
                    <div className="flex items-center gap-2 text-[#C8FF00]">
                      <span className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
                      <span>BUS ONLINE // 512-BIT EDGE NODE</span>
                    </div>
                    <span className="text-[#A6A39B]">SLOT {activeLayer.index}-ALPHA</span>
                  </div>

                  {/* Center Architectural Plate Wireframe */}
                  <div className="relative z-10 my-auto text-center space-y-3">
                    <div className="inline-block px-4 py-1.5 border border-[#C8FF00]/40 bg-[#C8FF00]/5 text-[#C8FF00] font-mono-tech text-[11px] uppercase tracking-widest font-bold">
                      {activeLayer.name} HARDWARE STACK
                    </div>
                    <div className="big-shoulders text-2xl sm:text-3xl font-black text-[#F5F3EE] uppercase tracking-wide">
                      {activeLayer.category}
                    </div>
                    <p className="inter text-[11px] sm:text-xs text-[#A6A39B] max-w-sm mx-auto">
                      Deterministic execution loop running at zero-cloud dependency edge node.
                    </p>
                  </div>

                  {/* Bottom Telemetry Mini-Oscilloscope Strip */}
                  <div className="relative z-10 flex items-center justify-between border-t border-white/10 pt-3 inter text-[9px] font-mono-tech uppercase text-[#A6A39B]">
                    <span>LATENCY: 0.24ms</span>
                    <span className="text-[#C8FF00]">PASS THROUGH / 100% HEALTH</span>
                    <span>TEMP: 38°C</span>
                  </div>
                </div>

                {/* Layer Description Stacked Below */}
                <div className="space-y-4 mb-8">
                  <p className="inter text-sm sm:text-base text-[#F5F3EE]/90 leading-relaxed">
                    {activeLayer.description}
                  </p>
                  <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed italic border-l border-white/20 pl-4">
                    {activeLayer.architectureNotes}
                  </p>
                </div>

                {/* Hard Hardware Specs */}
                <div className="mb-8">
                  <div className="inter text-[9px] font-bold tracking-widest text-[#A6A39B] uppercase mb-3">
                    HARDWARE & RUNTIME SPECIFICATIONS
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {activeLayer.specs.map((spec, i) => (
                      <div
                        key={i}
                        className="bg-[#0c0c0b] p-3 border border-white/10 space-y-1"
                      >
                        <span className="inter text-[9px] font-bold text-[#A6A39B] uppercase block">
                          {spec.label}
                        </span>
                        <span className="font-mono-tech text-xs font-semibold text-[#F5F3EE] block">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Live Deterministic Telemetry Stream */}
                <div>
                  <div className="inter text-[9px] font-bold tracking-widest text-[#A6A39B] uppercase mb-3 flex items-center justify-between">
                    <span>LIVE BUS TELEMETRY CHANNELS</span>
                    <span className="text-[#C8FF00] text-[8px] uppercase font-bold">ACTIVE STREAM</span>
                  </div>
                  <div className="space-y-2">
                    {activeLayer.telemetryStream.map((t, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between bg-[#0e0e0d] px-3.5 py-2 border border-white/5 text-xs font-mono-tech min-h-[44px]"
                      >
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C8FF00]/80" />
                          <span className="text-[#A6A39B]">{t.metric}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] text-[#A6A39B]/60 uppercase">{t.status}</span>
                          <span className="text-[#F5F3EE] font-semibold">{t.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Transition prompt toward Studio 05 */}
        <div className="mt-24 pt-8 border-t border-white/10 flex items-center justify-between">
          <span className="inter text-[10px] font-semibold tracking-widest text-[#A6A39B] uppercase">
            MOVING TO: PHYSICAL STUDIO & ATELIER 05
          </span>
          <button
            onClick={() => {
              soundEngine.playPaper();
              onProceedToStudio();
            }}
            onMouseEnter={() => setCursorState('view', 'STUDIO')}
            onMouseLeave={() => setCursorState('default')}
            className="group flex items-center gap-3 inter text-[10px] font-bold tracking-[0.2em] text-[#F5F3EE] uppercase hover:text-[#C8FF00] transition-colors cursor-pointer border-b border-white/20 pb-0.5"
          >
            <span>ENTER ATELIER</span>
            <span className="w-4 h-[1px] bg-current group-hover:w-8 transition-all duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
};
