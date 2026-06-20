'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Code, ExternalLink, CheckCircle2, Cpu, Wifi, Cloud, Zap } from 'lucide-react';
import { flagshipProjects, otherProjects, personalInfo } from '../../data/portfolio-data';
import { Section, InteractiveCard, MagneticHover, ParallaxMarquee } from '../ui';

// ── Architecture Diagram ──
const ArchitectureDiagram = ({ nodes, flow }: { nodes: string[]; flow: string }) => (
  <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
    <p className="text-[10px] uppercase tracking-widest font-bold text-slate-500 mb-4">System Architecture</p>
    <div className="flex items-center justify-center flex-wrap gap-2 sm:gap-3">
      {nodes.map((node, i) => (
        <React.Fragment key={i}>
          <div className="px-3 py-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-xs text-slate-300 font-mono whitespace-nowrap hover:bg-white/[0.08] hover:border-cyan-500/30 transition-all">
            {node}
          </div>
          {i < nodes.length - 1 && (
            <div className="text-cyan-500/60 text-xs font-mono">→</div>
          )}
        </React.Fragment>
      ))}
    </div>
  </div>
);

// ── Flagship Project Card ──
const FlagshipProject = ({ project, index }: { project: typeof flagshipProjects[0]; index: number }) => {
  const [showArch, setShowArch] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
    >
      <div className="relative rounded-[2rem] p-[1px] overflow-hidden group"
        style={{ background: `linear-gradient(135deg, ${project.colors.primary}40, ${project.colors.secondary}30, ${project.colors.tertiary}20, transparent 60%)` }}>
        {/* Animated glow border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{ background: `linear-gradient(135deg, ${project.colors.primary}60, ${project.colors.secondary}40, ${project.colors.tertiary}30)`, filter: 'blur(20px)' }} />

        <div className="relative bg-[#0a0a0a] rounded-[2rem] p-6 sm:p-8 md:p-10 overflow-hidden">
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full blur-[100px] opacity-20 -z-10"
            style={{ background: `radial-gradient(circle, ${project.colors.primary}, transparent)` }} />

          {/* Badge */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-[10px] sm:text-xs font-black uppercase tracking-widest"
              style={{ borderColor: `${project.colors.primary}40`, background: `${project.colors.primary}15`, color: project.colors.primary }}>
              <Zap size={12} /> {project.badge}
            </div>
            <a href={project.link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-white hover:bg-white/10 transition-all hover:scale-105">
              <ExternalLink size={14} /> Live Demo
            </a>
          </div>

          {/* Thumbnail */}
          <div className="relative w-full rounded-xl overflow-hidden mb-6 group/thumb border border-white/10" style={{ aspectRatio: '16 / 9' }}>
            <div className="absolute inset-0 z-10 transition-transform duration-500 group-hover/thumb:scale-105 pointer-events-none"
              style={{ background: `linear-gradient(135deg, ${project.colors.primary}25, ${project.colors.secondary}20, ${project.colors.tertiary}15)` }} />
            <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none"
              style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            {project.link !== '#' ? (
              <iframe src={project.link} className="absolute inset-0 w-[200%] h-[200%] scale-50 origin-top-left border-none pointer-events-none bg-white" tabIndex={-1} />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 border border-white/10" style={{ background: `${project.colors.primary}15` }}>
                    {index === 0 ? <Cloud size={24} style={{ color: project.colors.primary }} /> : <Cpu size={24} style={{ color: project.colors.primary }} />}
                  </div>
                  <span className="text-white/40 text-sm font-semibold">{project.title}</span>
                </div>
              </div>
            )}
          </div>

          {/* Title & Description */}
          <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 tracking-tight">{project.title}</h3>
          <p className="text-slate-400 text-sm sm:text-base mb-6 leading-relaxed font-light">{project.desc}</p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
            {project.features.map((feat, i) => (
              <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 size={14} style={{ color: project.colors.primary }} className="shrink-0" />
                {feat}
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.map((tech, i) => (
              <span key={i} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border"
                style={{ borderColor: `${project.colors.primary}25`, background: `${project.colors.primary}10`, color: `${project.colors.primary}cc` }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Sensors (Jarvis only) */}
          {'sensors' in project && (project as any).sensors && (
            <div className="flex flex-wrap gap-2 mb-4">
              {(project as any).sensors.map((sensor: string, i: number) => (
                <span key={i} className="text-[10px] uppercase tracking-widest font-bold px-3 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/10 text-violet-300">
                  📡 {sensor}
                </span>
              ))}
            </div>
          )}

          {/* Architecture Toggle */}
          <button onClick={() => setShowArch(!showArch)}
            className="text-xs uppercase tracking-widest font-bold text-slate-500 hover:text-cyan-400 transition-colors mt-2 flex items-center gap-2">
            <Wifi size={12} /> {showArch ? 'Hide' : 'View'} Architecture
          </button>
          {showArch && <ArchitectureDiagram nodes={project.architecture.nodes} flow={project.architecture.flow} />}
        </div>
      </div>
    </motion.div>
  );
};

// ── Other Project Card ──
const ProjectCard = ({ project, index }: { project: typeof otherProjects[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6 h-full group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center" style={{ color: project.colors.primary }}>
          <Code size={18} />
        </div>
        <a href={project.link} target="_blank" rel="noopener noreferrer"
          className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all z-20">
          <ArrowUpRight size={16} />
        </a>
      </div>

      {/* Live Thumbnail Preview */}
      <div className="relative w-full h-32 sm:h-40 rounded-xl overflow-hidden mb-4 border border-white/10 group/thumb">
        <div className="absolute inset-0 z-10 hover:bg-transparent bg-black/20 transition-all duration-300 pointer-events-none" />
        {project.link !== '#' ? (
          <iframe 
            src={project.link} 
            className="absolute inset-0 w-[200%] h-[200%] scale-50 origin-top-left border-none pointer-events-none bg-white"
            tabIndex={-1}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-white/5 text-white/30 text-xs">Preview unavailable</div>
        )}
      </div>
      <h3 className="text-lg font-bold text-white mb-2 tracking-tight group-hover:text-cyan-300 transition-colors">{project.title}</h3>
      <p className="text-slate-400 text-sm mb-4 leading-relaxed font-light">{project.desc}</p>
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tags.map((tag, i) => (
          <span key={i} className="text-[9px] uppercase tracking-widest font-bold text-cyan-200/80 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/15">
            {tag}
          </span>
        ))}
      </div>
    </InteractiveCard>
  </motion.div>
);

// ── Main Projects Section ──
export const Projects = () => (
  <Section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      {/* Header */}
      <div className="mb-10 sm:mb-14 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-teal-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
            <span className="w-6 sm:w-8 h-[2px] bg-teal-500/50" /> Selected Works
          </span>
          <h2 className="text-[clamp(1.875rem,5vw,3.75rem)] font-extrabold text-white tracking-tighter">
            Featured Projects.
          </h2>
          <div className="mt-6 opacity-40 relative -mx-4 sm:-mx-6 pointer-events-none select-none overflow-hidden">
            <ParallaxMarquee direction={1} speed={1.5}>
              <span className="text-3xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 px-8">CLOUD FIREBASE IOT REAL-TIME SYSTEMS</span>
            </ParallaxMarquee>
          </div>
        </div>
        <MagneticHover>
          <a href={personalInfo.github} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-black text-teal-400 hover:text-teal-300 transition-colors group z-20">
            View Github <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </MagneticHover>
      </div>

      {/* Flagship Projects */}
      <div className="space-y-6 sm:space-y-8 mb-10 sm:mb-14">
        {flagshipProjects.map((proj, i) => (
          <FlagshipProject key={i} project={proj} index={i} />
        ))}
      </div>

      {/* Other Projects */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-white tracking-tight mb-6">Other Projects</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {otherProjects.map((proj, i) => (
          <ProjectCard key={i} project={proj} index={i} />
        ))}
      </div>
    </div>
  </Section>
);
