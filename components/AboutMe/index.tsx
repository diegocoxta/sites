import Container from '~/components/Container';

import styles from './styles.module.css';

interface AboutMeProps {
  bio: string;
}

export default function AboutMe(props: AboutMeProps) {
  return (
    <Container>
      {props.bio.split('\n').map((p: string) => (
        <p className={styles.paragraph} data-testid="about-me-bio" key={p} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </Container>
  );
}
