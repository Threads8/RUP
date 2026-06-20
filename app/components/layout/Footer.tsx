'use client';

import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { personalInfo } from '../../data/portfolio-data';

export const Footer = () => (
  <footer className="bg-[#020202] py-12 sm:py-16 mt-8 sm:mt-12 relative z-10 px-4 sm:px-6 border-t border-white/5">
    <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="flex flex-col items-center md:items-start gap-2">
        <span className="text-white font-black tracking-tighter text-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500" />
          RAHUL.
        </span>
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} Rahul Uniyal. Built with React, Next.js & Tailwind.
        </p>
      </div>
      <div className="flex space-x-3 relative z-20">
        <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-cyan-400 hover:bg-cyan-500/10 hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all">
          <Github size={16} />
        </a>
        <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer"
          className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all">
          <Linkedin size={16} />
        </a>
      </div>
    </div>
  </footer>
);
