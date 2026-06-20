'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experience, education } from '../../data/portfolio-data';
import { Section, InteractiveCard } from '../ui';

export const Experience = () => (
  <Section id="experience" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <span className="text-rose-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-rose-500/50" /> Career
            </span>
            <h2 className="text-[clamp(1.875rem,5vw,3.75rem)] font-extrabold text-white tracking-tighter mb-4 sm:mb-8">Experience.</h2>
            <p className="text-slate-400 font-light text-sm sm:text-base mb-8 max-w-sm">
              A look at my professional journey, internships, and hands-on industry experience.
            </p>
          </div>
          <div className="hidden lg:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-rose-400">
            <Briefcase size={32} />
          </div>
        </div>

        <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-8 sm:p-10 md:p-14">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
            {experience.map((exp, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] group-hover:bg-white group-hover:scale-150 transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"
                  style={{ backgroundColor: exp.color, boxShadow: `0 0 0 0 ${exp.color}` }} />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-white/15 transition-colors shadow-lg">
                    <span className="font-mono font-bold text-[10px] sm:text-xs mb-2 block uppercase tracking-wider" style={{ color: exp.color }}>{exp.period}</span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white mb-1 tracking-tight">{exp.title}</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3">{exp.company}</p>
                    <span className="inline-block px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                      style={{ borderColor: `${exp.color}25`, background: `${exp.color}10`, color: `${exp.color}cc` }}>{exp.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InteractiveCard>
      </div>
    </div>
  </Section>
);

export const Education = () => (
  <Section id="education" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 flex flex-col justify-between">
          <div>
            <span className="text-indigo-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-indigo-500/50" /> Academics
            </span>
            <h2 className="text-[clamp(1.875rem,5vw,3.75rem)] font-extrabold text-white tracking-tighter mb-4 sm:mb-8">Education.</h2>
            <p className="text-slate-400 font-light text-sm sm:text-base mb-8 max-w-sm">
              A brief overview of my academic journey and foundational knowledge base.
            </p>
          </div>
          <div className="hidden lg:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-indigo-400">
            <GraduationCap size={32} />
          </div>
        </div>

        <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-8 sm:p-10 md:p-14">
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-indigo-500/30 before:to-transparent">
            {education.map((edu, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] group-hover:bg-white group-hover:scale-150 transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"
                  style={{ backgroundColor: edu.color }} />
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-white/15 transition-colors shadow-lg">
                    <span className="font-mono font-bold text-[10px] sm:text-xs mb-2 block uppercase tracking-wider" style={{ color: edu.color }}>{edu.period}</span>
                    <h4 className="text-lg sm:text-xl font-extrabold text-white mb-1 tracking-tight">{edu.degree}</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3">{edu.institution}</p>
                    <span className="inline-block px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-widest border"
                      style={{ borderColor: `${edu.color}25`, background: `${edu.color}10`, color: `${edu.color}cc` }}>{edu.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </InteractiveCard>
      </div>
    </div>
  </Section>
);
