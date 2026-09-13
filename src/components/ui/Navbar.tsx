import React, { useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { Menu, X, Github, Linkedin, Mail, Sparkles, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResumeModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenResumeModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: '3D Lab', href: '#lab' },
    { name: 'Skills', href: '#skills' },
    { name: 'Timeline', href: '#timeline' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 transition-all duration-300">
      <nav
        className={`w-full max-w-6xl rounded-2xl transition-all duration-300 px-5 py-3.5 flex items-center justify-between ${
          isScrolled
            ? 'glass-panel shadow-2xl shadow-black/50 border border-white/10 backdrop-blur-xl'
            : 'bg-black/20 backdrop-blur-md border border-white/5'
        }`}
      >
        {/* Brand & Monogram */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-cyan-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-cyan-500/30 transition-all">
            <div className="w-full h-full bg-[#090a10] rounded-xl flex items-center justify-center font-mono font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
              JK
            </div>
          </div>
          <div>
            <div className="text-sm font-bold tracking-tight text-white group-hover:text-cyan-300 transition-colors flex items-center gap-1.5">
              <span>{PERSONAL_INFO.shortName}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" title="Available for work" />
            </div>
            <p className="text-[10px] text-slate-400 font-mono tracking-wider">AI & 3D CREATIVE</p>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-1 text-xs font-medium text-slate-300">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-2 rounded-lg hover:text-white hover:bg-white/5 transition-all text-slate-300 hover:text-cyan-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Right Action Stack */}
        <div className="hidden md:flex items-center gap-2.5">
          <button
            onClick={onOpenResumeModal}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
          >
            <FileText className="w-3.5 h-3.5 text-purple-400" />
            <span>View CV</span>
          </button>

          <a
            href={PERSONAL_INFO.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={PERSONAL_INFO.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-white/5 transition-colors"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href="#contact"
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white glow-button shadow-lg shadow-purple-500/25 ml-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Let's Talk</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={onOpenResumeModal}
            className="p-2 rounded-lg bg-white/5 text-slate-200 border border-white/10 text-xs flex items-center gap-1"
          >
            <FileText className="w-4 h-4 text-purple-400" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-20 left-4 right-4 rounded-2xl glass-panel p-5 border border-white/10 shadow-2xl backdrop-blur-2xl flex flex-col gap-3 md:hidden z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-1 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2.5 rounded-lg text-slate-200 hover:bg-white/5 text-sm font-medium hover:text-cyan-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-cyan-400"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={PERSONAL_INFO.socials.emailMailto}
                className="p-2 rounded-lg bg-white/5 text-slate-300 hover:text-purple-400"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>

            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-white glow-button"
            >
              Get In Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
