import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

import type { ContentAttributes } from '~/lib/content';

import styles from './styles.module.css';

type MarkdownProps = Partial<ContentAttributes>;

export default function Markdown({ title, content }: MarkdownProps) {
  return (
    <article className={styles.markdown}>
      {title && <h1 className={styles.title}>{title}</h1>}
      {content && (
        <MDXRemote
          source={content}
          components={{
            a: (props) => {
              const isExternal = props.href?.startsWith('http');

              return (
                <Link {...props} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noopener' : undefined} />
              );
            },
          }}
        />
      )}
    </article>
  );
}
