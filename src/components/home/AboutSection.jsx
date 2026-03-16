import { motion } from "framer-motion";

function MiniTree() {
  return (
    <div className="relative w-48 h-56 md:w-56 md:h-64">
      <svg viewBox="0 0 200 260" className="w-full h-full" style={{ animation: "sway 4s ease-in-out infinite" }}>
        {/* trunk */}
        <path d="M100 260 C100 220, 95 180, 90 150 C85 120, 80 100, 85 80" stroke="#7B4A2D" strokeWidth="8" fill="none" strokeLinecap="round" />
        {/* branches */}
        <path d="M90 150 C70 130, 50 110, 40 90" stroke="#8B5E3C" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M87 120 C110 100, 130 85, 150 75" stroke="#8B5E3C" strokeWidth="5" fill="none" strokeLinecap="round" />
        <path d="M85 80 C60 60, 45 45, 35 35" stroke="#9B7653" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        <path d="M85 80 C100 55, 120 40, 140 30" stroke="#9B7653" strokeWidth="3.5" fill="none" strokeLinecap="round" />
        {/* flowers */}
        {[
          { cx: 40, cy: 88 }, { cx: 35, cy: 33 }, { cx: 140, cy: 28 },
          { cx: 150, cy: 73 }, { cx: 85, cy: 78 }, { cx: 60, cy: 60 },
          { cx: 120, cy: 50 },
        ].map((f, i) => (
          <g key={i}>
            {[0, 72, 144, 216, 288].map((a) => (
              <circle
                key={a}
                cx={f.cx + Math.cos((a * Math.PI) / 180) * 8}
                cy={f.cy + Math.sin((a * Math.PI) / 180) * 8}
                r="5"
                fill="#FFB7C5"
                opacity="0.8"
              />
            ))}
            <circle cx={f.cx} cy={f.cy} r="3" fill="#FFD700" opacity="0.9" />
          </g>
        ))}
      </svg>
      {/* Soft glow behind tree */}
      <div
        className="absolute inset-0 -z-10 rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(255,182,193,0.3) 0%, transparent 70%)",
          transform: "scale(1.3)",
        }}
      />
    </div>
  );
}

export default function AboutSection() {
  return (
    <motion.div
      id="section-about"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
    >
      <div
        className="flex-1 p-10 md:p-12 transition-all duration-300 hover:-translate-y-1"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,240,245,0.8))",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255,182,193,0.4)",
          borderRadius: "28px",
          boxShadow: "0 20px 60px rgba(194,58,87,0.08), inset 0 1px 0 rgba(255,255,255,0.8)",
        }}
      >
        <SakuraIcon />
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Tentang SAKURA</h3>
        <p className="text-muted-foreground leading-relaxed">
          SAKURA (Secure Archiving and Keeping of Unified Records for Administration) adalah sistem
          arsip digital yang dirancang untuk membantu sekolah mengelola dokumen akademik dan
          administrasi secara aman, terstruktur, dan efisien.
        </p>
      </div>
      <div className="flex-1 flex justify-center">
        <MiniTree />
      </div>
    </motion.div>
  );
}

function SakuraIcon() {
  return (
    <div
      className="w-14 h-14 flex items-center justify-center mb-5"
      style={{ background: "rgba(232, 96, 122, 0.1)", borderRadius: "12px" }}
    >
      <svg viewBox="0 0 100 100" width={36} height={36}>
        <defs>
          <radialGradient id="aboutIconPG" cx="50%" cy="60%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFB7C5" />
            <stop offset="100%" stopColor="#E8607A" />
          </radialGradient>
        </defs>
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={a} transform={`rotate(${a}, 50, 50)`}>
            <path d="M50,50 C38,38 30,20 50,10 C70,20 62,38 50,50Z" fill="url(#aboutIconPG)" opacity="0.9" />
          </g>
        ))}
        <circle cx="50" cy="50" r="7" fill="#FFD700" opacity="0.9" />
      </svg>
    </div>
  );
}
