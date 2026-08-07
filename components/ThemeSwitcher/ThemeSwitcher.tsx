import { Moon, Sun } from 'lucide-react';

import styles from './styles.module.css';

interface ThemeSwitcherProps {
  onClick?: () => unknown;
  isDarkMode: boolean;
}

export default function ThemeSwitcher({ isDarkMode, onClick }: ThemeSwitcherProps): React.ReactElement {
  return (
    <button
      className={styles.container}
      data-isdarkmode={`${isDarkMode}`}
      aria-label="Trocar a cor do tema."
      onClick={onClick}
      data-testid="themeswitcher--button"
    >
      <div className={styles.indicator}>
        {isDarkMode ? (
          <Moon data-testid="react-icon-bsmoon" size={16} />
        ) : (
          <Sun data-testid="react-icon-bssun" size={16} />
        )}
      </div>
    </button>
  );
}
