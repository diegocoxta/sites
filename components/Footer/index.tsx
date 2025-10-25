import styles from './styles.module.css';

interface FooterProps {
  sourceCode?: string;
  author: string;
}

export default function Footer(props: FooterProps): React.ReactElement {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.container}>
      <p className={styles.label}>
        CC-BY {year} <span>{props.author}</span> •{' '}
        {props.sourceCode && (
          <a
            className={styles.link}
            href={props.sourceCode}
            data-testid="footer-source-code"
            target="__blank"
            rel="noopener"
          >
            source code
          </a>
        )}
      </p>
    </footer>
  );
}
