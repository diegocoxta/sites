import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import Logo from '~/components/Logo';

import styles from './styles.module.css';

type FooterProps = ComponentWithTranslator<{
  name: string;
  heading?: string;
}>;

export default function Footer({ t, ...props }: FooterProps) {
  return (
    <footer className={styles.footer}>
      <Logo name={props.name} size={32} />
      <p className={styles.caption}>{t('components.photoshowcase.footer.caption')}</p>
    </footer>
  );
}
