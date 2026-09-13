import { useState } from 'react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/sections/Hero';
import { Projects } from './components/sections/Projects';
import { LabSection } from './components/sections/LabSection';
import { Skills } from './components/sections/Skills';
import { TimelineSection } from './components/sections/TimelineSection';
import { Contact } from './components/sections/Contact';
import { ResumeModal } from './components/ui/ResumeModal';

export function App() {
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#06070a] text-slate-100 selection:bg-purple-500/30 selection:text-cyan-200">
      {/* Floating Navigation */}
      <Navbar onOpenResumeModal={() => setIsResumeModalOpen(true)} />

      <main>
        {/* 3D WebGL Shader Hero */}
        <Hero onOpenResumeModal={() => setIsResumeModalOpen(true)} />

        {/* Featured Projects with 3D Perspective Tilt Cards */}
        <Projects />

        {/* Real-time 3D WebGL Shader Playground */}
        <LabSection />

        {/* Core Competencies & Skills */}
        <Skills />

        {/* Education & Certifications Timeline */}
        <TimelineSection />

        {/* Direct Contact & Dispatch */}
        <Contact />
      </main>

      {/* Interactive CV Modal */}
      <ResumeModal
        isOpen={isResumeModalOpen}
        onClose={() => setIsResumeModalOpen(false)}
      />
    </div>
  );
}

export default App;
