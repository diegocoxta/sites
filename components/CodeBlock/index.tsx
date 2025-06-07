import { highlight } from 'sugar-high';

import styles from './styles.module.css';

interface CodeBlockProps {
  children: string;
  className?: string;
}

export default function CodeBlock({ children, ...props }: CodeBlockProps): React.ReactElement {
  if (!props.className) {
    return <code className={styles.codeInline}>{children}</code>;
  }

  if (props.className !== 'language-plain') {
    children = highlight(children);
  }

  return (
    <div className={styles.codeblock}>
      <div className={styles.carbon}>
        <div className={styles.carbonButton} data-red />
        <div className={styles.carbonButton} data-yellow />
        <div className={styles.carbonButton} data-green />
      </div>
      <code dangerouslySetInnerHTML={{ __html: children }} {...props} />
    </div>
  );
}
