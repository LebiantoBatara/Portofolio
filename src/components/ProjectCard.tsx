import { Project } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectCardProps {
  key?: string;
  project: Project;
  onOpenDetails: (project: Project) => void;
}

export default function ProjectCard({ project, onOpenDetails }: ProjectCardProps) {
  // Map categories to beautiful soft tint backgrounds
  const categoryStyles = {
    'Branding': 'bg-pink-500/10 text-pink-600 dark:text-pink-400',
    'UI/UX': 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    'Typography': 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    'Illustration': 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="group relative flex flex-col justify-between bg-gradient-to-br from-indigo-500/[0.04] to-purple-500/[0.04] dark:from-transparent dark:to-transparent bg-brand-card p-8 rounded-3xl border border-brand-text/10 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-indigo-500/40 shadow-xl transition-all duration-300"
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <span className={`text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider ${categoryStyles[project.category] || 'bg-brand-accent-soft text-brand-accent'}`}>
            {project.category}
          </span>
          <span className="text-xs font-mono text-brand-muted opacity-60">
            {project.duration.split(' ')[0]}
          </span>
        </div>

        <h3 className="font-serif text-2xl font-bold tracking-tight text-brand-text group-hover:text-brand-accent transition-colors duration-200">
          {project.title}
        </h3>

        <div className="mt-3 mb-4 flex flex-wrap gap-1.5 items-center">
          <Sparkles className="w-3.5 h-3.5 text-brand-accent/50 shrink-0" />
          <span className="text-xs font-medium text-brand-text/70 italic">
            Focus: {project.focus}
          </span>
        </div>

        <p className="text-brand-muted text-sm leading-relaxed mb-6">
          {project.summary}
        </p>
      </div>

      <div className="pt-4 border-t border-brand-text/5 flex items-center justify-between mt-auto">
        <div className="flex flex-wrap gap-1">
          {project.toolsUsed.slice(0, 2).map((tool) => (
            <span key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded bg-brand-text/5 text-brand-text/75">
              {tool}
            </span>
          ))}
          {project.toolsUsed.length > 2 && (
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-brand-text/5 text-brand-text/45">
              +{project.toolsUsed.length - 2}
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenDetails(project)}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-accent hover:opacity-80 transition-opacity cursor-pointer group/btn"
        >
          View Case Study
          <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </motion.div>
  );
}
