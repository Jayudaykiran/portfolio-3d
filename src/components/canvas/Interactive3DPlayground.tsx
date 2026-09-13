import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Eye, Sparkles, RefreshCw, Cpu, Layers } from 'lucide-react';

type GeometryType = 'torusKnot' | 'icosahedron' | 'dodecahedron' | 'octahedron';
type MaterialTheme = 'hologram' | 'wireframe' | 'chrome' | 'emerald';

export const Interactive3DPlayground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeGeometry, setActiveGeometry] = useState<GeometryType>('torusKnot');
  const [activeTheme, setActiveTheme] = useState<MaterialTheme>('hologram');
  const [wireframe, setWireframe] = useState<boolean>(false);
  const [speed, setSpeed] = useState<number>(1);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  // References to communicate with the Three.js render loop without re-instantiating scene
  const meshRef = useRef<THREE.Mesh | null>(null);
  const speedRef = useRef<number>(speed);
  speedRef.current = speed;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 5.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x00f2fe, 3, 50);
    pointLight1.position.set(4, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 50);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight.position.set(0, 5, 5);
    scene.add(dirLight);

    // Build Geometries
    const createGeometry = (type: GeometryType): THREE.BufferGeometry => {
      switch (type) {
        case 'torusKnot':
          return new THREE.TorusKnotGeometry(1.2, 0.38, 120, 24);
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(1.6, 2);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(1.6, 1);
        case 'octahedron':
          return new THREE.OctahedronGeometry(1.7, 2);
        default:
          return new THREE.TorusKnotGeometry(1.2, 0.38, 120, 24);
      }
    };

    // Build Materials
    const createMaterial = (theme: MaterialTheme, isWire: boolean): THREE.Material => {
      if (isWire) {
        return new THREE.MeshStandardMaterial({
          color: theme === 'chrome' ? 0xe2e8f0 : theme === 'emerald' ? 0x10b981 : 0x38bdf8,
          wireframe: true,
          emissive: theme === 'emerald' ? 0x059669 : 0x6366f1,
          emissiveIntensity: 0.6
        });
      }

      switch (theme) {
        case 'hologram':
          return new THREE.MeshPhysicalMaterial({
            color: 0x6d28d9,
            emissive: 0x1e1b4b,
            roughness: 0.15,
            metalness: 0.85,
            clearcoat: 1.0,
            clearcoatRoughness: 0.1,
            wireframe: false
          });
        case 'chrome':
          return new THREE.MeshStandardMaterial({
            color: 0xffffff,
            metalness: 0.95,
            roughness: 0.08,
            wireframe: false
          });
        case 'emerald':
          return new THREE.MeshPhysicalMaterial({
            color: 0x059669,
            roughness: 0.2,
            metalness: 0.8,
            clearcoat: 0.9,
            wireframe: false
          });
        case 'wireframe':
          return new THREE.MeshStandardMaterial({
            color: 0x00f2fe,
            wireframe: true,
            emissive: 0x0284c7,
            emissiveIntensity: 0.8
          });
        default:
          return new THREE.MeshStandardMaterial({ color: 0x8b5cf6 });
      }
    };

    const initialGeo = createGeometry(activeGeometry);
    const initialMat = createMaterial(activeTheme, wireframe);
    const mesh = new THREE.Mesh(initialGeo, initialMat);
    scene.add(mesh);
    meshRef.current = mesh;

    // Surrounding floating orbital ring
    const ringGeo = new THREE.TorusGeometry(2.3, 0.015, 16, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x00f2fe,
      transparent: true,
      opacity: 0.35
    });
    const orbitalRing = new THREE.Mesh(ringGeo, ringMat);
    orbitalRing.rotation.x = Math.PI / 3;
    scene.add(orbitalRing);

    // Mouse drag rotation handling
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !mesh) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      mesh.rotation.y += deltaX * 0.01;
      mesh.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const delta = clock.getDelta();
      const currentSpeed = speedRef.current;

      if (mesh && !isDragging) {
        mesh.rotation.y += delta * 0.6 * currentSpeed;
        mesh.rotation.x += delta * 0.35 * currentSpeed;
      }

      if (orbitalRing) {
        orbitalRing.rotation.z += delta * 0.25;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      domElement.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      initialGeo.dispose();
      initialMat.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  // Update Geometry dynamically
  useEffect(() => {
    if (!meshRef.current) return;
    meshRef.current.geometry.dispose();

    switch (activeGeometry) {
      case 'torusKnot':
        meshRef.current.geometry = new THREE.TorusKnotGeometry(1.2, 0.38, 120, 24);
        break;
      case 'icosahedron':
        meshRef.current.geometry = new THREE.IcosahedronGeometry(1.6, 2);
        break;
      case 'dodecahedron':
        meshRef.current.geometry = new THREE.DodecahedronGeometry(1.6, 1);
        break;
      case 'octahedron':
        meshRef.current.geometry = new THREE.OctahedronGeometry(1.7, 2);
        break;
    }
  }, [activeGeometry]);

  // Update Material / Theme dynamically
  useEffect(() => {
    if (!meshRef.current) return;
    const oldMat = meshRef.current.material;
    if (Array.isArray(oldMat)) {
      oldMat.forEach((m) => m.dispose());
    } else {
      oldMat.dispose();
    }

    if (wireframe || activeTheme === 'wireframe') {
      meshRef.current.material = new THREE.MeshStandardMaterial({
        color: activeTheme === 'chrome' ? 0xe2e8f0 : activeTheme === 'emerald' ? 0x10b981 : 0x00f2fe,
        wireframe: true,
        emissive: activeTheme === 'emerald' ? 0x059669 : 0x0284c7,
        emissiveIntensity: 0.7
      });
      return;
    }

    switch (activeTheme) {
      case 'hologram':
        meshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x7c3aed,
          emissive: 0x1e1b4b,
          roughness: 0.15,
          metalness: 0.85,
          clearcoat: 1.0,
          clearcoatRoughness: 0.1
        });
        break;
      case 'chrome':
        meshRef.current.material = new THREE.MeshStandardMaterial({
          color: 0xffffff,
          metalness: 0.95,
          roughness: 0.08
        });
        break;
      case 'emerald':
        meshRef.current.material = new THREE.MeshPhysicalMaterial({
          color: 0x059669,
          roughness: 0.2,
          metalness: 0.8,
          clearcoat: 0.9
        });
        break;
    }
  }, [activeTheme, wireframe]);

  return (
    <div className="relative w-full rounded-2xl overflow-hidden glass-panel border border-purple-500/20 shadow-2xl p-6 bg-gradient-to-b from-[#0e101a]/90 to-[#080910]/95">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
            <Cpu className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              WebGL 3D Shader Laboratory
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-mono">
                ThreeUI Engine
              </span>
            </h3>
            <p className="text-xs text-slate-400">Drag to inspect geometry • Real-time hardware accelerated WebGL</p>
          </div>
        </div>

        {/* Live Status indicator */}
        <div className="flex items-center gap-3 text-xs font-mono text-slate-300">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            60 FPS
          </span>
          <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10">
            Vertices: {activeGeometry === 'torusKnot' ? '2,880' : activeGeometry === 'icosahedron' ? '642' : '420'}
          </span>
        </div>
      </div>

      {/* 3D Canvas Viewport */}
      <div
        className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden cursor-grab active:cursor-grabbing border border-white/5 bg-radial from-purple-950/20 via-black/40 to-black/80 flex items-center justify-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div ref={mountRef} className="w-full h-full" />

        {/* Floating Hint Pill */}
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-panel text-xs text-slate-300 pointer-events-none transition-opacity duration-300 flex items-center gap-2 border border-white/10 ${
            isHovered ? 'opacity-100' : 'opacity-40'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Click & Drag to rotate in 3D</span>
        </div>
      </div>

      {/* Control Panel Deck */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs">
        {/* Geometry Switcher */}
        <div>
          <label className="block text-slate-400 font-medium mb-2 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-purple-400" />
            Select 3D Mesh
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['torusKnot', 'icosahedron', 'dodecahedron', 'octahedron'] as GeometryType[]).map((geo) => (
              <button
                key={geo}
                onClick={() => setActiveGeometry(geo)}
                className={`px-3 py-2 rounded-lg font-medium transition-all text-left truncate ${
                  activeGeometry === geo
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30 border border-purple-400'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {geo === 'torusKnot' ? 'Torus Knot' : geo === 'icosahedron' ? 'Icosahedron' : geo === 'dodecahedron' ? 'Dodecahedron' : 'Octahedron'}
              </button>
            ))}
          </div>
        </div>

        {/* Shader / Material Theme */}
        <div>
          <label className="block text-slate-400 font-medium mb-2 flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            Shader Material
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(['hologram', 'chrome', 'emerald', 'wireframe'] as MaterialTheme[]).map((theme) => (
              <button
                key={theme}
                onClick={() => setActiveTheme(theme)}
                className={`px-3 py-2 rounded-lg font-medium transition-all capitalize text-left ${
                  activeTheme === theme
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-600/30 border border-cyan-400'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 border border-white/5'
                }`}
              >
                {theme}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamics & Toggles */}
        <div className="flex flex-col justify-between">
          <div>
            <label className="block text-slate-400 font-medium mb-2 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <RefreshCw className="w-3.5 h-3.5 text-rose-400" />
                Orbital Speed
              </span>
              <span className="text-slate-300 font-mono">{speed.toFixed(1)}x</span>
            </label>
            <input
              type="range"
              min="0"
              max="2.5"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>

          <div className="pt-3">
            <button
              onClick={() => setWireframe(!wireframe)}
              className={`w-full py-2 px-3 rounded-lg font-medium border flex items-center justify-center gap-2 transition-all ${
                wireframe
                  ? 'bg-purple-500/20 text-purple-300 border-purple-500/50 shadow-md shadow-purple-500/20'
                  : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10'
              }`}
            >
              <span>{wireframe ? '✓ Wireframe Enabled' : 'Toggle Wireframe Mode'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
