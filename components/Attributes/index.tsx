import Link from 'next/link';

import type { BlogContentAttributes } from '~/lib/content';
import type { ComponentWithTranslator } from '~/lib/i18n';

import styles from './styles.module.css';

type MetaAttributesProps = ComponentWithTranslator<
  Partial<Pick<BlogContentAttributes, 'date' | 'readingTime' | 'language' | 'tags'>>
>;

export default function MetaAttributes({ t, ...props }: MetaAttributesProps): React.ReactElement {
  const readingTime =
    props.readingTime! <= 1
      ? t('components.attributes.readingTimeUnderMinute')
      : t('components.attributes.readingTime', { count: Number(props.readingTime!.toFixed()) });

  return (
    <>
      <div className={styles.container}>
        {props.date && <time dateTime={props.date}>{t.date(props.date)}</time>}
        <span aria-hidden="true">{' · '}</span>
        <span>{readingTime}</span>
        <span aria-hidden="true">{' · '}</span>
        <span>{t('components.attributes.inLanguage', { language: props.language ?? '' })}</span>
      </div>
      <ul className={styles.tagList} aria-label={t('components.attributes.tagsLabel')}>
        {props.tags?.map((tag: string, index: number) => (
          <li className={styles.tagItem} key={`${index}-${tag}`}>
            <Link className={styles.tagLink} href={`/blog/tag/${tag}`}>{`#${tag}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
