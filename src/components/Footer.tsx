import { Award, ArrowUp, Github, Linkedin, Dribbble, Figma } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socials = [
    { icon: <Dribbble className="w-4 h-4" />, href: 'https://dribbble.com/lebianto-batara', label: 'Dribbble' },
    { icon: <Figma className="w-4 h-4" />, href: '#', label: 'Figma' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', label: 'LinkedIn' },
    { icon: <Github className="w-4 h-4" />, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="relative bg-brand-card/30 border-t border-brand-text/5 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          
          {/* Logo & copyright */}
          <div className="text-center md:text-left space-y-2">
            <h4 className="font-serif text-lg font-bold text-brand-text tracking-wide">
              Lebianto Batara
            </h4>
            <p className="text-xs text-brand-muted">
              © {currentYear} Lebianto Batara — Professional Graphic Designer
            </p>
          </div>

          {/* Socials */}
          <div className="flex items-center gap-2">
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target={social.href.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className="p-2.5 rounded-full border border-brand-text/5 hover:border-brand-text/15 bg-brand-card/50 hover:bg-brand-text/5 text-brand-text transition-all"
                title={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Scroll to Top */}
          <button
            onClick={handleScrollToTop}
            className="flex items-center gap-1.5 text-xs font-semibold text-brand-text hover:text-brand-accent transition-colors duration-200 cursor-pointer"
          >
            <span>Back to Top</span>
            <div className="p-1.5 rounded-full bg-brand-text/5 text-brand-text">
              <ArrowUp className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>

        {/* Bottom tagline */}
        <div className="text-center mt-10 pt-8 border-t border-brand-text/5">
          <p className="inline-flex items-center gap-1.5 text-[10px] text-brand-muted font-mono uppercase tracking-widest">
            <Award className="w-3.5 h-3.5 text-brand-accent" />
            Empowering brands through deliberate design
          </p>
        </div>
      </div>
    </footer>
  );
}
