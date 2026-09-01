import Link from 'next/link';

import type { ConfigType } from '~/lib/config';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type FooterProps = ComponentWithTranslator<{
  author: string;
  links?: ConfigType['links'];
}>;

export default function Footer({ t, ...props }: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <nav aria-label={t('components.footer.ariaLabel')}>
        {props.links && (
          <ul className={styles.links}>
            {props.links.map((link, index) => (
              <li className={styles.linksItem} key={`nav-${index}`}>
                <Link
                  className={styles.linksLink}
                  href={link.href}
                  rel="me noopener"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  {t(link.title)}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </nav>
      <p className={styles.label}>
        CC-BY {year} {props.author}
      </p>
    </footer>
  );
}
