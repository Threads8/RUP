'use client';

import React, { useRef, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// ── Section wrapper with scroll-triggered entrance ──
export const Section = ({ children, id, className = "" }: any) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-10%" }}
    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className={className}
  >
    {children}
  </motion.section>
);

// ── InteractiveCard: 3D hover card with glare — all ref-based, zero re-renders ──
export const InteractiveCard = ({ children, className = "", innerClassName = "", onHoverStart, onHoverEnd }: any) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current || !innerRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotX = ((y / rect.height) - 0.5) * -14;
    const rotY = ((x / rect.width) - 0.5) * 14;
    innerRef.current.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
    if (contentRef.current) contentRef.current.style.transform = 'translateZ(30px)';
    if (glareRef.current) {
      glareRef.current.style.opacity = '0.2';
      glareRef.current.style.background = `radial-gradient(circle 350px at ${x}px ${y}px, rgba(255,255,255,0.6), transparent 80%)`;
    }
    if (flareRef.current) {
      flareRef.current.style.opacity = '0.3';
      flareRef.current.style.background = `radial-gradient(circle 450px at ${x}px ${y}px, rgba(6,182,212,0.4), rgba(99,102,241,0.3), transparent 70%)`;
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.boxShadow = '0 30px 80px -15px rgba(0,0,0,1)';
      innerRef.current.style.borderColor = 'rgba(255,255,255,0.2)';
    }
    if (onHoverStart) onHoverStart();
  }, [onHoverStart]);

  const handleMouseLeave = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      innerRef.current.style.boxShadow = '';
      innerRef.current.style.borderColor = 'rgba(255,255,255,0.08)';
    }
    if (contentRef.current) contentRef.current.style.transform = 'translateZ(0px)';
    if (glareRef.current) glareRef.current.style.opacity = '0';
    if (flareRef.current) flareRef.current.style.opacity = '0';
    if (onHoverEnd) onHoverEnd();
  }, [onHoverEnd]);

  return (
    <div ref={cardRef} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`[perspective:2000px] ${className}`}>
      <div ref={innerRef} className={`relative w-full h-full bg-white/[0.02] border border-white/[0.08] backdrop-blur-md overflow-hidden shadow-xl [transform-style:preserve-3d] ${innerClassName}`} style={{ transition: 'transform 0.3s ease-out, box-shadow 0.3s ease-out, border-color 0.3s ease-out' }}>
        <div ref={contentRef} className="relative w-full h-full z-10" style={{ transition: 'transform 0.3s ease-out' }}>{children}</div>
        <div ref={glareRef} className="absolute inset-0 z-20 pointer-events-none" style={{ opacity: 0, transition: 'opacity 0.3s' }} />
        <div ref={flareRef} className="absolute inset-0 z-20 pointer-events-none" style={{ opacity: 0, transition: 'opacity 0.3s' }} />
      </div>
    </div>
  );
};

// ── MagneticHover ──
export const MagneticHover = ({ children, className = "" }: any) => {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const middleX = e.clientX - (rect.left + rect.width / 2);
    const middleY = e.clientY - (rect.top + rect.height / 2);
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={() => setPosition({ x: 0, y: 0 })}
      animate={position}
      transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
      className={`inline-block ${className}`}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
};

// ── ScrollRevealText — word-level opacity ──
export const ScrollRevealText = ({ text, className = "" }: { text: string; className?: string }) => {
  const container = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start 90%", "center 60%"] });
  const words = text.split(" ");

  return (
    <p ref={container} className={`flex flex-wrap ${className}`}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + (1 / words.length);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
        return <motion.span key={i} style={{ opacity }} className="mr-1.5 mb-1">{word}</motion.span>;
      })}
    </p>
  );
};

// ── CustomCursor — Removed (using normal cursor) ──
export const CustomCursor = () => null;

// ── ParallaxMarquee ──
export const ParallaxMarquee = ({ children, direction = 1, speed = 1 }: any) => {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: container, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [`${direction * 20 * speed}%`, `${direction * -20 * speed}%`]);
  return (
    <div ref={container} className="w-full overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, willChange: 'transform' }} className="flex gap-4 w-max">{children}{children}{children}</motion.div>
    </div>
  );
};

// ── AmbientBackground ──
export const AmbientBackground = ({ activeColors }: any) => (
  <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden bg-[#050505]">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full blur-[120px]" style={{ backgroundColor: activeColors?.primary || '#4f46e5', opacity: 0.1, transition: 'background-color 1s' }} />
    <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px]" style={{ backgroundColor: activeColors?.secondary || '#06b6d4', opacity: 0.07, transition: 'background-color 1s' }} />
    <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] rounded-full blur-[120px]" style={{ backgroundColor: activeColors?.tertiary || '#14b8a6', opacity: 0.07, transition: 'background-color 1s' }} />
  </div>
);

// ── CSSParticles — lightweight floating dots ──
export const CSSParticles = () => {
  const particles = React.useMemo(() =>
    Array.from({ length: 35 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 25 + 15,
      delay: Math.random() * -20,
      opacity: Math.random() * 0.25 + 0.05,
      color: ['rgba(6,182,212,', 'rgba(99,102,241,', 'rgba(20,184,166,', 'rgba(255,255,255,'][Math.floor(Math.random() * 4)],
    })), []);

  return (
    <div className="fixed inset-0 pointer-events-none -z-[2] overflow-hidden">
      {particles.map((p) => (
        <div key={p.id} className="absolute rounded-full animate-float-particle"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, backgroundColor: `${p.color}${p.opacity})`, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }} />
      ))}
    </div>
  );
};
