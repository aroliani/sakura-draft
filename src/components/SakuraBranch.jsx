import { useState } from "react";

/**
 * Cinematic SVG cherry blossom branch with LARGE realistic flowers.
 * Branch enters from the left, flowers are interactive (clickable → scroll).
 */

const FLOWER_NODES = [
  { cx: 245, cy: 275, size: 28, grad: "blossomA", section: "about", label: "Apa itu SAKURA?" },
  { cx: 365, cy: 240, size: 24, grad: "blossomB", section: "why", label: "Arsip Digital" },
  { cx: 480, cy: 140, size: 30, grad: "blossomA", section: "workflow", label: "Alur Persetujuan" },
  { cx: 660, cy: 150, size: 26, grad: "blossomB", section: "security", label: "Keamanan & QR" },
  { cx: 520, cy: 458, size: 25, grad: "blossomA", section: "school", label: "SMP Negeri 4" },
  // Extra decorative flowers (no click)
  { cx: 545, cy: 110, size: 20, grad: "blossomB", section: null, label: null },
  { cx: 710, cy: 130, size: 18, grad: "blossomA", section: null, label: null },
  { cx: 575, cy: 475, size: 19, grad: "blossomB", section: null, label: null },
  { cx: 650, cy: 230, size: 22, grad: "blossomA", section: null, label: null },
  { cx: 720, cy: 226, size: 17, grad: "blossomB", section: null, label: null },
  { cx: 650, cy: 175, size: 21, grad: "blossomA", section: null, label: null },
  { cx: 180, cy: 316, size: 19, grad: "blossomB", section: null, label: null },
  { cx: 450, cy: 400, size: 20, grad: "blossomA", section: null, label: null },
  { cx: 300, cy: 290, size: 16, grad: "blossomB", section: null, label: null },
];

const BUD_POSITIONS = [
  { cx: 220, cy: 300, size: 9 },
  { cx: 400, cy: 205, size: 10 },
  { cx: 500, cy: 155, size: 8 },
  { cx: 580, cy: 195, size: 9 },
  { cx: 690, cy: 140, size: 8 },
  { cx: 470, cy: 430, size: 9 },
  { cx: 620, cy: 170, size: 8 },
];

function scrollToSection(id) {
  const el = document.getElementById(`section-${id}`);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/** Render a large, realistic 5-petal cherry blossom */
function renderLargeFlower(node, hoveredId, setHoveredId) {
  const { cx, cy, size, grad, section, label } = node;
  const isInteractive = !!section;
  const isHovered = hoveredId === section;
  const scale = isHovered ? 1.15 : 1;
  const petalAngles = [0, 72, 144, 216, 288];
  const petalLength = size * 1.1;

  const petalPath = (angle) => {
    const rad = (angle * Math.PI) / 180;
    const tipX = cx + Math.cos(rad) * petalLength;
    const tipY = cy + Math.sin(rad) * petalLength;
    const cp1Angle = rad - 0.45;
    const cp2Angle = rad + 0.45;
    const cpDist = size * 0.7;
    const cp1x = cx + Math.cos(cp1Angle) * cpDist;
    const cp1y = cy + Math.sin(cp1Angle) * cpDist;
    const cp2x = cx + Math.cos(cp2Angle) * cpDist;
    const cp2y = cy + Math.sin(cp2Angle) * cpDist;
    return `M ${cx} ${cy} Q ${cp1x} ${cp1y} ${tipX} ${tipY} Q ${cp2x} ${cp2y} ${cx} ${cy}`;
  };

  // Petal vein line
  const veinPath = (angle) => {
    const rad = (angle * Math.PI) / 180;
    const endX = cx + Math.cos(rad) * petalLength * 0.85;
    const endY = cy + Math.sin(rad) * petalLength * 0.85;
    return `M ${cx} ${cy} L ${endX} ${endY}`;
  };

  // Stamen positions
  const stamenAngles = [36, 108, 180, 252, 324];

  return (
    <g
      key={`flower-${cx}-${cy}`}
      style={{
        cursor: isInteractive ? "pointer" : "default",
        transform: `scale(${scale})`,
        transformOrigin: `${cx}px ${cy}px`,
        transition: "transform 0.3s ease",
        filter: isHovered
          ? "drop-shadow(0 2px 12px rgba(255,150,180,0.6))"
          : "drop-shadow(0 2px 8px rgba(255,150,180,0.3))",
      }}
      onClick={isInteractive ? () => scrollToSection(section) : undefined}
      onMouseEnter={isInteractive ? () => setHoveredId(section) : undefined}
      onMouseLeave={isInteractive ? () => setHoveredId(null) : undefined}
    >
      {/* Petals */}
      {petalAngles.map((angle) => (
        <path
          key={`petal-${angle}`}
          d={petalPath(angle)}
          fill={`url(#${grad})`}
          stroke="#FFB0C0"
          strokeWidth="0.5"
          opacity="0.92"
        />
      ))}
      {/* Petal veins */}
      {petalAngles.map((angle) => (
        <path
          key={`vein-${angle}`}
          d={veinPath(angle)}
          stroke="#FF8FAB"
          strokeWidth="0.4"
          opacity="0.35"
          fill="none"
        />
      ))}
      {/* Center */}
      <circle cx={cx} cy={cy} r={size * 0.22} fill="url(#flowerCenter)" />
      {/* Stamens — yellow/cream dots */}
      {stamenAngles.map((angle) => {
        const rad = (angle * Math.PI) / 180;
        const sx = cx + Math.cos(rad) * size * 0.35;
        const sy = cy + Math.sin(rad) * size * 0.35;
        return (
          <g key={`stamen-${angle}`}>
            <line
              x1={cx + Math.cos(rad) * size * 0.15}
              y1={cy + Math.sin(rad) * size * 0.15}
              x2={sx}
              y2={sy}
              stroke="#E8C547"
              strokeWidth="0.6"
              opacity="0.7"
            />
            <circle cx={sx} cy={sy} r="1.6" fill="#F5D76E" opacity="0.85" />
          </g>
        );
      })}
      {/* Tooltip */}
      {isHovered && label && (
        <foreignObject
          x={cx - 60}
          y={cy - size - 30}
          width="120"
          height="28"
          style={{ overflow: "visible", pointerEvents: "none" }}
        >
          <div
            style={{
              background: "#fff",
              color: "#C2185B",
              fontSize: "10px",
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: "20px",
              textAlign: "center",
              boxShadow: "0 2px 10px rgba(194,24,91,0.15)",
              whiteSpace: "nowrap",
            }}
          >
            {label}
          </div>
        </foreignObject>
      )}
    </g>
  );
}

/** Render a half-open bud */
function renderBud(bud) {
  const { cx, cy, size } = bud;
  return (
    <g key={`bud-${cx}-${cy}`}>
      <ellipse cx={cx} cy={cy} rx={size * 0.6} ry={size} fill="#FFB7C5" opacity="0.75" transform={`rotate(-20 ${cx} ${cy})`} />
      <ellipse cx={cx + 1} cy={cy} rx={size * 0.4} ry={size * 0.8} fill="#FFC0CB" opacity="0.6" transform={`rotate(10 ${cx} ${cy})`} />
      <ellipse cx={cx - 1} cy={cy + 1} rx={size * 0.3} ry={size * 0.6} fill="#FFD6E0" opacity="0.5" transform={`rotate(-5 ${cx} ${cy})`} />
    </g>
  );
}

export default function SakuraBranch() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMinYMid slice"
      style={{ zIndex: 2 }}
      aria-hidden="true"
    >
      <defs>
        {/* Branch gradients */}
        <linearGradient id="branchMain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3D1C02" />
          <stop offset="30%" stopColor="#7B4A2D" />
          <stop offset="50%" stopColor="#8B5E3C" />
          <stop offset="70%" stopColor="#7B4A2D" />
          <stop offset="100%" stopColor="#3D1C02" />
        </linearGradient>
        <linearGradient id="branchSub" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4A2810" />
          <stop offset="40%" stopColor="#8B5E3C" />
          <stop offset="60%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#4A2810" />
        </linearGradient>
        <linearGradient id="branchTwig" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#5C3A1E" />
          <stop offset="50%" stopColor="#9B7653" />
          <stop offset="100%" stopColor="#5C3A1E" />
        </linearGradient>

        {/* Large flower petal gradients — 3D radial */}
        <radialGradient id="blossomA" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF0F5" />
          <stop offset="40%" stopColor="#FFB7C5" />
          <stop offset="100%" stopColor="#FF8FAB" />
        </radialGradient>
        <radialGradient id="blossomB" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FFF5F8" />
          <stop offset="40%" stopColor="#FFC0CB" />
          <stop offset="100%" stopColor="#FFAABB" />
        </radialGradient>

        {/* Flower center gradient */}
        <radialGradient id="flowerCenter" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFDE8" />
          <stop offset="60%" stopColor="#F5D76E" />
          <stop offset="100%" stopColor="#E8C547" />
        </radialGradient>
      </defs>

      {/* ── MAIN TRUNK ── */}
      <path
        d="M -60 420 C 40 400, 120 370, 200 340 C 280 310, 360 290, 440 270 C 520 250, 580 240, 650 235"
        fill="none" stroke="url(#branchMain)" strokeWidth="22" strokeLinecap="round"
      />
      <path
        d="M -60 420 C 20 405, 80 385, 160 360"
        fill="none" stroke="url(#branchMain)" strokeWidth="28" strokeLinecap="round" opacity="0.7"
      />

      {/* ── SUB-BRANCHES ── */}
      <path d="M 280 325 C 310 290, 340 250, 380 210 C 410 180, 440 160, 480 145" fill="none" stroke="url(#branchSub)" strokeWidth="12" strokeLinecap="round" />
      <path d="M 440 270 C 480 250, 520 230, 560 200 C 590 180, 620 165, 660 155" fill="none" stroke="url(#branchSub)" strokeWidth="10" strokeLinecap="round" />
      <path d="M 360 300 C 390 330, 420 360, 450 400 C 470 425, 490 445, 520 460" fill="none" stroke="url(#branchSub)" strokeWidth="11" strokeLinecap="round" />
      <path d="M 550 245 C 580 220, 610 195, 650 175" fill="none" stroke="url(#branchSub)" strokeWidth="8" strokeLinecap="round" />

      {/* ── TWIGS ── */}
      <path d="M 200 345 C 210 320, 225 300, 245 280" fill="none" stroke="url(#branchTwig)" strokeWidth="5" strokeLinecap="round" />
      <path d="M 320 305 C 330 280, 345 260, 365 245" fill="none" stroke="url(#branchTwig)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 480 145 C 500 130, 520 120, 545 115" fill="none" stroke="url(#branchTwig)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 520 460 C 540 470, 555 475, 575 478" fill="none" stroke="url(#branchTwig)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 650 155 C 670 145, 690 138, 710 135" fill="none" stroke="url(#branchTwig)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M 650 235 C 670 230, 695 228, 720 230" fill="none" stroke="url(#branchTwig)" strokeWidth="5" strokeLinecap="round" />
      <path d="M 150 370 C 155 350, 165 335, 180 320" fill="none" stroke="url(#branchTwig)" strokeWidth="4" strokeLinecap="round" />
      <path d="M 600 210 C 615 195, 630 185, 650 178" fill="none" stroke="url(#branchTwig)" strokeWidth="3" strokeLinecap="round" />

      {/* ── BUDS (half-open) ── */}
      {BUD_POSITIONS.map((bud) => renderBud(bud))}

      {/* ── LARGE FLOWERS ── */}
      {FLOWER_NODES.map((node) => renderLargeFlower(node, hoveredId, setHoveredId))}
    </svg>
  );
}
