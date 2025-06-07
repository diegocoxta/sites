import { BsMoon, BsSun } from 'react-icons/bs';

import styles from './styles.module.css';

interface ThemeSwitcherProps {
  onClick?: () => unknown;
  isDarkMode: boolean;
}

export default function ThemeSwitcher({ isDarkMode, onClick }: ThemeSwitcherProps): React.ReactElement {
  return (
    <button
      className={styles.container}
      data-isdarkmode={isDarkMode}
      aria-label="Change color scheme"
      onClick={onClick}
      data-testid="themeswitcher--button"
    >
      <div className={styles.indicator}>
        {isDarkMode ? <BsMoon data-testid="react-icon-bsmoon" /> : <BsSun data-testid="react-icon-bssun" />}
      </div>
    </button>
  );
}
