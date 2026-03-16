import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Shield, FileText, School, Workflow, Sparkles } from "lucide-react";
import logoSakura from "@/assets/logo_sakura.png";
import SakuraPetals from "@/components/SakuraPetals";
import sakuraBranch from "@/assets/sakura_branch.png";

/* ── section data ── */
const SECTIONS = [
  {
    id: "about",
    label: "Apa itu SAKURA?",
    icon: Sparkles,
    title: "Tentang SAKURA",
    body: "SAKURA (Secure Archiving and Keeping of Unified Records for Administration) adalah sistem arsip digital yang dirancang untuk membantu sekolah mengelola dokumen akademik dan administrasi secara aman, terstruktur, dan efisien.",
    color: "from-primary/10 to-accent/5",
  },
  {
    id: "why",
    label: "Arsip Digital",
    icon: FileText,
    title: "Pentingnya Arsip Digital",
    body: "Digitalisasi arsip mengurangi risiko kehilangan dokumen fisik, mempercepat pencarian data, dan memungkinkan akses terpusat dari mana saja. Arsip digital juga mendukung transparansi dan akuntabilitas administrasi sekolah.",
    color: "from-sakura-success/10 to-sakura-success/5",
  },
  {
    id: "workflow",
    label: "Alur Persetujuan",
    icon: Workflow,
    title: "Alur Persetujuan Dokumen",
    body: "Dokumen diunggah oleh Operator/TU → menunggu persetujuan Kepala Sekolah → disetujui atau ditolak → jika disetujui, Operator/TU dapat memindahkan ke arsip → QR verifikasi otomatis dibuat setelah diarsipkan.",
    color: "from-sakura-warning/10 to-sakura-warning/5",
  },
  {
    id: "security",
    label: "Keamanan & QR",
    icon: Shield,
    title: "Keamanan & Verifikasi QR",
    body: "SAKURA menggunakan Role-Based Access Control (RBAC) untuk membatasi akses. Setiap dokumen yang diarsipkan dilengkapi QR Code berisi link verifikasi yang ditandatangani secara kriptografis (HMAC-SHA256) untuk mencegah pemalsuan.",
    color: "from-primary/10 to-sakura-violet/5",
  },
  {
    id: "school",
    label: "SMP Negeri 4",
    icon: School,
    title: "SMP Negeri 4 Cikarang Barat",
    body: "Berlokasi di Kp. Kali Jeruk, Desa Kalijaya, Kec. Cikarang Barat, Kab. Bekasi, Jawa Barat. NPSN: 20218452. Sekolah negeri jenjang SMP yang berkomitmen pada digitalisasi administrasi demi transparansi dan efisiensi.",
    color: "from-sakura-pink/10 to-sakura-maroon/5",
  },
];

/* ── blossom node positions on the branch ── */
const NODE_POSITIONS = [
  { x: 50, y: 28 },
  { x: 24, y: 44 },
  { x: 74, y: 40 },
  { x: 36, y: 68 },
  { x: 62, y: 72 },
];

/* ── SVG branch paths ── */
function BranchSVG() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      style={{ zIndex: 1 }}
    >
      <motion.path
        d="M50 95 C50 75, 48 60, 50 50 C52 40, 45 30, 50 18"
        fill="none" stroke="hsl(20 30% 55%)" strokeWidth="0.8" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
      <motion.path
        d="M49 52 C40 48, 30 46, 24 44"
        fill="none" stroke="hsl(20 30% 60%)" strokeWidth="0.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 0.8 }}
      />
      <motion.path
        d="M51 48 C58 44, 66 42, 74 40"
        fill="none" stroke="hsl(20 30% 60%)" strokeWidth="0.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 1 }}
      />
      <motion.path
        d="M48 58 C44 62, 40 66, 36 68"
        fill="none" stroke="hsl(20 30% 62%)" strokeWidth="0.4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.3 }}
      />
      <motion.path
        d="M52 58 C56 62, 58 66, 62 72"
        fill="none" stroke="hsl(20 30% 62%)" strokeWidth="0.4" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
      />
      <motion.path
        d="M50 28 C50 24, 50 22, 50 18"
        fill="none" stroke="hsl(20 30% 58%)" strokeWidth="0.5" strokeLinecap="round"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      />
    </svg>
  );
}

/* ── single blossom node ── */
function BlossomNode({ node, index, onClick }) {
  const pos = NODE_POSITIONS[index];
  return (
    <motion.button
      onClick={onClick}
      className="absolute z-10 blossom-3d group flex flex-col items-center gap-1"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.5 + index * 0.15 }}
      whileHover={{ scale: 1.18 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="absolute -inset-3 rounded-full transition-all duration-500 bg-transparent group-hover:bg-[hsl(340_80%_70%/0.15)]" />
      <span className="blossom-circle relative w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-lg shadow-md transition-all duration-500 border bg-[hsl(340_60%_88%)] border-[hsl(340_50%_82%)] group-hover:bg-[hsl(340_65%_78%)] group-hover:shadow-[0_0_18px_hsl(340_80%_70%/0.35)]"
        style={{ transformStyle: "preserve-3d" }}
      >
        🌸
      </span>
      <span className="text-[10px] md:text-xs font-medium whitespace-nowrap px-2 py-0.5 rounded-full transition-colors duration-300 text-[hsl(350_20%_40%)] group-hover:text-primary">
        {node.label}
      </span>
    </motion.button>
  );
}

/* ── section card ── */
function SectionCard({ section, index }) {
  const Icon = section.icon;
  const isEven = index % 2 === 0;
  return (
    <motion.div
      id={`section-${section.id}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}
    >
      <div className={`flex-1 p-8 rounded-3xl bg-gradient-to-br ${section.color} border border-border/50`}>
        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
          <Icon size={24} className="text-primary" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3">{section.title}</h3>
        <p className="text-muted-foreground leading-relaxed">{section.body}</p>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary/5 to-accent/10 flex items-center justify-center">
          <Icon size={64} className="text-primary/30" />
        </div>
      </div>
    </motion.div>
  );
}

/* ── main page ── */
export default function HomePage() {
  const navigate = useNavigate();
  const sectionsRef = useRef(null);

  const scrollToSection = (id) => {
    const el = document.getElementById(`section-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden" style={{ background: "linear-gradient(160deg, #FFF7FA 0%, #FFEFF5 40%, #FFF0F5 100%)" }}>
      <SakuraPetals count={22} />

      {/* nav */}
      <nav className="relative z-40 flex items-center justify-between px-6 md:px-10 py-4">
        <div className="flex items-center gap-2.5">
          <img src={logoSakura} alt="SAKURA" className="w-8 h-8 rounded-lg" />
          <span className="font-semibold text-foreground tracking-wider text-sm">SAKURA</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate("/login")} className="px-4 py-2 rounded-xl text-sm font-medium text-foreground hover:bg-primary/5 transition-colors">
            Masuk
          </button>
          <button onClick={() => navigate("/signup")} className="px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors shadow-sm">
            Daftar
          </button>
        </div>
      </nav>

      {/* Hero — interactive branch */}
      <div className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
        <div className="absolute top-[15%] left-[10%] w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[20%] right-[8%] w-48 h-48 bg-accent/8 rounded-full blur-3xl" />

        <div className="absolute inset-0 mx-auto" style={{ maxWidth: "800px" }}>
          <BranchSVG />
          {SECTIONS.map((section, i) => (
            <BlossomNode
              key={section.id}
              node={section}
              index={i}
              onClick={() => scrollToSection(section.id)}
            />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5, duration: 0.6 }}
        >
          <p className="text-xs text-muted-foreground tracking-wide font-light">
            SMP Negeri 4 Cikarang Barat · Kab. Bekasi
          </p>
          <button
            onClick={() => navigate("/login")}
            className="group flex items-center gap-2 px-6 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
          >
            Masuk ke Sistem
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        {/* hint */}
        <motion.p
          className="absolute top-6 left-1/2 -translate-x-1/2 z-20 text-[11px] text-muted-foreground tracking-wide font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
        >
          Klik bunga 🌸 untuk menjelajahi SAKURA
        </motion.p>
      </div>

      {/* ── Scroll sections ── */}
      <div ref={sectionsRef} className="relative z-10 max-w-4xl mx-auto px-6 pb-24 space-y-20">
        {SECTIONS.map((section, i) => (
          <SectionCard key={section.id} section={section} index={i} />
        ))}
      </div>
    </div>
  );
}
