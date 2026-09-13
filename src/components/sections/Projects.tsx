import React, { useState } from 'react';
import { PROJECTS, Project } from '../../data/portfolioData';
import { Card3D } from '../ui/Card3D';
import { Sparkles, Github, ExternalLink, ArrowRight, X, CheckCircle2, Terminal } from 'lucide-react';

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI Systems', '3D & Creative', 'DSA & Algorithms'];

  const filteredProjects = filter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-24 px-4 relative z-20 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
          <Terminal className="w-3.5 h-3.5" />
          <span>PORTFOLIO SHOWCASE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Featured Engineering <span className="text-gradient-neon">Projects</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-slate-400">
          From deep LLM reasoning compilers to real-time 3D WebGL simulations and high-throughput algorithmic systems.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                filter === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                  : 'glass-panel text-slate-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((project) => (
          <Card3D
            key={project.id}
            glowColor={
              project.category === '3D & Creative'
                ? 'rgba(6, 182, 212, 0.25)'
                : 'rgba(139, 92, 246, 0.25)'
            }
          >
            <div className="p-7 flex flex-col justify-between h-full min-h-[360px]">
              <div>
                {/* Top Meta Bar */}
                <div className="flex items-center justify-between gap-3 mb-4">
                  <span className="text-xs font-mono text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-md border border-purple-500/20">
                    {project.category}
                  </span>

                  <div className="flex items-center gap-2">
                    {project.badge && (
                      <span className={`text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${
                        project.id === 'lumiere-fashion-3d'
                          ? 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30 animate-pulse'
                          : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                      }`}>
                        {project.badge}
                      </span>
                    )}
                    <span className="text-xs text-slate-500 font-mono">{project.date}</span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-400 font-mono mb-4">{project.subtitle}</p>

                {/* Description */}
                <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Key Metrics Bullet List */}
                <div className="space-y-1.5 mb-6">
                  {project.metrics.slice(0, 2).map((metric, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{metric}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Tag list & CTA buttons */}
              <div>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.slice(0, 5).map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] font-mono text-slate-500">
                      +{project.tags.length - 5}
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 group/btn"
                  >
                    <span>Inspect System Blueprint</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white transition-colors"
                        title="View Source on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="p-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-400 transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Card3D>
        ))}
      </div>

      {/* Project Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-2xl glass-panel p-7 border border-purple-500/30 shadow-2xl bg-[#0e101a] max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => setActiveModalProject(null)}
              className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-md border border-cyan-500/20">
                {activeModalProject.category} • {activeModalProject.date}
              </span>
              <h3 className="text-2xl font-bold text-white mt-3 mb-1">
                {activeModalProject.title}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{activeModalProject.subtitle}</p>
            </div>

            {/* In-depth system description */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2">
                System Overview & Architecture
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activeModalProject.longDescription}
              </p>
            </div>

            {/* Architecture Features */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-3">
                Key Engineering Highlights
              </h4>
              <div className="space-y-2.5">
                {activeModalProject.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-200 bg-white/5 p-2.5 rounded-lg border border-white/5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="text-xs font-mono text-purple-300 uppercase tracking-wider mb-2">
                Technologies Utilized
              </h4>
              <div className="flex flex-wrap gap-2">
                {activeModalProject.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-xs font-mono text-purple-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              {activeModalProject.githubUrl && (
                <a
                  href={activeModalProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>View Repository</span>
                </a>
              )}
              {activeModalProject.id === 'lumiere-fashion-3d' ? (
                <a
                  href="#lab"
                  onClick={() => setActiveModalProject(null)}
                  className="px-5 py-2.5 rounded-xl glow-button text-white text-xs font-semibold flex items-center gap-2 shadow-lg shadow-cyan-500/20"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Test 3D Shader Engine</span>
                </a>
              ) : (
                <button
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
