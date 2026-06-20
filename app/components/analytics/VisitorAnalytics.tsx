'use client';

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Eye, TrendingUp, Globe, BarChart3 } from 'lucide-react';
import { Section, InteractiveCard } from '../ui';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';

// ── GitHub-style Heatmap ──
const ActivityHeatmap = () => {
  const weeks = 26; // ~6 months
  const days = 7;
  const data = useMemo(() =>
    Array.from({ length: weeks * days }, () => Math.floor(Math.random() * 5)), // 0-4 intensity
  []);

  const colors = ['bg-white/[0.03]', 'bg-cyan-500/20', 'bg-cyan-500/35', 'bg-cyan-500/55', 'bg-cyan-400/80'];

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-[3px] min-w-[520px]">
        {Array.from({ length: weeks }, (_, w) => (
          <div key={w} className="flex flex-col gap-[3px]">
            {Array.from({ length: days }, (_, d) => {
              const idx = w * days + d;
              const level = data[idx] || 0;
              return (
                <div key={d} className={`w-[14px] h-[14px] rounded-[3px] ${colors[level]} hover:ring-1 hover:ring-cyan-400/50 transition-all`}
                  title={`${level} visits`} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[9px] text-slate-500">Less</span>
        {colors.map((c, i) => <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />)}
        <span className="text-[9px] text-slate-500">More</span>
      </div>
    </div>
  );
};

// ── Counter Card ──
const StatCard = ({ icon: Icon, label, end, suffix = '', color }: any) => {
  const { count, ref } = useAnimatedCounter(end, 2000);
  return (
    <InteractiveCard innerClassName="rounded-xl p-4 sm:p-5">
      <div ref={ref} className="flex items-start justify-between mb-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center border" style={{ borderColor: `${color}25`, background: `${color}10` }}>
          <Icon size={16} style={{ color }} />
        </div>
      </div>
      <p className="text-2xl sm:text-3xl font-black text-white tracking-tight">{count}{suffix}</p>
      <p className="text-[11px] text-slate-500 font-medium mt-0.5">{label}</p>
    </InteractiveCard>
  );
};

export const VisitorAnalytics = () => (
  <Section id="analytics" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="mb-10 sm:mb-14">
        <span className="text-violet-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
          <span className="w-6 sm:w-8 h-[2px] bg-violet-500/50" /> Portfolio Insights
        </span>
        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-extrabold text-white tracking-tighter">
          Visitor Analytics.
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <StatCard icon={Eye} label="Total Visitors" end={1284} color="#06b6d4" />
        <StatCard icon={TrendingUp} label="This Month" end={342} color="#10b981" />
        <StatCard icon={Globe} label="Countries" end={12} color="#8b5cf6" />
        <StatCard icon={BarChart3} label="Avg. Time (min)" end={4} suffix=":32" color="#f59e0b" />
      </div>

      {/* Heatmap */}
      <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-sm">Activity Heatmap</h3>
            <p className="text-slate-500 text-[11px] mt-0.5">Portfolio visits over the last 6 months</p>
          </div>
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest">Firebase-Ready</span>
        </div>
        <ActivityHeatmap />
      </InteractiveCard>
    </div>
  </Section>
);
