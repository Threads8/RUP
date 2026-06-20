'use client';

import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, ArrowUpRight, Command as CommandIcon } from 'lucide-react';
import { navLinks, personalInfo } from '../../data/portfolio-data';
import { useUISound } from '../../hooks/useUISound';

export const Navbar = ({ lenis, setIsCmdOpen }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { playPop, playWhoosh } = useUISound();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => { setScrolled(window.scrollY > 20); ticking = false; });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 w-full z-50 px-4 sm:px-6 pt-4 sm:pt-6">
      <div className={`mx-auto max-w-6xl rounded-full border transition-all duration-500 ${scrolled ? 'bg-[#050505]/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]' : 'bg-transparent border-transparent'}`}>
        <div className="px-4 md:px-6 py-3.5 flex justify-between items-center">
          <a href="#" onClick={(e) => { e.preventDefault(); lenis?.scrollTo(0); playPop(); }} className="text-lg font-black tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center gap-2 group">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-500 group-hover:scale-125 transition-transform" />
            RAHUL.
          </a>

          <nav className="hidden lg:flex space-x-5 items-center bg-white/5 px-5 py-2 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); lenis?.scrollTo(link.href); playPop(); }}
                className="text-slate-300 hover:text-cyan-400 text-[11px] uppercase tracking-widest font-bold transition-colors">{link.name}</a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => { setIsCmdOpen((p: boolean) => !p); playWhoosh(); }}
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-slate-300 hover:text-white transition-colors p-2 rounded-full hover:bg-white/5">
              <CommandIcon size={14} /> <span className="opacity-60 text-[10px]">Cmd+K</span>
            </button>
            <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-cyan-500 via-indigo-500 to-teal-500 text-white px-5 py-2.5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all">
              Let&apos;s Talk <ArrowUpRight size={14} />
            </a>
          </div>

          <button className="lg:hidden text-slate-300 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            onClick={() => { setIsOpen(!isOpen); playPop(); }}>
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile */}
      <div className={`lg:hidden absolute top-[80px] left-4 right-4 rounded-3xl overflow-hidden transition-all duration-300 origin-top border border-white/10 ${isOpen ? 'scale-y-100 opacity-100 shadow-2xl' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#050505]/95 backdrop-blur-xl p-5 flex flex-col space-y-3">
          <button onClick={() => { setIsOpen(false); setIsCmdOpen(true); playWhoosh(); }}
            className="flex items-center gap-3 text-slate-200 hover:text-cyan-400 hover:bg-white/5 rounded-2xl px-4 py-3 text-sm tracking-widest uppercase font-bold transition-all text-left">
            <CommandIcon size={16} /> Command Palette
          </button>
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={(e) => { e.preventDefault(); lenis?.scrollTo(link.href); setIsOpen(false); playPop(); }}
              className="text-slate-200 hover:text-cyan-400 hover:bg-white/5 rounded-2xl px-4 py-3 text-sm tracking-widest uppercase font-bold transition-all">{link.name}</a>
          ))}
          <a href={personalInfo.whatsapp} target="_blank" rel="noopener noreferrer"
            className="text-center mt-2 bg-gradient-to-r from-cyan-500 via-indigo-500 to-teal-500 text-white rounded-2xl px-4 py-3 text-sm tracking-widest uppercase font-bold">
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
};
