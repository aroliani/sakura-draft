import { useMemo } from "react";

const PETAL_COLORS = [
  "hsl(330 60% 80%)",
  "hsl(340 55% 75%)",
  "hsl(320 50% 82%)",
  "hsl(345 60% 85%)",
  "hsl(335 45% 78%)",
];

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

export default function SakuraPetals({ count = 18 }) {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${randomBetween(0, 100)}%`,
      size: randomBetween(8, 18),
      duration: `${randomBetween(7, 14)}s`,
      delay: `${randomBetween(0, 10)}s`,
      sway: `${randomBetween(-100, 100)}px`,
      rotation: `${randomBetween(180, 720)}deg`,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
      opacity: randomBetween(0.3, 0.7),
      alt: i % 3 === 0,
    }));
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={p.alt ? "sakura-petal-alt" : "sakura-petal"}
          style={{
            position: "absolute",
            left: p.left,
            top: "-20px",
            width: `${p.size}px`,
            height: `${p.size * 0.7}px`,
            borderRadius: "50% 0 50% 0",
            background: p.color,
            opacity: p.opacity,
            "--duration": p.duration,
            "--delay": p.delay,
            "--sway": p.sway,
            "--rotation": p.rotation,
          }}
        />
      ))}
    </div>
  );
}
