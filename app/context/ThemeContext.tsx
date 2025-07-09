import { createContext, useContext, useState, useEffect } from 'react';
import { Language, Theme, KEY_LOCAL_STORAGE } from '~/constans';
import { getItem, setItem } from '~/lib/local-storage';
import i18n from '~/lib/translator';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  language: Language;
  toggleLanguage: (newLanguage: Language) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(Theme.LIGHT);
  const [language, setLanguage] = useState<Language>(Language.EN);

  useEffect(() => {
    const savedTheme = getItem(KEY_LOCAL_STORAGE.THEME) as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle(Theme.DARK, savedTheme === Theme.DARK);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? Theme.DARK : Theme.LIGHT);
      document.documentElement.classList.toggle(Theme.DARK, prefersDark);
    }

    const savedLanguage = i18n.language;
    setLanguage(savedLanguage as Language);
    document.documentElement.lang = savedLanguage;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    setTheme(newTheme);
    setItem(KEY_LOCAL_STORAGE.THEME, newTheme);
    document.documentElement.classList.toggle(Theme.DARK, newTheme === Theme.DARK);
  };

  const toggleLanguage = (newLanguage: Language) => {
    setItem(KEY_LOCAL_STORAGE.LANGUAGE, newLanguage);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }

    // Update language with state not reload -- TODO: THINK
    // setLanguage(newLanguage);
    // void i18n.changeLanguage(newLanguage);
    // document.documentElement.lang = newLanguage;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, language, toggleLanguage }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
