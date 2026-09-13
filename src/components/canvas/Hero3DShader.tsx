import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  // Classic Perlin-style sinusoidal displacement
  float wave(vec2 pos, float time) {
    float d = length(pos);
    float w1 = sin(pos.x * 2.5 + time * 0.9) * cos(pos.y * 2.0 + time * 0.7);
    float w2 = sin(pos.x * 4.0 - time * 1.2 + pos.y * 3.0) * 0.35;
    float ripple = sin(d * 6.0 - time * 2.0) * 0.25;
    return (w1 + w2 + ripple) * 0.45;
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // React slightly to mouse coordinates
    vec2 mouseOffset = (uv - 0.5) - uMouse * 0.5;
    float mouseDist = length(mouseOffset);
    float mouseInfluence = smoothstep(0.6, 0.0, mouseDist) * 0.4;

    float elevation = wave(pos.xy, uTime * 0.6) + mouseInfluence * sin(uTime * 3.0);
    pos.z += elevation;

    vElevation = elevation;
    vNormal = normal;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorA;
  uniform vec3 uColorB;
  uniform vec3 uColorHighlight;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    // Horizon glow and elevation-based gradient
    float mixStrength = (vElevation + 0.4) * 0.9;
    mixStrength = clamp(mixStrength, 0.0, 1.0);

    vec3 color = mix(uColorA, uColorB, mixStrength);

    // Dynamic crest highlights
    float crest = smoothstep(0.2, 0.5, vElevation);
    color = mix(color, uColorHighlight, crest * 0.85);

    // Subtle radial vignetting
    float distFromCenter = length(vUv - 0.5);
    float vignette = 1.0 - smoothstep(0.2, 0.85, distFromCenter);

    // Horizon line sheen
    float horizonGlow = smoothstep(0.6, 0.45, abs(vUv.y - 0.5)) * 0.25;
    color += uColorHighlight * horizonGlow;

    gl_FragColor = vec4(color * vignette, 0.92);
  }
`;

export const Hero3DShader: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, -1.8, 3.2);
    camera.rotation.x = 0.55;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Plane geometry with custom GLSL material
    const geometry = new THREE.PlaneGeometry(8, 6, 80, 80);

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uColorA: { value: new THREE.Color('#070913') },      // Deep night navy
      uColorB: { value: new THREE.Color('#6d28d9') },      // Electric violet
      uColorHighlight: { value: new THREE.Color('#00f2fe') } // Cyan neon
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      wireframe: false,
      transparent: true,
      side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Background Particle Field (Stars & Digital Dust)
    const particleCount = 450;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color('#38bdf8');
    const c2 = new THREE.Color('#a855f7');

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 14;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 6;

      const mixedColor = Math.random() > 0.5 ? c1 : c2;
      colors[i] = mixedColor.r;
      colors[i + 1] = mixedColor.g;
      colors[i + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Mouse Tracking with smooth interpolation
    const targetMouse = { x: 0, y: 0 };
    const currentMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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
      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse easing
      currentMouse.x += (targetMouse.x - currentMouse.x) * 0.05;
      currentMouse.y += (targetMouse.y - currentMouse.y) * 0.05;

      uniforms.uTime.value = elapsedTime;
      uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);

      // Subtle camera pan with mouse
      camera.position.x = currentMouse.x * 0.35;
      camera.position.y = -1.8 + currentMouse.y * 0.2;
      camera.lookAt(0, 0, 0);

      // Gentle particle drift
      particles.rotation.y = elapsedTime * 0.03;
      particles.rotation.x = Math.sin(elapsedTime * 0.02) * 0.08;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden"
      aria-hidden="true"
    />
  );
};
