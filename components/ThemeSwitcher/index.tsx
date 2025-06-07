'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

import _ThemeSwitcher from './ThemeSwitcher';

export default function ThemeSwitcher(): React.ReactElement {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <_ThemeSwitcher isDarkMode={false} />;
  }

  return <_ThemeSwitcher isDarkMode={isDarkMode} onClick={() => setTheme(isDarkMode ? 'default' : 'dark')} />;
}
