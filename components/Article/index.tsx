import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { highlight } from 'sugar-high';

import type { ContentAttributes } from '~/lib/content';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type ArticleProps = ComponentWithTranslator<
  Partial<ContentAttributes> & {
    renderHeader?: boolean;
  }
>;

export default function Article({ t, ...props }: ArticleProps): React.ReactElement {
  const { renderHeader = true, expanded = true } = props;

  return (
    <article>
      {renderHeader && (
        <header>
          {props.title && (
            <h3 className={styles.title}>
              <Link href={props.href ?? ''}>{props.title}</Link>
            </h3>
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
                  ? t('components.attributes.readingTimeUnderMinute')
                  : t('components.attributes.readingTime', { count: Number(props.readingTime!.toFixed()) })}
              </span>
            )}
          </div>
          <ul className={styles.tagList} aria-label={t('components.attributes.tagsLabel')}>
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
