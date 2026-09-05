import Link from 'next/link';

import type { Translator } from '~/lib/i18n';

import styles from './styles.module.css';

interface PhotoGalleryNavProps {
  current: 'photos' | 'collections' | 'about' | 'contact';
  t: Translator;
}

export default function PhotoGalleryNav({ current, t }: PhotoGalleryNavProps): React.ReactElement {
  return (
    <nav className={styles.nav}>
      <Link className={styles.link} href="/" aria-current={current === 'photos' ? 'page' : undefined}>
        {t('page.photos.title')}
      </Link>
      <Link className={styles.link} href="/collections" aria-current={current === 'collections' ? 'page' : undefined}>
        {t('page.collections.title')}
      </Link>
      <Link className={styles.link} href="/about" aria-current={current === 'about' ? 'page' : undefined}>
        {t('page.about.title')}
      </Link>
    </nav>
  );
}
