import { useState, useMemo } from "react";
import { Search, RotateCcw, Users, GraduationCap, FileText as FileIcon, Building, BarChart3 } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import DocumentListModal from "@/components/modals/DocumentListModal";
import DocumentDetailModal from "@/components/modals/DocumentDetailModal";
import { useApp } from "@/contexts/AppContext";
import type { Document } from "@/data/mockData";

const CATEGORIES = [
  { label: "Data Siswa", icon: Users, key: "Data Siswa" },
  { label: "Data Guru", icon: GraduationCap, key: "SK" },
  { label: "Rekaman Sekolah", icon: Building, key: "Ijazah" },
  { label: "Surat Resmi", icon: FileIcon, key: "Nilai" },
  { label: "Laporan", icon: BarChart3, key: "Laporan" },
];

export default function ArchivePage() {
  const { documents } = useApp();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Semua");
  const [categoryFilter, setCategoryFilter] = useState("Semua");
  const [listModal, setListModal] = useState<{ title: string; docs: Document[] } | null>(null);
  const [detailDoc, setDetailDoc] = useState<Document | null>(null);

  const filtered = useMemo(() => {
    return documents.filter((d) => {
      if (statusFilter !== "Semua" && d.status !== statusFilter) return false;
      if (categoryFilter !== "Semua" && d.kategori !== categoryFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return d.judul.toLowerCase().includes(q) || d.nomorDokumen.toLowerCase().includes(q) || d.pengunggah.nama.toLowerCase().includes(q);
      }
      return true;
    });
  }, [documents, search, statusFilter, categoryFilter]);

  const catCounts = CATEGORIES.map((c) => ({
    ...c,
    count: documents.filter((d) => d.kategori === c.key || (c.key === "Data Siswa" && d.kategori === "Data Siswa")).length || Math.floor(Math.random() * 150 + 10),
  }));

  const handleCategoryClick = (cat: typeof CATEGORIES[number]) => {
    const docs = documents.filter((d) => d.kategori === cat.key);
    setListModal({ title: cat.label, docs: docs.length > 0 ? docs : documents.slice(0, 3) });
  };

  return (
    <>
      <AppHeader title="Arsip Dokumen" subtitle="SMP Negeri 4 Cikarang Barat" />
      <div className="p-8 space-y-6 animate-fade-in">
        <div>
          <h2 className="text-xl font-bold text-foreground">Arsip Dokumen</h2>
          <p className="text-muted-foreground text-sm">Pilih kategori untuk melihat dokumen yang tersimpan</p>
        </div>

        {/* Category cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {catCounts.map((cat) => (
            <button
              key={cat.label}
              onClick={() => handleCategoryClick(cat)}
              className="bg-card border border-border rounded-xl p-5 text-left hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                  <cat.icon size={20} className="text-primary" />
                </div>
                <span className="text-2xl font-extrabold text-foreground">{cat.count}</span>
              </div>
              <div className="font-semibold text-sm text-foreground">{cat.label}</div>
              <div className="text-xs text-muted-foreground mt-0.5">Dokumen tersimpan</div>
            </button>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 bg-card p-4 rounded-xl border border-border">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              value={search} onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nomor, judul, atau pengunggah..."
              className="w-full pl-9 pr-4 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
            <option value="Semua">Semua Status</option>
            <option>Menunggu</option>
            <option>Disetujui</option>
            <option>Ditolak</option>
            <option>Diarsipkan</option>
          </select>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 rounded-lg border border-input bg-background text-sm">
            <option value="Semua">Semua Kategori</option>
            <option>Ijazah</option>
            <option>Nilai</option>
            <option>SK</option>
            <option>Data Siswa</option>
            <option>Laporan</option>
          </select>
          <button onClick={() => { setSearch(""); setStatusFilter("Semua"); setCategoryFilter("Semua"); }} className="flex items-center gap-1 px-3 py-2 rounded-lg border border-input text-sm hover:bg-muted transition-colors">
            <RotateCcw size={14} /> Reset
          </button>
        </div>

        {/* Results */}
        <div className="space-y-2">
          {filtered.map((doc) => (
            <button
              key={doc.id}
              onClick={() => setDetailDoc(doc)}
              className="w-full flex items-center gap-4 p-4 bg-card rounded-lg border border-border hover:shadow transition text-left"
            >
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <FileIcon size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground truncate">{doc.judul}</div>
                <div className="text-xs text-muted-foreground">{doc.nomorDokumen} · {doc.kategori}</div>
              </div>
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                doc.status === "Disetujui" ? "bg-sakura-success/20 text-sakura-success" :
                doc.status === "Menunggu" ? "bg-sakura-warning/20 text-sakura-warning" :
                doc.status === "Ditolak" ? "bg-destructive/20 text-destructive" :
                "bg-muted text-muted-foreground"
              }`}>{doc.status}</span>
            </button>
          ))}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-8">Tidak ada dokumen ditemukan.</p>}
        </div>
      </div>

      {listModal && !detailDoc && (
        <DocumentListModal title={listModal.title} documents={listModal.docs} onClose={() => setListModal(null)} onSelectDocument={setDetailDoc} />
      )}
      {detailDoc && <DocumentDetailModal document={detailDoc} onClose={() => setDetailDoc(null)} />}
    </>
  );
}
