import Link from 'next/link';

import type { ConfigType } from '~/lib/config';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type NavigationProps = ComponentWithTranslator<{
  links?: ConfigType['links'];
}>;

export default function Navigation({ t, ...props }: NavigationProps) {
  return (
    <nav className={styles.container} aria-label={t('components.blog.navigation.arialabel')}>
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
  );
}
