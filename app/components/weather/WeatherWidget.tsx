'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { CloudSun, Droplets, Wind, Sunrise, Sunset, Thermometer, Loader2, RefreshCw } from 'lucide-react';
import { Section, InteractiveCard } from '../ui';

// Mock weather data (replace with OpenWeather API when key is available)
const MOCK_WEATHER = {
  current: {
    temp: 28,
    feels_like: 31,
    humidity: 72,
    wind_speed: 12,
    condition: 'Partly Cloudy',
    icon: '⛅',
    sunrise: '05:32 AM',
    sunset: '07:18 PM',
  },
  forecast: [
    { day: 'Mon', high: 30, low: 22, icon: '☀️', condition: 'Sunny' },
    { day: 'Tue', high: 28, low: 21, icon: '⛅', condition: 'Cloudy' },
    { day: 'Wed', high: 26, low: 20, icon: '🌧️', condition: 'Rain' },
    { day: 'Thu', high: 29, low: 22, icon: '⛅', condition: 'Partly Cloudy' },
    { day: 'Fri', high: 31, low: 23, icon: '☀️', condition: 'Sunny' },
  ],
};

export const WeatherWidget = () => {
  const [weather, setWeather] = useState(MOCK_WEATHER);
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Simulate refresh
  const refresh = () => {
    setLoading(true);
    setTimeout(() => {
      setWeather({
        ...MOCK_WEATHER,
        current: {
          ...MOCK_WEATHER.current,
          temp: MOCK_WEATHER.current.temp + Math.floor((Math.random() - 0.5) * 4),
          humidity: MOCK_WEATHER.current.humidity + Math.floor((Math.random() - 0.5) * 10),
        },
      });
      setLastUpdated(new Date());
      setLoading(false);
    }, 800);
  };

  return (
    <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6 relative overflow-hidden">
      {/* Glassmorphism glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-gradient-to-bl from-cyan-500/10 to-transparent blur-[60px] rounded-full -z-10" />

      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-white font-bold text-sm flex items-center gap-2"><CloudSun size={16} className="text-cyan-400" /> Dehradun Weather</h3>
          <p className="text-slate-500 text-[10px] mt-0.5 font-medium">Uttarakhand, India</p>
        </div>
        <button onClick={refresh} disabled={loading} className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all hover:bg-white/10">
          {loading ? <Loader2 size={12} className="animate-spin" /> : <RefreshCw size={12} />}
        </button>
      </div>

      {/* Current */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-end gap-1">
            <span className="text-5xl font-black text-white">{weather.current.temp}</span>
            <span className="text-2xl text-slate-400 mb-1.5">°C</span>
          </div>
          <p className="text-slate-400 text-sm mt-1">{weather.current.condition}</p>
        </div>
        <div className="text-5xl">{weather.current.icon}</div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Droplets size={13} className="text-blue-400" />
          <span>Humidity: <span className="text-white font-medium">{weather.current.humidity}%</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Wind size={13} className="text-cyan-400" />
          <span>Wind: <span className="text-white font-medium">{weather.current.wind_speed} km/h</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sunrise size={13} className="text-yellow-400" />
          <span>Sunrise: <span className="text-white font-medium">{weather.current.sunrise}</span></span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Sunset size={13} className="text-orange-400" />
          <span>Sunset: <span className="text-white font-medium">{weather.current.sunset}</span></span>
        </div>
      </div>

      {/* 5-Day Forecast */}
      <div className="border-t border-white/5 pt-4">
        <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-3">5-Day Forecast</p>
        <div className="flex justify-between">
          {weather.forecast.map((day, i) => (
            <div key={i} className="flex flex-col items-center gap-1.5">
              <span className="text-[10px] text-slate-500 font-medium">{day.day}</span>
              <span className="text-xl">{day.icon}</span>
              <span className="text-[10px] text-white font-bold">{day.high}°</span>
              <span className="text-[10px] text-slate-500">{day.low}°</span>
            </div>
          ))}
        </div>
      </div>

      <p className="text-[9px] text-slate-600 mt-3 text-right">Updated {lastUpdated.toLocaleTimeString()}</p>
    </InteractiveCard>
  );
};
