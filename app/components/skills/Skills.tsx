'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio-data';
import { Section, InteractiveCard } from '../ui';

export const Skills = () => (
  <Section id="skills" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="mb-10 sm:mb-14">
        <span className="text-indigo-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center gap-3">
          <span className="w-6 sm:w-8 h-[2px] bg-indigo-500/50" /> Technical Expertise
        </span>
        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-extrabold text-white tracking-tighter">
          Skills & Technologies.
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {Object.entries(skills).map(([key, category], catIdx) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: catIdx * 0.1 }}
          >
            <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6 h-full">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: category.color }} />
                <h3 className="text-white font-bold text-sm tracking-wide uppercase">{category.label}</h3>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                {category.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] p-2.5 rounded-xl hover:bg-white/[0.06] hover:border-white/[0.12] transition-all group">
                    {item.icon ? (
                      <img src={item.icon} alt={item.name} loading="lazy" className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    ) : (
                      <span className="text-lg">{item.emoji}</span>
                    )}
                    <span className="text-slate-300 font-medium text-[11px] tracking-wide group-hover:text-white transition-colors">{item.name}</span>
                  </div>
                ))}
              </div>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);
