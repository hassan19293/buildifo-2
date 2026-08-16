import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle, ArrowRight, ArrowLeft, Sparkles, Send, ShieldCheck } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface StartProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StartProjectModal: React.FC<StartProjectModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedServices, setSelectedServices] = useState<string[]>(['SaaS Platform']);
  const [selectedBudget, setSelectedBudget] = useState<string>('$30k – $50k');
  const [selectedTimeline, setSelectedTimeline] = useState<string>('6–8 Weeks');
  const [formData, setFormData] = useState({ name: '', email: '', company: '', details: '' });
  const [submitted, setSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundFx.playTick(600);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const servicesList = [
    'SaaS Platform',
    'Web Flagship & 3D',
    'Mobile App (iOS/Android)',
    'Video & Motion Choreography',
    'UI/UX Design System',
    'AI Agent & LLM Architecture'
  ];

  const budgetTiers = ['$15k – $30k', '$30k – $50k', '$50k – $100k+'];
  const timelineTiers = ['4–6 Weeks', '6–8 Weeks', '8–12+ Weeks'];

  const toggleService = (srv: string) => {
    soundFx.playTick(950);
    if (selectedServices.includes(srv)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== srv));
      }
    } else {
      setSelectedServices([...selectedServices, srv]);
    }
  };

  const handleNext = () => {
    soundFx.playTick(1100);
    setStep(prev => prev + 1);
  };

  const handleBack = () => {
    soundFx.playTick(900);
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-xl"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-black/70 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.15)] backdrop-blur-2xl z-10 my-8 overflow-hidden"
        >
          {/* Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#FF4E00]/15 rounded-full blur-[100px] pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/[0.05] hover:bg-white/15 border border-white/10 text-zinc-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header & Step Indicator */}
              <div className="mb-8">
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
                  <span>STEP 0{step} OF 03 • PROJECT BRIEF BUILDER</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
                  {step === 1 && 'What are we creating together?'}
                  {step === 2 && 'Scope, Budget & Velocity Goals'}
                  {step === 3 && 'Your Details & Project Vision'}
                </h2>
                <div className="w-full bg-white/10 h-1 rounded-full mt-4 overflow-hidden">
                  <div
                    className="bg-[#FF4E00] h-full transition-all duration-400"
                    style={{ width: `${(step / 3) * 100}%` }}
                  />
                </div>
              </div>

              {/* STEP 1: Services Selection */}
              {step === 1 && (
                <div className="space-y-3 mb-8">
                  <p className="text-xs text-zinc-400 font-mono mb-2">SELECT ONE OR MORE DISCIPLINARY DOMAINS:</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {servicesList.map(srv => {
                      const isSelected = selectedServices.includes(srv);
                      return (
                        <button
                          key={srv}
                          type="button"
                          onClick={() => toggleService(srv)}
                          className={`p-3.5 rounded-2xl border text-left text-xs font-semibold transition-all duration-300 flex items-center justify-between backdrop-blur-md ${
                            isSelected
                              ? 'bg-white/[0.1] border-[#FF4E00] text-white shadow-[0_4px_20px_rgba(255,78,0,0.25)]'
                              : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:bg-white/[0.06] hover:text-white'
                          }`}
                        >
                          <span>{srv}</span>
                          {isSelected && <CheckCircle className="w-4 h-4 text-[#FF4E00]" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: Budget & Timeline */}
              {step === 2 && (
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-xs text-zinc-400 font-mono mb-3">EXPECTED INVESTMENT RANGE:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {budgetTiers.map(tier => (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => {
                            soundFx.playTick(1000);
                            setSelectedBudget(tier);
                          }}
                          className={`p-3.5 rounded-2xl border text-center text-xs font-mono font-bold transition-all backdrop-blur-md ${
                            selectedBudget === tier
                              ? 'bg-white/[0.1] border-[#FF4E00] text-white shadow-[0_4px_20px_rgba(255,78,0,0.25)]'
                              : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          {tier}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-zinc-400 font-mono mb-3">TARGET LAUNCH TIMELINE:</p>
                    <div className="grid grid-cols-3 gap-3">
                      {timelineTiers.map(time => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => {
                            soundFx.playTick(1000);
                            setSelectedTimeline(time);
                          }}
                          className={`p-3.5 rounded-2xl border text-center text-xs font-mono font-bold transition-all backdrop-blur-md ${
                            selectedTimeline === time
                              ? 'bg-white/[0.1] border-[#FF4E00] text-white shadow-[0_4px_20px_rgba(255,78,0,0.25)]'
                              : 'bg-white/[0.03] border-white/10 text-zinc-300 hover:text-white hover:bg-white/[0.06]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Contact Details */}
              {step === 3 && (
                <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">YOUR NAME *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Elena Rostova"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4E00] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-zinc-400 mb-1">WORK EMAIL *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="elena@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4E00] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">COMPANY / VENTURE</label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={e => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Nova Systems (Series A)"
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4E00] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-zinc-400 mb-1">PROJECT SCOPE & OBJECTIVES</label>
                    <textarea
                      rows={3}
                      value={formData.details}
                      onChange={e => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Briefly describe what you are seeking to build, key metrics, and references..."
                      className="w-full px-4 py-3 rounded-2xl bg-white/[0.03] border border-white/10 text-white text-sm focus:outline-none focus:border-[#FF4E00] backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] resize-none"
                    />
                  </div>
                </form>
              )}

              {/* Modal Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.08]">
                {step > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="px-5 py-2.5 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/10 text-xs font-medium text-zinc-300 flex items-center gap-2 transition-colors backdrop-blur-md"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div className="text-[11px] font-mono text-zinc-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Strict 100% Confidentiality NDA</span>
                  </div>
                )}

                {step < 3 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-full bg-[#FF4E00] hover:bg-[#ff6220] text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-[#FF4E00]/30 transition-all"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-7 py-3 rounded-full bg-[#FF4E00] hover:bg-[#ff6220] text-white text-xs font-bold flex items-center gap-2 shadow-xl shadow-[#FF4E00]/40 transition-all"
                  >
                    <span>Transmit Project Inquiry</span>
                    <Send className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            /* Submission Confirmation Screen */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8 space-y-6"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 mx-auto flex items-center justify-center shadow-xl shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-display font-bold text-white">
                  Inquiry Received with Priority.
                </h3>
                <p className="text-sm text-zinc-300 font-light max-w-md mx-auto">
                  Thank you, <span className="text-white font-semibold">{formData.name || 'Founder'}</span>. Our partner team will review your brief for {selectedServices.join(', ')} and respond within 24 business hours.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 max-w-sm mx-auto text-left text-xs font-mono text-zinc-300 space-y-1.5 backdrop-blur-md">
                <div><span className="text-zinc-500">BUDGET:</span> {selectedBudget}</div>
                <div><span className="text-zinc-500">TIMELINE:</span> {selectedTimeline}</div>
                <div><span className="text-zinc-500">STATUS:</span> <span className="text-emerald-400 font-bold">QUEUED FOR PARTNER REVIEW</span></div>
              </div>

              <button
                onClick={handleReset}
                className="px-8 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-colors backdrop-blur-md"
              >
                Return to Studio Showcase
              </button>
            </motion.div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
