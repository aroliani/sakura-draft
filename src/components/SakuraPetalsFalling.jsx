import { useMemo } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

/**
 * 80 SVG sakura petals falling with pure CSS keyframe animation.
 * Each petal falls from near branch positions all the way to the bottom (110vh).
 */

const PETAL_COLORS = [
  "#FFB7C5", "#FFC0CB", "#FF9EB5", "#FFAABB",
  "#FDD8E1", "#FFD6E0", "#FFAFC5",
];

/* Spawn zones near branch tips */
const SPAWN_ZONES = [
  { x: 20, y: 35 }, { x: 30, y: 30 }, { x: 40, y: 18 },
  { x: 45, y: 14 }, { x: 55, y: 19 }, { x: 59, y: 16 },
  { x: 43, y: 55 }, { x: 48, y: 58 }, { x: 54, y: 29 },
  { x: 60, y: 28 }, { x: 54, y: 22 }, { x: 15, y: 40 },
  { x: 37, y: 50 }, { x: 25, y: 36 },
];

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function PetalSVG({ color, size, blur }) {
  return (
    <svg
      width={size}
      height={size * 1.3}
      viewBox="0 0 20 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={blur ? { filter: "blur(0.5px)" } : undefined}
    >
      <defs>
        <radialGradient id={`pg-${color.slice(1)}`} cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFF5F7" stopOpacity="0.85" />
          <stop offset="100%" stopColor={color} />
        </radialGradient>
      </defs>
      <path
        d="M 10 0 C 5 5, 0 12, 2 18 C 3.5 22, 7 25, 10 26 C 13 25, 16.5 22, 18 18 C 20 12, 15 5, 10 0 Z"
        fill={`url(#pg-${color.slice(1)})`}
        opacity="0.92"
      />
      <path
        d="M 10 2 C 10 8, 10 16, 10 24"
        stroke={color}
        strokeWidth="0.4"
        opacity="0.45"
        fill="none"
      />
    </svg>
  );
}

export default function SakuraPetalsFalling() {
  const isMobile = useIsMobile();
  const count = isMobile ? 35 : 80;

  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const spawn = SPAWN_ZONES[i % SPAWN_ZONES.length];
      const color = PETAL_COLORS[i % PETAL_COLORS.length];
      const size = rand(12, 25);
      const duration = rand(5, 12);
      const delay = rand(0, 10);
      const drift = rand(-60, 60);
      const rotation = rand(180, 720);
      const tiltX = rand(20, 40);
      const tiltY = rand(10, 30);
      const startX = spawn.x + rand(-5, 5);
      const startY = spawn.y + rand(-3, 3);
      const blur = i % 7 === 0; // ~14% of petals get depth blur

      return {
        id: i,
        color,
        size,
        blur,
        style: {
          position: "absolute",
          left: `${startX}%`,
          top: `${startY}%`,
          width: `${size}px`,
          height: `${size * 1.3}px`,
          willChange: "transform",
          animationName: i % 2 === 0 ? "petalFall" : "petalFall2",
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          animationTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
          animationIterationCount: "infinite",
          animationFillMode: "both",
          "--petal-drift": `${drift}px`,
          "--petal-rotation": `${rotation}deg`,
          "--petal-tiltX": `${tiltX}deg`,
          "--petal-tiltY": `${tiltY}deg`,
          zIndex: 30,
          pointerEvents: "none",
        },
      };
    });
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 30 }} aria-hidden="true">
      {petals.map((p) => (
        <div key={p.id} style={p.style}>
          <PetalSVG color={p.color} size={p.size} blur={p.blur} />
        </div>
      ))}
    </div>
  );
}
