import Link from 'next/link';

import Container from '~/components/Container';

import styles from './styles.module.css';

interface LinksProps {
  links?: Array<{
    url: string;
    label: string;
  }>;
}

export default function Links(props: LinksProps) {
  return (
    <Container>
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
    </Container>
  );
}
