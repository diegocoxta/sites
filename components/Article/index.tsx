import { MDXRemote } from 'next-mdx-remote/rsc';

import type { ContentAttributes } from '~/lib/content';

import CodeBlock from '~/components/CodeBlock';

import styles from './styles.module.css';

export default function Article(props: { children: ContentAttributes['content'] | undefined }): React.ReactElement {
  return (
    <div className={styles.article}>
      {props.children && (
        <MDXRemote
          source={props.children}
          components={{
            code: CodeBlock,
          }}
        />
      )}
    </div>
  );
}
