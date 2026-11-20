import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

export type SocialHandleProps = ComponentWithTranslator<{ handle: string }>;

export default function SocialHandle({ t, handle }: SocialHandleProps) {
  const [before, after] = t('components.socialhandle.text', { handle: '{handle}' }).split('{handle}');

  return (
    <p className={styles.socialHandle}>
      {before}
      <strong className={styles.handle}>{handle}</strong>
      {after}
    </p>
  );
}
