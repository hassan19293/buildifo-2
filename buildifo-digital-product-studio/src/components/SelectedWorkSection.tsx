import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Sparkles, ExternalLink, Filter } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { soundFx } from '../utils/audio';

interface SelectedWorkSectionProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorkSection: React.FC<SelectedWorkSectionProps> = ({ onSelectProject }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const categories = ['All', 'SaaS', 'Mobile', 'Video', 'AI', 'E-commerce'];

  const filteredProjects = selectedFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 16;
    setMousePos({ x, y });
  };

  return (
    <section id="work" className="relative py-28 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header: PHASE 06 intro */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
              <span>PHASE 06 • SELECTED WORK</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight"
            >
              Crafted with Precision. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
                Engineered for Impact.
              </span>
            </motion.h2>
          </div>

          {/* Filter Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map(cat => {
              const active = selectedFilter === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    soundFx.playTick(950);
                    setSelectedFilter(cat);
                  }}
                  className={`text-xs px-4 py-2 rounded-full font-medium transition-all duration-300 backdrop-blur-xl ${
                    active
                      ? 'bg-[#FF4E00] text-white shadow-[0_0_20px_rgba(255,78,0,0.35)] border border-white/20'
                      : 'bg-white/[0.03] hover:bg-white/[0.08] text-zinc-300 hover:text-white border border-white/10'
                  }`}
                >
                  {cat === 'All' ? 'All Work' : cat}
                </button>
              );
            })}
          </motion.div>
        </div>

        {/* Projects Grid: PHASE 06 sequence & PHASE 07 hover physics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, idx) => {
            const isHovered = hoveredProjectId === project.id;
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                onMouseEnter={() => {
                  setHoveredProjectId(project.id);
                  soundFx.playTick(1000);
                }}
                onMouseLeave={() => {
                  setHoveredProjectId(null);
                  setMousePos({ x: 0, y: 0 });
                }}
                onMouseMove={handleCardMouseMove}
                onClick={() => {
                  soundFx.playSwoosh();
                  onSelectProject(project);
                }}
                className="group relative rounded-3xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-white/25 p-6 sm:p-8 backdrop-blur-2xl cursor-pointer transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.1)]"
              >
                {/* Subtle Ambient Card Glow */}
                <div
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-0 group-hover:opacity-25 transition-opacity duration-500 pointer-events-none"
                  style={{ backgroundColor: project.accentColor || '#FF4E00' }}
                />

                {/* Top Info: 1. Project number, 2. Category */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15 backdrop-blur-md">
                      {project.number}
                    </span>
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {project.category}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-zinc-500">
                    {project.year}
                  </div>
                </div>

                {/* 3. Project Title (Moves 4-8px on hover: Phase 07 200-400ms) */}
                <motion.div
                  animate={{ x: isHovered ? 6 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                  className="mb-4"
                >
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-orange-200 transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-sm text-zinc-300 mt-1 font-light">
                    {project.tagline}
                  </p>
                </motion.div>

                {/* 4. Large Image Preview (Delayed entrance + Phase 07 Hover Physics) */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden my-4 bg-black/60 border border-white/10">
                  <motion.img
                    src={project.heroImage}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                      x: isHovered ? mousePos.x : 0,
                      y: isHovered ? mousePos.y : 0
                    }}
                    transition={{
                      scale: { duration: 0.4, ease: 'easeOut' },
                      x: { duration: 0.2, ease: 'easeOut' },
                      y: { duration: 0.2, ease: 'easeOut' }
                    }}
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  {/* Subtle Gradient Vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
                  
                  {/* Hover Tag overlay */}
                  <div className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-xl px-3.5 py-1.5 rounded-full border border-white/15 text-[10px] font-mono text-zinc-200 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]" />
                    CLICK FOR CASE STUDY
                  </div>
                </div>

                {/* 5. Description & Metrics */}
                <div className="mt-4 pt-4 border-t border-white/[0.08] flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    {project.metrics.slice(0, 2).map((metric, mIdx) => (
                      <div key={mIdx}>
                        <div className="text-base font-bold font-display text-white">
                          {metric.value}
                        </div>
                        <div className="text-[10px] font-mono text-zinc-400">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 6. Arrow with Hover motion (250–450ms) */}
                  <motion.div
                    animate={{
                      x: isHovered ? 4 : 0,
                      y: isHovered ? -4 : 0,
                      scale: isHovered ? 1.15 : 1
                    }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="p-3 rounded-full bg-white/[0.05] group-hover:bg-[#FF4E00] text-zinc-300 group-hover:text-white border border-white/10 group-hover:border-[#FF4E00] transition-colors duration-300 shadow-lg"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
