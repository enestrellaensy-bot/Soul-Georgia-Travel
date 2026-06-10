"use client";

import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

export type Language = "ru" | "ua" | "en";

type PreferencesContextValue = {
  language: Language;
  setLanguage: (language: Language) => void;
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const restored = useRef(false);

  useEffect(() => {
    const restorePreferences = window.setTimeout(() => {
      const savedLanguage = localStorage.getItem("soul-georgia-language-v2");
      restored.current = true;

      if (savedLanguage === "ru" || savedLanguage === "ua" || savedLanguage === "en") {
        setLanguageState(savedLanguage);
      }
    }, 0);

    return () => window.clearTimeout(restorePreferences);
  }, []);

  useEffect(() => {
    if (!restored.current) return;

    document.documentElement.lang = language;
    document.documentElement.dataset.language = language;
    localStorage.setItem("soul-georgia-language-v2", language);
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage: (nextLanguage: Language) => setLanguageState(nextLanguage),
    }),
    [language],
  );

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const context = useContext(PreferencesContext);

  if (!context) {
    throw new Error("usePreferences must be used inside PreferencesProvider");
  }

  return context;
}
