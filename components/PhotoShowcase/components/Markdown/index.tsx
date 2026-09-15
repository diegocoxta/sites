import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

import type { ContentAttributes } from '~/lib/content';

import styles from './styles.module.css';

type MarkdownProps = Partial<ContentAttributes>;

export default function Markdown(props: MarkdownProps) {
  return (
    <article className={styles.markdown}>
      {props.kicker && <p className={styles.kicker}>{props.kicker}</p>}
      {props.title && <h1 className={styles.title}>{props.title}</h1>}
      {props.content && (
        <MDXRemote
          source={props.content}
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
