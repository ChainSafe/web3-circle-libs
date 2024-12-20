import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '~/components/ui/button';

export function DarkModeToggle() {
  // Initialize dark mode based on localStorage or system preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme');
      if (storedTheme) return storedTheme === 'dark';

      // Fallback to system preference if no theme is stored
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark;
    }
    return false;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Apply the appropriate class and persist to localStorage
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleSystemPreferenceChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener('change', handleSystemPreferenceChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemPreferenceChange);
    };
  }, []);

  return (
    <Button onClick={() => setIsDarkMode((prev) => !prev)} variant="outline" size="icon">
      {isDarkMode ? <Sun /> : <Moon />}
    </Button>
  );
}
