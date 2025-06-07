import { MDXRemote } from 'next-mdx-remote/rsc';

import type { BlogContentAttributes } from '~/app/cms';

import CodeBlock from '~/components/CodeBlock';

import styles from './styles.module.css';

export default function Article(props: { children: BlogContentAttributes['content'] | undefined }): React.ReactElement {
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
