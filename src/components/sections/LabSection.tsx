import React from 'react';
import { Interactive3DPlayground } from '../canvas/Interactive3DPlayground';
import { Sparkles, Box, Flame, ShieldCheck } from 'lucide-react';

export const LabSection: React.FC = () => {
  return (
    <section id="lab" className="py-24 px-4 relative z-20 max-w-6xl mx-auto">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>REAL-TIME GRAPHICS ENGINE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4">
          Interactive <span className="text-gradient-neon">3D WebGL</span> Laboratory
        </h2>
        <p className="max-w-2xl text-sm sm:text-base text-slate-400">
          Powered by ThreeUI design patterns, custom GLSL vertex/fragment shaders, and dynamic lighting. This exact engine powers the interactive 360° fabric inspection in our upcoming Women's Fashion boutique.
        </p>
      </div>

      {/* The 3D interactive playground */}
      <Interactive3DPlayground />

      {/* Architectural Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-5 rounded-xl glass-panel border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 shrink-0">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Hardware Accelerated</h4>
            <p className="text-xs text-slate-400">
              Low memory footprint with automatic geometry disposal and 60 FPS requestAnimationFrame scheduling.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl glass-panel border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 shrink-0">
            <Flame className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Custom Shader Physics</h4>
            <p className="text-xs text-slate-400">
              Custom GLSL uniforms for wave elevation, holographic refraction, and interactive pointer disturbance.
            </p>
          </div>
        </div>

        <div className="p-5 rounded-xl glass-panel border border-white/5 flex items-start gap-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 shrink-0">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-1">Fashion-Ready Pipeline</h4>
            <p className="text-xs text-slate-400">
              Directly transferable to 360° garment rotation, luxury lookbook previews, and fabric drape simulations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
