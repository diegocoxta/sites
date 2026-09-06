import styles from './styles.module.css';

type PageDescriptionProps = React.HTMLAttributes<HTMLDivElement> & {
  content: string;
};

export default function PageDescription({ content, ...props }: PageDescriptionProps) {
  return (
    <div className={styles.container} {...props}>
      {content.split('\n').map((p: string) => (
        <p className={styles.paragraph} key={p} dangerouslySetInnerHTML={{ __html: p }} />
      ))}
    </div>
  );
}
