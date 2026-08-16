import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, TrendingUp, Users, ArrowUpRight, Zap, Shield, Filter, RefreshCw } from 'lucide-react';
import { soundFx } from '../utils/audio';

export const SaaSShowcaseSection: React.FC = () => {
  const [activeMetricTimeframe, setActiveMetricTimeframe] = useState<'30d' | '90d' | '1y'>('30d');

  const cardData = [
    { title: 'Annual Recurring Revenue', value: '$2,480,000', change: '+38.4%', trend: 'up', icon: TrendingUp },
    { title: 'Active Enterprise Seats', value: '42,910', change: '+24.1%', trend: 'up', icon: Users },
    { title: 'Global Query Latency', value: '28.4 ms', change: '-42.0%', trend: 'down', icon: Zap },
  ];

  return (
    <section id="showcases" className="relative py-28 bg-[#090B10] border-t border-white/[0.06] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-indigo-400 mb-3 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>PHASE 10 • SAAS PLATFORM SHOWCASE</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-display font-bold text-white tracking-tight"
          >
            Enterprise Velocity. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">
              High-Throughput SaaS Infrastructure
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-zinc-400 text-sm sm:text-base mt-4 max-w-xl mx-auto font-light"
          >
            Built for extreme concurrency, sub-50ms global response times, and multi-tenant security guarantees.
          </motion.p>
        </div>

        {/* PHASE 10: Dashboard Enters From Below with Staggered Elements */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-gradient-to-b from-[#131724] to-[#0D0F17] border border-white/10 p-6 sm:p-8 shadow-2xl shadow-black/80"
        >
          {/* Top Dashboard Nav */}
          <div className="flex flex-wrap items-center justify-between pb-6 border-b border-white/[0.08] mb-6 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-display font-bold text-sm text-white">ORBIT SaaS Telemetry Master Console</span>
              <span className="text-[10px] font-mono text-zinc-400 bg-white/5 px-2 py-0.5 rounded border border-white/10 hidden sm:inline">
                CLUSTER_US_EAST_01
              </span>
            </div>

            {/* Timeframe Controls */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/5">
              {(['30d', '90d', '1y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => {
                    soundFx.playTick(1000);
                    setActiveMetricTimeframe(tf);
                  }}
                  className={`text-xs px-3 py-1 rounded-lg font-mono transition-colors ${
                    activeMetricTimeframe === tf ? 'bg-indigo-600 text-white font-bold' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Staggered Metrics Cards (Card 1 -> Card 2 -> Card 3) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {cardData.map((card, idx) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.2 + idx * 0.12 }}
                  whileHover={{ y: -3 }}
                  className="p-5 rounded-2xl bg-black/40 border border-white/[0.07] hover:border-indigo-500/30 transition-all duration-300"
                >
                  <div className="flex items-center justify-between text-zinc-400 mb-3">
                    <span className="text-xs font-mono">{card.title}</span>
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-display font-bold text-white">
                    {card.value}
                  </div>
                  <div className="flex items-center gap-2 mt-2 text-xs font-mono">
                    <span className={card.trend === 'up' ? 'text-emerald-400 font-bold' : 'text-indigo-400 font-bold'}>
                      {card.change}
                    </span>
                    <span className="text-zinc-500">vs previous period</span>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Staggered Chart + Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.55 }}
              className="lg:col-span-8 bg-black/40 rounded-2xl p-5 border border-white/[0.07] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-semibold text-white">Live Global Event Throughput</h4>
                  <p className="text-xs text-zinc-500 font-mono mt-0.5">84,000 events / sec processed</p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                  REAL-TIME STREAMING
                </div>
              </div>

              {/* Dynamic Wave Chart */}
              <div className="h-40 flex items-end justify-between gap-1.5 pt-6">
                {[30, 45, 60, 40, 75, 90, 65, 80, 100, 85, 70, 95, 110, 80, 90, 105, 95, 70, 85, 100, 90, 80].map((val, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [`${(val / 110) * 80}%`, `${(val / 110) * 100}%`, `${(val / 110) * 85}%`]
                    }}
                    transition={{
                      duration: 2.2 + (i % 3) * 0.4,
                      repeat: Infinity,
                      repeatType: 'reverse',
                      ease: 'easeInOut'
                    }}
                    className="flex-1 rounded-t bg-gradient-to-t from-indigo-600 via-purple-500 to-pink-400 opacity-85 hover:opacity-100 transition-opacity"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-4 border-t border-white/5 mt-4">
                <span>00:00 UTC</span>
                <span>06:00 UTC</span>
                <span>12:00 UTC</span>
                <span>18:00 UTC</span>
                <span>NOW</span>
              </div>
            </motion.div>

            {/* Live Activity Feed */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: 0.65 }}
              className="lg:col-span-4 bg-black/40 rounded-2xl p-5 border border-white/[0.07] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between pb-3 border-b border-white/5">
                <span className="text-xs font-semibold text-white">Live Cluster Activity</span>
                <RefreshCw className="w-3.5 h-3.5 text-zinc-400 animate-spin" style={{ animationDuration: '6s' }} />
              </div>

              <div className="space-y-3 my-3">
                {[
                  { text: 'Enterprise Org upgraded to Tier 3', time: '12s ago', tag: 'BILLING' },
                  { text: 'Auto-scaled 4 Redis replica shards', time: '48s ago', tag: 'SYSTEM' },
                  { text: 'SOC2 Type II Audit check passed', time: '2m ago', tag: 'SECURITY' },
                  { text: 'Database latency optimized to 18ms', time: '4m ago', tag: 'PERF' }
                ].map((act, i) => (
                  <div key={i} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs">
                    <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                      <span className="text-indigo-400">{act.tag}</span>
                      <span>{act.time}</span>
                    </div>
                    <div className="text-zinc-300 font-medium">{act.text}</div>
                  </div>
                ))}
              </div>

              <div className="text-[10px] font-mono text-emerald-400 text-center bg-emerald-500/10 py-1 rounded border border-emerald-500/20">
                100% PRODUCTION UPTIME (365 DAYS)
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
