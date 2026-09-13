import React from 'react';
import { Hero3DShader } from '../canvas/Hero3DShader';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ArrowDown, Sparkles, Terminal, Cpu, Layers, FileText } from 'lucide-react';

interface HeroProps {
  onOpenResumeModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResumeModal }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-16 px-4 overflow-hidden">
      {/* ThreeUI 3D WebGL Shader Background Canvas */}
      <Hero3DShader />

      {/* Subtle top & bottom vignette gradients */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-[#06070a] to-transparent pointer-events-none z-10" />
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#06070a] via-[#06070a]/80 to-transparent pointer-events-none z-10" />

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto text-center flex flex-col items-center">
        
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-500/30 text-xs font-mono text-purple-300 mb-8 shadow-lg shadow-purple-500/10 animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>{PERSONAL_INFO.status}</span>
        </div>

        {/* Main Name & Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Engineering the Future of <br className="hidden sm:inline" />
          <span className="text-gradient-neon font-black">AI Systems</span> &{' '}
          <span className="text-gradient-purple">3D Web Experiences</span>
        </h1>

        {/* Intro Subtext */}
        <p className="max-w-2xl text-base sm:text-lg text-slate-300/90 font-normal mb-8 leading-relaxed">
          I am <span className="font-semibold text-white">{PERSONAL_INFO.name}</span>, a Computer Science Engineer at Lovely Professional University. I architect end-to-end AI compiler pipelines, multi-persona LLM systems, and high-performance WebGL 3D web applications.
        </p>

        {/* Quick Highlights / Proof Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-10 text-xs font-mono text-slate-300">
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            AI Compiler Architect
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-purple-400" />
            Groq & Cohere LLMs
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-rose-400" />
            ThreeUI 3D Shaders
          </span>
          <span className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            Stanford & Coursera Certified
          </span>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 w-full max-w-lg">
          <a
            href="#projects"
            className="flex-1 min-w-[150px] py-3.5 px-6 rounded-xl font-semibold text-sm text-white glow-button flex items-center justify-center gap-2 shadow-xl shadow-purple-600/30 group"
          >
            <span>Explore Projects</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#lab"
            className="flex-1 min-w-[150px] py-3.5 px-6 rounded-xl font-semibold text-sm text-slate-200 glass-panel hover:bg-white/10 border border-white/15 flex items-center justify-center gap-2 transition-all group hover:text-cyan-300"
          >
            <span>3D WebGL Lab</span>
            <Sparkles className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform" />
          </a>

          <button
            onClick={onOpenResumeModal}
            className="py-3.5 px-5 rounded-xl font-semibold text-sm text-slate-300 glass-panel hover:bg-white/10 border border-white/15 flex items-center justify-center gap-2 transition-all hover:text-purple-300"
          >
            <FileText className="w-4 h-4 text-purple-400" />
            <span>View CV</span>
          </button>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-16 flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">
          <a href="#projects" className="flex flex-col items-center gap-1.5 group">
            <span className="text-[11px] font-mono tracking-widest uppercase">Scroll to Discover</span>
            <div className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div className="w-1.5 h-2.5 rounded-full bg-cyan-400 animate-bounce" />
            </div>
          </a>
        </div>

      </div>
    </section>
  );
};
