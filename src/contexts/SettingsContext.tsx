import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "auto";
export type AccentScheme = "sakura-wine" | "soft-pink" | "neutral-blue";
export type FontSize = "normal" | "large" | "x-large";
export type DateFormat = "DD/MM/YYYY" | "MM/DD/YYYY" | "YYYY-MM-DD";
export type Language = "id" | "en";
export type NotifSummary = "daily" | "weekly";
export type PreviewMode = "floating" | "fullscreen";
export type AuditDetail = "ringkas" | "lengkap";

export interface UserSettings {
  theme: ThemeMode;
  accent: AccentScheme;
  fontSize: FontSize;
  highContrast: boolean;
  language: Language;
  dateFormat: DateFormat;
  timezone: string;
  notifInApp: boolean;
  notifEmail: boolean;
  notifPush: boolean;
  notifSummary: NotifSummary;
  notifDocMasuk: boolean;
  notifPermintaan: boolean;
  notifDisetujui: boolean;
  notifSistem: boolean;
  previewMode: PreviewMode;
  auditDetail: AuditDetail;
  autoSuggestFolder: boolean;
  folderMapping: Record<string, string>;
}

const DEFAULT_SETTINGS: UserSettings = {
  theme: "light",
  accent: "sakura-wine",
  fontSize: "normal",
  highContrast: false,
  language: "id",
  dateFormat: "DD/MM/YYYY",
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  notifInApp: true,
  notifEmail: false,
  notifPush: false,
  notifSummary: "daily",
  notifDocMasuk: true,
  notifPermintaan: true,
  notifDisetujui: true,
  notifSistem: false,
  previewMode: "floating",
  auditDetail: "ringkas",
  autoSuggestFolder: true,
  folderMapping: {
    "Ijazah": "Ijazah",
    "Rapor": "Nilai",
    "Surat Keputusan": "SK",
    "Data Siswa": "Data Siswa",
    "Laporan Keuangan": "Laporan",
    "Sertifikat": "Sertifikat",
  },
};

interface SettingsContextType {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => void;
  resetSettings: () => void;
  t: (id: string, en: string) => string;
}

const SettingsContext = createContext<SettingsContextType | null>(null);

export const useSettings = () => {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used within SettingsProvider");
  return ctx;
};

const ACCENT_VARS: Record<AccentScheme, Record<string, string>> = {
  "sakura-wine": {
    "--primary": "352 48% 28%",
    "--secondary": "350 20% 95%",
    "--secondary-foreground": "352 48% 28%",
    "--accent": "348 40% 51%",
    "--ring": "352 48% 28%",
    "--sidebar-background": "352 48% 22%",
    "--sidebar-accent": "352 40% 30%",
    "--sidebar-border": "352 35% 32%",
    "--sidebar-ring": "352 48% 40%",
  },
  "soft-pink": {
    "--primary": "340 55% 48%",
    "--secondary": "340 30% 95%",
    "--secondary-foreground": "340 55% 38%",
    "--accent": "335 50% 55%",
    "--ring": "340 55% 48%",
    "--sidebar-background": "340 50% 25%",
    "--sidebar-accent": "340 45% 33%",
    "--sidebar-border": "340 40% 35%",
    "--sidebar-ring": "340 55% 45%",
  },
  "neutral-blue": {
    "--primary": "215 60% 35%",
    "--secondary": "215 25% 95%",
    "--secondary-foreground": "215 60% 30%",
    "--accent": "210 55% 50%",
    "--ring": "215 60% 35%",
    "--sidebar-background": "215 55% 22%",
    "--sidebar-accent": "215 50% 30%",
    "--sidebar-border": "215 45% 32%",
    "--sidebar-ring": "215 60% 40%",
  },
};

const FONT_SCALE: Record<FontSize, string> = {
  normal: "16px",
  large: "18px",
  "x-large": "20px",
};

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem("sakura_settings");
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply theme
  useEffect(() => {
    const root = document.documentElement;
    if (settings.theme === "dark" || (settings.theme === "auto" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [settings.theme]);

  // Apply accent
  useEffect(() => {
    const root = document.documentElement;
    const vars = ACCENT_VARS[settings.accent];
    Object.entries(vars).forEach(([key, val]) => root.style.setProperty(key, val));
  }, [settings.accent]);

  // Apply font size
  useEffect(() => {
    document.documentElement.style.fontSize = FONT_SCALE[settings.fontSize];
  }, [settings.fontSize]);

  // Apply high contrast
  useEffect(() => {
    if (settings.highContrast) {
      document.documentElement.style.setProperty("--foreground", "0 0% 0%");
      document.documentElement.style.setProperty("--background", "0 0% 100%");
    } else {
      document.documentElement.style.setProperty("--foreground", "0 0% 13%");
      document.documentElement.style.setProperty("--background", "0 0% 98%");
    }
  }, [settings.highContrast]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("sakura_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
    localStorage.removeItem("sakura_settings");
  };

  const t = (id: string, en: string) => (settings.language === "en" ? en : id);

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings, t }}>
      {children}
    </SettingsContext.Provider>
  );
};
