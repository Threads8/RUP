'use client';

import React, { useState, useEffect, createContext } from 'react';
import { Briefcase, Mail, Download } from 'lucide-react';
import { Command } from 'cmdk';
import Lenis from 'lenis';

// Components
import { CustomCursor, AmbientBackground, CSSParticles } from './components/ui';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/hero/Hero';
import { Terminal } from './components/terminal/Terminal';
import { Skills } from './components/skills/Skills';
import { Projects } from './components/projects/Projects';
import { MissionControl } from './components/iot/MissionControl';
import { VisitorAnalytics } from './components/analytics/VisitorAnalytics';
import { Experience, Education } from './components/experience/ExperienceEducation';
import { RecruiterImpact } from './components/recruiter/RecruiterImpact';
import { Contact } from './components/contact/Contact';
import { personalInfo } from './data/portfolio-data';

// ── Loader ──
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 15;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatus("READY.");
        setTimeout(() => setIsFadingOut(true), 400);
        setTimeout(onComplete, 1000);
      } else if (currentProgress > 70) {
        setStatus("LOADING IOT MODULES...");
      } else if (currentProgress > 30) {
        setStatus("CONNECTING TO CLOUD...");
      }
      setProgress(Math.min(currentProgress, 100));
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[999] bg-[#020202] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="w-full max-w-sm px-8 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 blur-[60px] rounded-full animate-pulse" />
        <div className="relative z-10 flex justify-between items-end mb-4">
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-3xl">RAHUL.</span>
            <span className="text-cyan-400 font-bold tracking-widest text-[10px] uppercase mt-1 animate-pulse">{status}</span>
          </div>
          <span className="text-white font-mono text-xl">{Math.floor(progress)}%</span>
        </div>
        <div className="relative z-10 w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-teal-500 transition-all duration-200 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </div>
  );
};

// ── Command Palette ──
const CommandPaletteOverlay = ({ isOpen, setIsOpen, lenis }: any) => {
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open: boolean) => !open);
      }
    };
    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, [setIsOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setIsOpen(false)}>
      <div className="w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <Command className="w-full h-full">
          <Command.Input placeholder="Type a command or search..." className="w-full bg-transparent text-white p-4 border-b border-white/10 outline-none placeholder:text-slate-500" />
          <Command.List className="p-2 max-h-[300px] overflow-y-auto">
            <Command.Empty className="p-4 text-slate-400 text-sm">No results found.</Command.Empty>
            <Command.Group heading="Navigation" className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 px-2 mt-2">
              <Command.Item onSelect={() => { setIsOpen(false); lenis?.scrollTo('#projects'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Briefcase size={16} /> Projects</Command.Item>
              <Command.Item onSelect={() => { setIsOpen(false); lenis?.scrollTo('#terminal'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Briefcase size={16} /> Terminal</Command.Item>
              <Command.Item onSelect={() => { setIsOpen(false); lenis?.scrollTo('#mission-control'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Briefcase size={16} /> Mission Control</Command.Item>
              <Command.Item onSelect={() => { setIsOpen(false); lenis?.scrollTo('#experience'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Briefcase size={16} /> Experience</Command.Item>
              <Command.Item onSelect={() => { setIsOpen(false); lenis?.scrollTo('#contact'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Mail size={16} /> Contact</Command.Item>
            </Command.Group>
            <Command.Group heading="Actions" className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 px-2 mt-4">
              <Command.Item onSelect={() => { setIsOpen(false); window.open(personalInfo.resumeUrl, '_blank'); }} className="p-3 text-slate-300 hover:bg-white/10 hover:text-white rounded-lg cursor-pointer flex items-center gap-3"><Download size={16} /> Download Resume</Command.Item>
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
};

// ── MAIN APP ──
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [lenisRef, setLenisRef] = useState<Lenis | null>(null);
  const [activeColors, setActiveColors] = useState({ primary: '#06b6d4', secondary: '#6366f1', tertiary: '#14b8a6' });
  const [isCmdOpen, setIsCmdOpen] = useState(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    setLenisRef(lenis);
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => { lenis.destroy(); };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden relative">
      <style>{`
        ::-webkit-scrollbar { width: 6px; }
        @media (min-width: 640px) { ::-webkit-scrollbar { width: 8px; } }
        ::-webkit-scrollbar-track { background: #050505; }
        ::-webkit-scrollbar-thumb { background: #164e63; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0e7490; }
      `}</style>

      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-[fadeInScale_0.8s_ease-out_forwards]">
          <style>{`
            @keyframes fadeInScale { from { opacity: 0; transform: scale(0.98); } to { opacity: 1; transform: scale(1); } }
          `}</style>
          <CustomCursor />
          <AmbientBackground activeColors={activeColors} />
          <CSSParticles />
          <Navbar lenis={lenisRef} setIsCmdOpen={setIsCmdOpen} />
          <CommandPaletteOverlay isOpen={isCmdOpen} setIsOpen={setIsCmdOpen} lenis={lenisRef} />

          <main>
            <Hero lenis={lenisRef} />
            <Skills />
            <Projects />
            <Terminal />
            <MissionControl />
            <VisitorAnalytics />
            <RecruiterImpact />
            <Experience />
            <Education />
            <Contact />
          </main>

          <Footer />
        </div>
      )}
    </div>
  );
}