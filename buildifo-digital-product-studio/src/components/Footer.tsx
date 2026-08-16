import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Github, Twitter, Linkedin, Dribbble, Globe, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const Footer: React.FC = () => {
  const [timeSF, setTimeSF] = useState('');
  const [timeLondon, setTimeLondon] = useState('');
  const [timeTokyo, setTimeTokyo] = useState('');

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();
      setTimeSF(now.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit' }));
      setTimeLondon(now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }));
      setTimeTokyo(now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit' }));
    };
    updateTimes();
    const timer = setInterval(updateTimes, 1000);
    return () => clearInterval(timer);
  }, []);

  const footerNav = [
    {
      title: 'Discipline',
      links: [
        { name: 'SaaS Architecture', href: '#services' },
        { name: 'WebGL Flagships', href: '#services' },
        { name: 'Mobile Ecosystems', href: '#services' },
        { name: 'Motion Choreography', href: '#services' },
        { name: 'Design Systems', href: '#services' },
      ]
    },
    {
      title: 'Studio & Work',
      links: [
        { name: 'Selected Projects', href: '#work' },
        { name: 'NOVA Case Study', href: '#evolution' },
        { name: '6-Phase Process', href: '#process' },
        { name: 'Studio Philosophy', href: '#about' },
        { name: 'FAQ & Pricing', href: '#faq' },
      ]
    },
    {
      title: 'Connect',
      links: [
        { name: 'Twitter / X', href: 'https://x.com', external: true },
        { name: 'GitHub', href: 'https://github.com', external: true },
        { name: 'LinkedIn', href: 'https://linkedin.com', external: true },
        { name: 'Dribbble', href: 'https://dribbble.com', external: true },
      ]
    }
  ];

  return (
    <footer className="relative bg-[#040404] border-t border-white/[0.08] pt-20 pb-12 overflow-hidden text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/[0.08]">
          
          {/* Col 1 & 2: Studio Identity & Live Clocks */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-2xl bg-[#FF4E00] p-[1px] shadow-lg shadow-[#FF4E00]/30 group-hover:rotate-6 transition-transform duration-300">
                <div className="w-full h-full bg-[#050505] rounded-[15px] flex items-center justify-center">
                  <span className="font-display font-extrabold text-sm text-[#FF4E00]">
                    B
                  </span>
                </div>
              </div>
              <div>
                <span className="font-display font-bold text-base tracking-wider text-white">
                  BUILDIFO STUDIO
                </span>
                <p className="text-xs text-zinc-500 font-mono">Digital Products • Motion Systems</p>
              </div>
            </div>

            <p className="text-xs text-zinc-400 font-light leading-relaxed max-w-sm">
              We design and engineer category-defining digital products, high-velocity SaaS applications, and fluid motion identities.
            </p>

            {/* Global Client Timezone Alignment Clocks */}
            <div className="pt-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                GLOBAL CLIENT TIMEZONE ALIGNMENT (PST • GMT • JST)
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-mono text-zinc-300">
                <div className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>PST: {timeSF || '10:00 AM'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4E00]" />
                  <span>GMT: {timeLondon || '06:00 PM'}</span>
                </div>
                <div className="flex items-center gap-1.5 bg-white/[0.04] px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  <span>JST: {timeTokyo || '02:00 AM'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          {footerNav.map((col, idx) => (
            <div key={idx} className="space-y-4">
              <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      onMouseEnter={() => soundFx.playTick(1200)}
                      className="text-xs text-zinc-400 hover:text-white transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <span className="group-hover:translate-x-1 transition-transform duration-200">{link.name}</span>
                      {link.external && <ArrowUpRight className="w-3 h-3 text-zinc-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-opacity" />}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

        </div>

        {/* Bottom Bar: PHASE 20 Calm conclusion */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © {new Date().getFullYear()} BUILDIFO STUDIO LLC. ALL RIGHTS RESERVED.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">PRIVACY POLICY</span>
            <span className="hover:text-zinc-300 transition-colors cursor-pointer">SECURITY SLA</span>
            <span className="text-emerald-400 font-bold">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
