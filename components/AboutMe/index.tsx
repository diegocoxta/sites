import styles from './styles.module.css';

interface AboutMeProps {
  bio: string;
}

export default function AboutMe(props: AboutMeProps) {
  return (
    <main aria-label="Sobre mim" className={styles.container}>
      {props.bio.split('\n').map((p: string) => (
        <p className={styles.paragraph} data-testid="about-me-bio" key={p} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </main>
  );
}
