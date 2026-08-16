import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, CheckCircle2, ArrowRight, ShieldCheck, Clock, Zap, MessageSquare } from 'lucide-react';
import { PROJECT_TYPES, BUDGET_RANGES } from '../data';
import { soundFx } from '../utils/audio';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: 'SaaS Development',
    budget: '$25k - $50k',
    details: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    soundFx.playTick(1200);
    setIsSubmitting(true);

    setTimeout(() => {
      soundFx.playSuccess();
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <section id="contact" className="relative py-28 bg-[#050505] border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 mb-3 bg-white/[0.04] px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#FF4E00]" />
            <span>SECTION 18 • INITIATE A PROJECT</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight">
            Tell Us About Your Vision. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/90 to-zinc-400">
              Direct Project Intake
            </span>
          </h2>
          <p className="text-zinc-300 text-sm sm:text-base mt-4 font-light max-w-xl">
            Fill out the brief below. Our partner-level team responds within 24 hours with an actionable roadmap and architectural proposal.
          </p>
        </div>

        {/* Main Grid: Form + Studio Guarantees */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          
          {/* Interactive Form Card */}
          <div className="lg:col-span-8 rounded-3xl bg-white/[0.03] border border-white/15 p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-2xl relative">
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                    Project Brief Received
                  </h3>

                  <p className="text-sm text-zinc-300 max-w-md mx-auto font-light">
                    Thank you, <span className="text-white font-medium">{formData.name}</span>. Our technical director is reviewing your brief for <span className="text-white font-medium">{formData.company || 'your project'}</span> and will follow up at <span className="text-[#FF4E00] font-mono">{formData.email}</span> within 24 hours.
                  </p>

                  <button
                    onClick={() => {
                      soundFx.playTick(900);
                      setIsSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        company: '',
                        projectType: 'SaaS Development',
                        budget: '$25k - $50k',
                        details: ''
                      });
                    }}
                    className="px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white font-medium text-xs border border-white/15 backdrop-blur-md transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  
                  {/* Row 1: Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Alex Vance"
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF4E00] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF4E00] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Row 2: Company */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="Acme Corporation or Early-Stage Stealth"
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF4E00] transition-colors"
                    />
                  </div>

                  {/* Row 3: Project Type (Radio chips) */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Project Discipline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PROJECT_TYPES.map((type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => {
                            soundFx.playTick(1000);
                            setFormData({ ...formData, projectType: type });
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-medium transition-all duration-200 text-center ${
                            formData.projectType === type
                              ? 'bg-[#FF4E00] text-white border-[#FF4E00] shadow-[0_0_15px_rgba(255,78,0,0.3)]'
                              : 'bg-black/30 text-zinc-400 border-white/10 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 4: Estimated Budget */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Estimated Project Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {BUDGET_RANGES.map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => {
                            soundFx.playTick(1050);
                            setFormData({ ...formData, budget: b });
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-mono transition-all duration-200 text-center ${
                            formData.budget === b
                              ? 'bg-[#FF4E00] text-white border-[#FF4E00] shadow-[0_0_15px_rgba(255,78,0,0.3)]'
                              : 'bg-black/30 text-zinc-400 border-white/10 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Row 5: Project Details */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-zinc-300 mb-2">
                      Project Details & Timeline Goals
                    </label>
                    <textarea
                      rows={4}
                      value={formData.details}
                      onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                      placeholder="Briefly describe what you are looking to build, key objectives, and any target launch deadlines..."
                      className="w-full px-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#FF4E00] transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 px-8 rounded-full bg-[#FF4E00] hover:bg-[#FF4E00]/90 text-white font-display font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(255,78,0,0.4)] flex items-center justify-center gap-3 transition-all transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>START A PROJECT</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                </form>
              )}
            </AnimatePresence>

          </div>

          {/* Right Column: Information & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-[#FF4E00]/15 border border-[#FF4E00]/30 text-[#FF4E00] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-display">Fast Discovery Call</h4>
                  <p className="text-xs text-zinc-400 font-mono">No Sales Fluff</p>
                </div>
              </div>

              <div className="space-y-3.5 text-xs text-zinc-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#FF4E00] shrink-0 mt-0.5" />
                  <span><strong>24-Hour SLA</strong> — Technical review and response within one business day.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>Mutual NDA Ready</strong> — Full intellectual property confidentiality guaranteed.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <MessageSquare className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>Direct Partner Contact</strong> — Talk directly with lead engineers, not account executives.</span>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-2">
              <div className="text-[10px] font-mono text-zinc-500 uppercase">DIRECT EMAIL</div>
              <a
                href="mailto:hello@buildifo.com"
                className="text-sm font-mono text-[#FF4E00] hover:underline block"
              >
                hello@buildifo.com
              </a>
              <div className="text-[10px] font-mono text-zinc-500 pt-2 uppercase">COLLABORATION</div>
              <p className="text-xs text-zinc-300 font-mono">
                Distributed Digital Studio • Worldwide Remote
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
