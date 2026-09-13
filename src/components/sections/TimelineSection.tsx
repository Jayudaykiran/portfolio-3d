import React from 'react';
import { EDUCATION, CERTIFICATES } from '../../data/portfolioData';
import { GraduationCap, Award, Calendar, MapPin, CheckCircle2, BookOpen } from 'lucide-react';

export const TimelineSection: React.FC = () => {
  return (
    <section id="timeline" className="py-24 px-4 relative z-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>ACADEMIC & PROFESSIONAL CREDENTIALS</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Education & <span className="text-gradient-neon">Certifications</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-slate-400">
          Rigorous academic training combined with global industry certifications in Algorithms, Cloud Computing, and Machine Learning.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Education Column (7 cols) */}
        <div className="lg:col-span-7">
          <div className="flex items-center gap-2.5 mb-6 text-sm font-bold uppercase tracking-wider text-purple-300 font-mono">
            <GraduationCap className="w-4 h-4 text-purple-400" />
            <span>Education</span>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:via-cyan-500/50 before:to-transparent">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="relative pl-10">
                {/* Timeline node */}
                <div className="absolute left-1.5 top-1.5 w-4 h-4 rounded-full bg-[#06070a] border-2 border-purple-400 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                </div>

                <div className="p-6 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/30 transition-all">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-white">{edu.institution}</h3>
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-md bg-purple-500/15 text-purple-300 border border-purple-500/30">
                      {edu.score}
                    </span>
                  </div>

                  <div className="text-sm font-semibold text-cyan-300 mb-2">{edu.degree}</div>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-500" />
                      {edu.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      {edu.location}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {edu.highlights.map((point, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Column (5 cols) */}
        <div className="lg:col-span-5">
          <div className="flex items-center gap-2.5 mb-6 text-sm font-bold uppercase tracking-wider text-cyan-300 font-mono">
            <Award className="w-4 h-4 text-cyan-400" />
            <span>Certificates & Honors</span>
          </div>

          <div className="space-y-4">
            {CERTIFICATES.map((cert, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl glass-panel border border-white/10 hover:border-cyan-500/30 transition-all flex items-start justify-between gap-3 group"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    {cert.tag}
                  </span>
                  <h4 className="text-sm font-bold text-white mt-2 group-hover:text-cyan-300 transition-colors">
                    {cert.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">{cert.issuer}</p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-slate-400 block">{cert.date}</span>
                  <div className="mt-2 w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
                    <Award className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}

            {/* Training Program Spotlight */}
            <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 via-purple-900/20 to-transparent border border-purple-500/30 mt-6">
              <div className="flex items-center gap-2 text-xs font-mono text-purple-300 mb-2">
                <BookOpen className="w-4 h-4" />
                <span>Specialized DSA Intensive</span>
              </div>
              <h4 className="text-sm font-bold text-white mb-1">Board Infinity DSA Capstone</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Completed in-depth algorithm design, space-time complexity analysis, and architected an algorithmic Learning Management System in C++ & Java under strict memory bounds.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
