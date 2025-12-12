'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Github, Linkedin, Mail, ExternalLink, Code, Download, ChevronRight } from 'lucide-react';

/**
 * HOOK: useOnScreen
 * Detects when an element is in the viewport to trigger animations.
 * FIX: Added ': any' to ref to satisfy TypeScript.
 */
function useOnScreen(ref: any, rootMargin = "0px") {
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Only trigger once
        }
      },
      { rootMargin }
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
 * COMPONENT: Section
 * Wrapper for animated sections.
 * FIX: Added ': any' to props.
 */
const Section = ({ children, id, className = "" }: any) => {
  const ref = useRef(null);
  const isVisible = useOnScreen(ref, "-50px");

  return (
    <section 
      id={id} 
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
    >
      {children}
    </section>
  );
};

/**
 * COMPONENT: StarBackground
 * Interactive starfield with twinkling stars, parallax mouse movement, and shooting stars.
 */
const StarBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // FIX: Cast to any to allow getContext usage without strict null checks
    const canvas: any = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId: any;
    let stars: any[] = [];
    let shootingStars: any[] = [];
    
    // Mouse state for parallax
    let mouse = { x: 0, y: 0 };
    let targetMouse = { x: 0, y: 0 };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    
    const handleMouseMove = (e: any) => {
      // Calculate normalized mouse position from center (-1 to 1)
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      targetMouse.x = x * 20; // Max shift amount
      targetMouse.y = y * 20;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);

    class Star {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      opacity: number;
      blinkSpeed: number;
      direction: number;
      layer: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.baseX = this.x;
        this.baseY = this.y;
        this.opacity = Math.random();
        this.blinkSpeed = Math.random() * 0.02 + 0.005;
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.layer = Math.ceil(Math.random() * 3); // Parallax layer
      }

      update() {
        // Twinkle
        this.opacity += this.blinkSpeed * this.direction;
        if (this.opacity >= 1 || this.opacity <= 0.2) {
          this.direction *= -1;
        }

        // Parallax Movement (opposite to mouse)
        // Layer 3 moves most, Layer 1 moves least
        const shiftX = mouse.x * (this.layer * 0.5);
        const shiftY = mouse.y * (this.layer * 0.5);

        // Draw
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.baseX - shiftX, this.baseY - shiftY, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    class ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      opacity: number;
      active: boolean;
      delay: number;
      timer: number;

      constructor() {
        this.x = 0;
        this.y = 0;
        this.length = 0;
        this.speed = 0;
        this.angle = 0;
        this.opacity = 0;
        this.active = false;
        this.delay = 0;
        this.timer = 0;
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = 0;
        this.length = Math.random() * 80 + 10;
        this.speed = Math.random() * 10 + 6;
        this.angle = Math.PI / 4; // 45 degrees
        this.opacity = 0;
        this.active = false;
        this.delay = Math.random() * 200 + 100; // Random start delay
        this.timer = 0;
      }

      update() {
        if (!this.active) {
          this.timer++;
          if (this.timer > this.delay) {
            this.active = true;
            this.opacity = 1;
          }
          return;
        }

        this.x -= this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);
        this.opacity -= 0.01;

        if (this.opacity <= 0 || this.x < 0 || this.y > canvas.height) {
          this.reset();
        } else {
          // Draw trail
          const endX = this.x + this.length * Math.cos(this.angle);
          const endY = this.y - this.length * Math.sin(this.angle);
          
          const gradient = ctx.createLinearGradient(this.x, this.y, endX, endY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity})`);
          gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);
          
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(this.x, this.y);
          ctx.lineTo(endX, endY);
          ctx.stroke();
        }
      }
    }

    const init = () => {
      stars = [];
      shootingStars = [];
      
      // Create static stars
      const numStars = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
      }

      // Create shooting stars
      for (let i = 0; i < 2; i++) {
        shootingStars.push(new ShootingStar());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Smooth mouse movement
      mouse.x += (targetMouse.x - mouse.x) * 0.05;
      mouse.y += (targetMouse.y - mouse.y) * 0.05;

      stars.forEach(star => star.update());
      shootingStars.forEach(s => s.update());

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

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none bg-slate-950" />;
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
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/80 backdrop-blur-md shadow-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
          RU
        </a>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-slate-300 hover:text-sky-400 font-medium transition-colors text-sm uppercase tracking-wider"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-slate-300 hover:text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10 absolute w-full">
          <div className="px-6 py-4 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-slate-300 hover:text-sky-400 block py-2 text-lg font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
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
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  const words = ["Software Engineer.", "Web Developer.", "Problem Solver."];

  useEffect(() => {
    const handleType = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 80 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        <div className="md:w-1/2 text-center md:text-left z-10">
          <p className="text-sky-400 font-medium mb-4 text-lg">Hello! I am Rahul Uniyal</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            A Web Developer Who <br />
            <span className="bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">Codes with Logic,</span> <br />
            <span className="bg-gradient-to-r from-blue-600 to-sky-400 bg-clip-text text-transparent">Designs with Purpose.</span>
          </h1>
          <h2 className="text-2xl md:text-3xl text-slate-400 font-light h-10">
            I'm a <span className="text-sky-300 border-r-2 border-sky-400 pr-1">{text}</span>
          </h2>
          <div className="mt-10 flex gap-4 justify-center md:justify-start">
             <a href="#projects" className="px-8 py-3 bg-gradient-to-r from-sky-500 to-blue-600 rounded-full text-white font-semibold hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all">
               View Work
             </a>
             <a href="#contact" className="px-8 py-3 border border-slate-600 hover:border-sky-400 rounded-full text-slate-300 hover:text-white transition-all">
               Contact Me
             </a>
          </div>
        </div>
        
        <div className="md:w-1/2 flex justify-center z-10">
          <div className="relative w-64 h-64 md:w-96 md:h-96 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-400 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl">
              <img 
                src="https://res.cloudinary.com/dpjdnoqii/image/upload/v1765538072/20251116_122306_1_svilxg.jpg" 
                alt="Rahul Uniyal" 
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * COMPONENT: About
 */
const About = () => {
  return (
    <Section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          <span className="border-b-4 border-sky-500 pb-2">About Me</span>
        </h2>
        
        <div className="max-w-5xl mx-auto bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-3/4">
            <p className="text-slate-300 text-lg leading-relaxed mb-6">
              As a dedicated <span className="text-sky-400 font-semibold">MCA student</span> at Graphic Era Hill University, I am driven by a passion for crafting meaningful technology. My hands-on experience with <span className="text-white">ReactJS</span> and <span className="text-white">Node.js</span> has allowed me to build dynamic, real-time web applications, including collaborative platforms and innovative chatbot integrations.
            </p>
            <p className="text-slate-300 text-lg leading-relaxed">
              Beyond my technical pursuits, I hold a deep admiration for the <span className="text-sky-400 font-semibold">Indian Defence Forces</span>, which inspires my commitment to discipline, resilience, and a service-oriented approach in all that I do. I am eager to bring this unique blend of technical skill and principled dedication to a forward-thinking team.
            </p>
          </div>
          <div className="md:w-1/4 flex justify-center">
             <div className="p-4 bg-slate-900 rounded-xl border border-sky-500/30 shadow-[0_0_15px_rgba(14,165,233,0.15)]">
               <Code className="w-16 h-16 text-sky-400" />
             </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: SkillCard
 * FIX: Added ': any' to props
 */
const SkillCard = ({ icon, name, color }: any) => (
  <div className="group relative bg-slate-900/50 border border-slate-700/50 p-6 rounded-xl flex flex-col items-center justify-center gap-4 transition-all duration-300 hover:-translate-y-2 hover:bg-slate-800 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/20">
    <div className={`transform transition-transform duration-300 group-hover:scale-110 ${color ? '' : 'grayscale group-hover:grayscale-0'}`}>
      {icon}
    </div>
    <span className="text-slate-300 font-medium group-hover:text-white">{name}</span>
  </div>
);

/**
 * COMPONENT: Skills
 */
const Skills = () => {
  return (
    <Section id="skills" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          <span className="border-b-4 border-sky-500 pb-2">My Tech Stack</span>
        </h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
          <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" className="w-12 h-12" alt="C" />} 
            name="C Programming" 
            color 
          />
          <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" className="w-12 h-12" alt="Java" />} 
            name="Java" 
            color 
          />
           <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" className="w-12 h-12" alt="HTML" />} 
            name="HTML5" 
            color 
          />
           <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" className="w-12 h-12" alt="CSS" />} 
            name="CSS3" 
            color 
          />
          <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" className="w-12 h-12" alt="JS" />} 
            name="JavaScript" 
            color 
          />
          <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" className="w-12 h-12" alt="React" />} 
            name="React" 
            color 
          />
          <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" className="w-12 h-12" alt="Node" />} 
            name="Node.js" 
            color 
          />
           <SkillCard 
            icon={<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" className="w-12 h-12" alt="Python" />} 
            name="Python" 
            color 
          />
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: ProjectCard
 * FIX: Added ': any' to props
 */
const ProjectCard = ({ title, desc, tags, link }: any) => (
  <div className="group bg-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 hover:bg-slate-800 hover:border-sky-500/50 transition-all duration-300 flex flex-col h-full hover:shadow-[0_10px_30px_-10px_rgba(14,165,233,0.3)]">
    <div className="flex justify-between items-start mb-4">
      <div className="p-3 bg-sky-500/10 rounded-lg text-sky-400 group-hover:text-white group-hover:bg-sky-500 transition-colors">
        <Code size={24} />
      </div>
      <a href={link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
        <ExternalLink size={20} />
      </a>
    </div>
    
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-sky-400 transition-colors">{title}</h3>
    <p className="text-slate-400 text-sm mb-6 flex-grow leading-relaxed">
      {desc}
    </p>
    
    <div className="flex flex-wrap gap-2 mt-auto">
      {tags.map((tag: any, idx: any) => (
        <span key={idx} className="text-xs font-medium text-sky-300 bg-sky-500/10 px-3 py-1 rounded-full border border-sky-500/20">
          {tag}
        </span>
      ))}
    </div>
  </div>
);

/**
 * COMPONENT: Projects
 */
const Projects = () => {
  const projects = [
    {
      title: "FlavorFetch",
      desc: "A specialized Email Sender and Bulk Mailing System for a food delivery platform. Enables personalized promo emails and order updates.",
      tags: ["HTML/CSS", "Express.js", "Node.js"],
      link: "https://github.com/Threads8/Email-Sender"
    },
    {
      title: "Byte&Bite",
      desc: "Dynamic restaurant website featuring a floating AI chatbot button that expands into a full interface for better customer service.",
      tags: ["React.js", "AI Integration", "CSS3"],
      link: "https://github.com/Threads8/RE"
    },
    {
      title: "Student Management System",
      desc: "Robust C-based system using custom data structures and file handling logic for efficient record management without external databases.",
      tags: ["C", "Data Structures", "File Handling"],
      link: "https://github.com/Threads8/Student-Management-System"
    },
    {
      title: "Ransomware Sim Tool",
      desc: "Educational cybersecurity tool demonstrating encryption mechanisms. Created for research to understand malware behavior.",
      tags: ["Python", "Cryptography", "Tkinter"],
      link: "https://github.com/Threads8/Ransomware-Simulation-Tool"
    },
    {
      title: "Web Terminal",
      desc: "Browser-based terminal emulator providing real-time shell access via WebSockets. Mimics native terminal behavior.",
      tags: ["React", "Node.js", "WebSockets", "xterm.js"],
      link: "https://github.com/Threads8/web-Terminal"
    }
  ];

  return (
    <Section id="projects" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          <span className="border-b-4 border-sky-500 pb-2">Featured Projects</span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((proj, idx) => (
            <ProjectCard key={idx} {...proj} />
          ))}
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Resume
 */
const Resume = () => {
  return (
    <Section id="resume" className="py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-16">
          <span className="border-b-4 border-sky-500 pb-2">Resume</span>
        </h2>

        <div className="max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-md border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Decorative Blur */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-sky-500/10 blur-3xl rounded-full -mr-20 -mt-20"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold text-sky-400 mb-8 flex items-center gap-2">
              <Download size={24} /> Education History
            </h3>
            
            <div className="space-y-12 border-l-2 border-slate-700 pl-8 ml-3">
              <div className="relative">
                <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-800 bg-sky-500"></div>
                <h4 className="text-xl font-bold text-white">Masters of Computer Application</h4>
                <p className="text-sky-400 font-medium">Graphic Era Hill University</p>
                <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
                  <span>2024 - 2026</span>
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-xs">SGPA: 7.3/10</span>
                </div>
              </div>

              <div className="relative">
                <div className="absolute -left-[41px] top-1 h-5 w-5 rounded-full border-4 border-slate-800 bg-slate-500"></div>
                <h4 className="text-xl font-bold text-white">Bachelor of Computer Application</h4>
                <p className="text-sky-400 font-medium">Graphic Era Hill University</p>
                <div className="flex justify-between items-center mt-2 text-sm text-slate-400">
                  <span>2021 - 2024</span>
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-xs">GPA: 7.0/10</span>
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <a 
                href="https://docs.google.com/document/d/1txyRzx8gJh6th8Uq3Rdmj7oHCh4-k6kphppwUJMwI-M/edit?usp=sharing" 
                target="_blank"
                className="inline-flex items-center gap-2 bg-white text-slate-900 font-bold py-3 px-8 rounded-full hover:bg-sky-400 hover:text-white transition-all transform hover:scale-105 shadow-lg"
              >
                View Full CV <ChevronRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Contact
 */
const Contact = () => {
  return (
    <Section id="contact" className="py-24 text-center">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Get In Touch</h2>
        <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
          I'm currently seeking new opportunities and would love to hear from you. 
          Whether you have a question or just want to say hi, feel free to reach out!
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
          <a 
            href="mailto:rahuluniyal218@gmail.com" 
            className="flex items-center gap-2 px-8 py-4 bg-sky-500 hover:bg-sky-600 text-white font-bold rounded-full transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)]"
          >
            <Mail size={20} /> Say Hello
          </a>
          <a 
            href="https://www.linkedin.com/in/rahul-u-a82621227/" 
            target="_blank"
            className="flex items-center gap-2 px-8 py-4 border border-slate-600 hover:border-sky-500 text-slate-300 hover:text-white font-bold rounded-full transition-all"
          >
            <Linkedin size={20} /> LinkedIn
          </a>
        </div>
      </div>
    </Section>
  );
};

/**
 * COMPONENT: Footer
 */
const Footer = () => {
  return (
    <footer className="bg-slate-950 py-8 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-500 text-sm">
          &copy; 2025 Rahul Uniyal. Built with React & Tailwind.
        </p>
        <div className="flex space-x-6">
          <a href="https://github.com/Threads8" target="_blank" className="text-slate-400 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/rahul-u-a82621227/" target="_blank" className="text-slate-400 hover:text-white transition-colors">
            <Linkedin size={20} />
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
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-sky-500/30 selection:text-sky-200 overflow-x-hidden">
      {/* Global styles for smooth scroll */}
      <style>{`
        html {
          scroll-behavior: smooth;
        }
      `}</style>
      <StarBackground />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}