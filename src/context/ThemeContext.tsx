import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';
type ThemeSetting = Theme | 'system';

interface ThemeContextType {
  themeSetting: ThemeSetting;
  effectiveTheme: Theme;
  setThemeSetting: (theme: ThemeSetting) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeSetting, setThemeSettingState] = useState<ThemeSetting>(() => {
    const storedTheme = localStorage.getItem('app-theme-setting') as ThemeSetting | null;
    return storedTheme || 'system';
  });

  const [effectiveTheme, setEffectiveTheme] = useState<Theme>('light');

  const setThemeSetting = (newSetting: ThemeSetting) => {
    setThemeSettingState(newSetting);
    localStorage.setItem('app-theme-setting', newSetting);
  };

  const applyTheme = useCallback((themeToApply: Theme) => {
    const root = window.document.documentElement;
    if (themeToApply === 'dark') {
      root.classList.add('dark-theme');
      root.classList.remove('light-theme');
    } else {
      root.classList.add('light-theme');
      root.classList.remove('dark-theme');
    }
    setEffectiveTheme(themeToApply);
  }, []);


  useEffect(() => {
    if (themeSetting === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = (e: MediaQueryListEvent) => {
        applyTheme(e.matches ? 'dark' : 'light');
      };

      applyTheme(mediaQuery.matches ? 'dark' : 'light');

      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    } else {
      applyTheme(themeSetting);
    }
  }, [themeSetting, applyTheme]);


  return (
    <ThemeContext.Provider value={{ themeSetting, effectiveTheme, setThemeSetting }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};