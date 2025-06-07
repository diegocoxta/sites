import Container from '~/components/Container';

import styles from './styles.module.css';

interface AboutMeProps {
  bio: string;
  links?: Array<{
    url: string;
    label: string;
  }>;
}

export default function AboutMe(props: AboutMeProps) {
  return (
    <Container>
      {props.bio.split('\n').map((p: string) => (
        <p className={styles.paragraph} data-testid="about-me-bio" key={p} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
      {props.links && (
        <ul className={styles.links} data-testid="about-me-links">
          {props.links.map((nav, index) => (
            <li className={styles.linksItem} key={`nav-${index}`} data-testid="about-me-links-item">
              <a className={styles.linksLink} href={nav.url} rel="me" target="_blank">
                {nav.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </Container>
  );
}
