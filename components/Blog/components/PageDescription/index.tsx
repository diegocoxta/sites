import styles from './styles.module.css';

type PageDescriptionProps = {
  children: string;
};

export default function PageDescription({ children }: PageDescriptionProps) {
  // A plain wrapper — the page that uses it owns the `<main>` landmark.
  return (
    <div className={styles.container}>
      {children.split('\n').map((paragraph, index) => (
        <p
          className={styles.paragraph}
          key={`${index}-${paragraph.slice(0, 24)}`}
          dangerouslySetInnerHTML={{ __html: paragraph }}
        />
      ))}
    </div>
  );
}
