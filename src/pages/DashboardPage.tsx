import { useState } from "react";
import { FileText, Clock, CheckCircle, Archive, XCircle } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActivityChart from "@/components/dashboard/ActivityChart";
import DocumentListModal from "@/components/modals/DocumentListModal";
import DocumentDetailModal from "@/components/modals/DocumentDetailModal";
import { useApp } from "@/contexts/AppContext";
import type { Document } from "@/data/mockData";

export default function DashboardPage() {
  const { documents } = useApp();
  const [listModal, setListModal] = useState<{ title: string; docs: Document[] } | null>(null);
  const [detailDoc, setDetailDoc] = useState<Document | null>(null);

  const counts = {
    total: documents.length,
    menunggu: documents.filter((d) => d.status === "Menunggu").length,
    disetujui: documents.filter((d) => d.status === "Disetujui").length,
    ditolak: documents.filter((d) => d.status === "Ditolak").length,
    diarsipkan: documents.filter((d) => d.status === "Diarsipkan").length,
  };

  const openFilteredList = (title: string, status?: string) => {
    const docs = status ? documents.filter((d) => d.status === status) : documents;
    setListModal({ title, docs });
  };

  const handleChartClick = (date: string) => {
    // For prototype, show all docs
    setListModal({ title: `Dokumen tanggal ${date}`, docs: documents.slice(0, 3) });
  };

  return (
    <>
      <AppHeader title="Dashboard" subtitle="SMP Negeri 4 Cikarang Barat" />
      <div className="p-8 space-y-6 animate-fade-in">
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <DashboardCard title="Total Dokumen" value={counts.total} icon={FileText} onClick={() => openFilteredList("Semua Dokumen")} />
          <DashboardCard title="Menunggu" value={counts.menunggu} icon={Clock} variant="warning" onClick={() => openFilteredList("Dokumen Menunggu", "Menunggu")} />
          <DashboardCard title="Disetujui" value={counts.disetujui} icon={CheckCircle} variant="success" onClick={() => openFilteredList("Dokumen Disetujui", "Disetujui")} />
          <DashboardCard title="Ditolak" value={counts.ditolak} icon={XCircle} variant="default" onClick={() => openFilteredList("Dokumen Ditolak", "Ditolak")} />
          <DashboardCard title="Diarsipkan" value={counts.diarsipkan} icon={Archive} variant="muted" onClick={() => openFilteredList("Dokumen Diarsipkan", "Diarsipkan")} />
        </div>
        <ActivityChart onDateClick={handleChartClick} />
      </div>

      {listModal && !detailDoc && (
        <DocumentListModal
          title={listModal.title}
          documents={listModal.docs}
          onClose={() => setListModal(null)}
          onSelectDocument={(doc) => setDetailDoc(doc)}
        />
      )}
      {detailDoc && (
        <DocumentDetailModal
          document={detailDoc}
          onClose={() => { setDetailDoc(null); }}
        />
      )}
    </>
  );
}
