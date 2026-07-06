import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('theme') as Theme) || 'system';
  });

  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    
    if (localStorage.theme === 'dark') return true;
    if (localStorage.theme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    const applyTheme = (isDarkTheme: boolean) => {
      if (isDarkTheme) {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      setIsDark(isDarkTheme);
    };

    if (theme === 'system') {
      localStorage.removeItem('theme');
      applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
    } else {
      localStorage.setItem('theme', theme);
      applyTheme(theme === 'dark');
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        applyTheme(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === 'system') {
      // If it was system, toggle based on current state
      setThemeState(isDark ? 'light' : 'dark');
    } else if (theme === 'light') {
      setThemeState('dark');
    } else {
      setThemeState('light');
    }
  };

  return { theme, isDark, setTheme: setThemeState, toggleTheme };
}
