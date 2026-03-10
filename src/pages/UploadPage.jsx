import AppHeader from "@/components/layout/AppHeader";
import UploadForm from "@/components/upload/UploadForm";

export default function UploadPage() {
  return (
    <>
      <AppHeader title="Upload Dokumen" subtitle="Unggah dokumen untuk diproses dan diarsipkan" />
      <div className="p-8 animate-fade-in"><UploadForm /></div>
    </>
  );
}
