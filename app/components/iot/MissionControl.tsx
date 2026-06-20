'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Activity, Thermometer, Droplets, Eye, Ruler, Sun, Volume2, Wifi, Bell, AlertTriangle } from 'lucide-react';
import { Section, InteractiveCard } from '../ui';
import { AreaChart, Area, ResponsiveContainer, Tooltip } from 'recharts';

// ── Simulated live sensor data generator ──
const useLiveMetric = (base: number, variance: number, interval: number = 2000) => {
  const [value, setValue] = useState(base);
  useEffect(() => {
    const id = setInterval(() => {
      setValue(base + (Math.random() - 0.5) * variance * 2);
    }, interval);
    return () => clearInterval(id);
  }, [base, variance, interval]);
  return Number(value.toFixed(1));
};

const useChartData = (points: number = 20) => {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    const initial = Array.from({ length: points }, (_, i) => ({
      t: i,
      temp: 25 + Math.sin(i * 0.3) * 3 + (Math.random() - 0.5) * 2,
      humidity: 55 + Math.cos(i * 0.2) * 10 + (Math.random() - 0.5) * 5,
    }));
    setData(initial);
    const id = setInterval(() => {
      setData(prev => {
        const newPoint = {
          t: prev.length,
          temp: 25 + Math.sin(prev.length * 0.3) * 3 + (Math.random() - 0.5) * 2,
          humidity: 55 + Math.cos(prev.length * 0.2) * 10 + (Math.random() - 0.5) * 5,
        };
        return [...prev.slice(-points + 1), newPoint];
      });
    }, 3000);
    return () => clearInterval(id);
  }, [points]);
  return data;
};

// ── Sensor Metric Card ──
const MetricCard = ({ icon: Icon, label, value, unit, color, status = 'normal' }: any) => (
  <InteractiveCard innerClassName="rounded-xl p-4 sm:p-5">
    <div className="flex items-start justify-between mb-3">
      <div className="w-9 h-9 rounded-xl flex items-center justify-center border" style={{ borderColor: `${color}30`, background: `${color}10` }}>
        <Icon size={18} style={{ color }} />
      </div>
      <div className="flex items-center gap-1.5">
        <div className={`w-2 h-2 rounded-full animate-pulse ${status === 'normal' ? 'bg-green-400' : status === 'warning' ? 'bg-yellow-400' : 'bg-red-400'}`} />
        <span className="text-[9px] uppercase tracking-widest font-bold text-slate-500">{status === 'normal' ? 'Active' : status}</span>
      </div>
    </div>
    <p className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-0.5">
      {value}<span className="text-base text-slate-500 ml-1">{unit}</span>
    </p>
    <p className="text-[11px] text-slate-500 font-medium tracking-wide">{label}</p>
  </InteractiveCard>
);

// ── Alert Feed ──
const alerts = [
  { time: '2 min ago', msg: 'Motion detected in Zone A', type: 'info', icon: Eye },
  { time: '5 min ago', msg: 'Temperature spike: 29.3°C', type: 'warning', icon: AlertTriangle },
  { time: '12 min ago', msg: 'Telegram alert sent to admin', type: 'info', icon: Bell },
  { time: '18 min ago', msg: 'System health check passed', type: 'success', icon: Activity },
  { time: '25 min ago', msg: 'Light level below threshold', type: 'info', icon: Sun },
];

export const MissionControl = () => {
  const temp = useLiveMetric(26.5, 1.5);
  const humidity = useLiveMetric(58, 5);
  const distance = useLiveMetric(45, 10);
  const light = useLiveMetric(720, 80);
  const sound = useLiveMetric(35, 8);
  const chartData = useChartData();
  const healthScore = useMemo(() => Math.min(98, Math.max(85, Math.floor(92 + (Math.random() - 0.5) * 8))), []);

  return (
    <Section id="mission-control" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <span className="text-cyan-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
            <span className="w-6 sm:w-8 h-[2px] bg-cyan-500/50" /> Live Monitoring
          </span>
          <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-extrabold text-white tracking-tighter">
            Mission Control Center.
          </h2>
          <p className="text-slate-400 text-sm mt-3 font-light max-w-lg">
            Real-time IoT sensor monitoring dashboard — powered by Firebase, ESP8266, and cloud analytics.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-6">
          <MetricCard icon={Thermometer} label="Temperature" value={temp} unit="°C" color="#ef4444" />
          <MetricCard icon={Droplets} label="Humidity" value={humidity} unit="%" color="#3b82f6" />
          <MetricCard icon={Eye} label="Motion" value="Detected" unit="" color="#10b981" status="normal" />
          <MetricCard icon={Ruler} label="Distance" value={distance} unit="cm" color="#8b5cf6" />
          <MetricCard icon={Sun} label="Light" value={light} unit="lux" color="#f59e0b" />
          <MetricCard icon={Volume2} label="Sound" value={sound} unit="dB" color="#06b6d4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
          {/* Chart */}
          <div className="lg:col-span-2">
            <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-white font-bold text-sm">Sensor Analytics</h3>
                  <p className="text-slate-500 text-[11px] mt-0.5">Real-time temperature & humidity</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-green-400">Live</span>
                </div>
              </div>
              <div className="h-[200px] sm:h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="humGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.3} />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <Tooltip
                      contentStyle={{ background: '#111', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
                      labelStyle={{ color: '#666' }}
                      itemStyle={{ color: '#ccc' }}
                    />
                    <Area type="monotone" dataKey="temp" stroke="#ef4444" fill="url(#tempGrad)" strokeWidth={2} dot={false} name="Temp (°C)" />
                    <Area type="monotone" dataKey="humidity" stroke="#3b82f6" fill="url(#humGrad)" strokeWidth={2} dot={false} name="Humidity (%)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </InteractiveCard>
          </div>

          {/* Alert Feed + Health */}
          <div className="space-y-4">
            {/* System Health */}
            <InteractiveCard innerClassName="rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-bold text-sm">System Health</h3>
                <Activity size={16} className="text-green-400" />
              </div>
              <div className="text-4xl font-black text-white mb-1">{healthScore}<span className="text-lg text-green-400">%</span></div>
              <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${healthScore}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                />
              </div>
              <div className="flex items-center gap-3 mt-3 text-[10px] text-slate-500 font-medium">
                <span className="flex items-center gap-1"><Wifi size={10} className="text-green-400" /> All devices online</span>
              </div>
            </InteractiveCard>

            {/* Alert Feed */}
            <InteractiveCard innerClassName="rounded-2xl p-5">
              <h3 className="text-white font-bold text-sm mb-3 flex items-center gap-2"><Bell size={14} className="text-cyan-400" /> Alert Feed</h3>
              <div className="space-y-2.5 max-h-[180px] overflow-y-auto terminal-scrollbar">
                {alerts.map((alert, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs">
                    <alert.icon size={13} className={`shrink-0 mt-0.5 ${alert.type === 'warning' ? 'text-yellow-400' : alert.type === 'success' ? 'text-green-400' : 'text-slate-400'}`} />
                    <div>
                      <p className="text-slate-300">{alert.msg}</p>
                      <p className="text-slate-600 text-[10px] mt-0.5">{alert.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </InteractiveCard>
          </div>
        </div>
      </div>
    </Section>
  );
};
