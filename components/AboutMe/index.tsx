import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

export default function AboutMe({ t }: ComponentWithTranslator) {
  return (
    <main aria-label={t('components.aboutme.ariaLabel')} className={styles.container}>
      {t('components.aboutme.bio')
        .split('\n')
        .map((p: string) => (
          <p className={styles.paragraph} key={p} dangerouslySetInnerHTML={{ __html: p }} />
        ))}
    </main>
  );
}
