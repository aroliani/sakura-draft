import { X, Eye, Download, Clock, FileText } from "lucide-react";
import type { Document } from "@/data/mockData";
import { format } from "date-fns";
import { useState } from "react";
import PdfPreviewOverlay from "./PdfPreviewOverlay";
import { useApp } from "@/contexts/AppContext";

interface Props {
  document: Document;
  onClose: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  Menunggu: "bg-sakura-warning/20 text-sakura-warning",
  Disetujui: "bg-sakura-success/20 text-sakura-success",
  Ditolak: "bg-destructive/20 text-destructive",
  Diarsipkan: "bg-muted text-muted-foreground",
};

export default function DocumentDetailModal({ document: doc, onClose }: Props) {
  const [showPdf, setShowPdf] = useState(false);
  const [noteText, setNoteText] = useState("");
  const { addAuditNote, currentUser } = useApp();

  const handleAddNote = () => {
    if (!noteText.trim()) return;
    addAuditNote(doc.id, noteText.trim());
    setNoteText("");
  };

  const isAdmin = currentUser.role === "Administrator IT";

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
        <div className="bg-card rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col animate-fade-in" onClick={(e) => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-foreground">{doc.judul}</h2>
                <p className="text-sm text-muted-foreground">{doc.kategori} · {doc.kelas}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-medium px-3 py-1 rounded-full ${STATUS_COLORS[doc.status]}`}>{doc.status}</span>
              <button onClick={onClose} className="p-1 rounded-lg hover:bg-muted"><X size={20} /></button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin">
            {/* Metadata */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ["Nomor Dokumen", doc.nomorDokumen],
                ["Kategori", doc.kategori],
                ["Kelas / Unit", doc.kelas],
                ["Pengunggah", doc.pengunggah.nama],
                ["Tanggal Upload", format(new Date(doc.tanggalUpload), "yyyy-MM-dd HH:mm")],
                ["Tanggal Edit Terakhir", format(new Date(doc.tanggalEdit), "yyyy-MM-dd HH:mm")],
                ["Versi", `v${doc.versi}`],
                ["Status", doc.status],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="text-muted-foreground text-xs">{label}</div>
                  <div className="font-medium text-foreground">{val}</div>
                </div>
              ))}
            </div>

            {doc.catatan && (
              <div className="px-3 py-2 rounded-lg bg-sakura-warning/10 border border-sakura-warning/30 text-sm text-sakura-warning font-medium">
                ⚠ {doc.catatan}
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <button onClick={() => setShowPdf(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
                <Eye size={16} /> Preview
              </button>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors">
                <Download size={16} /> Download
              </button>
            </div>

            {/* Audit Trail */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock size={18} className="text-primary" />
                <h3 className="font-bold text-foreground">Audit Trail</h3>
                <span className="text-xs text-muted-foreground">(Read-only)</span>
              </div>
              <div className="space-y-4">
                {doc.auditTrail.map((entry, i) => (
                  <div key={i} className="flex gap-3 animate-slide-in" style={{ animationDelay: `${i * 50}ms` }}>
                    <img src={entry.user.avatar} alt="" className="w-9 h-9 rounded-full object-cover shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-sm text-foreground">{entry.user.nama}</span>
                        <span className="text-xs text-muted-foreground">— {entry.user.role}</span>
                        <span className="text-xs text-muted-foreground ml-auto">{format(new Date(entry.time), "yyyy-MM-dd HH:mm")}</span>
                      </div>
                      <div className={`text-sm mt-0.5 ${entry.action.startsWith("Catatan Admin") ? "text-accent font-medium italic" : "text-foreground"}`}>
                        {entry.action}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {isAdmin && (
                <div className="mt-4 flex gap-2">
                  <input
                    value={noteText}
                    onChange={(e) => setNoteText(e.target.value)}
                    placeholder="Tambah catatan admin..."
                    className="flex-1 px-3 py-2 text-sm rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <button onClick={handleAddNote} className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90">
                    Tambah
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showPdf && <PdfPreviewOverlay onClose={() => setShowPdf(false)} fileName={doc.judul} />}
    </>
  );
}
