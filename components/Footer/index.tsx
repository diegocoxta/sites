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
      {props.links && (
        <ul className={styles.links} data-testid="about-me-links">
          {props.links.map((nav, index) => (
            <li className={styles.linksItem} key={`nav-${index}`} data-testid="about-me-links-item">
              <Link
                className={styles.linksLink}
                href={nav.url}
                rel="me"
                target={nav.url.startsWith('http') ? '_blank' : undefined}
              >
                {nav.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
      <p className={styles.label}>
        CC-BY {year} <span>{props.author}</span>
        {props.sourceCode && (
          <>
            {' • '}
            <a
              className={styles.link}
              href={props.sourceCode}
              data-testid="footer-source-code"
              target="__blank"
              rel="noopener"
            >
              código fonte
            </a>
          </>
        )}
      </p>
    </footer>
  );
}
