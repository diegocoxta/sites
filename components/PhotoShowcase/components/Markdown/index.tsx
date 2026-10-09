import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

import type { ContentAttributes } from '~/lib/content';
import type { ComponentWithTranslator } from '~/lib/i18n/translator';

import UnsplashStats from '~/components/PhotoShowcase/components/UnsplashStats';

import styles from './styles.module.css';

type MarkdownProps = ComponentWithTranslator<Partial<ContentAttributes>>;

export default function Markdown({ t, ...props }: MarkdownProps) {
  return (
    <article className={styles.markdown}>
      {props.kicker && <p className={styles.kicker}>{props.kicker}</p>}
      {props.title && <h1 className={styles.title}>{props.title}</h1>}
      {props.content && (
        <MDXRemote
          source={props.content}
          components={{
            UnsplashStats: () => <UnsplashStats t={t} />,
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
