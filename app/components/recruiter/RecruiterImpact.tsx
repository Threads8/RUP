'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { recruiterImpactCards } from '../../data/portfolio-data';
import { Section, InteractiveCard } from '../ui';

export const RecruiterImpact = () => (
  <Section id="impact" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
    <div className="container mx-auto max-w-6xl">
      <div className="mb-10 sm:mb-14 text-center">
        <span className="text-amber-400 font-black tracking-widest uppercase text-xs mb-4 flex items-center justify-center gap-3">
          <span className="w-6 sm:w-8 h-[2px] bg-amber-500/50" /> Why It Matters
        </span>
        <h2 className="text-[clamp(1.875rem,4vw,3rem)] font-extrabold text-white tracking-tighter">
          Why These Projects Matter.
        </h2>
        <p className="text-slate-400 text-sm sm:text-base mt-3 font-light max-w-2xl mx-auto">
          Each project demonstrates practical expertise in modern software engineering, cloud architecture, and IoT systems — the skills recruiters are looking for.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {recruiterImpactCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            <InteractiveCard innerClassName="rounded-2xl p-5 sm:p-6 h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center border mb-4 text-2xl"
                style={{ borderColor: `${card.color}25`, background: `${card.color}10` }}>
                {card.icon}
              </div>
              <h3 className="text-white font-bold text-sm mb-2">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed font-light">{card.desc}</p>
            </InteractiveCard>
          </motion.div>
        ))}
      </div>
    </div>
  </Section>
);
