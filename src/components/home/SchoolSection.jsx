import { motion } from "framer-motion";
import { MapPin, Award, Users, Calendar } from "lucide-react";

const photos = [
  { label: "Gedung Sekolah", color: "from-rose-200 to-pink-300", span: "md:col-span-2 md:row-span-2" },
  { label: "Ruang Kelas", color: "from-pink-200 to-rose-300", span: "" },
  { label: "Laboratorium", color: "from-fuchsia-200 to-pink-300", span: "" },
  { label: "Perpustakaan", color: "from-rose-100 to-pink-200", span: "" },
  { label: "Lapangan", color: "from-pink-100 to-rose-200", span: "md:col-span-2" },
];

const infos = [
  { icon: MapPin, text: "Kp. Kali Jeruk, Cikarang Barat, Kab. Bekasi" },
  { icon: Calendar, text: "NPSN: 20218452" },
  { icon: Users, text: "600+ Siswa Aktif" },
  { icon: Award, text: "Akreditasi A" },
];

export default function SchoolSection() {
  return (
    <motion.div
      id="section-school"
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      className="space-y-10"
    >
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">SMP Negeri 4 Cikarang Barat</h3>
        <p className="text-muted-foreground">Selamat datang di sekolah kami</p>
      </div>

      {/* Info strip */}
      <div className="flex flex-wrap justify-center gap-6">
        {infos.map((info) => (
          <div key={info.text} className="flex items-center gap-2 text-sm text-muted-foreground">
            <info.icon size={16} style={{ color: "#C23A57" }} />
            <span>{info.text}</span>
          </div>
        ))}
      </div>

      {/* Bento grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[140px] md:auto-rows-[160px]">
        {photos.map((photo, i) => (
          <motion.div
            key={photo.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            className={`group relative rounded-2xl overflow-hidden cursor-default ${photo.span}`}
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${photo.color} transition-transform duration-500 group-hover:scale-105`}
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground/60 italic">Tambahkan foto di sini</span>
            </div>
            <div
              className="absolute bottom-0 left-0 right-0 p-3"
              style={{ background: "linear-gradient(transparent, rgba(0,0,0,0.3))" }}
            >
              <span className="text-white text-xs font-medium">{photo.label}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
