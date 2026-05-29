import { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { 
  motion, 
  AnimatePresence 
} from 'motion/react';
import { 
  Compass, 
  Layers, 
  RefreshCw, 
  PenTool, 
  Briefcase, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Check, 
  X, 
  Send, 
  ChevronRight, 
  ArrowRight, 
  Copy, 
  Clock, 
  FileText, 
  Info, 
  User, 
  DollarSign, 
  Feather, 
  Inbox, 
  Sparkles,
  Award
} from 'lucide-react';

import { Project, ApproachStep, Inquiry } from './types';
import { PROJECTS, APPROACH_STEPS, DESIGN_SKILLS } from './data';

// Map our high-quality generated local assets to our projects data
const PROJECT_IMAGES: Record<string, string> = {
  'thesis-recommender': '/src/assets/images/design_poster_art_1780038576950.png',
  'tindog-ui': '/src/assets/images/travel_ui_mockup_1780038557856.png',
  'rgarage-system': '/src/assets/images/brand_refresh_acme_1780038537409.png',
};

// Color palettes configured for the project detailed case study specifications
const PALETTES: Record<string, { name: string; hex: string }[]> = {
  'thesis-recommender': [
    { name: 'Academic Blue', hex: '#1f4fff' },
    { name: 'Primary Navy', hex: '#0a1d56' },
    { name: 'University Cream', hex: '#fcfaf2' },
    { name: 'Research Obsidian', hex: '#1d1d1d' },
    { name: 'Abstract Slate', hex: '#637381' }
  ],
  'tindog-ui': [
    { name: 'Playful Pink', hex: '#ff4f79' },
    { name: 'Hyper Indigo', hex: '#6f8cff' },
    { name: 'Puppy Soft Soft', hex: '#faf6f0' },
    { name: 'Chic Charcoal', hex: '#212121' },
    { name: 'Off-White Accent', hex: '#f4f5fc' }
  ],
  'rgarage-system': [
    { name: 'Modification Red', hex: '#ef4444' },
    { name: 'Garage Dark', hex: '#0b0d15' },
    { name: 'Industrial Cream', hex: '#faf6f0' },
    { name: 'Contrast Orange', hex: '#f97316' },
    { name: 'Invoicing Gray', hex: '#737373' }
  ]
};

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('portfolio-dark-mode');
    return saved === 'true' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // Navigation states
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Skill interactive selection
  const [selectedSkillIndex, setSelectedSkillIndex] = useState<number>(0);

  // Filter category state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Case study modal states
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // Inquiry message states
  const [inquiryName, setInquiryName] = useState<string>('');
  const [inquiryEmail, setInquiryEmail] = useState<string>('');
  const [inquiryType, setInquiryType] = useState<string>('Brand Identity');
  const [inquiryBudget, setInquiryBudget] = useState<string>('$5,000 - $10,000');
  const [inquiryMessage, setInquiryMessage] = useState<string>('');
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted'>('idle');

  // Local storage submission viewer drawer
  const [submissionList, setSubmissionList] = useState<Inquiry[]>([]);
  const [showInbox, setShowInbox] = useState<boolean>(false);

  // Apply dark mode styling class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('portfolio-dark-mode', String(darkMode));
  }, [darkMode]);

  // Read message logs from localStorage on load
  useEffect(() => {
    const loaded = localStorage.getItem('portfolio-enquiries');
    if (loaded) {
      try {
        setSubmissionList(JSON.parse(loaded));
      } catch (err) {
        console.error('Failed to parse inquiries log from local storage', err);
      }
    }
  }, []);

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'approach', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const offsetTop = el.offsetTop;
          const offsetHeight = el.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyColor = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => {
      setCopiedColor(null);
    }, 2000);
  };

  const handleInquirySubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim() || !inquiryMessage.trim()) return;

    setFormStatus('submitting');
    
    setTimeout(() => {
      const newInquiry: Inquiry = {
        id: 'inq_' + Date.now(),
        name: inquiryName,
        email: inquiryEmail,
        projectType: inquiryType,
        budget: inquiryBudget,
        message: inquiryMessage,
        timestamp: new Date().toLocaleString()
      };

      const updated = [newInquiry, ...submissionList];
      setSubmissionList(updated);
      localStorage.setItem('portfolio-enquiries', JSON.stringify(updated));

      // Clear the form
      setInquiryName('');
      setInquiryEmail('');
      setInquiryMessage('');
      setFormStatus('submitted');
    }, 1200);
  };

  const handleDeleteInquiry = (id: string, e: MouseEvent) => {
    e.stopPropagation();
    const updated = submissionList.filter(item => item.id !== id);
    setSubmissionList(updated);
    localStorage.setItem('portfolio-enquiries', JSON.stringify(updated));
  };

  // Helper routine to associate simple string icon to SVG component
  const renderApproachIcon = (iconName: string) => {
    switch (iconName) {
      case 'Compass':
        return <Compass className="w-6 h-6 text-accent-color dark:text-[#6f8cff]" />;
      case 'Layers':
        return <Layers className="w-6 h-6 text-accent-color dark:text-[#6f8cff]" />;
      case 'RefreshCw':
        return <RefreshCw className="w-6 h-6 text-accent-color dark:text-[#6f8cff]" />;
      default:
        return <PenTool className="w-6 h-6 text-accent-color dark:text-[#6f8cff]" />;
    }
  };

  const categories = ['All', 'Software Development', 'UI/UX Design', 'Operational IT'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <div id="website-scaffolding" className="min-h-screen relative font-sans text-[#111111] dark:text-[#f3f4ff] bg-[#f7f9ff] dark:bg-[#0b0d15] transition-colors duration-300">
      
      {/* Background Decorative Radial */}
      <div className="absolute top-0 left-0 right-0 h-[800px] pointer-events-none radial-glow z-0" />
      
      {/* Dynamic Navigation Header */}
      <header id="header-navigation" className="sticky top-0 z-40 bg-[#f7f9ff]/72 dark:bg-[#0b0d15]/72 backdrop-blur-md border-b border-[#111111]/8 dark:border-[#f3f4ff]/8 transition-colors duration-300">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <motion.a 
            href="#hero" 
            className="flex items-center space-x-2.5 group"
            whileHover={{ scale: 1.02 }}
            id="brand-logo"
          >
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-[#1f4fff] to-[#6f8cff] flex items-center justify-center text-white font-serif font-black text-sm tracking-widest">
              L             
            </div>
            <div className="flex flex-col">
              <span className="font-serif font-bold text-lg tracking-wide leading-none text-[#111111] dark:text-[#f3f4ff]">
                Lebianto Batara
              </span>
              <span className="text-[10px] font-mono tracking-widest text-[#555555] dark:text-[#c3c7e0] uppercase leading-none mt-1">
                IT Support & Developer
              </span>
            </div>
          </motion.a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8" id="desktop-menu">
            {['about', 'projects', 'approach', 'contact'].map((sect) => (
              <a
                key={sect}
                href={`#${sect}`}
                id={`nav-link-${sect}`}
                className={`text-sm font-medium capitalize tracking-wide transition-colors duration-200 relative py-1.5 ${
                  activeSection === sect 
                    ? 'text-[#1f4fff] dark:text-[#6f8cff]' 
                    : 'text-[#555555] dark:text-[#c3c7e0] hover:text-[#111111] dark:hover:text-[#f3f4ff]'
                }`}
              >
                {sect}
                {activeSection === sect && (
                  <motion.div 
                    layoutId="activeIndicator" 
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1f4fff] dark:bg-[#6f8cff] rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Theme Switcher & Mobile Menu Trigger Actions */}
          <div className="flex items-center space-x-4">
            
            {/* Quick inbox indicator (Hidden unless there are inquiries) */}
            {submissionList.length > 0 && (
              <button
                onClick={() => setShowInbox(true)}
                className="relative p-2.5 rounded-full bg-white dark:bg-[#141829] border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xs text-[#111111] dark:text-[#f3f4ff] hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                title="View form submissions"
                id="inbox-toggle-btn"
              >
                <Inbox className="w-4 h-4 text-[#1f4fff] dark:text-[#6f8cff]" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#ef4444] text-[10px] text-white flex items-center justify-center font-bold">
                  {submissionList.length}
                </span>
              </button>
            )}

            {/* Elegantly styled Toggle Mode Button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="flex items-center space-x-2 px-4 py-2 rounded-full border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-white dark:bg-[#141829] text-xs font-semibold tracking-wide transition-all duration-300 shadow-xs hover:border-[#1f4fff] dark:hover:border-[#6f8cff] cursor-pointer"
              id="themeToggle-custom"
            >
              <div className="relative w-4 h-4 flex items-center justify-center">
                <motion.div 
                  className="absolute"
                  animate={{ scale: darkMode ? 0 : 1, rotate: darkMode ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  🔆
                </motion.div>
                <motion.div 
                  className="absolute"
                  animate={{ scale: darkMode ? 1 : 0, rotate: darkMode ? 0 : -90 }}
                  transition={{ duration: 0.2 }}
                >
                  🌙
                </motion.div>
              </div>
              <span className="text-[#555555] dark:text-[#c3c7e0]">
                {darkMode ? 'Dark Theme' : 'Light Theme'}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 md:hidden text-[#111111] dark:text-[#f3f4ff] hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
              id="mobile-nav-toggle"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Layers className="w-6 h-6" />}
            </button>

          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="md:hidden border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 bg-[#f7f9ff] dark:bg-[#0b0d15] overflow-hidden"
              id="mobile-drawer"
            >
              <nav className="p-6 flex flex-col space-y-4">
                {['about', 'projects', 'approach', 'contact'].map((sect) => (
                  <a
                    key={sect}
                    href={`#${sect}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-lg font-medium capitalize tracking-wide transition-colors duration-200 ${
                      activeSection === sect 
                        ? 'text-[#1f4fff] dark:text-[#6f8cff] pl-3 border-l-2 border-[#1f4fff] dark:border-[#6f8cff]' 
                        : 'text-[#555555] dark:text-[#c3c7e0] pl-0'
                    }`}
                  >
                    {sect}
                  </a>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>

      </header>

      {/* Hero Section Container */}
      <section id="hero" className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 md:py-32 flex flex-col items-center text-center">
        
        {/* Dynamic availability tag */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[11px] font-mono tracking-wider uppercase mb-8"
          id="availability-tag"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>Available for projects starting mid-2026</span>
        </motion.div>

        {/* Massive Serif Title */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif font-bold tracking-tight text-[#111111] dark:text-[#f3f4ff] leading-[1.1] mb-6"
          style={{ fontSize: 'clamp(2.8rem, 6vw, 4.8rem)' }}
          id="hero-main-title"
        >
          Lebianto Batara
        </motion.h1>

        {/* Refined Subtitle text */}
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base md:text-xl text-[#555555] dark:text-[#c3c7e0] max-w-2xl font-light leading-relaxed mb-10"
          id="hero-subtitle"
        >
          Informatics Engineering graduate from Paulus Indonesia Christian University with over 5 years of experience in IT support, administrative systems, and web-based database solutions.
        </motion.p>

        {/* Call to Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          id="hero-actions"
        >
          <a 
            href="#projects" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full bg-[#1f4fff] dark:bg-[#6f8cff] hover:bg-[#4662ff] dark:hover:bg-[#5675ff] text-white font-medium tracking-wide shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            id="explore-work-btn"
          >
            Explore Portfolio
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a 
            href="#contact" 
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#1f4fff] dark:hover:border-[#6f8cff] text-[#111111] dark:text-[#f3f4ff] font-medium tracking-wide hover:bg-[#1f4fff]/5 dark:hover:bg-[#6f8cff]/5 transition-all duration-200"
            id="start-project-btn"
          >
            Start a Collaboration
          </a>
        </motion.div>

        {/* Digital Craftsmanship Metadata Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 pt-12 text-left"
          id="hero-metadata"
        >
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">Based in</span>
            <p className="text-sm font-medium">Makassar, Indonesia</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">Experience</span>
            <p className="text-sm font-medium">5+ Years IT & Operations</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">Current Status</span>
            <p className="text-sm font-medium flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Job Seeking (IT Roles)</span>
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block">Local Time</span>
            <p className="text-sm font-medium text-neutral-500 dark:text-neutral-400 font-mono">
              2026-05-29 (UTC+8)
            </p>
          </div>
        </motion.div>

      </section>

      {/* About Section */}
      <section id="about" className="relative z-10 py-24 bg-white/40 dark:bg-black/10 border-y border-[#111111]/6 dark:border-[#f3f4ff]/6">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-2">Professional Background</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl" id="about-heading">About</h2>
          </div>

          <div className="grid md:grid-cols-12 gap-12 items-start">
            
            {/* Descriptive Body Text */}
            <div className="md:col-span-7 space-y-6">
              <h3 className="text-xl md:text-2xl font-serif font-medium leading-snug">
                I combine technical troubleshooting, database logic, and documentation precision to optimize systems.
              </h3>
              <p className="text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                As a Bachelor of Informatics Engineering with over 5 years of administrative and operational support experience, I bridge the gap between technical infrastructure and productive business environments. My competencies range from hardware diagnostic repair and system diagnostics to relational database administration and web application development.
              </p>
              <p className="text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                Whether deploying a custom TF-IDF semantic recommendation engine for my academic thesis, organizing structured vendor ledgers for RGarage Modification, or developing responsive digital collaterals, I aim to eliminate systemic friction with clean, documented, user-centered solutions.
              </p>

              {/* Badges container upgraded into interactive tooltips/details */}
              <div className="border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 pt-8 mt-8">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 dark:text-neutral-500 block mb-4">Core Competences (Hover to Filter Details)</span>
                <div className="flex flex-wrap gap-2" id="badges-container">
                  {DESIGN_SKILLS.map((skill, index) => (
                    <button
                      key={skill.name}
                      onClick={() => setSelectedSkillIndex(index)}
                      className={`px-4 py-2 rounded-full text-xs font-medium border cursor-pointer select-none transition-all duration-300 ${
                        selectedSkillIndex === index
                          ? 'bg-[#1f4fff] dark:bg-[#6f8cff] text-white border-transparent shadow-xs'
                          : 'bg-white dark:bg-[#141829] text-[#555555] dark:text-[#c3c7e0] border-[#111111]/12 dark:border-[#f3f4ff]/12 hover:border-[#1f4fff] dark:hover:border-[#6f8cff]'
                      }`}
                    >
                      {skill.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Interactive Skill Indicator Panel */}
            <div className="md:col-span-5 bg-white dark:bg-[#141829] p-6 rounded-2xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xl relative" id="about-skill-details">
              
              <div className="absolute top-4 right-4 text-neutral-200 dark:text-neutral-800 font-mono text-4xl font-bold select-none cursor-default">
                {DESIGN_SKILLS[selectedSkillIndex].efficiency}%
              </div>

              <div className="inline-flex p-2.5 rounded-xl bg-[#1f4fff]/10 dark:bg-[#6f8cff]/10 text-[#1f4fff] dark:text-[#6f8cff] mb-6">
                <Award className="w-5 h-5" />
              </div>

              <h4 className="font-serif font-semibold text-lg mb-2">
                {DESIGN_SKILLS[selectedSkillIndex].name}
              </h4>
              
              <p className="text-xs text-[#555555] dark:text-[#c3c7e0] leading-relaxed mb-6">
                {DESIGN_SKILLS[selectedSkillIndex].description}
              </p>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-[10px] font-mono uppercase text-neutral-400 mb-1.5">
                    <span>Expertise level</span>
                    <span>{DESIGN_SKILLS[selectedSkillIndex].efficiency}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden">
                    <motion.div 
                      key={selectedSkillIndex}
                      initial={{ width: 0 }}
                      animate={{ width: `${DESIGN_SKILLS[selectedSkillIndex].efficiency}%` }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="h-full bg-linear-to-r from-[#1f4fff] to-[#6f8cff] rounded-full"
                    />
                  </div>
                </div>

                <div className="bg-neutral-50 dark:bg-[#0b0d15]/50 p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800/40">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block mb-1">Preferred tools</span>
                  <p className="text-xs font-medium">{DESIGN_SKILLS[selectedSkillIndex].tools}</p>
                </div>
              </div>

            </div>

          </div>

          {/* Educational & Professional Credentials Grid */}
          <div className="border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 pt-16 mt-16 grid md:grid-cols-3 gap-8">
            
            {/* Education Col */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-[#1f4fff] dark:text-[#6f8cff]">
                <Award className="w-5 h-5 shrink-0" />
                <h4 className="font-serif font-bold text-lg text-[#111111] dark:text-[#f3f4ff]">Education</h4>
              </div>
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-white dark:bg-[#141829] border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xs">
                  <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Bachelor Degree</span>
                  <h5 className="text-sm font-semibold text-[#111111] dark:text-[#f3f4ff]">Informatics Engineering</h5>
                  <p className="text-xs text-neutral-500 dark:text-[#c3c7e0]">Paulus Indonesia Christian University</p>
                  <p className="text-[10px] font-mono text-[#1f4fff] dark:text-[#6f8cff] mt-2 font-bold">GPA: 3.33 | 2023 – 2025</p>
                </div>
                <div className="p-4 rounded-xl bg-neutral-50/50 dark:bg-[#141829]/50 border border-neutral-100 dark:border-[#f3f4ff]/6 border-dashed">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Thesis Research System</span>
                  <p className="text-[11px] text-[#555555] dark:text-[#c3c7e0] leading-relaxed mt-1 font-serif italic">
                    "Research Field Identification and Supervisor Lecturer Recommendation Using TF-IDF and Keyword Matching"
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications & Awards Col */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-[#1f4fff] dark:text-[#6f8cff]">
                <Sparkles className="w-5 h-5 shrink-0" />
                <h4 className="font-serif font-bold text-lg text-[#111111] dark:text-[#f3f4ff]">Honors & Certs</h4>
              </div>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 text-xs leading-normal p-3 rounded-lg bg-white dark:bg-[#141829] border border-[#111111]/6 dark:border-[#f3f4ff]/6">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#111111] dark:text-[#f3f4ff] block">First Honorable Mention</strong>
                    <span className="text-neutral-400">Celebes Robot Contest Makassar</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs leading-normal p-3 rounded-lg bg-white dark:bg-[#141829] border border-[#111111]/6 dark:border-[#f3f4ff]/6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#111111] dark:text-[#f3f4ff] block font-mono font-semibold">UI/UX Foundations Cert</strong>
                    <span className="text-neutral-400">CODEPOLITAN Online Program</span>
                  </div>
                </div>
                <div className="flex items-start space-x-3 text-xs leading-normal p-3 rounded-lg bg-white dark:bg-[#141829] border border-[#111111]/6 dark:border-[#f3f4ff]/6">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#1f4fff] mt-1.5 shrink-0" />
                  <div>
                    <strong className="text-[#111111] dark:text-[#f3f4ff] block font-mono font-semibold">Full Stack Web Dev</strong>
                    <span className="text-neutral-400">Udemy Professional Bootcamp</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Experiences Col */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 text-[#1f4fff] dark:text-[#6f8cff]">
                <Layers className="w-5 h-5 shrink-0" />
                <h4 className="font-serif font-bold text-lg text-[#111111] dark:text-[#f3f4ff]">Involvement</h4>
              </div>
              <div className="space-y-3">
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#141829] border border-[#111111]/6 dark:border-[#f3f4ff]/6">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Chairman of Committee</span>
                  <h6 className="text-[13px] font-semibold text-[#111111] dark:text-[#f3f4ff] mt-0.5">Toraja Church Youth Fellowship</h6>
                  <p className="text-[11px] text-[#555555] dark:text-[#c3c7e0] mt-1 font-light leading-normal">
                    Led event execution, managed group objectives, and coordinated team logistics.
                  </p>
                </div>
                <div className="p-3.5 rounded-xl bg-white dark:bg-[#141829] border border-[#111111]/6 dark:border-[#f3f4ff]/6">
                  <span className="text-[9px] font-mono uppercase text-neutral-400 block">Teaching Volunteer</span>
                  <h6 className="text-[13px] font-semibold text-[#111111] dark:text-[#f3f4ff] mt-0.5">Gerakan Mengajar Desa, Palu</h6>
                  <p className="text-[11px] text-[#555555] dark:text-[#c3c7e0] mt-1 font-light leading-normal">
                    Introduced computer concepts and basic software systems to rural students.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Projects Showcase section */}
      <section id="projects" className="py-24 max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-2">Curated Project Works</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl mb-4" id="projects-heading">Selected Projects</h2>
          <p className="text-sm text-[#555555] dark:text-[#c3c7e0] max-w-lg mx-auto font-light leading-relaxed">
            A small window into software systems, UI/UX developments, and IT operations structured during my academic and professional career.
          </p>
        </div>

        {/* Filter Categories tab slider */}
        <div className="flex justify-center mb-12" id="project-categories-bar">
          <div className="inline-flex p-1.5 bg-white dark:bg-[#141829] rounded-full border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-medium cursor-pointer transition-all duration-300 ${
                  selectedCategory === cat 
                    ? 'bg-[#1f4fff] dark:bg-[#6f8cff] text-white shadow-xs' 
                    : 'text-[#555555] dark:text-[#c3c7e0] hover:text-[#111111] dark:hover:text-[#f3f4ff]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / grid container */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" id="projects-list-grid">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              const imagePath = PROJECT_IMAGES[project.id] || 'https://picsum.photos/seed/' + project.id + '/800/600';
              
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  id={`project-card-${project.id}`}
                  className="bg-white dark:bg-[#141829] rounded-2xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="aspect-4/3 relative overflow-hidden bg-neutral-100 dark:bg-neutral-950">
                    <img 
                      src={imagePath} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Visual accent filter overlay */}
                    <div className="absolute inset-0 bg-[#1f4fff]/5 dark:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Floating Category tag */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 rounded-md bg-[#0b0d15]/80 backdrop-blur-xs text-white font-mono text-[9px] uppercase tracking-wider font-semibold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 dark:text-neutral-500 block mb-2">
                        Focus: {project.focus}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#111111] dark:text-[#f3f4ff] mb-2 leading-snug group-hover:text-[#111111]/80 dark:group-hover:text-[#f3f4ff]/80">
                        {project.title}
                      </h3>
                      <p className="text-xs text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed mb-6">
                        {project.summary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-100 dark:border-neutral-850 flex items-center justify-between">
                      <div className="flex gap-1">
                        {project.tags.slice(0, 2).map(t => (
                          <span key={t} className="px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-[9px] text-[#555555] dark:text-[#c3c7e0]">
                            {t}
                          </span>
                        ))}
                      </div>
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center text-xs font-semibold text-[#1f4fff] dark:text-[#6f8cff] group-hover:translate-x-1.5 transition-transform duration-200 cursor-pointer"
                        id={`case-study-btn-${project.id}`}
                      >
                        Read Case Study
                        <ChevronRight className="w-4 h-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Outbound Link to social portfolio */}
        <div className="text-center mt-16" id="dribbble-outbound">
          <a
            href="https://dribbble.com/lebianto-batara"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 rounded-full border border-neutral-300 dark:border-neutral-700 hover:border-[#1f4fff] dark:hover:border-[#6f8cff] text-xs font-semibold tracking-wide text-neutral-600 dark:text-neutral-300 hover:bg-[#1f4fff]/5 dark:hover:bg-[#6f8cff]/5 transition-all"
            id="dribbble-link-btn"
          >
            <span>See More Exhibition Work on Dribbble</span>
            <ExternalLink className="w-3.5 h-3.5 ml-2" />
          </a>
        </div>

      </section>

      {/* Design Approach Timeline section */}
      <section id="approach" className="py-24 bg-white/40 dark:bg-black/10 border-y border-[#111111]/8 dark:border-[#f3f4ff]/8">
        <div className="max-w-5xl mx-auto px-6">
          
          <div className="text-center mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-2">Workflow & Methodology</span>
            <h2 className="font-serif font-bold text-3xl md:text-4xl" id="approach-heading">Design Approach</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8" id="approach-stepper-grid">
            {APPROACH_STEPS.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white dark:bg-[#141829] p-8 rounded-2xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xs hover:shadow-md transition-all relative group overflow-hidden"
              >
                {/* Numeric label background decoration */}
                <div className="absolute top-4 right-6 font-serif font-black text-6xl text-neutral-100 dark:text-neutral-900 group-hover:scale-105 transition-transform duration-300 select-none">
                  {step.number}
                </div>

                {/* SVG Icon integration */}
                <div className="w-12 h-12 rounded-xl bg-[#1f4fff]/10 dark:bg-[#6f8cff]/10 flex items-center justify-center mb-6 relative z-10">
                  {renderApproachIcon(step.iconName)}
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="font-serif font-bold text-xl text-[#111111] dark:text-[#f3f4ff]">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 space-y-2">
                    <span className="text-[9px] font-mono uppercase text-neutral-400 block mb-2">Metrics Checklist</span>
                    {step.detailedPoints.map((pt, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-[#555555] dark:text-[#c3c7e0]">
                        <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* Inquiry Form & Contact Info Section */}
      <section id="contact" className="py-24 max-w-5xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-2">Kickstart a Collaboration</span>
          <h2 className="font-serif font-bold text-3xl md:text-4xl" id="contact-heading">Contact</h2>
        </div>

        <div className="grid md:grid-cols-12 gap-12 items-start" id="contact-grids-container">
          
          {/* Column Local Info */}
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-2xl text-[#111111] dark:text-[#f3f4ff]">
                Let's work together.
              </h3>
              <p className="text-sm text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                Looking to build structured web systems, troubleshoot database logic, or optimize operational administrative sheets? Send an inquiry and let's coordinate details.
              </p>
            </div>

            {/* Quick Contact Card details list */}
            <div className="space-y-4 bg-white dark:bg-[#141829] p-6 rounded-2xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xs">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fff]/10 dark:bg-[#6f8cff]/10 flex items-center justify-center text-[#1f4fff] dark:text-[#6f8cff]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Direct Email Address</span>
                  <a href="mailto:lebiantobatara398@gmail.com" className="text-sm font-medium hover:underline text-[#111111] dark:text-[#f3f4ff]">
                    lebiantobatara398@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fff]/10 dark:bg-[#6f8cff]/10 flex items-center justify-center text-[#1f4fff] dark:text-[#6f8cff]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Primary Base Location</span>
                  <p className="text-sm font-medium text-[#111111] dark:text-[#f3f4ff]">
                    Makassar, South Sulawesi, ID
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-[#1f4fff]/10 dark:bg-[#6f8cff]/10 flex items-center justify-center text-[#1f4fff] dark:text-[#6f8cff]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 block uppercase">Inquiry Response Window</span>
                  <p className="text-sm font-medium text-[#111111] dark:text-[#f3f4ff]">
                    24 Working Hours (Mon - Fri)
                  </p>
                </div>
              </div>
            </div>

            {/* Custom designer links */}
            <div>
              <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-3">Portfolio hubs</span>
              <div className="flex items-center space-x-4 font-mono text-xs">
                <a 
                  href="https://lebiantobatara.github.io/Portofolio/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 font-medium text-[#555555] dark:text-[#c3c7e0] hover:text-[#1f4fff] dark:hover:text-[#6f8cff]"
                >
                  <Briefcase className="w-4 h-4 text-[#1f4fff]" />
                  <span>GitHub Portfolio</span>
                </a>
                <span className="text-neutral-300 dark:text-neutral-700">|</span>
                <a 
                  href="https://dribbble.com/lebianto-batara" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 font-medium text-[#555555] dark:text-[#c3c7e0] hover:text-[#1f4fff] dark:hover:text-[#6f8cff]"
                >
                  <ExternalLink className="w-4 h-4 text-[#6f8cff]" />
                  <span>Dribbble Hub</span>
                </a>
              </div>
            </div>

          </div>

          {/* Form container */}
          <div className="md:col-span-7 bg-white dark:bg-[#141829] p-8 rounded-2xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 shadow-xl" id="contact-form-container">
            
            <AnimatePresence mode="wait">
              {formStatus === 'submitted' ? (
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                    <Check className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-serif font-bold text-2xl text-[#111111] dark:text-[#f3f4ff]">
                      Inquiry Compiled!
                    </h3>
                    <p className="text-xs text-[#555555] dark:text-[#c3c7e0] max-w-sm mx-auto leading-relaxed">
                      Thank you for submitting your creative proposal file. It has been persistent in your browser's Local Storage ledger successfully.
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setFormStatus('idle')}
                    className="px-6 py-2.5 rounded-full border border-neutral-200 dark:border-neutral-800 text-xs font-semibold hover:bg-neutral-50 dark:hover:bg-neutral-900 cursor-pointer"
                  >
                    Submit Another Brief
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  onSubmit={handleInquirySubmit}
                  className="space-y-6"
                  id="inquiry-form"
                >
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">Your Name</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                          <User className="w-4 h-4" />
                        </span>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Victor Acme"
                          className="w-full pl-11 pr-4 py-3 border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-[#f7f9ff] dark:bg-[#0b0d15] rounded-xl text-sm focus:outline-none focus:border-[#1f4fff] dark:focus:border-[#6f8cff] focus:ring-3 focus:ring-[#1f4fff]/10"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">Your Email Address</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
                          <Mail className="w-4 h-4" />
                        </span>
                        <input
                          type="email"
                          required
                          value={inquiryEmail}
                          onChange={(e) => setInquiryEmail(e.target.value)}
                          placeholder="vector12@acme.com"
                          className="w-full pl-11 pr-4 py-3 border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-[#f7f9ff] dark:bg-[#0b0d15] rounded-xl text-sm focus:outline-none focus:border-[#1f4fff] dark:focus:border-[#6f8cff] focus:ring-3 focus:ring-[#1f4fff]/10"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">Collaboration Category</label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-3 border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-[#f7f9ff] dark:bg-[#0b0d15] rounded-xl text-sm focus:outline-none focus:border-[#1f4fff] dark:focus:border-[#6f8cff] focus:ring-3"
                      >
                        <option value="Brand Identity">Brand Identity Package</option>
                        <option value="UI/UX Design">UI/UX Screen Prototyping</option>
                        <option value="Art Direction">Art Direction & Posters</option>
                        <option value="Illustration">Custom Digital Illustration</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">Estimated project budget</label>
                      <select
                        value={inquiryBudget}
                        onChange={(e) => setInquiryBudget(e.target.value)}
                        className="w-full px-4 py-3 border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-[#f7f9ff] dark:bg-[#0b0d15] rounded-xl text-sm focus:outline-none focus:border-[#1f4fff] dark:focus:border-[#6f8cff] focus:ring-3"
                      >
                        <option value="$3,000 - $5,000">$3,000 - $5,000</option>
                        <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                        <option value="$10,000 - $20,000">$10,000 - $20,000</option>
                        <option value="$20,000+">$20,000+ (High End)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono uppercase tracking-wider text-neutral-400 block font-medium">Project Brief specifications</label>
                    <textarea
                      required
                      rows={5}
                      value={inquiryMessage}
                      onChange={(e) => setInquiryMessage(e.target.value)}
                      placeholder="Outline your timeline rules, brand metrics, visual inspirations..."
                      className="w-full px-4 py-3 border border-[#111111]/12 dark:border-[#f3f4ff]/12 bg-[#f7f9ff] dark:bg-[#0b0d15] rounded-xl text-sm focus:outline-none focus:border-[#1f4fff] dark:focus:border-[#6f8cff] focus:ring-3 focus:ring-[#1f4fff]/10"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === 'submitting'}
                    className="w-full inline-flex items-center justify-center py-4 bg-[#1f4fff] dark:bg-[#6f8cff] hover:bg-[#4662ff] dark:hover:bg-[#5675ff] disabled:bg-neutral-400 text-white font-medium text-sm tracking-wide rounded-xl shadow-xs transition-colors duration-200 cursor-pointer"
                    id="submit-inquiry-btn"
                  >
                    {formStatus === 'submitting' ? (
                      <span>Transmitting briefing details...</span>
                    ) : (
                      <>
                        <span>Send Project Inquiry</span>
                        <Send className="w-4 h-4 ml-2" />
                      </>
                    )}
                  </button>

                </motion.form>
              )}
            </AnimatePresence>

          </div>

        </div>

      </section>

      {/* Footer copyright */}
      <footer className="relative z-10 text-center py-12 border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 bg-white/70 dark:bg-black/20 text-[#555555] dark:text-[#c3c7e0]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs">
            © 2026 Lebianto Batara — Graphic Designer & Illustrator. All Rights Reserved.
          </p>
          <div className="flex items-center space-x-2 text-[10px] font-mono text-neutral-400">
            <span>Built with React + Tailwind 4</span>
            <span>•</span>
            <button 
              onClick={() => {
                const dummy = [
                  {
                    id: 'sample_01',
                    name: 'Jonathan Miller',
                    email: 'jon@designguild.com',
                    projectType: 'Brand Identity',
                    budget: '$10,000 - $20,000',
                    message: "Hi Lebianto, love your Swiss style modernism! We need a clean geometric vector system for our active design guild launch.",
                    timestamp: '2026-05-29 02:44 PM'
                  }
                ];
                setSubmissionList(dummy);
                localStorage.setItem('portfolio-enquiries', JSON.stringify(dummy));
              }}
              className="hover:underline hover:text-neutral-500"
            >
              Load sample logs
            </button>
          </div>
        </div>
      </footer>

      {/* CASE STUDY OVERLAY MODAL */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4" id="case-study-modal-overlay">
            
            {/* Backdrop layer */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-[#0b0d15]/80 backdrop-blur-sm"
              id="modal-backdrop"
            />

            {/* Content modal card stack */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}
              className="bg-white dark:bg-[#141829] w-full max-w-4xl max-h-[85vh] rounded-2xl border border-[#111111]/12 dark:border-[#f3f4ff]/12 shadow-2xl overflow-y-auto relative z-10 flex flex-col text-left"
              id="case-study-card"
            >
              
              {/* Floating Close button top-right */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-neutral-900/60 text-white hover:bg-neutral-900 transition-colors z-20"
                id="close-modal-btn"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Large header cover image */}
              <div className="relative aspect-16/9 bg-neutral-100 dark:bg-neutral-950">
                <img 
                  src={PROJECT_IMAGES[selectedProject.id] || 'https://picsum.photos/seed/' + selectedProject.id + '/1200/800'}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
                
                {/* Floating summary info over poster */}
                <div className="absolute bottom-6 left-6 right-6 text-white pb-2 space-y-1.5">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-xs rounded-md text-[10px] font-mono uppercase tracking-wider">
                    {selectedProject.category}
                  </span>
                  <h2 className="font-serif font-bold text-3xl md:text-4xl text-white">
                    {selectedProject.title}
                  </h2>
                </div>
              </div>

              {/* Body documentation layout */}
              <div className="p-8 md:p-10 space-y-8 flex-1">
                
                {/* Visual spec checklist pill block */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-neutral-50 dark:bg-[#0b0d15]/60 p-4 rounded-xl border border-[#111111]/8 dark:border-[#f3f4ff]/8 text-xs">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Assigned Role</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedProject.role}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Focus Metrics</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedProject.focus}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Duration Cycle</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedProject.duration}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">Category Hub</span>
                    <span className="font-semibold text-neutral-700 dark:text-neutral-300">{selectedProject.category}</span>
                  </div>
                </div>

                {/* Conceptual breakdown grids */}
                <div className="grid md:grid-cols-12 gap-8 pt-4">
                  <div className="md:col-span-8 space-y-6">
                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2">Overview</h4>
                      <p className="text-sm text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                        {selectedProject.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2">Design Challenge</h4>
                      <p className="text-sm text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                        {selectedProject.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-serif font-bold text-lg mb-2">Creative Solution Implementation</h4>
                      <p className="text-sm text-[#555555] dark:text-[#c3c7e0] font-light leading-relaxed">
                        {selectedProject.solution}
                      </p>
                    </div>
                  </div>

                  {/* Sidebar stats/specs inside case study */}
                  <div className="md:col-span-4 space-y-6 border-t md:border-t-0 md:border-l border-[#111111]/8 dark:border-[#f3f4ff]/8 pt-6 md:pt-0 md:pl-6">
                    
                    {/* Deliverables lists */}
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-3">Key Deliverables</span>
                      <ul className="space-y-2 text-xs text-[#555555] dark:text-[#c3c7e0]">
                        {selectedProject.deliverables.map(del => (
                          <li key={del} className="flex items-start space-x-2">
                            <Check className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{del}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Designer Color Palette Chips (Click to Copy Hex) */}
                    {PALETTES[selectedProject.id] && (
                      <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#1f4fff] dark:text-[#6f8cff] font-semibold block mb-3">Color System Spec</span>
                        <div className="space-y-2">
                          {PALETTES[selectedProject.id].map(color => (
                            <button
                              key={color.hex}
                              onClick={() => handleCopyColor(color.hex)}
                              className="w-full flex items-center justify-between p-2 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 hover:border-[#1f4fff] dark:hover:border-[#6f8cff] group transition-all text-left cursor-pointer"
                              title="Click to Copy HEX Color"
                            >
                              <div className="flex items-center space-x-2.5">
                                <div className="w-6 h-6 rounded border border-neutral-200" style={{ backgroundColor: color.hex }} />
                                <div>
                                  <p className="text-[11px] font-semibold text-[#111111] dark:text-[#f3f4ff]">{color.name}</p>
                                  <p className="text-[9px] font-mono text-neutral-400 uppercase">{color.hex}</p>
                                </div>
                              </div>
                              <div className="text-[9px] text-neutral-400 group-hover:text-[#1f4fff] flex items-center space-x-1 font-mono">
                                {copiedColor === color.hex ? (
                                  <span className="text-emerald-500 font-bold">COPIED!</span>
                                ) : (
                                  <>
                                    <span>COPY</span>
                                    <Copy className="w-2.5 h-2.5" />
                                  </>
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>

              </div>
              
              {/* Bottom bar of modal */}
              <div className="p-6 bg-neutral-50 dark:bg-[#0b0d15]/50 border-t border-[#111111]/8 dark:border-[#f3f4ff]/8 flex items-center justify-between">
                <span className="text-xs text-neutral-400 italic">Press outside of layout block to discharge card</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-5 py-2 rounded-full bg-neutral-900 dark:bg-[#f3f4ff] hover:bg-neutral-800 dark:hover:bg-white text-white dark:text-black text-xs font-semibold tracking-wide transition-colors cursor-pointer"
                >
                  Close Specification
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CLIENT INBOX PANEL (Simulates full inbox drawer from localStorage) */}
      <AnimatePresence>
        {showInbox && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-end" id="inbox-logs-drawer">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInbox(false)}
              className="absolute inset-0 bg-[#0b0d15]/60"
            />
            
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="relative w-full max-w-md h-screen bg-white dark:bg-[#141829] border-l border-[#111111]/12 dark:border-[#f3f4ff]/12 shadow-2xl p-6 flex flex-col justify-between z-10"
            >
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-900 mb-6">
                  <div className="flex items-center space-x-2">
                    <Inbox className="w-5 h-5 text-[#1f4fff] dark:text-[#6f8cff]" />
                    <span className="font-serif font-bold text-lg text-[#111111] dark:text-[#f3f4ff]">Client Inquiries</span>
                    <span className="px-2 py-0.5 rounded-full bg-linear-to-tr from-[#1f4fff] to-[#6f8cff] text-[10px] text-white font-mono font-bold">
                      {submissionList.length}
                    </span>
                  </div>
                  <button 
                    onClick={() => setShowInbox(false)}
                    className="p-1.5 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
                  {submissionList.map((item) => (
                    <div 
                      key={item.id} 
                      className="p-4 rounded-xl bg-neutral-50 dark:bg-[#0b0d15]/50 border border-neutral-100 dark:border-neutral-800/60 relative group space-y-3"
                    >
                      <button
                        onClick={(e) => handleDeleteInquiry(item.id, e)}
                        className="absolute top-3 right-3 p-1 rounded-md text-neutral-300 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete record"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-bold text-[#111111] dark:text-[#f3f4ff]">{item.name}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded bg-[#1f4fff]/15 dark:bg-[#6f8cff]/15 text-[#1f4fff] dark:text-[#6f8cff] font-mono leading-none">
                            {item.projectType}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium font-mono">{item.email}</p>
                      </div>

                      <p className="text-xs text-[#555555] dark:text-[#c3c7e0] leading-relaxed bg-white dark:bg-[#141829] p-3 rounded-lg border border-neutral-100 dark:border-neutral-900 font-mono text-[11px]">
                        {item.message}
                      </p>

                      <div className="flex justify-between items-center text-[9px] text-neutral-400 font-mono">
                        <span>Budget: <strong className="text-emerald-500">{item.budget}</strong></span>
                        <span>{item.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 dark:border-neutral-900 flex gap-2">
                <button
                  onClick={() => {
                    localStorage.removeItem('portfolio-enquiries');
                    setSubmissionList([]);
                  }}
                  className="w-full text-center py-2.5 rounded-lg border border-dashed border-red-500/30 hover:border-red-500 hover:bg-red-500/5 text-rose-500 text-xs font-semibold cursor-pointer"
                >
                  Clear All Inbox Records
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
