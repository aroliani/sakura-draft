
# Rencana Perubahan: Jejak Aktivitas, Komentar Approve, dan Preview Dokumen

## Ringkasan

Tiga perubahan utama yang akan dilakukan:

1. **Rename "Audit Trail" menjadi "Jejak Aktivitas"** di seluruh komponen
2. **Tambah form komentar saat Kepala Sekolah menyetujui dokumen** (mirip form reject yang sudah ada)
3. **Perbaiki PDF Preview** agar menampilkan dummy dokumen yang lebih realistis menggunakan iframe dengan konten HTML (bukan teks placeholder saja)

---

## Detail Perubahan

### 1. Rename "Audit Trail" menjadi "Jejak Aktivitas"

File yang diubah:
- `src/components/modals/DocumentDetailModal.tsx` -- heading "Audit Trail" dan label "(Read-only)" diganti menjadi "Jejak Aktivitas"
- `src/pages/LogPage.tsx` -- heading "Audit Trail Global" diganti menjadi "Jejak Aktivitas Global"
- `src/data/mockData.ts` -- label permission `audit.addNote` diganti dari "Tambah Catatan Audit" menjadi "Tambah Catatan Jejak Aktivitas"; label `audit.view` dari "Log Sistem" tetap (karena itu memang nama menu)

### 2. Tambah Komentar saat Approve (Kepala Sekolah)

Saat ini tombol "Setujui" langsung menyetujui tanpa konfirmasi. Akan ditambahkan:

- **Di `DocumentDetailModal.tsx`**: Form popup/inline (mirip reject form yang sudah ada) yang muncul saat klik "Setujui". Berisi textarea untuk komentar opsional, lalu tombol "Konfirmasi Setujui".
- **Di `ApprovalPage.tsx`**: Tombol "Setujui" di daftar antrian juga akan membuka form komentar terlebih dahulu (inline atau modal kecil).
- **Di `AppContext.tsx`**: Fungsi `approveDocument` diperbarui untuk menerima parameter `comment` opsional. Komentar akan disimpan di audit trail sebagai bagian dari action text, misalnya: "Menyetujui dokumen — Dokumen sudah sesuai standar".

### 3. Preview Dokumen yang Lebih Realistis

File: `src/components/modals/PdfPreviewOverlay.tsx`

Perubahan:
- Menerima prop tambahan dari Document (metadata lengkap)
- Menampilkan dokumen dummy realistis menggunakan HTML yang dirender di dalam iframe via Blob URL. Konten iframe berisi layout dokumen formal (kop surat sekolah, data siswa, tabel nilai dummy, tanda tangan) yang mirip ijazah/rapor.
- Zoom tetap berfungsi via CSS transform pada wrapper iframe
- Toolbar (download, print, zoom, close) tetap sama

File `DocumentDetailModal.tsx` akan mengirim data document ke `PdfPreviewOverlay` agar preview bisa menampilkan data sesuai dokumen yang dipilih.

---

## Detail Teknis

### AppContext.tsx
```
// Signature berubah:
approveDocument: (docId: number, comment?: string) => void;

// Di dalam action audit trail:
action: comment ? `Menyetujui dokumen — ${comment}` : "Menyetujui dokumen"
```

### DocumentDetailModal.tsx
- Tambah state `showApproveForm` dan `approveComment`
- Saat klik Setujui, tampilkan inline form dengan textarea dan tombol konfirmasi
- Heading "Audit Trail" diganti "Jejak Aktivitas"
- Pass `document` object ke `PdfPreviewOverlay`

### ApprovalPage.tsx
- Tambah state `approveId` dan `approveComment` (mirip pattern `rejectId`/`rejectReason` yang sudah ada)
- Tombol Setujui membuka modal komentar sebelum konfirmasi
- Panggil `approveDocument(docId, comment)` dengan komentar

### PdfPreviewOverlay.tsx
- Props berubah: menerima `document` object (bukan hanya `fileName`)
- Membuat HTML string berisi layout dokumen formal (kop surat "SMP Negeri 4 Cikarang Barat", data siswa/guru dari metadata, tabel dummy, tanda tangan)
- Render via iframe dengan `srcdoc` attribute
- Zoom menggunakan CSS transform pada wrapper

### LogPage.tsx
- Ganti teks "Audit Trail Global" menjadi "Jejak Aktivitas Global"
