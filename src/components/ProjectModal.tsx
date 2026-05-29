import { Project } from '../types';
import { X, Calendar, Wrench, FileCheck, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-brand-text/30 backdrop-blur-sm"
      />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-brand-card rounded-3xl border border-brand-text/10 shadow-2xl z-10 p-6 md:p-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full border border-brand-text/10 hover:bg-brand-text/5 text-brand-text transition-colors cursor-pointer"
          aria-label="Close Case Study"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-accent-soft text-brand-accent uppercase tracking-wider">
              {project.category}
            </span>
            <span className="flex items-center gap-1 text-xs text-brand-muted font-medium">
              <Calendar className="w-3.5 h-3.5" />
              {project.duration}
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-brand-text mb-2">
            {project.title}
          </h2>
          <p className="text-sm md:text-base font-semibold text-brand-accent mb-6 italic">
            Focus: {project.focus}
          </p>

          <hr className="border-brand-text/5 my-6" />

          {/* Grid: Details & Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-3">
                  Overview
                </h4>
                <p className="text-brand-text/80 text-sm leading-relaxed whitespace-pre-line">
                  {project.description}
                </p>
              </div>

              {/* Design Pathway */}
              {project.steps && project.steps.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-4">
                    Case Study Process
                  </h4>
                  <div className="space-y-4">
                    {project.steps.map((step, index) => (
                      <div key={step.title} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-accent/10 text-brand-accent font-mono text-xs font-bold">
                            {index + 1}
                          </span>
                          {index < project.steps!.length - 1 && (
                            <div className="w-0.5 h-10 bg-brand-accent/10 my-1" />
                          )}
                        </div>
                        <div>
                          <h5 className="text-sm font-semibold text-brand-text">
                            {step.title}
                          </h5>
                          <p className="text-xs text-brand-muted mt-0.5 leading-relaxed">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar metadata */}
            <div className="space-y-6">
              {/* Stats */}
              {project.mockStats && project.mockStats.length > 0 && (
                <div className="p-4 bg-brand-text/2 rounded-2xl border border-brand-text/5">
                  <h4 className="text-[10px] font-bold text-brand-text uppercase tracking-wider mb-3">
                    Project Outcomes
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    {project.mockStats.map((stat) => (
                      <div key={stat.label} className="flex items-center justify-between border-b border-brand-text/5 last:border-0 pb-2 last:pb-0">
                        <span className="text-xs text-brand-muted font-medium">{stat.label}</span>
                        <span className="text-sm font-bold text-brand-accent font-mono">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tools */}
              <div>
                <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-brand-accent" />
                  Tools Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.toolsUsed.map((tool) => (
                    <span
                      key={tool}
                      className="text-xs font-medium px-2.5 py-1 rounded-lg bg-brand-text/5 text-brand-text"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Deliverables */}
              <div>
                <h4 className="text-xs font-semibold text-brand-text uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                  <FileCheck className="w-3.5 h-3.5 text-brand-accent" />
                  Deliverables
                </h4>
                <div className="space-y-1.5">
                  {project.deliverables.map((del) => (
                    <div key={del} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-brand-accent mt-0.5 shrink-0" />
                      <span className="text-xs text-brand-text/95 leading-tight">{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
