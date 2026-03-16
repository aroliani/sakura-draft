import { useNavigate } from "react-router-dom";
import { Shield, FileText, CheckCircle, Smartphone, Archive, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import logoSakura from "@/assets/logo_sakura.png";
import sakuraBranch from "@/assets/sakura_branch.png";
import heroSchool from "@/assets/hero_school.jpg";
import SakuraPetals from "@/components/SakuraPetals";

const FEATURES = [
  { icon: FileText, title: "Arsip Digital", desc: "Simpan dan kelola dokumen akademik dalam format digital yang aman dan terstruktur." },
  { icon: CheckCircle, title: "Alur Persetujuan", desc: "Proses persetujuan dokumen yang transparan dengan audit trail dan notifikasi real-time." },
  { icon: Smartphone, title: "Scan Mobile", desc: "Scan dokumen langsung dari perangkat mobile menggunakan kamera." },
  { icon: Shield, title: "Keamanan RBAC", desc: "Sistem keamanan berbasis Role-Based Access Control untuk melindungi data sensitif." },
  { icon: Archive, title: "Pengarsipan Terstruktur", desc: "Struktur folder berdasarkan tahun, kelas, dan jenis dokumen." },
  { icon: Users, title: "Multi-Role", desc: "Dukungan akses untuk Operator/TU, Kepala Sekolah, dan Guru." },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-card/80 glass border-b border-border/60">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img src={logoSakura} alt="SAKURA" className="w-9 h-9 rounded-xl" />
            <span className="font-bold text-primary text-lg tracking-wider">SAKURA</span>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate("/login")} className="px-5 py-2 rounded-xl border border-input text-sm font-medium hover:bg-muted transition-all text-foreground">
              Masuk
            </button>
            <button onClick={() => navigate("/signup")} className="px-5 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-all shadow-soft">
              Daftar
            </button>
          </div>
        </div>
      </nav>

      {/* Hero with Sakura Petals */}
      <section className="relative overflow-hidden min-h-[85vh] flex items-center">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-sakura-maroon to-primary/80" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
        
        {/* Sakura petals animation */}
        <SakuraPetals count={20} />

        {/* Decorative circles */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-primary-foreground/5 rounded-full blur-xl" />
        <div className="absolute bottom-10 left-10 w-56 h-56 bg-accent/10 rounded-full blur-2xl" />

        <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <img src={logoSakura} alt="SAKURA" className="w-14 h-14 rounded-2xl ring-2 ring-primary-foreground/20" />
                <div>
                  <h2 className="text-primary-foreground font-bold text-2xl tracking-wider">SAKURA</h2>
                  <p className="text-primary-foreground/50 text-xs font-medium tracking-wide">Document Management System</p>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-[1.1] mb-4">
                Secure Archiving and Keeping of Unified Records for Administration
              </h1>

              <p className="text-lg text-primary-foreground/60 mb-4 leading-relaxed max-w-xl">
                Sistem manajemen arsip digital terintegrasi untuk pengelolaan dokumen akademik secara aman, terstruktur, dan efisien.
              </p>

              {/* School info */}
              <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-primary-foreground/8 border border-primary-foreground/10 w-fit">
                <img src={heroSchool} alt="SMP Negeri 4 Cikarang Barat" className="w-12 h-12 rounded-lg object-cover" />
                <div>
                  <p className="text-primary-foreground font-semibold text-sm">SMP Negeri 4 Cikarang Barat</p>
                  <p className="text-primary-foreground/50 text-xs">Kabupaten Bekasi, Jawa Barat</p>
                </div>
              </div>

              <div className="flex gap-3 flex-wrap">
                <button onClick={() => navigate("/login")} className="group px-7 py-3 rounded-xl bg-primary-foreground text-primary font-bold hover:shadow-elevated transition-all flex items-center gap-2">
                  Masuk ke Sistem
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button onClick={() => navigate("/signup")} className="px-7 py-3 rounded-xl border-2 border-primary-foreground/25 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all">
                  Daftar Akun
                </button>
              </div>
            </motion.div>

            {/* Right visual — Sakura branch */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex items-center justify-center relative"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-accent/10 rounded-full blur-3xl scale-110" />
                <img
                  src={sakuraBranch}
                  alt="Sakura"
                  className="relative w-full max-w-md object-contain drop-shadow-2xl"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp}>
            <h2 className="text-3xl font-bold text-foreground mb-4">Tentang SMP Negeri 4 Cikarang Barat</h2>
            <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
              SMP Negeri 4 Cikarang Barat berkomitmen pada digitalisasi administrasi sekolah. SAKURA hadir sebagai solusi modern untuk manajemen dokumen akademik yang selama ini dilakukan secara manual — mendukung transparansi, efisiensi, dan keamanan pengelolaan arsip.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={fadeUp} className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">Fitur Unggulan</h2>
            <p className="text-muted-foreground">Solusi lengkap untuk pengelolaan arsip sekolah</p>
          </motion.div>
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={stagger} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <SakuraPetals count={10} />
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Siap Memulai?</h2>
          <p className="text-primary-foreground/60 mb-8">Masuk ke sistem SAKURA untuk mengelola arsip dokumen sekolah Anda.</p>
          <button onClick={() => navigate("/login")} className="group px-8 py-3 rounded-xl bg-primary-foreground text-primary font-bold hover:shadow-elevated transition-all inline-flex items-center gap-2">
            Masuk Sekarang
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </section>

      {/* No footer on Home per requirement */}
    </div>
  );
}
