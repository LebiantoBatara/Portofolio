import { useState, useEffect, FormEvent } from 'react';
import {
  PROJECTS,
  DESIGN_APPROACH,
  SKILL_BADGES,
  EDUCATION_DATA,
  EXPERIENCES,
  ORGANIZATIONAL_EXPERIENCE,
  VOLUNTEER_EXPERIENCE,
  CERTIFICATIONS,
  ACHIEVEMENTS,
  LANGUAGES
} from './data';
import { Project, SkillBadge, ContactInquiry } from './types';
import Header from './components/Header';
import ProjectCard from './components/ProjectCard';
import ProjectModal from './components/ProjectModal';
import InquiryLogs from './components/InquiryLogs';
import Footer from './components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Send,
  ArrowDown,
  Layers,
  CheckCircle,
  GraduationCap,
  Briefcase,
  Award,
  Globe,
  Users,
  HeartHandshake,
  BookOpen,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

export default function App() {
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'light' || saved === 'dark') return saved;
    return 'dark'; // Elegant Dark Theme
  });

  // Projects filter state
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Selected project for detailed Case Study Modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Expanded Skill state
  const [selectedSkill, setSelectedSkill] = useState<SkillBadge | null>(SKILL_BADGES[0]);

  // Selected Approach stage detail mapping
  const [expandedApproachIdx, setExpandedApproachIdx] = useState<number>(0);

  // Contact Form state
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Selected CV tab for Work History vs Certificates vs Leadership
  const [activeResTab, setActiveResTab] = useState<'history' | 'certs' | 'extracurricular'>('history');

  // Inquiries State (local storage mocked backend)
  const [inquiries, setInquiries] = useState<ContactInquiry[]>(() => {
    const saved = localStorage.getItem('contact_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  // Effect to apply theme attributes to document element
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Effect to persist inquiries
  useEffect(() => {
    localStorage.setItem('contact_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  // Toggle Theme helper
  const handleToggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // Inquiry actions
  const handleAddInquiry = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactEmail.trim()) return;

    const newInquiry: ContactInquiry = {
      id: crypto.randomUUID(),
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      date: new Date().toLocaleString(),
      status: 'unread'
    };

    setInquiries(prev => [newInquiry, ...prev]);
    setFormSubmitted(true);

    // Reset fields
    setContactMessage('');
    setTimeout(() => {
      setFormSubmitted(false);
      setContactName('');
      setContactEmail('');
    }, 4000);
  };

  const handleDeleteInquiry = (id: string) => {
    setInquiries(prev => prev.filter(item => item.id !== id));
  };

  const handleClearInquiries = () => {
    if (window.confirm('Are you sure you want to clear all inquiries?')) {
      setInquiries([]);
    }
  };

  const handleUpdateInquiryStatus = (id: string, status: 'unread' | 'read' | 'contacted') => {
    setInquiries(prev =>
      prev.map(item => (item.id === id ? { ...item, status } : item))
    );
  };

  // Projects filtering
  const categories = ['All', 'IT & Development', 'Branding', 'UI/UX'];
  const filteredProjects = activeCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeCategory);

  return (
    <div className="relative min-h-screen Selection:bg-brand-accent/20 Selection:text-brand-text bg-brand-bg text-brand-text bg-grid-pattern transition-colors duration-300 pb-16">
      
      {/* Floating Inquiry Drawer */}
      <InquiryLogs
        inquiries={inquiries}
        onDelete={handleDeleteInquiry}
        onClearAll={handleClearInquiries}
        onUpdateStatus={handleUpdateInquiryStatus}
      />

      {/* Floating Theme Header */}
      <Header theme={theme} toggleTheme={handleToggleTheme} />

      {/* Ambient background glow dots */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[800px] right-1/4 w-[500px] h-[500px] bg-indigo-500/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[400px] left-10 w-96 h-96 bg-purple-500/3 rounded-full blur-[150px] pointer-events-none" />

      {/* ----------------- HERO SECTION ----------------- */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-24 px-6 flex flex-col items-center justify-center text-center max-w-4xl mx-auto overflow-hidden">
        {/* Intro badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span>Open to IT & Design Collaborations</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif text-5xl md:text-7.5xl font-bold tracking-tight text-brand-text leading-[1.1]"
        >
          <span className="block italic font-light text-brand-text/70 text-2xl md:text-3xl mb-2">Informatics Graduate & IT Support</span>
          Lebianto <span className="text-indigo-500 font-extrabold">Batara</span>
        </motion.h1>

        {/* Hero Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-brand-muted max-w-xl md:max-w-2xl leading-relaxed text-brand-text/85"
        >
          An Informatics Engineering graduate specializing in technical troubleshooting, robust database management systems, and graphic design pipelines. Bringing 5+ years of operational administrative discipline mixed with dynamic software programming skills.
        </motion.p>

        {/* Fast CV Bio Details */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-6 flex flex-wrap gap-4 items-center justify-center text-xs text-brand-muted font-mono"
        >
          <span className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-indigo-500" />
            Makassar, Indonesia
          </span>
          <span className="hidden sm:inline text-brand-muted/30">|</span>
          <span className="flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-indigo-500" />
            lebiantobatara398@gmail.com
          </span>
          <span className="hidden sm:inline text-brand-muted/30">|</span>
          <span className="flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-indigo-500" />
            +6281141103998
          </span>
        </motion.div>

        {/* Hero CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto font-sans"
        >
          <a
            href="#projects"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl font-bold text-sm bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/15 transition-all"
          >
            Explore Portfolio Work
          </a>
          <a
            href="#cv-experience"
            className="w-full sm:w-auto text-center px-8 py-4 rounded-xl font-bold text-sm bg-white/5 border border-white/10 text-white hover:bg-white/10 backdrop-blur-xs transition-all"
          >
            Inspect CV Credentials
          </a>
        </motion.div>

        {/* Scroll anchor */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="mt-16 md:mt-20 text-brand-muted/50 animate-bounce"
        >
          <p className="text-[10px] font-mono tracking-widest uppercase mb-1">Scroll to Learn More</p>
          <ArrowDown className="w-4 h-4 mx-auto" />
        </motion.div>
      </section>

      {/* ----------------- ABOUT & SKILLS SECTION ----------------- */}
      <section id="about" className="scroll-mt-24 py-20 bg-brand-text/1.5 border-t border-b border-brand-text/5 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Section Introduction */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono text-brand-accent font-semibold uppercase tracking-widest block">
              About Lebianto
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-brand-text">
              Bridging System Logic & Communication
            </h2>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed text-brand-text/85">
              I am a graduate in **Informatics Engineering** with a strong foundation in IT support, administration, text processing, and system optimization. Having multi-dimensional backgrounds, I am able to manage software databases, construct clear wireframes, maintain server units, and even shape marketing vectors. 
            </p>
            <p className="text-brand-muted text-sm md:text-base leading-relaxed text-brand-text/85">
              My core study focus centers on building streamlined technical and digital solutions for operational efficiency. Let's inspect my creative domains across computing and design architectures.
            </p>

            {/* Language Badges */}
            <div className="pt-4 border-t border-brand-text/5">
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block mb-3">
                Languages Fluecy
              </span>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map((lang) => (
                  <span key={lang.language} className="px-3 py-1.5 rounded-lg bg-brand-card border border-brand-text/5 text-xs font-semibold">
                    {lang.language} — <strong className="text-indigo-400 font-medium font-mono text-[11px]">{lang.proficiency}</strong>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Skills Bento */}
          <div className="lg:col-span-7 bg-brand-card p-6 md:p-8 rounded-3xl border border-brand-text/10 dark:border-white/5 shadow-md">
            <h3 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-6 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-brand-accent animate-pulse" />
              Core Competencies & Tool Expertise
            </h3>

            {/* Badges Grid */}
            <div className="flex flex-wrap gap-2 mb-6">
              {SKILL_BADGES.map((badge) => (
                <button
                  key={badge.label}
                  onClick={() => setSelectedSkill(badge)}
                  className={`px-4 py-2.5 rounded-xl text-xs font-medium cursor-pointer transition-all duration-200 border ${
                    selectedSkill?.label === badge.label
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-md'
                      : 'bg-brand-card text-brand-text hover:bg-brand-text/5 border-brand-text/10'
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>

            {/* Dynamic Expanded Details Box */}
            <AnimatePresence mode="wait">
              {selectedSkill && (
                <motion.div
                  key={selectedSkill.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="p-5 rounded-2xl bg-brand-text/2 border border-brand-text/5"
                >
                  <h4 className="font-serif text-lg font-bold text-brand-text mb-2 flex items-center justify-between">
                    <span>{selectedSkill.label}</span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-brand-accent-soft text-brand-accent">
                      Domain
                    </span>
                  </h4>
                  <p className="text-xs md:text-sm text-brand-muted leading-relaxed mb-4">
                    {selectedSkill.description}
                  </p>
                  
                  <div className="pt-3 border-t border-brand-text/5">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block mb-2">
                      Tools & Subskills
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedSkill.relatedTools.map((tool) => (
                        <span
                          key={tool}
                          className="text-[11px] font-mono px-3 py-1 bg-brand-card text-brand-text rounded-md border border-brand-text/5"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ----------------- ACADEMIC EDUCATION & THESIS SECTION ----------------- */}
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-br from-indigo-500/[0.03] to-purple-500/[0.03] p-8 md:p-12 rounded-3xl border border-brand-text/10 flex flex-col lg:flex-row gap-10 items-stretch">
          
          <div className="lg:w-7/12 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-xs text-indigo-400 font-mono font-semibold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                Academic Background
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-text">
                {EDUCATION_DATA.institution}
              </h3>
              <p className="text-indigo-400 font-mono font-bold text-sm">
                {EDUCATION_DATA.degree} — Grade Point Avg: <strong className="text-lg text-white underline decoration-indigo-400">{EDUCATION_DATA.gpa}</strong>
              </p>
              <p className="text-xs text-brand-muted italic flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {EDUCATION_DATA.location} • Timeline: {EDUCATION_DATA.duration}
              </p>

              <hr className="border-brand-text/5 my-4" />

              <div className="space-y-2.5">
                <span className="text-[11px] uppercase tracking-wider font-bold text-brand-text flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-500" />
                  Key University Research Thesis:
                </span>
                <p className="text-sm text-brand-muted leading-relaxed font-serif italic bg-brand-card p-4 rounded-xl border border-brand-text/5">
                  "{EDUCATION_DATA.thesisTitle}"
                </p>
                <p className="text-xs text-brand-muted/75">
                  The system was built to automatically map submission contexts using high-precision text mining models, assisting the Informatics Department in matching students against the most qualified advisers according to keyword index vectors.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:w-5/12 bg-brand-card p-6 md:p-8 rounded-2xl border border-brand-text/5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block mb-4">
                Core Engineering Technical Skills
              </span>
              <div className="flex flex-wrap gap-1.5">
                {EDUCATION_DATA.softwareSkills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs font-mono px-2.5 py-1.5 bg-brand-text/5 hover:bg-brand-text/8 transition-colors rounded-lg text-brand-text border border-brand-text/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-brand-text/5 mt-6 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-brand-muted leading-normal">
                Studied algorithms development, database schemas (MySQL), and basic system development alongside visual communications.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- PROJECTS SECTION ----------------- */}
      <section id="projects" className="scroll-mt-24 py-20 bg-brand-text/1.5 border-t border-b border-brand-text/5 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="space-y-3">
              <span className="text-xs font-mono text-brand-accent font-semibold uppercase tracking-widest block">
                Portfolio Studies
              </span>
              <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-brand-text">
                Showcase & Prototypes
              </h2>
              <p className="text-sm text-brand-muted max-w-md">
                Demonstrating applied informatics engineering, script diagnostics, and digital layout tasks handled for hotel and workshop clients.
              </p>
            </div>

            {/* Categorization filter */}
            <div className="flex items-center gap-1 overflow-x-auto pb-2 scrollbar-none border-b border-brand-text/5 max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap ${
                    activeCategory === cat
                      ? 'bg-brand-text text-brand-card'
                      : 'text-brand-muted hover:text-brand-text hover:bg-brand-text/5'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onOpenDetails={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ----------------- DETAILED CV TABS SECTION (WORK HISTORY vs CERTIFICATES vs ACHIEVEMENTS) ----------------- */}
      <section id="cv-experience" className="scroll-mt-24 py-24 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono text-indigo-500 font-semibold uppercase tracking-widest block">
              Professional Timeline
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-brand-text">
              CV Experience & Milestones
            </h2>
            <p className="text-brand-muted text-sm leading-relaxed">
              Explore dynamic professional milestones, certifications, and awards earned during academic and administrative years.
            </p>

            {/* Selector list */}
            <div className="flex flex-row lg:flex-col gap-2 pt-4">
              <button
                onClick={() => setActiveResTab('history')}
                className={`flex-1 text-left px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  activeResTab === 'history'
                    ? 'bg-brand-text text-brand-card'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-text/5'
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Work History
              </button>
              <button
                onClick={() => setActiveResTab('certs')}
                className={`flex-1 text-left px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  activeResTab === 'certs'
                    ? 'bg-brand-text text-brand-card'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-text/5'
                }`}
              >
                <Award className="w-4 h-4" />
                Certificates & Awards
              </button>
              <button
                onClick={() => setActiveResTab('extracurricular')}
                className={`flex-1 text-left px-4 py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all ${
                  activeResTab === 'extracurricular'
                    ? 'bg-brand-text text-brand-card'
                    : 'text-brand-muted hover:text-brand-text hover:bg-brand-text/5'
                }`}
              >
                <Users className="w-4 h-4" />
                Leadership & Volunteering
              </button>
            </div>
          </div>

          <div className="lg:col-span-8 bg-brand-card p-6 md:p-8 rounded-3xl border border-brand-text/10 dark:border-white/5 shadow-md min-h-[380px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {activeResTab === 'history' && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {EXPERIENCES.map((exp, index) => (
                    <div key={exp.role} className="flex gap-4 relative md:border-l border-brand-text/5 md:pl-6 pb-2 last:pb-0">
                      <div className="absolute hidden md:block -left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border-4 border-brand-card" />
                      
                      <div className="space-y-2">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                          <h4 className="font-serif text-lg font-bold text-brand-text leading-tight">
                            {exp.role} @ <span className="text-indigo-400">{exp.organization}</span>
                          </h4>
                          <span className="text-xs font-mono text-brand-muted bg-brand-text/5 px-2.5 py-1 rounded">
                            {exp.duration}
                          </span>
                        </div>
                        <p className="text-xs text-brand-muted/90 italic leading-relaxed">
                          {exp.description}
                        </p>
                        <ul className="space-y-1.5 text-xs text-brand-text/80 list-disc list-inside">
                          {exp.details.map((point, idx) => (
                            <li key={idx} className="leading-relaxed">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeResTab === 'certs' && (
                <motion.div
                  key="certs"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  <div className="space-y-5">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Academic Achievements & Robot Finals
                    </h4>
                    {ACHIEVEMENTS.map((ach) => (
                      <div key={ach.title} className="p-4 rounded-xl bg-brand-text/2 border border-brand-text/5 space-y-1">
                        <h5 className="font-bold text-brand-text text-sm flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          {ach.title}
                        </h5>
                        <p className="text-xs text-brand-muted pl-6">{ach.desc}</p>
                      </div>
                    ))}
                  </div>

                  <hr className="border-brand-text/5 my-4" />

                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-widest text-indigo-400 font-bold mb-4 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" /> Professional Certifications
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {CERTIFICATIONS.map((cert) => (
                        <div key={cert.title} className="p-4 rounded-xl bg-brand-text/2 border border-brand-text/5 space-y-1">
                          <h5 className="font-bold text-brand-text text-xs leading-tight">
                            {cert.title}
                          </h5>
                          <p className="text-[10px] text-indigo-400 font-mono font-medium">
                            Issuer Platform: {cert.program}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeResTab === 'extracurricular' && (
                <motion.div
                  key="extracurricular"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8 h-full flex flex-col justify-between"
                >
                  <div className="space-y-6">
                    <div className="p-5 rounded-2xl bg-indigo-500/[0.02] border border-indigo-500/10 space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold flex items-center gap-2">
                        <Users className="w-4.5 h-4.5" /> Leadership Experience
                      </h4>
                      <h5 className="font-serif text-lg font-bold text-brand-text">
                        {ORGANIZATIONAL_EXPERIENCE.role}
                      </h5>
                      <p className="text-xs text-indigo-400 font-mono font-semibold">
                        {ORGANIZATIONAL_EXPERIENCE.organization} • {ORGANIZATIONAL_EXPERIENCE.duration}
                      </p>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {ORGANIZATIONAL_EXPERIENCE.description}
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-purple-500/[0.02] border border-purple-500/10 space-y-2.5">
                      <h4 className="text-xs font-mono uppercase tracking-wider text-purple-400 font-bold flex items-center gap-2">
                        <HeartHandshake className="w-4.5 h-4.5" /> Volunteer Campaigns
                      </h4>
                      <h5 className="font-serif text-lg font-bold text-brand-text">
                        {VOLUNTEER_EXPERIENCE.role}
                      </h5>
                      <p className="text-xs text-purple-400 font-mono font-semibold">
                        {VOLUNTEER_EXPERIENCE.organization} • Timeline: {VOLUNTEER_EXPERIENCE.duration}
                      </p>
                      <p className="text-xs text-brand-muted leading-relaxed">
                        {VOLUNTEER_EXPERIENCE.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="text-[10px] text-brand-muted font-mono mt-6 pt-4 border-t border-brand-text/5 text-right">
              Data synchronized directly with CV transcript
            </div>
          </div>

        </div>
      </section>

      {/* ----------------- DESIGN APPROACH SECTION ----------------- */}
      <section id="approach" className="scroll-mt-24 py-20 bg-brand-text/1.5 border-t border-b border-brand-text/5 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Block */}
          <div className="text-center space-y-3 mb-16">
            <span className="text-xs font-mono text-brand-accent font-semibold uppercase tracking-widest block">
              Execution Strategy
            </span>
            <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-brand-text">
              The IT Support & Design Mindset
            </h2>
            <p className="text-sm text-brand-muted max-w-xl mx-auto">
              How business goals blend with solid database logic and deliberate layouts to optimize operations.
            </p>
          </div>

          {/* Vertical/Horizontal Process Selector */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {DESIGN_APPROACH.map((step, idx) => {
              const isSelected = expandedApproachIdx === idx;
              return (
                <div
                  key={step.title}
                  onClick={() => setExpandedApproachIdx(idx)}
                  className={`group p-8 rounded-3xl border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                    isSelected
                      ? 'bg-brand-card border-indigo-500 shadow-lg shadow-indigo-500/2'
                      : 'bg-brand-card/55 border-brand-text/5 hover:border-brand-text/15 hover:bg-brand-card'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span className={`flex items-center justify-center w-8 h-8 rounded-full font-mono text-sm font-bold transition-colors ${
                        isSelected ? 'bg-indigo-600 text-white' : 'bg-brand-text/5 text-brand-text/60 group-hover:bg-brand-text/10'
                      }`}>
                        0{idx + 1}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] font-mono uppercase bg-brand-accent-soft text-brand-accent px-2 py-0.5 rounded">
                          Active Phase
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-xl font-bold text-brand-text group-hover:text-brand-accent transition-colors duration-200">
                      {step.title}
                    </h3>
                    <p className="text-brand-text/80 text-xs font-semibold italic mt-2">
                      {step.description}
                    </p>
                    
                    <p className="text-brand-muted text-xs leading-relaxed mt-4">
                      {step.details}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-text/5 flex items-center justify-between text-[11px] font-mono text-brand-muted mt-6">
                    <span>Stage 0{idx + 1}</span>
                    <span className="text-brand-accent hover:underline">
                      {isSelected ? 'Currently reading' : 'Click to inspect'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ----------------- CONTACT SECTION ----------------- */}
      <section id="contact" className="scroll-mt-24 py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <span className="text-xs font-mono text-brand-accent font-semibold uppercase tracking-widest block">
            Collaboration
          </span>
          <h2 className="font-serif text-3.5xl md:text-4.5xl font-bold tracking-tight text-brand-text">
            Start a Project Brief
          </h2>
          <p className="text-brand-muted text-sm max-w-md mx-auto">
            Looking to collaborate on system structures, graphic templates, databases, or IT queries? Submit a inquiry below.
          </p>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleAddInquiry}
          className="space-y-5 bg-brand-card p-6 md:p-8 rounded-3xl border border-brand-text/5 shadow-xl shadow-brand-text/2"
        >
          {/* Submission Success Alert */}
          <AnimatePresence>
            {formSubmitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-emerald-500/10 text-emerald-600 rounded-2xl border border-emerald-500/20 text-xs flex items-start gap-2.5 mb-2"
              >
                <CheckCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Inquiry Submitted Successfully!</span>
                  Your message has been compiled into the local Inbox drawer. Open simulated responses in the bottom-right corner!
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={contactName}
                onChange={(e) => setContactName(e.target.value)}
                placeholder="Lebianto Batara"
                className="w-full bg-brand-text/2 text-brand-text placeholder-brand-text/40 border border-brand-text/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-soft transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block">
                Your Email *
              </label>
              <input
                type="email"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                placeholder="lebianto@example.com"
                className="w-full bg-brand-text/2 text-brand-text placeholder-brand-text/40 border border-brand-text/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-soft transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase tracking-wider text-brand-muted block">
              Inquiry Message or Operational Brief Outline
            </label>
            <textarea
              rows={4}
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="Tell me about your hardware problems, database issues, operational workflows or graphic assets need..."
              className="w-full bg-brand-text/2 text-brand-text placeholder-brand-text/40 border border-brand-text/8 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-brand-accent focus:ring-2 focus:ring-brand-accent-soft transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 px-6 bg-brand-accent hover:opacity-95 text-white text-xs uppercase tracking-widest font-bold rounded-2xl flex items-center justify-center gap-2 cursor-pointer transition-all border border-transparent shadow-lg shadow-brand-accent/15"
          >
            <span>Send Out Inquiry</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </section>

      {/* ----------------- STATIC FOOTER ----------------- */}
      <Footer />

      {/* ----------------- Case Study Modal Portal ----------------- */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
