import Link from 'next/link';

import { BlogContentAttributes } from '~/app/cms';

import styles from './styles.module.css';

export type MetaAttributesProps = Partial<Pick<BlogContentAttributes, 'date' | 'readingTime' | 'language' | 'tags'>>;

export default function MetaAttributes(props: MetaAttributesProps): React.ReactElement {
  const readingTime =
    props.readingTime! < 1 ? 'Less than 1 minute of reading' : `${props.readingTime!.toFixed()} minutes of reading`;
  return (
    <>
      <p className={styles.container}>{`${props.date} · ${readingTime} · In ${props.language}`}</p>
      <ul className={styles.tagList} data-testid="taglist-list">
        {props.tags?.map((tag: string, index: number) => (
          <li className={styles.tagItem} key={`${index}-${tag}`} data-testid="taglist-item">
            <Link className={styles.tagLink} href={`/blog/tag/${tag}`}>{`#${tag}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
