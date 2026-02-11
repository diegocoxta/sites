'use client';

import { useTheme } from 'next-themes';

import _ThemeSwitcher from './ThemeSwitcher';

export default function ThemeSwitcher(): React.ReactElement {
  const { theme, setTheme } = useTheme();
  const isDarkMode = theme === 'dark';

  return <_ThemeSwitcher isDarkMode={isDarkMode} onClick={() => setTheme(isDarkMode ? 'default' : 'dark')} />;
}
