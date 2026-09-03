import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import styles from './styles.module.css';

type NotFoundProps = ComponentWithTranslator<{ domain: string }>;

export default function NotFound({ t, domain }: NotFoundProps): React.ReactElement {
  return (
    <main id="centered-page" className={styles.container}>
      <p className={styles.code} aria-hidden>
        404
      </p>
      {t('components.notFound.message', { domain })
        .split('\n')
        .map((paragraph) => (
          <p className={styles.message} key={paragraph} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
    </main>
  );
}
