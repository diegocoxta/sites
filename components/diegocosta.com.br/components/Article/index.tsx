import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { highlight } from 'sugar-high';

import type { ContentAttributes } from '~/lib/content';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type ArticleProps = ComponentWithTranslator<
  Partial<ContentAttributes> & {
    renderHeader?: boolean;
    headingLevel?: 1 | 2;
  }
>;

export default function Article({ t, ...props }: ArticleProps) {
  const { renderHeader = true, expanded = true, headingLevel = 2 } = props;
  const Title = `h${headingLevel}` as const;

  return (
    <article>
      {renderHeader && (
        <header>
          {props.title && (
            <Title className={styles.title}>
              <Link href={props.href ?? ''}>{props.title}</Link>
            </Title>
          )}
          <div className={styles.attributes}>
            {props.date && (
              <>
                <time dateTime={props.date}>{t.date(props.date)}</time> <span aria-hidden="true">{' · '}</span>
              </>
            )}
            {props.readingTime && (
              <span>
                {props.readingTime <= 1
                  ? t('components.blog.article.attributes.readingtimeunderminute')
                  : t('components.blog.article.attributes.readingtime', {
                      count: Number(props.readingTime!.toFixed()),
                    })}
              </span>
            )}
          </div>
          <ul className={styles.tagList} aria-label={t('components.blog.article.attributes.tagslabel')}>
            {props.tags?.map((tag: string, index: number) => (
              <li className={styles.tagItem} key={`${index}-${tag}`}>
                <Link className={styles.tagLink} href={`/blog/tag/${tag}`}>{`#${tag}`}</Link>
              </li>
            ))}
          </ul>
        </header>
      )}
      {props.content && (
        <div className={styles.content}>
          <MDXRemote
            source={expanded ? props.content : props.summary!}
            components={{
              code: ({ children, ...props }) => {
                if (!props.className) {
                  return <code className={styles.codeInline}>{children}</code>;
                }

                const isPlain = props.className === 'language-plain';

                return (
                  <div className={styles.codeblock}>
                    <div className={styles.carbon}>
                      <div className={styles.carbonButton} data-red />
                      <div className={styles.carbonButton} data-yellow />
                      <div className={styles.carbonButton} data-green />
                    </div>
                    {isPlain ? (
                      <code {...props}>{children}</code>
                    ) : (
                      <code dangerouslySetInnerHTML={{ __html: highlight(children) }} {...props} />
                    )}
                  </div>
                );
              },
              a: (props) => {
                const isExternal = props.href?.startsWith('http');

                return (
                  <Link
                    {...props}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener' : undefined}
                  />
                );
              },
            }}
          />
        </div>
      )}
    </article>
  );
}
