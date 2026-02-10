import { useState } from "react";
import { Sun, Moon, Monitor, Palette, Type, Globe, Calendar, Bell, Eye, FolderOpen, Shield, Download, RotateCcw, Check } from "lucide-react";
import AppHeader from "@/components/layout/AppHeader";
import { useSettings, type ThemeMode, type AccentScheme, type FontSize, type Language, type DateFormat, type NotifSummary, type PreviewMode, type AuditDetail } from "@/contexts/SettingsContext";
import { useApp } from "@/contexts/AppContext";

const SECTIONS = [
  { id: "theme", label: "Tema", icon: Sun },
  { id: "accent", label: "Skema Warna", icon: Palette },
  { id: "font", label: "Ukuran Teks", icon: Type },
  { id: "language", label: "Bahasa", icon: Globe },
  { id: "date", label: "Format Tanggal", icon: Calendar },
  { id: "notif", label: "Notifikasi", icon: Bell },
  { id: "preview", label: "Preview & Viewer", icon: Eye },
  { id: "folder", label: "Upload / Folder", icon: FolderOpen },
  { id: "audit", label: "Audit & Privacy", icon: Shield },
  { id: "export", label: "Export & Backup", icon: Download },
  { id: "reset", label: "Reset & Restore", icon: RotateCcw },
];

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings, t } = useSettings();
  const { currentUser } = useApp();
  const [activeSection, setActiveSection] = useState("theme");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [exportDone, setExportDone] = useState(false);

  const isAdmin = currentUser.role === "Administrator IT";

  const handleExportLog = () => {
    const csv = "timestamp,user,action,document\n2025-09-01,Admin,Upload,Sample.pdf\n2025-09-02,Kepsek,Approve,Sample.pdf";
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "audit_log_export.csv";
    a.click();
    URL.revokeObjectURL(url);
    setExportDone(true);
    setTimeout(() => setExportDone(false), 2000);
  };

  const handleExportMeta = () => {
    const data = JSON.stringify({ settings, exportDate: new Date().toISOString(), user: currentUser.nama }, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sakura_backup.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <AppHeader title={t("Pengaturan Sistem", "System Settings")} subtitle={t("Kelola preferensi personal", "Manage personal preferences")} />
      <div className="flex flex-1 animate-fade-in overflow-hidden">
        {/* Sidebar nav */}
        <div className="w-56 shrink-0 border-r border-border bg-card p-3 space-y-0.5 overflow-y-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                activeSection === s.id ? "bg-secondary text-primary" : "text-foreground hover:bg-muted"
              }`}
            >
              <s.icon size={16} className="shrink-0" />
              {s.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-2xl space-y-6">

            {/* TEMA */}
            {activeSection === "theme" && (
              <SettingsCard title={t("Tema Tampilan", "Theme")} description={t("Pilih mode tema untuk antarmuka", "Choose interface theme mode")}>
                <div className="flex gap-3">
                  {([
                    { value: "light" as ThemeMode, label: t("Terang", "Light"), icon: Sun },
                    { value: "dark" as ThemeMode, label: t("Gelap", "Dark"), icon: Moon },
                    { value: "auto" as ThemeMode, label: t("Otomatis", "Auto"), icon: Monitor },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateSetting("theme", opt.value)}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-colors ${
                        settings.theme === opt.value ? "border-primary bg-secondary" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <opt.icon size={24} className={settings.theme === opt.value ? "text-primary" : "text-muted-foreground"} />
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </SettingsCard>
            )}

            {/* ACCENT */}
            {activeSection === "accent" && (
              <SettingsCard title={t("Skema Warna (Accent)", "Color Scheme")} description={t("Pilih aksen warna utama", "Choose primary accent color")}>
                <div className="flex gap-4">
                  {([
                    { value: "sakura-wine" as AccentScheme, label: "Sakura Wine", color: "bg-[hsl(352,48%,28%)]" },
                    { value: "soft-pink" as AccentScheme, label: "Soft Pink", color: "bg-[hsl(340,55%,48%)]" },
                    { value: "neutral-blue" as AccentScheme, label: "Neutral Blue", color: "bg-[hsl(215,60%,35%)]" },
                  ]).map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => updateSetting("accent", opt.value)}
                      className={`flex items-center gap-3 px-5 py-3 rounded-xl border-2 transition-colors ${
                        settings.accent === opt.value ? "border-primary bg-secondary" : "border-border hover:border-primary/30"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full ${opt.color} shrink-0`} />
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      {settings.accent === opt.value && <Check size={16} className="text-primary ml-1" />}
                    </button>
                  ))}
                </div>
              </SettingsCard>
            )}

            {/* FONT SIZE */}
            {activeSection === "font" && (
              <SettingsCard title={t("Ukuran Teks / Aksesibilitas", "Font Size / Accessibility")} description={t("Sesuaikan ukuran teks dan kontras", "Adjust text size and contrast")}>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    {([
                      { value: "normal" as FontSize, label: "Normal" },
                      { value: "large" as FontSize, label: t("Besar", "Large") },
                      { value: "x-large" as FontSize, label: t("Sangat Besar", "Extra Large") },
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => updateSetting("fontSize", opt.value)}
                        className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                          settings.fontSize === opt.value ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/30"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <ToggleRow
                    label={t("Mode Kontras Tinggi", "High Contrast Mode")}
                    checked={settings.highContrast}
                    onChange={(v) => updateSetting("highContrast", v)}
                  />
                </div>
              </SettingsCard>
            )}

            {/* LANGUAGE */}
            {activeSection === "language" && (
              <SettingsCard title={t("Bahasa", "Language")} description={t("Pilih bahasa antarmuka", "Choose interface language")}>
                <select
                  value={settings.language}
                  onChange={(e) => updateSetting("language", e.target.value as Language)}
                  className="px-4 py-2.5 rounded-lg border border-input bg-background text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="id">Bahasa Indonesia</option>
                  <option value="en">English (US)</option>
                </select>
              </SettingsCard>
            )}

            {/* DATE FORMAT */}
            {activeSection === "date" && (
              <SettingsCard title={t("Format Tanggal & Waktu", "Date & Time Format")} description={t("Sesuaikan format tampilan tanggal", "Customize date display format")}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("Format Tanggal", "Date Format")}</label>
                    <div className="flex gap-3">
                      {(["DD/MM/YYYY", "MM/DD/YYYY", "YYYY-MM-DD"] as DateFormat[]).map((fmt) => (
                        <button
                          key={fmt}
                          onClick={() => updateSetting("dateFormat", fmt)}
                          className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                            settings.dateFormat === fmt ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/30"
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("Zona Waktu", "Timezone")}</label>
                    <input
                      readOnly
                      value={settings.timezone}
                      className="px-4 py-2.5 rounded-lg border border-input bg-muted/50 text-sm text-muted-foreground w-full"
                    />
                    <p className="text-xs text-muted-foreground mt-1">{t("Terdeteksi otomatis dari perangkat", "Auto-detected from device")}</p>
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* NOTIFICATIONS */}
            {activeSection === "notif" && (
              <SettingsCard title={t("Notifikasi", "Notifications")} description={t("Kelola preferensi notifikasi", "Manage notification preferences")}>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">{t("Saluran Notifikasi", "Notification Channels")}</h4>
                    <ToggleRow label="In-App" checked={settings.notifInApp} onChange={(v) => updateSetting("notifInApp", v)} />
                    <ToggleRow label="Email" checked={settings.notifEmail} onChange={(v) => updateSetting("notifEmail", v)} />
                    <ToggleRow label="Push" checked={settings.notifPush} onChange={(v) => updateSetting("notifPush", v)} />
                  </div>
                  <div className="h-px bg-border" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">{t("Ringkasan", "Summary")}</h4>
                    <div className="flex gap-3">
                      {([
                        { value: "daily" as NotifSummary, label: t("Harian", "Daily") },
                        { value: "weekly" as NotifSummary, label: t("Mingguan", "Weekly") },
                      ]).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateSetting("notifSummary", opt.value)}
                          className={`px-4 py-2 rounded-lg border-2 text-sm font-medium transition-colors ${
                            settings.notifSummary === opt.value ? "border-primary bg-secondary text-primary" : "border-border text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="space-y-3">
                    <h4 className="text-sm font-semibold text-foreground">{t("Notifikasi Untuk", "Notify For")}</h4>
                    <ToggleRow label={t("Dokumen Masuk", "Incoming Documents")} checked={settings.notifDocMasuk} onChange={(v) => updateSetting("notifDocMasuk", v)} />
                    <ToggleRow label={t("Permintaan Persetujuan", "Approval Requests")} checked={settings.notifPermintaan} onChange={(v) => updateSetting("notifPermintaan", v)} />
                    <ToggleRow label={t("Dokumen Disetujui", "Approved Documents")} checked={settings.notifDisetujui} onChange={(v) => updateSetting("notifDisetujui", v)} />
                    <ToggleRow label={t("Sistem", "System")} checked={settings.notifSistem} onChange={(v) => updateSetting("notifSistem", v)} />
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* PREVIEW & VIEWER */}
            {activeSection === "preview" && (
              <SettingsCard title={t("Preview & Viewer", "Preview & Viewer")} description={t("Konfigurasi tampilan dokumen", "Configure document viewer")}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("Default Viewer", "Default Viewer")}</label>
                    <div className="flex gap-3">
                      {([
                        { value: "floating" as PreviewMode, label: t("Floating Preview", "Floating Preview") },
                        { value: "fullscreen" as PreviewMode, label: t("Full Screen", "Full Screen") },
                      ]).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateSetting("previewMode", opt.value)}
                          className={`flex-1 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-colors ${
                            settings.previewMode === opt.value ? "border-primary bg-secondary text-primary" : "border-border text-foreground hover:border-primary/30"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{t("PDF viewer selalu memiliki tombol fullscreen, zoom, dan rotate.", "PDF viewer always has fullscreen, zoom, and rotate buttons.")}</p>
                </div>
              </SettingsCard>
            )}

            {/* UPLOAD / FOLDER MAPPING */}
            {activeSection === "folder" && (
              <SettingsCard title={t("Upload / Folder Mapping", "Upload / Folder Mapping")} description={t("Konfigurasi pemetaan otomatis folder", "Configure auto folder mapping")}>
                <div className="space-y-4">
                  <ToggleRow
                    label={t("Auto-suggest folder saat upload", "Auto-suggest folder on upload")}
                    checked={settings.autoSuggestFolder}
                    onChange={(v) => updateSetting("autoSuggestFolder", v)}
                  />
                  <div className="h-px bg-border" />
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-3">{t("Pemetaan Jenis → Folder", "Document Type → Folder Mapping")}</h4>
                    <div className="space-y-2">
                      {Object.entries(settings.folderMapping).map(([jenis, folder]) => (
                        <div key={jenis} className="flex items-center gap-3">
                          <span className="text-sm text-foreground w-40 shrink-0">{jenis}</span>
                          <span className="text-muted-foreground">→</span>
                          <input
                            value={folder}
                            onChange={(e) => {
                              const newMap = { ...settings.folderMapping, [jenis]: e.target.value };
                              updateSetting("folderMapping", newMap);
                            }}
                            className="flex-1 px-3 py-1.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* AUDIT & PRIVACY */}
            {activeSection === "audit" && (
              <SettingsCard title={t("Audit & Privacy", "Audit & Privacy")} description={t("Pengaturan jejak aktivitas dan retensi data", "Activity trail and data retention settings")}>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">{t("Detail Audit", "Audit Detail Level")}</label>
                    <div className="flex gap-3">
                      {([
                        { value: "ringkas" as AuditDetail, label: t("Ringkas", "Summary") },
                        { value: "lengkap" as AuditDetail, label: t("Lengkap", "Detailed") },
                      ]).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => updateSetting("auditDetail", opt.value)}
                          className={`px-4 py-2.5 rounded-lg border-2 text-sm font-medium transition-colors ${
                            settings.auditDetail === opt.value ? "border-primary bg-secondary text-primary" : "border-border text-foreground"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="px-4 py-3 rounded-lg bg-muted/50 border border-border">
                    <h4 className="text-sm font-semibold text-foreground mb-1">{t("Retensi Data", "Data Retention")}</h4>
                    <p className="text-xs text-muted-foreground">{t("Fitur hapus otomatis setelah X tahun tersedia di versi produksi. Saat ini semua data disimpan tanpa batas waktu.", "Auto-delete after X years is available in production. Currently all data is stored indefinitely.")}</p>
                  </div>
                </div>
              </SettingsCard>
            )}

            {/* EXPORT & BACKUP */}
            {activeSection === "export" && (
              <SettingsCard title={t("Export & Backup", "Export & Backup")} description={t("Unduh data log dan backup", "Download logs and backup data")}>
                <div className="space-y-4">
                  <button
                    onClick={handleExportLog}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors w-full"
                  >
                    <Download size={18} />
                    {exportDone ? (
                      <span className="text-sakura-success font-semibold">✓ {t("Log berhasil diunduh!", "Log exported!")}</span>
                    ) : (
                      t("Export Log (CSV)", "Export Log (CSV)")
                    )}
                  </button>
                  <button
                    onClick={handleExportMeta}
                    className="flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-sm font-medium hover:bg-muted transition-colors w-full"
                  >
                    <Download size={18} />
                    {t("Backup Metadata (JSON)", "Backup Metadata (JSON)")}
                  </button>
                  <p className="text-xs text-muted-foreground">{t("Data yang diekspor hanya berisi metadata, bukan file dokumen asli.", "Exported data contains metadata only, not original document files.")}</p>
                </div>
              </SettingsCard>
            )}

            {/* RESET */}
            {activeSection === "reset" && (
              <SettingsCard title={t("Reset & Restore", "Reset & Restore")} description={t("Kembalikan pengaturan ke default", "Restore settings to defaults")}>
                <div className="space-y-4">
                  {!showResetConfirm ? (
                    <button
                      onClick={() => setShowResetConfirm(true)}
                      className="flex items-center gap-2 px-5 py-3 rounded-lg bg-destructive/10 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-colors"
                    >
                      <RotateCcw size={18} />
                      {t("Reset Semua Pengaturan ke Default", "Reset All Settings to Default")}
                    </button>
                  ) : (
                    <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5 space-y-3">
                      <p className="text-sm text-foreground font-medium">{t("Apakah Anda yakin ingin mereset semua pengaturan?", "Are you sure you want to reset all settings?")}</p>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { resetSettings(); setShowResetConfirm(false); }}
                          className="px-4 py-2 rounded-lg bg-destructive text-destructive-foreground text-sm font-semibold"
                        >
                          {t("Ya, Reset", "Yes, Reset")}
                        </button>
                        <button
                          onClick={() => setShowResetConfirm(false)}
                          className="px-4 py-2 rounded-lg border border-input text-sm"
                        >
                          {t("Batal", "Cancel")}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </SettingsCard>
            )}

          </div>
        </div>
      </div>
    </>
  );
}

function SettingsCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-4">
      <div>
        <h3 className="text-lg font-bold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}

function ToggleRow({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm text-foreground">{label}</span>
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
          checked ? "bg-primary" : "bg-muted"
        }`}
      >
        <span className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transform transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`} />
      </button>
    </label>
  );
}
