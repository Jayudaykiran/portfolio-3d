import React from 'react';
import { PERSONAL_INFO, PROJECTS, EDUCATION, CERTIFICATES } from '../../data/portfolioData';
import { X, Printer, Mail, Phone, Linkedin, Github } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl glass-panel bg-[#0d0e17] border border-white/10 shadow-2xl flex flex-col overflow-hidden">
        
        {/* Top Control Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#121422]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Curriculum Vitae • {PERSONAL_INFO.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8 text-slate-200 font-sans leading-relaxed">
          
          {/* Header */}
          <div className="border-b border-white/10 pb-6">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {PERSONAL_INFO.name}
            </h1>
            <p className="text-sm font-mono text-cyan-400 mt-1 mb-3">
              {PERSONAL_INFO.role}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-mono">
              <a href={PERSONAL_INFO.socials.emailMailto} className="hover:text-white flex items-center gap-1">
                <Mail className="w-3 h-3 text-purple-400" />
                {PERSONAL_INFO.email}
              </a>
              <a href={PERSONAL_INFO.socials.tel} className="hover:text-white flex items-center gap-1">
                <Phone className="w-3 h-3 text-cyan-400" />
                {PERSONAL_INFO.phone}
              </a>
              <a href={PERSONAL_INFO.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-300 flex items-center gap-1">
                <Linkedin className="w-3 h-3 text-blue-400" />
                linkedin.com/in/jayudaykiran
              </a>
              <a href={PERSONAL_INFO.socials.github} target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1">
                <Github className="w-3 h-3" />
                github.com/Jayudaykiran
              </a>
            </div>
          </div>

          {/* Skills Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-3">
              SKILLS & PROFICIENCIES
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Languages</span>
                <span className="text-slate-300">C++, Java, Python, JavaScript, TypeScript, HTML/CSS, GLSL</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">AI / ML & LLM Systems</span>
                <span className="text-slate-300">RAG, Prompt Engineering, NLP, Computer Vision (YOLO), PyTorch, TensorFlow, Scikit-learn</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Frameworks & Tools</span>
                <span className="text-slate-300">Flask, Streamlit, Three.js, React, Tailwind CSS, Git, GitHub, SQLite</span>
              </div>
              <div className="bg-white/5 p-3 rounded-lg border border-white/5">
                <span className="font-semibold text-white block mb-1">Data & Analysis</span>
                <span className="text-slate-300">NumPy, Pandas, Matplotlib, Seaborn, Power BI, Py-PDFLoader</span>
              </div>
            </div>
          </div>

          {/* Projects */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              FEATURED PROJECTS
            </h2>
            <div className="space-y-4 text-xs">
              {PROJECTS.filter(p => p.id !== 'lumiere-fashion-3d').map((p) => (
                <div key={p.id} className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-bold text-sm text-white">{p.title}</span>
                    <span className="text-slate-400 font-mono">{p.date}</span>
                  </div>
                  <p className="text-purple-300 font-mono mb-2 text-[11px]">{p.tags.join(' • ')}</p>
                  <p className="text-slate-300 mb-2 leading-relaxed">{p.longDescription}</p>
                  <ul className="list-disc list-inside space-y-1 text-slate-300">
                    {p.features.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-3">
              EDUCATION
            </h2>
            <div className="space-y-3 text-xs">
              {EDUCATION.map((edu, i) => (
                <div key={i} className="flex justify-between items-start bg-white/5 p-3.5 rounded-lg border border-white/5">
                  <div>
                    <span className="font-bold text-white block">{edu.institution}</span>
                    <span className="text-slate-300">{edu.degree}</span>
                    <span className="text-slate-400 block mt-0.5">{edu.location}</span>
                  </div>
                  <div className="text-right font-mono">
                    <span className="text-cyan-400 font-bold block">{edu.score}</span>
                    <span className="text-slate-400">{edu.duration}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-3">
              CERTIFICATES & TRAINING
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {CERTIFICATES.map((cert, i) => (
                <div key={i} className="bg-white/5 p-3 rounded-lg border border-white/5 flex justify-between items-center">
                  <div>
                    <span className="font-semibold text-white block">{cert.title}</span>
                    <span className="text-slate-400 text-[11px]">{cert.issuer}</span>
                  </div>
                  <span className="text-slate-400 font-mono text-[11px] shrink-0">{cert.date}</span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
