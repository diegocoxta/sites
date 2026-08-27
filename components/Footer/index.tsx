import Link from 'next/link';

import type { ConfigType } from '~/lib/config';

import styles from './styles.module.css';

interface FooterProps {
  author: string;
  links?: ConfigType['links'];
}

export default function Footer(props: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <nav aria-label="Links profissionais e contato">
        {props.links && (
          <ul className={styles.links} data-testid="about-me-links">
            {props.links.map((link, index) => (
              <li className={styles.linksItem} key={`nav-${index}`} data-testid="about-me-links-item">
                <Link
                  className={styles.linksLink}
                  href={link.href}
                  rel="me noopener"
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                >
                  {link.title}
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
