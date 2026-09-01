'use client';

import { FiSun, FiMoon } from 'react-icons/fi';

import { useTranslator } from '~/components/TranslationProvider';

import styles from './styles.module.css';

interface ThemeSwitcherProps {
  onClick?: () => unknown;
  isDarkMode: boolean;
}

export default function ThemeSwitcher({ isDarkMode, onClick }: ThemeSwitcherProps): React.ReactElement {
  const t = useTranslator();

  return (
    <button
      className={styles.container}
      data-isdarkmode={`${isDarkMode}`}
      aria-checked={isDarkMode}
      aria-label={t('client.components.themeSwitcher.ariaLabel')}
      onClick={onClick}
      role="switch"
    >
      <span className={styles.indicator} aria-hidden>
        {isDarkMode ? <FiMoon size={16} /> : <FiSun size={16} />}
      </span>
    </button>
  );
}
