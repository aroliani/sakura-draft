

## Plan: 6-Feature Enhancement for SAKURA App

### Feature 1 — Role-Based Sidebar Visibility

**File:** `src/data/mockData.js`
- Update `ROLE_PERMISSIONS` to remove `documents.upload` from Guru (already done), ensure Guru lacks `documents.approve`, `users.manage`, `roles.manage`, `audit.view`.

**File:** `src/components/layout/AppSidebar.jsx`
- The sidebar already filters by `hasPermission()`. Guru already can't see Upload, Pengguna, Role, Log, or Persetujuan since they lack those permissions. Verify and confirm — no changes needed if permissions are correct.

---

### Feature 2 — Module-Based Upload Permissions

**File:** `src/data/mockData.js`
- Add a `MODULE_DEFINITIONS` constant mapping 4 modules (Kesiswaan=cat1, Kepegawaian=cat2, Inventaris=cat3, Korespondensi=cat4) with upload/view permission rules per role and per sub-type.

**File:** `src/pages/UploadPage.jsx`
- Add a module selector step before showing UploadForm. Based on selected module + `currentUser.role`, show form or error banner.
- Pass selected module info to UploadForm.

**File:** `src/components/upload/UploadForm.jsx`
- When Guru selects Kepegawaian → Sertifikat/Diklat: auto-fill ownerNIP with their NIP, lock the NIP field.
- When Guru selects anything else: show red error banner.
- Filter category/type dropdowns based on selected module.

---

### Feature 3 — Document Detail: Location Breadcrumb + Activity Trail

**File:** `src/components/modals/DocumentDetailModal.jsx`
- Keep existing "Lokasi" pill (already implemented).
- Add a "Lokasi File" breadcrumb section ABOVE the "Jejak Aktivitas" section. Show breadcrumb chips: `[Kategori] › [Jenis Dokumen] › [Tahun Ajaran]` (if applicable). Each chip clickable → navigates to `/archive?kategori=...&type=...`.

---

### Feature 4 — NIP Owner: Multi-Select Searchable Dropdown

**File:** `src/components/upload/UploadForm.jsx`
- Replace single `ownerNip` text input with a searchable multi-select dropdown.
- Data source: `users` from AppContext, filtered to those with NIP.
- Each option: "Nama — NIP". Selected items shown as removable pills.
- When Guru uploads: pre-fill with their own NIP, disable dropdown.
- When Operator/TU: fully editable, multi-select.
- Store as `ownerNIPs: string[]`.

**File:** `src/contexts/AppContext.jsx`
- Update `uploadDocument` to accept `ownerNIPs` array instead of single `ownerNIP`.

---

### Feature 5 — Sidebar Dropdowns Restructure

**File:** `src/components/layout/AppSidebar.jsx`
Major rewrite of sidebar nav:

**5A — Dashboard dropdown:**
- Collapsible group with "Ringkasan" → `/dashboard` and "Persetujuan" → `/dashboard?tab=persetujuan` (only for Operator/TU and Kepala Sekolah).

**5B — Arsip dropdown with full folder tree:**
- Collapsible tree matching archive structure: 4 module headers (Kesiswaan, Kepegawaian, Inventaris, Korespondensi) as non-clickable uppercase labels, with sub-folder items as clickable links → `/archive?folder=xxx`.
- Role-based visibility: Guru sees only Kepegawaian → Sertifikat/Diklat. Operator/TU sees all. Kepala Sekolah sees all.
- Each folder shows document count badge.
- Active item highlighting with pink background.

---

### Feature 6 — OCR Document Scanning (Tesseract.js)

**Install:** `tesseract.js` package.

**File:** `src/components/upload/OcrScanner.jsx` (new)
- Self-contained OCR card component with: dashed border upload zone for images, "Mulai Scan" button, progress bar, results table with editable fields, "Terapkan Semua ke Form" button, supported document types info, and warning about OCR accuracy.
- Uses `Tesseract.recognize()` with `ind+eng` languages.
- `parseOCRText()` extracts key-value pairs (Nama, NIP, NIS, Kelas, Tanggal, Nomor Surat, etc.)

**File:** `src/components/upload/UploadForm.jsx`
- Import and render `<OcrScanner />` above the file upload zone.
- Accept callback `onApplyFields(fields)` that maps detected values to form fields.

---

### Feature 7 — Localize Log Page Filters to Indonesian

**File:** `src/pages/LogPage.jsx`
- Change filter dropdown options from English to Indonesian: "Upload" → "Unggah", "View" → "Lihat", "Approve" → "Setujui", "Reject" → "Tolak", "Archive" → "Arsipkan".

---

### Files Summary

| File | Action |
|------|--------|
| `src/data/mockData.js` | Add MODULE_DEFINITIONS, verify ROLE_PERMISSIONS |
| `src/components/layout/AppSidebar.jsx` | Full rewrite: Dashboard dropdown, Arsip folder tree, role-based visibility |
| `src/pages/UploadPage.jsx` | Module selector step |
| `src/components/upload/UploadForm.jsx` | Module-filtered categories, multi-select NIP dropdown, OCR integration |
| `src/components/upload/OcrScanner.jsx` | **Create** — OCR scanning component with Tesseract.js |
| `src/components/modals/DocumentDetailModal.jsx` | Add location breadcrumb above Jejak Aktivitas |
| `src/contexts/AppContext.jsx` | Update uploadDocument for ownerNIPs array |
| `src/pages/LogPage.jsx` | Localize filter labels to Indonesian |
| `package.json` | Add tesseract.js dependency |

