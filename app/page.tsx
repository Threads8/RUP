'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Download, ArrowUpRight, Circle, Briefcase, GraduationCap } from 'lucide-react';

/**
 * HOOK: useOnScreen
 * Detects when an element is in the viewport to trigger animations.
 */
function useOnScreen(ref, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin, threshold: 0.1 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [ref, rootMargin]);

  return isIntersecting;
}

/**
 * COMPONENT: CustomCursor
 * Premium trailing ring cursor interaction.
 */
const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const requestRef = useRef(null);
  
  // Mouse position state
  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if device is touch-capable (don't show custom cursor on mobile)
    if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return;
    
    setIsVisible(true);

    const onMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      
      // Update dot instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }

      // Check if hovering over clickable
      const target = e.target;
      const isClickable = target.closest('a') || target.closest('button') || window.getComputedStyle(target).cursor === 'pointer';
      setIsHovering(isClickable);
    };

    const updateRing = () => {
      // Interpolate ring position for smooth trailing effect
      ring.current.x += (mouse.current.x - ring.current.x) * 0.15;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) scale(${isHovering ? 1.5 : 1})`;
        ringRef.current.style.backgroundColor = isHovering ? 'rgba(244, 63, 94, 0.1)' : 'transparent';
        ringRef.current.style.borderColor = isHovering ? 'rgba(244, 63, 94, 0.5)' : 'rgba(255, 255, 255, 0.5)';
      }
      
      requestRef.current = requestAnimationFrame(updateRing);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestRef.current = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isHovering]);

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        body, a, button, [role="button"] { cursor: none !important; }
      `}</style>
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 rounded-full border border-white/50 pointer-events-none z-[100] transition-colors duration-300 ease-out mix-blend-difference"
      />
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-white pointer-events-none z-[100] mix-blend-difference"
      />
    </>
  );
};

/**
 * COMPONENT: Loader
 * Premium loading sequence.
 */
const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [status, setStatus] = useState("INITIALIZING SYSTEM...");

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setStatus("READY.");
        setTimeout(() => setIsFadingOut(true), 600);
        setTimeout(onComplete, 1400); // Wait for fade out
      } else if (currentProgress > 70) {
        setStatus("RENDERING ASSETS...");
      } else if (currentProgress > 30) {
        setStatus("LOADING MODULES...");
      }
      setProgress(Math.min(currentProgress, 100));
    }, 150);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[999] bg-[#020202] flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'}`}>
      <div className="w-full max-w-sm px-8 relative">
        {/* Animated Glow behind loader */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-rose-500/20 to-indigo-500/20 blur-[60px] rounded-full animate-pulse"></div>
        
        <div className="relative z-10 flex justify-between items-end mb-4">
          <div className="flex flex-col">
            <span className="text-white font-black tracking-tighter text-3xl">RAHUL.</span>
            <span className="text-rose-400 font-bold tracking-widest text-[10px] uppercase mt-1 animate-pulse">{status}</span>
          </div>
          <span className="text-white font-mono text-xl">{Math.floor(progress)}%</span>
        </div>
        
        <div className="relative z-10 w-full h-[2px] bg-white/10 overflow-hidden rounded-full">
          <div 
            className="h-full bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500 transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * COMPONENT: Section
 * Enhanced with scaling and a buttery-smooth cubic-bezier transition.
 */
const Section = ({ children, id, className = "" }) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, "-10%");

  return (
    <section 
      id={id} 
      ref={ref}
      className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] transform origin-bottom ${
        isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-95"
      } ${className}`}
    >
      {children}
    </section>
  );
};

/**
 * COMPONENT: InteractiveCard
 * Advanced 3D Hover Card with realistic glare, blend modes, and parallax depth.
 */
const InteractiveCard = ({ children, className = "", innerClassName = "" }) => {
  const cardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      width: rect.width,
      height: rect.height
    });
  };

  // Calculate 3D rotation based on mouse position
  const rotX = isHovering ? ((mousePos.y / mousePos.height) - 0.5) * -12 : 0;
  const rotY = isHovering ? ((mousePos.x / mousePos.width) - 0.5) * 12 : 0;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={`[perspective:1500px] ${className}`}
    >
      <div
        className={`relative w-full h-full bg-white/[0.02] border border-white/10 backdrop-blur-md overflow-hidden transition-all duration-300 ease-out [transform-style:preserve-3d] ${
          isHovering ? 'shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] border-white/20' : ''
        } ${innerClassName}`}
        style={{
          transform: isHovering 
            ? `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
      >
        {/* Content Wrapper for Parallax Depth Pop */}
        <div 
          className="relative w-full h-full z-10 transition-transform duration-300 ease-out"
          style={{ transform: isHovering ? 'translateZ(20px)' : 'translateZ(0px)' }}
        >
          {children}
        </div>

        {/* Realistic Glare (Overlay Blend Mode) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovering ? 0.8 : 0,
            background: `radial-gradient(circle 350px at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.4), transparent 80%)`
          }}
        />
        
        {/* Plasma Color Flare (Color Dodge Blend Mode) */}
        <div 
          className="absolute inset-0 z-20 pointer-events-none transition-opacity duration-300 mix-blend-color-dodge"
          style={{
            opacity: isHovering ? 0.6 : 0,
            background: `radial-gradient(circle 450px at ${mousePos.x}px ${mousePos.y}px, rgba(244, 63, 94, 0.4), rgba(99, 102, 241, 0.3), transparent 70%)`
          }}
        />
      </div>
    </div>
  );
};

/**
 * COMPONENT: AmbientBackground
 * Vibrant, glowing plasma orbs for a colorful, eye-catching backdrop.
 */
const AmbientBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-[-5] overflow-hidden bg-[#050505]">
    <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-indigo-600/20 blur-[150px] mix-blend-screen animate-[pulse_8s_ease-in-out_infinite]"></div>
    <div className="absolute top-[30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-rose-600/15 blur-[120px] mix-blend-screen animate-[pulse_10s_ease-in-out_infinite]"></div>
    <div className="absolute bottom-[-20%] left-[10%] w-[50%] h-[50%] rounded-full bg-teal-500/15 blur-[150px] mix-blend-screen animate-[pulse_12s_ease-in-out_infinite]"></div>
  </div>
);

/**
 * COMPONENT: NoiseOverlay
 * Subtle film grain to blend the vibrant colors smoothly.
 */
const NoiseOverlay = () => (
  <div 
    className="fixed inset-0 z-50 pointer-events-none opacity-[0.05] mix-blend-overlay" 
    style={{ 
      backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' 
    }}
  ></div>
);

/**
 * COMPONENT: ParticleBackground
 * Interactive floating particles.
 */
const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouse.x = x * 20; 
      targetMouse.y = y * 20;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.layer = Math.ceil(Math.random() * 3);
        
        const colors = ['rgba(244, 63, 94,', 'rgba(99, 102, 241,', 'rgba(45, 212, 191,', 'rgba(255, 255, 255,'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        const shiftX = mouse.x * (this.layer * 0.3);
        const shiftY = mouse.y * (this.layer * 0.3);

        ctx.fillStyle = `${this.color} ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.baseX - shiftX, this.baseY - shiftY, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const init = () => {
      particles = [];
      const numParticles = Math.floor((canvas.width * canvas.height) / 7000); 
      for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      particles.forEach(p => p.update());
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none" />; 
};

/**
 * COMPONENT: Navbar
 */
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Education', href: '#education' },
    { name: 'Resume', href: '#resume' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 transition-all duration-500 px-4 sm:px-6 pt-6">
      <div className={`mx-auto max-w-6xl rounded-full transition-all duration-500 border ${
        scrolled 
          ? 'bg-[#050505]/70 backdrop-blur-2xl border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]' 
          : 'bg-transparent border-transparent'
        }`}
      >
        <div className="px-4 md:px-6 py-4 flex justify-between items-center">
          <a href="#" className="text-xl font-black tracking-tighter text-white hover:opacity-80 transition-opacity flex items-center gap-2 group">
            <span className="w-3 h-3 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 group-hover:scale-125 transition-transform"></span>
            RAHUL.
          </a>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-6 items-center bg-white/5 px-6 py-2.5 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-300 hover:text-rose-400 text-xs uppercase tracking-widest font-bold transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          <a href="https://wa.me/918868022329" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 text-xs uppercase tracking-widest font-bold bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500 text-white px-6 py-3 rounded-full shadow-[0_0_20px_rgba(244,63,94,0.3)] hover:shadow-[0_0_30px_rgba(99,102,241,0.5)] hover:scale-105 transition-all">
            Let&apos;s Talk <ArrowUpRight size={16} />
          </a>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-slate-300 hover:text-white p-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden absolute top-[90px] left-4 right-4 rounded-3xl overflow-hidden transition-all duration-300 origin-top border border-white/10 ${isOpen ? 'scale-y-100 opacity-100 shadow-2xl' : 'scale-y-0 opacity-0 pointer-events-none'}`}>
        <div className="bg-[#050505]/95 backdrop-blur-xl p-6 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-200 hover:text-rose-400 hover:bg-white/5 rounded-2xl px-5 py-4 text-sm tracking-widest uppercase font-bold transition-all"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <a 
            href="https://wa.me/918868022329" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-center mt-2 bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500 text-white rounded-2xl px-5 py-4 text-sm tracking-widest uppercase font-bold transition-all"
          >
            Let&apos;s Talk
          </a>
        </div>
      </div>
    </header>
  );
};

/**
 * COMPONENT: Hero
 */
const Hero = () => {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(120);
  
  const words = ["Software Engineer.", "Web Developer.", "Problem Solver."];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 40 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="hero" className="min-h-screen pt-32 pb-12 px-4 sm:px-6 flex items-center relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main Hero Card (with new 3D logic) */}
          <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-6 sm:p-10 md:p-14 flex flex-col justify-center">
            {/* Colorful Inner Glow */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-gradient-to-bl from-rose-500/20 via-indigo-500/10 to-transparent blur-[80px] rounded-full opacity-60 -z-10"></div>
            
            <div className="flex flex-col items-start h-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-500/30 bg-teal-500/10 backdrop-blur-md mb-6 md:mb-8 shadow-[0_0_15px_rgba(45,212,191,0.2)]">
                <Circle size={8} className="fill-teal-400 text-teal-400 animate-pulse" />
                <span className="text-teal-100 font-bold text-[10px] sm:text-xs tracking-widest uppercase">Available for Work</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black text-white leading-[1.05] tracking-tighter mb-4 sm:mb-6">
                A Web Dev Who <br />
                <span className="bg-gradient-to-r from-rose-400 via-indigo-400 to-teal-400 bg-clip-text text-transparent drop-shadow-lg">Codes Logic,</span> <br />
                <span>Designs Purpose.</span>
              </h1>
              
              <h2 className="text-base sm:text-lg md:text-2xl text-slate-400 font-medium h-8 flex items-center tracking-tight mb-8 sm:mb-12">
                I&apos;m a&nbsp;<span className="text-rose-400 font-bold border-r-2 border-rose-400 pr-2 animate-[pulse_1s_infinite]">{text}</span>
              </h2>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-auto">
                 <a href="#projects" className="group relative px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-slate-950 text-xs sm:text-sm uppercase tracking-widest font-black rounded-full overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                   <span className="relative z-10 flex items-center justify-center gap-2">
                     View Work <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                   </span>
                 </a>
                 <a href="#contact" className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-white/20 bg-white/5 text-white text-xs sm:text-sm uppercase tracking-widest font-bold hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:scale-105">
                   Contact Me
                 </a>
              </div>
            </div>
          </InteractiveCard>

          {/* Profile Card */}
          <InteractiveCard className="lg:col-span-4 min-h-[350px] sm:min-h-[400px]" innerClassName="rounded-[2.5rem] p-4 flex flex-col justify-between group">
             <div className="absolute inset-0 bg-gradient-to-t from-indigo-600/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
             
             <div className="w-full h-full rounded-[2rem] overflow-hidden bg-[#111] relative z-0">
               <img 
                  src="https://res.cloudinary.com/dpjdnoqii/image/upload/v1765538072/20251116_122306_1_svilxg.jpg" 
                  alt="Rahul Uniyal" 
                  className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110"
                />
             </div>
             
             <div className="absolute bottom-6 left-6 right-6 z-20 bg-[#050505]/70 backdrop-blur-xl border border-white/10 rounded-2xl p-4 flex items-center justify-between shadow-2xl">
                <div>
                  <p className="text-white font-black text-xs sm:text-sm uppercase tracking-wider">Rahul Uniyal</p>
                  <p className="text-rose-400 text-[10px] sm:text-xs font-bold tracking-widest mt-1">Based in India</p>
                </div>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-tr from-rose-500 to-indigo-500 text-white flex items-center justify-center font-bold transform -rotate-45 group-hover:rotate-0 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.6)] transition-all duration-500">
                  <ArrowUpRight size={18} strokeWidth={2.5} />
                </div>
             </div>
          </InteractiveCard>

        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENT: About & Skills
 */
const AboutSkills = () => {
  const skills = [
    { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" }
  ];

  return (
    <Section id="about" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* About Bento */}
          <InteractiveCard className="lg:col-span-6 xl:col-span-7" innerClassName="rounded-[2.5rem] p-6 sm:p-10 md:p-14 flex flex-col justify-center">
             <span className="text-rose-400 font-black tracking-widest uppercase text-xs mb-6 sm:mb-8 flex items-center gap-3">
               <span className="w-6 sm:w-8 h-[2px] bg-rose-500/50"></span> About
             </span>
             <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-6 sm:mb-8 leading-tight">
               Crafting logic into <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-indigo-400">seamless experiences.</span>
             </h2>
             <div className="space-y-4 sm:space-y-6">
               <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                 As a dedicated <span className="text-white font-medium">MCA student</span> at Graphic Era Hill University, I am driven by a passion for crafting meaningful technology. My hands-on experience with <span className="text-indigo-300 font-semibold">ReactJS</span> and <span className="text-indigo-300 font-semibold">Node.js</span> has allowed me to build dynamic, real-time web applications.
               </p>
               <p className="text-slate-300 text-base sm:text-lg leading-relaxed font-light">
                 Beyond code, I hold a deep admiration for the <span className="text-white font-medium">Indian Defence Forces</span>, inspiring discipline, resilience, and a service-oriented approach in all I do.
               </p>
             </div>
          </InteractiveCard>

          {/* High-Visibility Skills Bento */}
          <InteractiveCard className="lg:col-span-6 xl:col-span-5" innerClassName="rounded-[2.5rem] p-6 sm:p-10 md:p-14 flex flex-col">
             <span className="text-indigo-400 font-black tracking-widest uppercase text-xs mb-6 sm:mb-8 flex items-center gap-3">
               <span className="w-6 sm:w-8 h-[2px] bg-indigo-500/50"></span> Expertise
             </span>
             <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-6 sm:mb-8">Tech Stack</h3>
             
             {/* Larger, visible grid for icons */}
             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4 mt-auto">
               {skills.map((skill, idx) => (
                 <div key={idx} className="flex flex-col items-center justify-center gap-2 sm:gap-3 bg-white/5 border border-white/10 p-3 sm:p-4 rounded-2xl hover:bg-white/10 hover:border-indigo-500/50 hover:shadow-[0_0_25px_rgba(99,102,241,0.2)] transition-all duration-300 group">
                   <img src={skill.icon} alt={skill.name} className="w-10 h-10 md:w-12 md:h-12 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-300" />
                   <span className="text-slate-200 font-bold text-[9px] sm:text-[10px] md:text-xs tracking-wider uppercase text-center">{skill.name}</span>
                 </div>
               ))}
             </div>
          </InteractiveCard>

        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: ProjectCard
 */
const ProjectCard = ({ title, desc, tags, link }) => (
  <InteractiveCard innerClassName="rounded-[2rem] p-6 sm:p-8 md:p-10 flex flex-col h-full group">
    {/* Colorful hover backdrop */}
    <div className="absolute top-0 right-0 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-bl from-rose-500/20 to-indigo-500/20 blur-[50px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

    <div className="relative z-10 flex justify-between items-start mb-6 sm:mb-8">
      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-rose-400 group-hover:text-white group-hover:bg-rose-500 group-hover:border-rose-400 group-hover:shadow-[0_0_20px_rgba(244,63,94,0.5)] transition-all duration-500">
        <Code size={20} className="sm:w-[24px] sm:h-[24px]" strokeWidth={2} />
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300">
        <ArrowUpRight size={18} className="sm:w-[20px] sm:h-[20px] transform group-hover:scale-110 group-hover:text-rose-300 transition-all" strokeWidth={2} />
      </a>
    </div>
    
    <h3 className="relative z-10 text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-3 sm:mb-4 tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-rose-300 group-hover:to-indigo-300 transition-all duration-300">{title}</h3>
    <p className="relative z-10 text-slate-400 text-sm sm:text-base mb-8 sm:mb-10 flex-grow leading-relaxed font-light">
      {desc}
    </p>
    
    <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
      {tags.map((tag, idx) => (
        <span key={idx} className="text-[9px] sm:text-[10px] uppercase tracking-widest font-bold text-rose-200 bg-rose-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-rose-500/20 group-hover:border-rose-500/50 group-hover:bg-rose-500/20 transition-colors">
          {tag}
        </span>
      ))}
    </div>
  </InteractiveCard>
);

/**
 * COMPONENT: Projects
 */
const Projects = () => {
  const projects = [
    {
      title: "Campus Connect",
      desc: "A comprehensive networking and resource-sharing platform built for university students to foster campus collaboration, share materials, and stay updated.",
      tags: ["React.js", "Node.js", "Full Stack"],
      link: "https://campus-connect-one-ochre.vercel.app/"
    },
    {
      title: "Devbhoomi",
      desc: "An immersive web platform designed to promote tourism, explore, and showcase the rich culture and heritage of Uttarakhand.",
      tags: ["Web Dev", "UI/UX"],
      link: "https://devbhoomi-two.vercel.app/"
    },
    {
      title: "FlavorFetch",
      desc: "A specialized Email Sender and Bulk Mailing System for a food delivery platform. Enables personalized promo emails and order updates.",
      tags: ["HTML/CSS", "Express.js"],
      link: "https://github.com/Threads8/Email-Sender"
    },
    {
      title: "Byte&Bite",
      desc: "Dynamic restaurant website featuring a floating AI chatbot button that expands into a full interface for better customer service.",
      tags: ["React.js", "AI", "CSS3"],
      link: "https://github.com/Threads8/RE"
    },
    {
      title: "Student DB System",
      desc: "Robust C-based system using custom data structures and file handling logic for efficient record management without external databases.",
      tags: ["C", "Structures"],
      link: "https://github.com/Threads8/Student-Management-System"
    },
    {
      title: "Web Terminal",
      desc: "Browser-based terminal emulator providing real-time shell access via WebSockets. Mimics native terminal behavior.",
      tags: ["React", "WebSockets"],
      link: "https://github.com/Threads8/web-Terminal"
    }
  ];

  return (
    <Section id="projects" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6">
          <div>
            <span className="text-teal-400 font-black tracking-widest uppercase text-xs mb-4 sm:mb-6 flex items-center gap-3">
              <span className="w-6 sm:w-8 h-[2px] bg-teal-500/50"></span> Selected Works
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tighter">
              Featured Projects.
            </h2>
          </div>
          <a href="https://github.com/Threads8" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs sm:text-sm uppercase tracking-widest font-black text-teal-400 hover:text-teal-300 transition-colors group">
            View Github <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} {...proj} />
          ))}
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Experience
 */
const Experience = () => {
  return (
    <Section id="experience" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-rose-400 font-black tracking-widest uppercase text-xs mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[2px] bg-rose-500/50"></span> Career
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 sm:mb-8">
                Experience.
              </h2>
              <p className="text-slate-400 font-light text-sm sm:text-base mb-8 sm:mb-10 max-w-sm">
                A look at my professional journey, internships, and hands-on industry experience.
              </p>
            </div>
            
            <div className="hidden lg:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-rose-400">
               <Briefcase size={32} />
            </div>
          </div>

          <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-8 sm:p-10 md:p-14">
            <div className="space-y-8 sm:space-y-10 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-rose-500/30 before:to-transparent">
              
              {/* Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] bg-rose-400 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.8)] transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"></div>
                
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 md:group-odd:pl-0 md:group-even:pr-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-rose-500/30 transition-colors shadow-lg">
                    <span className="text-rose-400 font-mono font-bold text-[10px] sm:text-xs md:text-sm mb-2 block uppercase tracking-wider">Feb 2026 – Mar 2026</span>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight">Full-stack Web Dev Intern</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">Prodigy InfoTech</p>
                    <span className="inline-block bg-rose-500/10 text-rose-300 border border-rose-500/20 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Dehradun, India</span>
                  </div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] bg-indigo-500 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(99,102,241,0.8)] transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"></div>
                
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 md:group-odd:pl-0 md:group-even:pr-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-even:items-start md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-indigo-500/30 transition-colors shadow-lg">
                    <span className="text-indigo-400 font-mono font-bold text-[10px] sm:text-xs md:text-sm mb-2 block uppercase tracking-wider">Nov 2025 – Dec 2025</span>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight">Web Development Intern</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">Prodigy InfoTech</p>
                    <span className="inline-block bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">Dehradun, India</span>
                  </div>
                </div>
              </div>

            </div>
          </InteractiveCard>
          
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Education
 */
const Education = () => {
  return (
    <Section id="education" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-indigo-400 font-black tracking-widest uppercase text-xs mb-4 sm:mb-6 flex items-center gap-3">
                <span className="w-6 sm:w-8 h-[2px] bg-indigo-500/50"></span> Academics
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white tracking-tighter mb-4 sm:mb-8">
                Education.
              </h2>
              <p className="text-slate-400 font-light text-sm sm:text-base mb-8 sm:mb-10 max-w-sm">
                A brief overview of my academic journey and foundational knowledge base.
              </p>
            </div>
            
            <div className="hidden lg:flex w-20 h-20 rounded-full bg-white/5 border border-white/10 items-center justify-center text-indigo-400">
               <GraduationCap size={32} />
            </div>
          </div>

          <InteractiveCard className="lg:col-span-8" innerClassName="rounded-[2.5rem] p-8 sm:p-10 md:p-14">
            <div className="space-y-8 sm:space-y-10 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[2px] before:bg-gradient-to-b before:from-transparent before:via-indigo-500/30 before:to-transparent">
              
              {/* Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] bg-teal-400 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(45,212,191,0.8)] transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"></div>
                
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 md:group-odd:pl-0 md:group-even:pr-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-teal-500/30 transition-colors shadow-lg">
                    <span className="text-teal-400 font-mono font-bold text-[10px] sm:text-xs md:text-sm mb-2 block uppercase tracking-wider">2024 - 2026</span>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight">Masters of Computer Application</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">Graphic Era Hill University</p>
                    <span className="inline-block bg-teal-500/10 text-teal-300 border border-teal-500/20 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">SGPA: 7.3/10</span>
                  </div>
                </div>
              </div>
              
              {/* Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                <div className="flex items-center justify-center w-5 h-5 rounded-full border-[4px] border-[#050505] bg-rose-500 group-hover:bg-white group-hover:scale-150 group-hover:shadow-[0_0_15px_rgba(244,63,94,0.8)] transition-all duration-300 absolute left-0 md:left-1/2 md:-translate-x-1/2 shrink-0 z-10"></div>
                
                <div className="w-[calc(100%-2rem)] md:w-[calc(50%-2.5rem)] ml-8 md:ml-0 md:group-odd:pl-0 md:group-even:pr-0 text-left md:group-odd:text-right">
                  <div className="flex flex-col md:group-even:items-start md:group-odd:items-end bg-white/[0.03] p-5 sm:p-6 rounded-2xl border border-white/5 group-hover:border-rose-500/30 transition-colors shadow-lg">
                    <span className="text-rose-400 font-mono font-bold text-[10px] sm:text-xs md:text-sm mb-2 block uppercase tracking-wider">2021 - 2024</span>
                    <h4 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white mb-1 sm:mb-2 tracking-tight">Bachelor of Computer Application</h4>
                    <p className="text-slate-400 font-medium tracking-wide text-xs sm:text-sm mb-3 sm:mb-4">Graphic Era Hill University</p>
                    <span className="inline-block bg-rose-500/10 text-rose-300 border border-rose-500/20 px-3 sm:px-4 py-1.5 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">GPA: 7.0/10</span>
                  </div>
                </div>
              </div>

            </div>
          </InteractiveCard>
          
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Resume Download Section
 */
const ResumeDownload = () => {
  return (
    <Section id="resume" className="py-12 sm:py-20 px-4 sm:px-6 relative z-10">
      <div className="container mx-auto max-w-4xl text-center">
        <InteractiveCard innerClassName="rounded-[3rem] p-10 sm:p-16 md:p-20 relative overflow-hidden group">
          
          {/* Animated Holographic Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-gradient-to-r from-rose-500/20 via-indigo-500/20 to-teal-500/20 blur-[60px] sm:blur-[80px] rounded-full -z-10 group-hover:opacity-100 opacity-50 transition-opacity duration-700 animate-[spin_10s_linear_infinite]"></div>

          <span className="text-white/60 font-black tracking-widest uppercase text-[10px] sm:text-xs mb-4 block">
             Get Full Details
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white mb-4 sm:mb-6 tracking-tighter drop-shadow-lg">
            Ready to Dive Deeper?
          </h2>
          <p className="text-slate-400 text-sm sm:text-lg mb-8 sm:mb-12 font-light max-w-xl mx-auto">
            Grab a copy of my full resume to see a detailed breakdown of my professional experience, skills, and academic background.
          </p>

          <a 
            href="https://drive.google.com/file/d/1l-GaC0E1p1K-QD1NGJT1BkfHquwZXNZ3/view?usp=sharing" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500 text-white font-black py-4 sm:py-5 px-8 sm:px-10 rounded-full uppercase tracking-widest text-xs sm:text-sm hover:scale-105 hover:shadow-[0_0_40px_rgba(99,102,241,0.6)] transition-all relative z-20"
          >
            <Download size={20} className="animate-bounce" /> Download Resume 
          </a>
        </InteractiveCard>
      </div>
    </Section>
  );
}

/**
 * COMPONENT: Contact
 */
const Contact = () => {
  return (
    <Section id="contact" className="py-12 sm:py-20 px-4 sm:px-6 relative mt-6 sm:mt-10 z-10">
      <div className="container mx-auto max-w-6xl relative z-10">
        <InteractiveCard innerClassName="rounded-[3rem] p-8 sm:p-16 md:p-24 text-center relative">
          {/* Subtle glowing orb inside contact */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-gradient-to-r from-teal-500/10 to-rose-500/10 blur-[80px] sm:blur-[100px] rounded-full -z-10"></div>
          
          <span className="text-teal-400 font-black tracking-widest uppercase text-[10px] sm:text-xs mb-6 sm:mb-8 flex justify-center items-center gap-2 sm:gap-3">
             <span className="w-6 sm:w-8 h-[2px] bg-teal-500/50"></span> Let&apos;s Work Together
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400 mb-6 sm:mb-8 tracking-tighter leading-[1]">Let&apos;s Build<br/>Something.</h2>
          <p className="text-slate-400 text-sm sm:text-lg mx-auto mb-10 sm:mb-16 font-light max-w-xl">
            I&apos;m currently seeking new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 relative z-20">
            <a 
              href="https://wa.me/918868022329" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex justify-center items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-rose-500 via-indigo-500 to-teal-500 text-white uppercase tracking-widest font-black text-xs rounded-full transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <Mail size={16} /> WhatsApp Me
            </a>
            <a 
              href="https://www.linkedin.com/in/rahul-u-a82621227/" 
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex justify-center items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-white/20 bg-white/5 text-white uppercase tracking-widest font-bold text-xs rounded-full hover:bg-white/10 hover:border-indigo-500/50 transition-all hover:scale-105"
            >
              <Linkedin size={16} /> LinkedIn
            </a>
          </div>
        </InteractiveCard>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Footer
 */
const Footer = () => {
  return (
    <footer className="bg-[#020202] py-12 sm:py-16 mt-8 sm:mt-12 relative z-10 px-4 sm:px-6 border-t border-white/5">
      <div className="container mx-auto max-w-6xl flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
        <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest text-center md:text-left">
          &copy; {new Date().getFullYear()} Rahul Uniyal. <br className="md:hidden" />Built with React & Tailwind.
        </p>
        <div className="flex space-x-4 relative z-20">
          <a href="https://github.com/Threads8" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-rose-400 hover:bg-rose-500/10 hover:shadow-[0_0_15px_rgba(244,63,94,0.3)] transition-all">
            <Github size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
          </a>
          <a href="https://www.linkedin.com/in/rahul-u-a82621227/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:border-indigo-400 hover:bg-indigo-500/10 hover:shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all">
            <Linkedin size={16} className="sm:w-[18px] sm:h-[18px]" strokeWidth={2} />
          </a>
        </div>
      </div>
    </footer>
  );
};

/**
 * MAIN APP
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="min-h-screen bg-[#050505] text-slate-300 font-sans selection:bg-rose-500/30 selection:text-rose-200 overflow-x-hidden relative">
      <style>{`
        html {
          scroll-behavior: smooth;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
        @media (min-width: 640px) {
          ::-webkit-scrollbar {
            width: 8px;
          }
        }
        ::-webkit-scrollbar-track {
          background: #050505; 
        }
        ::-webkit-scrollbar-thumb {
          background: #1e1b4b; 
          border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: #312e81; 
        }
      `}</style>
      
      {isLoading ? (
        <Loader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="animate-[fadeInScale_1s_ease-out_forwards]">
          <style>{`
            @keyframes fadeInScale {
              from { opacity: 0; transform: scale(0.98); }
              to { opacity: 1; transform: scale(1); }
            }
          `}</style>
          <CustomCursor />
          <NoiseOverlay />
          <AmbientBackground />
          <ParticleBackground />
          <Navbar />
          <main>
            <Hero />
            <AboutSkills />
            <Projects />
            <Experience />
            <Education />
            <ResumeDownload />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </div>
  );
}