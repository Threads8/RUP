'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { Circle, ArrowUpRight } from 'lucide-react';
import { personalInfo, typingWords } from '../../data/portfolio-data';
import { InteractiveCard, MagneticHover } from '../ui';

const LazyHeroScene = React.lazy(() => import('./HeroScene').then(m => ({ default: m.HeroScene })));

export const Hero = ({ lenis }: { lenis: any }) => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);

  useEffect(() => {
    const timer = setTimeout(() => {
      const i = loopNum % typingWords.length;
      const fullText = typingWords[i];
      setText(prev => isDeleting ? fullText.substring(0, prev.length - 1) : fullText.substring(0, prev.length + 1));
      setTypingSpeed(isDeleting ? 40 : 100);
    }, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  useEffect(() => {
    const i = loopNum % typingWords.length;
    const fullText = typingWords[i];
    if (!isDeleting && text === fullText) {
      const t = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(t);
    } else if (isDeleting && text === '') {
      setIsDeleting(false);
      setLoopNum(p => p + 1);
    }
  }, [text, isDeleting, loopNum]);

  return (
    <section id="hero" className="min-h-screen pt-28 pb-12 px-4 sm:px-6 flex items-center relative z-10 overflow-hidden">
      {/* 3D Background — lazy loaded */}
      <Suspense fallback={null}>
        <LazyHeroScene />
      </Suspense>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Hero */}
          <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-6 sm:p-10 md:p-14 flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[450px] sm:h-[450px] bg-gradient-to-bl from-cyan-500/15 via-indigo-500/10 to-transparent blur-[80px] rounded-full opacity-40 -z-10" />

            <div className="flex flex-col items-start h-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md mb-6 md:mb-8 shadow-[0_0_15px_rgba(20,184,166,0.2)]">
                <Circle size={8} className="fill-teal-400 text-teal-400 animate-pulse" />
                <span className="text-teal-100 font-bold text-[10px] sm:text-xs tracking-widest uppercase">Available for Work</span>
              </div>

              <p className="text-cyan-400 font-bold text-xs sm:text-sm tracking-widest uppercase mb-3">{personalInfo.role}</p>

              <h1 className="text-[clamp(2.2rem,5.5vw,4.5rem)] font-black text-white leading-[1.05] tracking-tighter mb-4 sm:mb-6">
                {personalInfo.name.split(' ')[0]}{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent">
                  {personalInfo.name.split(' ')[1]}
                </span>
              </h1>

              <h2 className="text-base sm:text-lg md:text-xl text-slate-400 font-medium h-8 flex items-center tracking-tight mb-4 sm:mb-6">
                I build&nbsp;<span className="text-cyan-400 font-bold border-r-2 border-cyan-400 pr-2 animate-pulse">{text}</span>
              </h2>

              <p className="text-slate-400/80 text-sm sm:text-base leading-relaxed max-w-lg mb-8 sm:mb-10 font-light">
                {personalInfo.tagline}
              </p>

              <div className="flex flex-wrap gap-3 sm:gap-4 mt-auto">
                <MagneticHover>
                  <a href="#projects" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#projects'); }}
                    className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-cyan-500 to-indigo-500 text-white text-xs sm:text-sm uppercase tracking-widest font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      View Projects <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </a>
                </MagneticHover>
                <MagneticHover>
                  <a href="#terminal" onClick={(e) => { e.preventDefault(); lenis?.scrollTo('#terminal'); }}
                    className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/5 text-white text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:scale-105">
                    Open Terminal
                  </a>
                </MagneticHover>
              </div>
            </div>
          </InteractiveCard>

          {/* Profile Card */}
          <InteractiveCard className="lg:col-span-4 min-h-[350px] sm:min-h-[400px]" innerClassName="rounded-[2.5rem] p-4 flex flex-col justify-between group">
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" />
            <MagneticHover className="w-full h-full">
              <div className="w-full h-full rounded-[2rem] overflow-hidden bg-[#111] relative z-0">
                <img src={personalInfo.profileImage} alt={personalInfo.name} loading="eager" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              </div>
            </MagneticHover>
            <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#050505]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
              <div>
                <p className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">{personalInfo.name}</p>
                <p className="text-cyan-400 text-[10px] sm:text-xs font-bold tracking-widest mt-1">{personalInfo.location}</p>
              </div>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 text-white flex items-center justify-center font-bold transform -rotate-45 group-hover:rotate-0 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.6)] transition-all duration-500">
                <ArrowUpRight size={18} strokeWidth={2.5} />
              </div>
            </div>
          </InteractiveCard>
        </div>
      </div>
    </section>
  );
};
