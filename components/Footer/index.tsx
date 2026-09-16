import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import Logo from '~/components/Logo';

import styles from './styles.module.css';

type FooterProps = ComponentWithTranslator<{
  name: string;
  sourceCode?: string;
  horizontal?: boolean;
  logoSize?: number;
}>;

export default function Footer({ t, ...props }: FooterProps) {
  const year = new Date().getFullYear();
  const separator = <> • </>;

  return (
    <footer className={`${styles.footer} ${props.horizontal ? styles.horizontal : ''}`}>
      <Logo name={props.name} size={props.logoSize ?? 32} />
      <div className={styles.caption}>
        {props.horizontal && separator}
        <span
          dangerouslySetInnerHTML={{
            __html: t('components.footer.caption', {
              year,
              author: props.name,
            }),
          }}
        />
        {props.sourceCode && (
          <>
            {separator}
            <a href={props.sourceCode} rel="noopener noreferrer" target="_blank">
              {t('components.footer.sourcecode')}
            </a>
          </>
        )}
      </div>
    </footer>
  );
}
