// ── Portfolio Content Data ──────────────────────────────────────────────────────
// Centralized data for the entire portfolio. Update content here.

export const personalInfo = {
  name: "Rahul Uniyal",
  role: "Full Stack Developer | Cloud & IoT Enthusiast",
  tagline: "Building Cloud-Powered Applications, Intelligent IoT Systems, and Modern Web Experiences.",
  location: "Dehradun, India",
  email: "mailto:rahuluniyal8868@gmail.com",
  whatsapp: "https://wa.me/918868022329",
  linkedin: "https://www.linkedin.com/in/rahul-u-a82621227/",
  github: "https://github.com/Threads8",
  resumeUrl: "https://drive.google.com/file/d/1l-GaC0E1p1K-QD1NGJT1BkfHquwZXNZ3/view?usp=sharing",
  profileImage: "https://res.cloudinary.com/dpjdnoqii/image/upload/v1780856668/WhatsApp_Image_2026-06-07_at_11.53.09_PM_l7m45v.jpg",
};

export const typingWords = [
  "Cloud Architect.",
  "IoT Engineer.",
  "Full Stack Developer.",
  "Firebase Expert.",
];

export const navLinks = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Terminal", href: "#terminal" },
  { name: "Mission Control", href: "#mission-control" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

export const flagshipProjects = [
  {
    title: "Cloud-Based Smart Alarm System",
    desc: "A cloud-powered smart alarm ecosystem built using React, Firebase, ESP8266, and Telegram integration. Features real-time alarm management, cloud synchronization, remote control, and instant notifications.",
    link: "https://smart-alarm-gray.vercel.app/",
    badge: "🏆 FLAGSHIP PROJECT",
    colors: { primary: "#06b6d4", secondary: "#3b82f6", tertiary: "#14b8a6" },
    features: [
      "Real-Time Alarm Scheduling",
      "Firebase Realtime Database",
      "Telegram Notifications",
      "Remote Alarm Management",
      "NTP Time Synchronization",
      "Cloud Monitoring Dashboard",
      "Real-Time Status Tracking",
      "ESP8266 Integration",
    ],
    techStack: ["React.js", "Firebase", "ESP8266", "Telegram Bot API", "Tailwind CSS", "Recharts"],
    architecture: {
      nodes: ["ESP8266", "Firebase", "React Dashboard", "Telegram Bot", "User Notification"],
      flow: "ESP8266 → Firebase → React Dashboard → Telegram Bot → User Notification",
    },
  },
  {
    title: "Jarvis Room Assistant",
    desc: "A cloud-connected smart room assistant featuring multiple IoT sensors, Firebase synchronization, intelligent monitoring, real-time analytics, and automated alerts.",
    link: "https://smart-room-assistant.vercel.app/",
    badge: "🏆 FLAGSHIP PROJECT",
    colors: { primary: "#8b5cf6", secondary: "#6366f1", tertiary: "#06b6d4" },
    features: [
      "Motion Detection",
      "Temperature Monitoring",
      "Humidity Tracking",
      "Ultrasonic Presence Detection",
      "Sound Detection",
      "Light Monitoring",
      "Real-Time Analytics",
      "Automated Alerts",
      "Firebase Sync",
      "Telegram Alerts",
    ],
    techStack: ["React.js", "Firebase", "ESP8266", "Telegram Bot", "Recharts", "Tailwind CSS"],
    sensors: ["DHT22", "PIR Motion Sensor", "HC-SR04 Ultrasonic", "LDR Sensor", "Sound Sensor"],
    architecture: {
      nodes: ["Sensors", "ESP8266", "Firebase", "Real-Time Analytics", "Dashboard + Telegram"],
      flow: "Sensors → ESP8266 → Firebase → Real-Time Analytics → Dashboard + Telegram",
    },
  },
];

export const otherProjects = [
  {
    title: "Campus Connect",
    desc: "A networking and resource-sharing platform built for university students to foster collaboration, communication, and knowledge sharing.",
    tags: ["React.js", "Node.js", "Firebase"],
    link: "https://campus-connect-one-ochre.vercel.app/",
    colors: { primary: "#3b82f6", secondary: "#10b981", tertiary: "#8b5cf6" },
  },
  {
    title: "Second Brain",
    desc: "A full-stack personal knowledge management platform featuring semantic search, smart organization, and interconnected knowledge graphs.",
    tags: ["Next.js", "Full Stack", "Modern UI/UX"],
    link: "https://second-brain-psi-dun.vercel.app/",
    colors: { primary: "#8b5cf6", secondary: "#c084fc", tertiary: "#f472b6" },
  },
  {
    title: "Devbhoomi",
    desc: "A modern tourism platform showcasing the culture, heritage, and destinations of Uttarakhand through immersive web experiences.",
    tags: ["React.js", "UI/UX", "Tourism"],
    link: "https://devbhoomi-two.vercel.app/",
    colors: { primary: "#f59e0b", secondary: "#ef4444", tertiary: "#84cc16" },
  },
  {
    title: "Ferrari Landing Page",
    desc: "A premium, high-performance landing page designed for Ferrari, focusing on immersive animations and modern aesthetics.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion"],
    link: "https://ferrari-landing-page-flax.vercel.app/",
    colors: { primary: "#ef4444", secondary: "#f59e0b", tertiary: "#dc2626" },
  },
];

export const skills = {
  frontend: {
    label: "Frontend",
    color: "#3b82f6",
    items: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    ],
  },
  backend: {
    label: "Backend",
    color: "#10b981",
    items: [
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    ],
  },
  cloud: {
    label: "Cloud & DevOps",
    color: "#f59e0b",
    items: [
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
      { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
      { name: "Vercel", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-original.svg" },
    ],
  },
  languages: {
    label: "Programming",
    color: "#ef4444",
    items: [
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "Java", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
      { name: "C", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg" },
    ],
  },
  iot: {
    label: "IoT & Hardware",
    color: "#8b5cf6",
    items: [
      { name: "ESP8266", emoji: "📡" },
      { name: "DHT22", emoji: "🌡️" },
      { name: "PIR Sensor", emoji: "👁️" },
      { name: "HC-SR04", emoji: "📏" },
      { name: "LDR Sensor", emoji: "💡" },
      { name: "Sound Sensor", emoji: "🔊" },
    ],
  },
};

export const experience = [
  {
    period: "Feb 2026 – Mar 2026",
    title: "Full-stack Web Dev Intern",
    company: "Prodigy InfoTech",
    location: "Dehradun, India",
    color: "#f43f5e",
  },
  {
    period: "Nov 2025 – Dec 2025",
    title: "Web Development Intern",
    company: "Prodigy InfoTech",
    location: "Dehradun, India",
    color: "#6366f1",
  },
];

export const education = [
  {
    period: "2024 - 2026",
    degree: "Masters of Computer Application",
    institution: "Graphic Era Hill University",
    grade: "CGPA: 7.2/10 (Completed)",
    color: "#14b8a6",
  },
  {
    period: "2021 - 2024",
    degree: "Bachelor of Computer Application",
    institution: "Graphic Era Hill University",
    grade: "GPA: 7.0/10",
    color: "#f43f5e",
  },
];

export const terminalCommands: Record<string, string> = {
  help: `
╔═══════════════════════════════════════════╗
║         AVAILABLE COMMANDS                ║
╠═══════════════════════════════════════════╣
║  about          Who is Rahul?             ║
║  skills         Technical expertise       ║
║  projects       Featured projects         ║
║  experience     Work experience           ║
║  education      Academic background       ║
║  certifications My certifications         ║
║  cloud          Cloud engineering focus    ║
║  iot            IoT systems overview       ║
║  jarvis         Jarvis Room Assistant      ║
║  alarm          Smart Alarm System         ║
║  contact        Get in touch              ║
║  resume         Download my resume        ║
║  clear          Clear terminal            ║
╚═══════════════════════════════════════════╝`,

  about: `
┌─ ABOUT RAHUL UNIYAL ─────────────────────┐
│                                           │
│  Full Stack Developer | Cloud & IoT       │
│  Enthusiast based in Dehradun, India.     │
│                                           │
│  MCA Student @ Graphic Era Hill University│
│                                           │
│  I build cloud-powered applications,      │
│  intelligent IoT systems, and modern      │
│  web experiences that solve real-world    │
│  problems.                                │
│                                           │
│  Currently seeking opportunities in:      │
│  → Full Stack Development                 │
│  → Cloud Engineering                      │
│  → IoT Systems Development               │
│  → Firebase Architecture                  │
└───────────────────────────────────────────┘`,

  skills: `
┌─ TECHNICAL SKILLS ────────────────────────┐
│                                           │
│  FRONTEND     React.js, Tailwind CSS,     │
│               JavaScript, TypeScript      │
│                                           │
│  BACKEND      Node.js, Express.js,        │
│               Firebase                    │
│                                           │
│  CLOUD        AWS, Firebase, Vercel,      │
│               Real-Time Systems           │
│                                           │
│  LANGUAGES    JavaScript, Python,         │
│               Java, C                     │
│                                           │
│  IOT          ESP8266, DHT22, PIR,        │
│               HC-SR04, LDR, Sound Sensor  │
└───────────────────────────────────────────┘`,

  projects: `
┌─ FEATURED PROJECTS ───────────────────────┐
│                                           │
│  🏆 Cloud-Based Smart Alarm System        │
│     React + Firebase + ESP8266 + Telegram │
│     → smart-alarm-gray.vercel.app         │
│                                           │
│  🏆 Jarvis Room Assistant                 │
│     IoT Sensors + Firebase + AI + Alerts  │
│     → smart-alarm-gray.vercel.app         │
│                                           │
│  📱 Campus Connect                        │
│     React.js + Node.js + Firebase         │
│                                           │
│  🧠 Second Brain                          │
│     Next.js + Full Stack + Modern UI      │
│                                           │
│  🏔️  Devbhoomi                            │
│     React.js + Tourism Platform           │
└───────────────────────────────────────────┘`,

  experience: `
┌─ WORK EXPERIENCE ─────────────────────────┐
│                                           │
│  FULL-STACK WEB DEV INTERN                │
│  Prodigy InfoTech                         │
│  Feb 2026 – Mar 2026 │ Dehradun, India    │
│                                           │
│  WEB DEVELOPMENT INTERN                   │
│  Prodigy InfoTech                         │
│  Nov 2025 – Dec 2025 │ Dehradun, India    │
└───────────────────────────────────────────┘`,

  education: `
┌─ EDUCATION ───────────────────────────────┐
│                                           │
│  MASTERS OF COMPUTER APPLICATION          │
│  Graphic Era Hill University              │
│  2024 – 2026 │ SGPA: 7.3/10              │
│                                           │
│  BACHELOR OF COMPUTER APPLICATION         │
│  Graphic Era Hill University              │
│  2021 – 2024 │ GPA: 7.0/10               │
└───────────────────────────────────────────┘`,

  certifications: `
┌─ CERTIFICATIONS ──────────────────────────┐
│                                           │
│  ✓ Full Stack Web Development             │
│  ✓ Cloud Computing Fundamentals           │
│  ✓ IoT Systems Design                     │
│  ✓ Firebase Real-Time Applications        │
└───────────────────────────────────────────┘`,

  cloud: `
┌─ CLOUD ENGINEERING ───────────────────────┐
│                                           │
│  EXPERTISE:                               │
│  → Firebase Realtime Database             │
│  → Cloud Functions & Hosting              │
│  → Real-Time Data Synchronization         │
│  → Cloud-Connected IoT Systems            │
│  → AWS Fundamentals                       │
│  → Serverless Architecture                │
│                                           │
│  PROJECTS:                                │
│  → Smart Alarm: Firebase cloud sync       │
│  → Jarvis: Real-time sensor monitoring    │
│  → Both: Telegram cloud notifications     │
└───────────────────────────────────────────┘`,

  iot: `
┌─ IOT SYSTEMS ─────────────────────────────┐
│                                           │
│  MICROCONTROLLERS:                         │
│  → ESP8266 (NodeMCU)                      │
│                                           │
│  SENSORS:                                 │
│  → DHT22 (Temperature & Humidity)         │
│  → PIR (Motion Detection)                 │
│  → HC-SR04 (Ultrasonic Distance)          │
│  → LDR (Light Intensity)                  │
│  → Sound Sensor                           │
│                                           │
│  PROTOCOLS:                               │
│  → HTTP REST APIs                         │
│  → Firebase RTDB                          │
│  → NTP Time Sync                          │
│  → Telegram Bot API                       │
└───────────────────────────────────────────┘`,

  jarvis: `
┌─ JARVIS ROOM ASSISTANT ──────────────────┐
│                                           │
│  AI-powered smart room assistant with     │
│  multiple IoT sensors and Firebase sync.  │
│                                           │
│  SENSORS: DHT22, PIR, HC-SR04, LDR,      │
│           Sound Sensor                    │
│                                           │
│  FEATURES:                                │
│  → Motion & Presence Detection            │
│  → Temperature & Humidity Monitoring      │
│  → Light & Sound Level Tracking           │
│  → Real-Time Firebase Dashboard           │
│  → Automated Telegram Alerts              │
│  → Smart Recommendations                  │
│                                           │
│  FLOW: Sensors → ESP8266 → Firebase →     │
│        Analytics → Dashboard + Telegram   │
└───────────────────────────────────────────┘`,

  alarm: `
┌─ SMART ALARM SYSTEM ─────────────────────┐
│                                           │
│  Cloud-powered alarm ecosystem with       │
│  React, Firebase, ESP8266, and Telegram.  │
│                                           │
│  FEATURES:                                │
│  → Real-Time Alarm Scheduling             │
│  → Firebase Realtime Database             │
│  → Telegram Notifications                 │
│  → Remote Alarm Control                   │
│  → NTP Time Synchronization              │
│  → Cloud Dashboard                        │
│                                           │
│  FLOW: ESP8266 → Firebase → React →       │
│        Telegram Bot → User Notification   │
│                                           │
│  DEMO: smart-alarm-gray.vercel.app        │
└───────────────────────────────────────────┘`,

  contact: `
┌─ CONTACT ─────────────────────────────────┐
│                                           │
│  📧 rahuluniyal8868@gmail.com             │
│  💬 wa.me/918868022329                    │
│  🔗 linkedin.com/in/rahul-u-a82621227    │
│  🐙 github.com/Threads8                  │
│                                           │
│  STATUS: 🟢 Available for opportunities  │
└───────────────────────────────────────────┘`,

  resume: `
┌─ RESUME ──────────────────────────────────┐
│                                           │
│  Opening resume in new tab...             │
│  → drive.google.com/...                   │
│                                           │
│  Type 'contact' for other ways to reach   │
│  out, or 'skills' to see my expertise.    │
└───────────────────────────────────────────┘`,
};

export const recruiterImpactCards = [
  {
    icon: "🔧",
    title: "Full-Stack Development",
    desc: "End-to-end application development from React frontends to Node.js backends with Firebase cloud infrastructure.",
    color: "#3b82f6",
  },
  {
    icon: "☁️",
    title: "Cloud Architecture",
    desc: "Designed and deployed cloud-connected systems using Firebase Realtime Database, Cloud Functions, and serverless patterns.",
    color: "#06b6d4",
  },
  {
    icon: "📡",
    title: "IoT Engineering",
    desc: "Built hardware-software integrated systems using ESP8266, multiple sensors, and cloud synchronization protocols.",
    color: "#8b5cf6",
  },
  {
    icon: "⚡",
    title: "Real-Time Systems",
    desc: "Implemented real-time data sync, live dashboards, NTP time synchronization, and instant notification pipelines.",
    color: "#f59e0b",
  },
  {
    icon: "🔥",
    title: "Firebase Expertise",
    desc: "Deep experience with Realtime Database, Authentication, Cloud Hosting, and real-time data streaming architectures.",
    color: "#ef4444",
  },
  {
    icon: "🤖",
    title: "Automation & Alerts",
    desc: "Integrated Telegram Bot API for automated notifications, smart alerts, and remote system control capabilities.",
    color: "#10b981",
  },
];

export const achievementStats = [
  { label: "Projects Completed", value: 8, suffix: "+" },
  { label: "IoT Sensors Integrated", value: 6, suffix: "" },
  { label: "Cloud Services Used", value: 5, suffix: "+" },
  { label: "Lines of Code", value: 50, suffix: "K+" },
];
