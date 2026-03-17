import { useEffect, useRef, useState } from "react";

const SPAWN_POINTS = [
  { x: 11, y: 36 }, { x: 15, y: 30 }, { x: 20, y: 25 },
  { x: 26, y: 21 }, { x: 32, y: 17 }, { x: 38, y: 14 },
  { x: 44, y: 12 }, { x: 50, y: 14 }, { x: 56, y: 17 },
  { x: 61, y: 21 }, { x: 35, y: 42 }, { x: 41, y: 49 },
  { x: 47, y: 55 },
];

const COLORS = [
  "#FFB7C5", "#FF9EB5", "#FFC8D5",
  "#FFD0DC", "#FFAABF", "#FFC0CB",
];

let petalIdCounter = 0;

function makePetal() {
  const sp = SPAWN_POINTS[Math.floor(Math.random() * SPAWN_POINTS.length)];
  return {
    id: ++petalIdCounter,
    x: sp.x + (Math.random() - 0.5) * 4,
    y: sp.y + (Math.random() - 0.5) * 3,
    size: 9 + Math.random() * 13,
    dur: 7 + Math.random() * 8,
    sway: (Math.random() - 0.5) * 160,
    rot: 400 + Math.random() * 700,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    op: 0.5 + Math.random() * 0.45,
  };
}

function PetalSVG({ color, size }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 18 24" fill="none">
      <path
        d="M 9 0 C 15 0 18 6 18 12 C 18 18 14 24 9 24 C 4 24 0 18 0 12 C 0 6 3 0 9 0 Z"
        fill={color}
        opacity="0.9"
      />
      <path
        d="M 9 3 C 9 8, 9 16, 9 22"
        stroke="#fff"
        strokeWidth="0.5"
        opacity="0.3"
        fill="none"
      />
    </svg>
  );
}

export default function FallingPetals() {
  const [petals, setPetals] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    // Spawn 30 petals immediately on mount
    const initial = [];
    for (let i = 0; i < 30; i++) initial.push(makePetal());
    setPetals(initial);

    // Remove each initial petal after it finishes
    initial.forEach((p) => {
      setTimeout(() => {
        setPetals((prev) => prev.filter((x) => x.id !== p.id));
      }, (p.dur + 1) * 1000);
    });

    // Continuously spawn new petals every 350ms
    intervalRef.current = setInterval(() => {
      const p = makePetal();
      setPetals((prev) => {
        const updated = [...prev, p];
        return updated.length > 150 ? updated.slice(-150) : updated;
      });
      setTimeout(() => {
        setPetals((prev) => prev.filter((x) => x.id !== p.id));
      }, (p.dur + 1) * 1000);
    }, 350);

    // Listen for burst events from flower clicks
    const handleBurst = (e) => {
      const { x, y } = e.detail;
      const burst = [];
      for (let i = 0; i < 18; i++) {
        const p = {
          id: ++petalIdCounter,
          x: x + (Math.random() - 0.5) * 5,
          y: y + (Math.random() - 0.5) * 4,
          size: 10 + Math.random() * 12,
          dur: 5 + Math.random() * 6,
          sway: (Math.random() - 0.5) * 180,
          rot: 500 + Math.random() * 800,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          op: 0.7 + Math.random() * 0.3,
        };
        burst.push(p);
        setTimeout(() => {
          setPetals((prev) => prev.filter((x) => x.id !== p.id));
        }, (p.dur + 1) * 1000);
      }
      setPetals((prev) => [...prev, ...burst]);
    };

    window.addEventListener("sakuraBurst", handleBurst);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("sakuraBurst", handleBurst);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
        overflow: "visible",
      }}
      aria-hidden="true"
    >
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: `${p.x}vw`,
            top: `${p.y}vh`,
            opacity: p.op,
            animation: `sakuraPetalFall ${p.dur}s ease-in forwards`,
            "--sway": `${p.sway}px`,
            "--rot": `${p.rot}deg`,
            pointerEvents: "none",
          }}
        >
          <PetalSVG color={p.color} size={p.size} />
        </div>
      ))}
    </div>
  );
}
