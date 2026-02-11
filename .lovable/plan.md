
# Rencana Perbaikan 6 Area SAKURA DMS

## 1. Sidebar Sticky (Tetap di Tempat saat Scroll)

**File**: `src/components/layout/AppSidebar.tsx`

- Tambahkan `sticky top-0 h-screen overflow-y-auto` pada elemen `<aside>` agar sidebar tetap terlihat saat halaman di-scroll
- Tombol panah collapse/expand sudah ada di atas (dekat logo), tidak perlu diubah

## 2. Grafik Dashboard: Hanya 3 Garis Status

**File**: `src/components/dashboard/ActivityChart.tsx`

- Hapus line "Upload" dari grafik, sisakan hanya 3 line: **Disetujui**, **Ditolak**, **Menunggu**
- Hapus data `Upload` dari mapping data chart
- Saat klik titik pada garis tertentu, hanya tampilkan dokumen dengan status yang sesuai (bukan campuran). Contoh: klik titik di garis "Disetujui" hanya tampilkan dokumen berstatus Disetujui/Diarsipkan

**File**: `src/data/mockData.ts`
- Hapus field `uploads` dari output `getChartData()` (opsional, bisa diabaikan saja di chart)

**File**: `src/pages/DashboardPage.tsx`
- Perbarui `handleStatusClick` agar tidak lagi menangani status "Upload"

## 3. Hapus Pilih Tanggal (Calendar Popover) dari Grafik

**File**: `src/components/dashboard/ActivityChart.tsx`

- Hapus komponen `Popover` untuk pilih bulan (CalendarDays icon + month picker)
- Hapus import `CalendarDays`, `Check`, `Popover`, `PopoverContent`, `PopoverTrigger`
- Hapus state `selectedMonth` dan `monthOpen`
- Tetap pertahankan toggle Mingguan/Bulanan
- Gunakan bulan default saja (bulan pertama di `CHART_MONTHS`)

## 4. Detail Dokumen: Warna Role Seragam, Status Beda Warna

**File**: `src/components/modals/DocumentDetailModal.tsx`

Di bagian Jejak Aktivitas:
- **Semua badge role** menggunakan warna yang sama (netral): `bg-secondary text-foreground border border-border` (tidak lagi dibedakan per role)
- **Badge status/aksi** tetap dibedakan warnanya:
  - Mengunggah: warna biru (`bg-blue-50 text-blue-700 border border-blue-200`)
  - Menunggu: warna kuning/warning (`bg-sakura-warning/10 text-sakura-warning border border-sakura-warning/20`)
  - Menyetujui: warna hijau (`bg-sakura-success/10 text-sakura-success border border-sakura-success/20`)
  - Ditolak/Menolak: warna merah (`bg-destructive/10 text-destructive border border-destructive/20`)
  - Mengarsipkan: warna abu-abu (`bg-muted text-muted-foreground border border-border`)
  - Dokumen otomatis: warna abu-abu
  - Catatan: warna accent

Catatan: Perubahan ini hanya di **Jejak Aktivitas** pada Detail Dokumen, bukan di tempat lain.

## 5. Responsif Desktop dan Mobile

**File**: `src/components/layout/AppLayout.tsx`, `src/components/layout/AppSidebar.tsx`, dan halaman-halaman utama

- Pastikan sidebar responsive: di mobile (`<768px`) sidebar tersembunyi secara default, bisa ditampilkan dengan tombol hamburger
- Tambahkan `overflow-x-hidden` pada layout utama
- Pastikan grid cards, tabel, dan form tidak overflow di layar kecil
- Gunakan `flex-col` pada mobile untuk elemen yang sejajar di desktop

## 6. Notifikasi Toast untuk Semua Submit (Kecuali Upload)

**File**: Semua halaman yang memiliki aksi submit

Tambahkan toast notification (`sonner` atau `useToast`) di pojok kanan bawah untuk:
- **Persetujuan dokumen** (ApprovalPage, DashboardPage tab Persetujuan, DocumentDetailModal): "Dokumen berhasil disetujui"
- **Penolakan dokumen**: "Dokumen berhasil ditolak"
- **Arsip dokumen**: "Dokumen berhasil diarsipkan"
- **Tambah user** (UserManagementPage): "User berhasil ditambahkan"
- **Edit user**: "User berhasil diperbarui"
- **Hapus user**: "User berhasil dihapus"
- **Tambah catatan audit**: "Catatan berhasil ditambahkan"
- **Reset sistem** (SettingsPage): "Sistem berhasil direset ke default"
- **Upload dokumen dikecualikan** (sudah ada dialog konfirmasi sendiri)

Menggunakan `toast()` dari `@/hooks/use-toast` yang sudah tersedia.

---

## Detail Teknis

### File yang Diubah

```text
src/components/layout/AppSidebar.tsx          - sticky sidebar
src/components/layout/AppLayout.tsx           - responsive layout + mobile sidebar toggle
src/components/dashboard/ActivityChart.tsx     - hapus line Upload + hapus date picker
src/components/modals/DocumentDetailModal.tsx  - role badge seragam, status badge berwarna
src/pages/DashboardPage.tsx                   - hapus handler Upload status + toast
src/pages/ApprovalPage.tsx                    - toast notifikasi
src/pages/UserManagementPage.tsx              - toast notifikasi
src/pages/SettingsPage.tsx                    - toast notifikasi (jika belum ada)
```
