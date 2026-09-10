import Link from 'next/link';

import type { ConfigType } from '~/lib/config';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type FooterProps = ComponentWithTranslator<{
  author: string;
  links?: ConfigType['links'];
  repository?: string;
}>;

export default function Footer({ t, ...props }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <nav aria-label={t('components.blog.footer.arialabel')}>
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
        <a
          className={styles.link}
          href="https://creativecommons.org/licenses/by/4.0/"
          rel="noopener noreferrer"
          target="_blank"
        >
          CC-BY
        </a>{' '}
        {year} {props.author}
        {props.repository && (
          <>
            {' • '}
            <a className={styles.link} href={props.repository} rel="noopener noreferrer" target="_blank">
              {t('components.blog.footer.sourcecode')}
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
