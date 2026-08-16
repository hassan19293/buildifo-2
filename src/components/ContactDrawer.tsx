import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { CursorState } from '../types';
import { soundEngine } from '../utils/soundEngine';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  setCursorState: (state: CursorState, text?: string) => void;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  setCursorState,
}) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    scope: 'Spatial Web Application',
    timeline: 'Q3/Q4 2026',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playThud();
    setFormSubmitted(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#080808]/90 backdrop-blur-md flex justify-end">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            soundEngine.playClick(600);
            onClose();
          }}
          className="fixed inset-0 cursor-pointer"
        />

        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="relative w-full max-w-xl min-h-screen bg-[#141412] text-[#F5F3EE] border-l border-white/15 p-6 sm:p-12 z-10 shadow-2xl overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_8px_#C8FF00]" />
              <span className="text-[10px] font-mono-tech tracking-widest text-[#A6A39B] uppercase">
                STUDIO COMMISSION BRIEF
              </span>
            </div>

            <button
              onClick={() => {
                soundEngine.playClick(500);
                onClose();
              }}
              onMouseEnter={() => setCursorState('close', 'CLOSE')}
              onMouseLeave={() => setCursorState('default')}
              className="p-2 border border-white/15 hover:border-white/40 text-[#F5F3EE] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {formSubmitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-16 text-center space-y-6"
            >
              <div className="w-12 h-12 rounded-full bg-[#1e1e1b] border border-[#C8FF00] text-[#C8FF00] mx-auto flex items-center justify-center">
                <Check className="w-6 h-6" />
              </div>
              <h3 className="big-shoulders text-4xl font-black uppercase tracking-tight text-[#F5F3EE]">
                BRIEF TRANSMITTED
              </h3>
              <p className="inter text-xs sm:text-sm text-[#A6A39B] leading-relaxed max-w-md mx-auto">
                Your commission parameters have been logged at the studio desk. A principal partner will review the architectural scope and respond within 24 hours.
              </p>
              <div className="pt-6">
                <button
                  onClick={() => {
                    setFormSubmitted(false);
                    onClose();
                  }}
                  className="px-6 py-2.5 bg-[#F5F3EE] text-[#080808] inter text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
                >
                  RETURN TO DIGITAL ENVIRONMENT
                </button>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="big-shoulders text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F3EE] mb-2">
                  Initiate Commission
                </h3>
                <p className="inter text-xs text-[#A6A39B] leading-relaxed">
                  Provide project parameters to determine studio alignment and engineering schedule.
                </p>
              </div>

              {/* Name */}
              <div className="space-y-1.5">
                <label className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                  LEAD STAKEHOLDER NAME *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Elena Rostova"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-white/15 px-4 py-3 min-h-[44px] text-xs text-[#F5F3EE] inter placeholder:text-[#A6A39B]/40 focus:border-[#C8FF00] focus:outline-none transition-colors"
                />
              </div>

              {/* Organization */}
              <div className="space-y-1.5">
                <label className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                  ORGANIZATION / ENTITY
                </label>
                <input
                  type="text"
                  placeholder="e.g. Applied Cognition Group"
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-white/15 px-4 py-3 min-h-[44px] text-xs text-[#F5F3EE] inter placeholder:text-[#A6A39B]/40 focus:border-[#C8FF00] focus:outline-none transition-colors"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                  TRANSMISSION CHANNEL (EMAIL) *
                </label>
                <input
                  required
                  type="email"
                  placeholder="e.g. partner@studio.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-white/15 px-4 py-3 min-h-[44px] text-xs text-[#F5F3EE] inter placeholder:text-[#A6A39B]/40 focus:border-[#C8FF00] focus:outline-none transition-colors"
                />
              </div>

              {/* Commission Scope */}
              <div className="space-y-1.5">
                <label className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                  PRIMARY DISCIPLINE
                </label>
                <select
                  value={formData.scope}
                  onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-white/15 px-4 py-3 min-h-[44px] text-xs text-[#F5F3EE] inter focus:border-[#C8FF00] focus:outline-none transition-colors"
                >
                  <option value="Spatial Web Application">Spatial Web Application / Digital Flagship</option>
                  <option value="Perimeter AI Architecture">Perimeter AI & Edge Inference Architecture</option>
                  <option value="Physical Terminal OS">Physical Terminal OS / Industrial Interface</option>
                  <option value="Comprehensive Studio Commission">Comprehensive Full-Stack Studio Commission</option>
                </select>
              </div>

              {/* Project Brief Notes */}
              <div className="space-y-1.5">
                <label className="inter text-[10px] font-bold tracking-widest text-[#A6A39B] uppercase block">
                  ARCHITECTURAL SCOPE & DESIRED HORIZON
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your site constraints, technical architecture, and material requirements..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full bg-[#0c0c0b] border border-white/15 px-4 py-3 text-xs text-[#F5F3EE] inter placeholder:text-[#A6A39B]/40 focus:border-[#C8FF00] focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="pt-4 border-t border-white/10">
                <button
                  type="submit"
                  onMouseEnter={() => setCursorState('enter', 'SEND')}
                  onMouseLeave={() => setCursorState('default')}
                  className="w-full h-14 bg-[#F5F3EE] text-[#080808] inter text-xs font-bold tracking-widest uppercase hover:bg-white transition-all flex items-center justify-center gap-3 cursor-pointer shadow-lg"
                >
                  <span>DISPATCH BRIEF TO ISLAMABAD DESK</span>
                  <div className="w-2 h-2 rounded-full bg-[#C8FF00] shadow-[0_0_6px_#C8FF00]" />
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
