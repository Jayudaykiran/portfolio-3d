import React from 'react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';
import { BrainCircuit, Boxes, Code2, Terminal, CheckCircle } from 'lucide-react';

export const Skills: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'BrainCircuit':
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
      case 'Boxes':
        return <Boxes className="w-5 h-5 text-cyan-400" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-rose-400" />;
      case 'Terminal':
        return <Terminal className="w-5 h-5 text-emerald-400" />;
      default:
        return <BrainCircuit className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <section id="skills" className="py-24 px-4 relative z-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono mb-4">
          <Code2 className="w-3.5 h-3.5" />
          <span>TECHNICAL CAPABILITIES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Core Competencies & <span className="text-gradient-neon">Stack</span>
        </h2>
        <p className="max-w-xl text-sm sm:text-base text-slate-400">
          A balanced synthesis of AI/ML systems engineering, competitive algorithmic problem solving, and modern frontend 3D graphics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SKILL_CATEGORIES.map((cat, idx) => (
          <div
            key={idx}
            className="p-7 rounded-2xl glass-panel border border-white/10 hover:border-purple-500/30 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Category Header */}
              <div className="flex items-center gap-3.5 mb-3">
                <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
                  {getIcon(cat.iconName)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{cat.title}</h3>
                  <p className="text-xs text-slate-400">{cat.description}</p>
                </div>
              </div>

              {/* Skills Pill Cloud & Progress */}
              <div className="mt-6 space-y-3.5">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="group">
                    <div className="flex items-center justify-between text-xs mb-1.5 font-medium">
                      <span className={`flex items-center gap-1.5 ${skill.highlight ? 'text-white font-semibold' : 'text-slate-300'}`}>
                        {skill.highlight && <CheckCircle className="w-3.5 h-3.5 text-cyan-400" />}
                        {skill.name}
                      </span>
                      <span className="font-mono text-[11px] text-slate-400 group-hover:text-cyan-300 transition-colors">
                        {skill.level}%
                      </span>
                    </div>
                    {/* Animated bar */}
                    <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-1000 ${
                          skill.highlight
                            ? 'bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500 shadow-sm shadow-cyan-500/50'
                            : 'bg-slate-600 group-hover:bg-slate-400'
                        }`}
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
