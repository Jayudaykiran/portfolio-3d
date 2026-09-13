import React, { useState, useRef } from 'react';

interface Card3DProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: string;
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className = '',
  glowColor = 'rgba(139, 92, 246, 0.18)'
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [sheenPosition, setSheenPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -9; // Max 9 deg
    const rotateY = ((x - centerX) / centerX) * 9;

    const sheenX = (x / rect.width) * 100;
    const sheenY = (y / rect.height) * 100;

    setRotation({ x: rotateX, y: rotateY });
    setSheenPosition({ x: sheenX, y: sheenY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) translateY(-4px) scale3d(1.015, 1.015, 1.015)`
            : 'rotateX(0deg) rotateY(0deg) translateY(0px) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.08s ease-out' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
        }}
        className={`relative overflow-hidden rounded-2xl glass-panel glass-panel-hover transform-gpu ${className}`}
      >
        {/* Dynamic Holographic / Cursor Sheen */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle 280px at ${sheenPosition.x}% ${sheenPosition.y}%, rgba(255, 255, 255, 0.15), transparent 75%), radial-gradient(circle 350px at ${sheenPosition.x}% ${sheenPosition.y}%, ${glowColor}, transparent 80%)`
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-20 w-full h-full">
          {children}
        </div>
      </div>
    </div>
  );
};
