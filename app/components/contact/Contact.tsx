'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Download, Github, Circle } from 'lucide-react';
import { personalInfo, achievementStats } from '../../data/portfolio-data';
import { Section, InteractiveCard, MagneticHover } from '../ui';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { WeatherWidget } from '../weather/WeatherWidget';

const AchievementCard = ({ stat }: { stat: typeof achievementStats[0] }) => {
  const { count, ref } = useAnimatedCounter(stat.value, 2000);
  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl sm:text-4xl font-black text-white">{count}{stat.suffix}</p>
      <p className="text-[10px] sm:text-xs text-slate-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</p>
    </div>
  );
};

export const Contact = () => (
  <Section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Main Contact Card */}
        <div className="lg:col-span-7">
          <InteractiveCard innerClassName="rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-center relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-cyan-500/8 to-indigo-500/8 blur-[80px] rounded-full -z-10" />

            <span className="text-cyan-400 font-black tracking-widest uppercase text-[10px] sm:text-xs mb-6 flex justify-center items-center gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-cyan-500/50" /> Let&apos;s Work Together
            </span>
            <h2 className="text-[clamp(2rem,6vw,4.5rem)] font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-4 sm:mb-6 tracking-tighter leading-[1]">
              Let&apos;s Build<br />Something.
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mx-auto mb-8 sm:mb-10 font-light max-w-md">
              I&apos;m currently seeking opportunities in Full-Stack Development, Cloud Engineering, and IoT Systems. Let&apos;s connect!
            </p>

            {/* Availability */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 mb-8">
              <Circle size={8} className="fill-teal-400 text-teal-400 animate-pulse" />
              <span className="text-teal-100 font-bold text-[10px] tracking-widest uppercase">Available for Opportunities</span>
            </div>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 relative z-20">
              <MagneticHover>
                <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto flex justify-center items-center gap-3 px-7 py-4 bg-gradient-to-r from-cyan-500 via-indigo-500 to-teal-500 text-white uppercase tracking-widest font-black text-xs rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)]">
                  <Mail size={16} /> WhatsApp Me
                </a>
              </MagneticHover>
              <MagneticHover>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
                  className="w-full sm:w-auto flex justify-center items-center gap-3 px-7 py-4 border border-white/20 bg-white/5 text-white uppercase tracking-widest font-bold text-xs rounded-full hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:scale-105">
                  <Linkedin size={16} /> LinkedIn
                </a>
              </MagneticHover>
            </div>

            {/* Quick links */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 transition-all">
                <Github size={16} />
              </a>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-green-400 hover:bg-green-500/10 transition-all">
                <Download size={16} />
              </a>
            </div>
          </InteractiveCard>
        </div>

        {/* Right column: Weather + Achievements */}
        <div className="lg:col-span-5 space-y-5">
          {/* Weather */}
          <WeatherWidget />

          {/* Achievement Stats */}
          <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6">
            <h3 className="text-white font-bold text-sm mb-5 text-center">By The Numbers</h3>
            <div className="grid grid-cols-2 gap-4">
              {achievementStats.map((stat, i) => (
                <AchievementCard key={i} stat={stat} />
              ))}
            </div>
          </InteractiveCard>

          {/* Resume Download */}
          <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6 text-center group">
            <h3 className="text-white font-bold text-sm mb-3">Download Resume</h3>
            <p className="text-slate-400 text-xs mb-4 font-light">Get a detailed breakdown of my experience, skills, and projects.</p>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white uppercase tracking-widest font-bold text-xs rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all">
              <Download size={16} /> Download PDF
            </a>
          </InteractiveCard>
        </div>
      </div>
    </div>
  </Section>
);
