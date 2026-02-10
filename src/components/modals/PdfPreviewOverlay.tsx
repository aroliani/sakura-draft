import { X, Download, Printer, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  onClose: () => void;
  fileName: string;
}

export default function PdfPreviewOverlay({ onClose, fileName }: Props) {
  const [zoom, setZoom] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200);
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => { clearTimeout(t); window.removeEventListener("keydown", handler); };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] bg-foreground/90 flex flex-col animate-fade-in">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-card border-b border-border">
        <span className="font-semibold text-sm text-foreground truncate max-w-md">{fileName}</span>
        <div className="flex items-center gap-2">
          <button onClick={() => setZoom((z) => Math.max(50, z - 25))} className="p-2 rounded hover:bg-muted"><ZoomOut size={18} /></button>
          <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(200, z + 25))} className="p-2 rounded hover:bg-muted"><ZoomIn size={18} /></button>
          <button onClick={() => setZoom(100)} className="p-2 rounded hover:bg-muted"><Maximize size={18} /></button>
          <div className="w-px h-6 bg-border mx-1" />
          <button className="p-2 rounded hover:bg-muted"><Download size={18} /></button>
          <button className="p-2 rounded hover:bg-muted"><Printer size={18} /></button>
          <div className="w-px h-6 bg-border mx-1" />
          <button onClick={onClose} className="p-2 rounded hover:bg-destructive/10 text-destructive"><X size={20} /></button>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-auto flex items-center justify-center p-8">
        {loading ? (
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-primary-foreground/70 text-sm">Memuat dokumen...</span>
          </div>
        ) : (
          <div
            className="bg-card rounded-lg shadow-2xl p-12 max-w-3xl w-full transition-transform"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: "top center" }}
          >
            <div className="text-center space-y-4 text-foreground">
              <h2 className="text-2xl font-bold">{fileName}</h2>
              <div className="w-24 h-0.5 bg-primary mx-auto" />
              <p className="text-muted-foreground">Preview dokumen PDF ditampilkan di sini.</p>
              <p className="text-muted-foreground text-sm">Ini adalah simulasi preview untuk prototype. Dalam implementasi produksi, file PDF asli akan dirender menggunakan react-pdf atau iframe.</p>
              <div className="mt-8 p-6 border border-border rounded-lg bg-muted/30 text-left space-y-2">
                <p className="text-sm"><strong>Nomor:</strong> IJZ-2024-001</p>
                <p className="text-sm"><strong>Jenis:</strong> Ijazah Kelulusan</p>
                <p className="text-sm"><strong>Nama:</strong> Ahmad Rizki Pratama</p>
                <p className="text-sm"><strong>NISN:</strong> 0012345678</p>
                <p className="text-sm"><strong>Tahun Lulus:</strong> 2024</p>
                <p className="text-sm"><strong>Sekolah:</strong> SMP Negeri 4 Cikarang Barat</p>
              </div>
              <p className="text-xs text-muted-foreground mt-4">Tekan ESC atau tombol ✕ untuk menutup preview</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
