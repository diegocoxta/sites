import Link from 'next/link';

import styles from './styles.module.css';

interface FooterProps {
  sourceCode?: string;
  author: string;
  links?: Array<{
    url: string;
    label: string;
  }>;
}

export default function Footer(props: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <nav aria-label="Links profissionais e contato">
        {props.links && (
          <ul className={styles.links} data-testid="about-me-links">
            {props.links.map((nav, index) => (
              <li className={styles.linksItem} key={`nav-${index}`} data-testid="about-me-links-item">
                <Link
                  className={styles.linksLink}
                  href={nav.url}
                  rel="noopener noreferrer"
                  target={nav.url.startsWith('http') ? '_blank' : undefined}
                >
                  {nav.label}
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
