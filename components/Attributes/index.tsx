import Link from 'next/link';

import { BlogContentAttributes } from '~/lib/md';

import styles from './styles.module.css';

export type MetaAttributesProps = Partial<Pick<BlogContentAttributes, 'date' | 'readingTime' | 'language' | 'tags'>>;

export default function MetaAttributes(props: MetaAttributesProps): React.ReactElement {
  const readingTime =
    props.readingTime! < 1 ? 'Menos de 1 minuto de leitura' : `${props.readingTime!.toFixed()} minutos de leitura`;

  return (
    <>
      <div className={styles.container}>
        {props.date && <time dateTime={props.date}>{new Date(props.date).toLocaleDateString('pt-br')}</time>}
        <span aria-hidden="true">{' · '}</span>
        <span>{readingTime}</span>
        <span aria-hidden="true">{' · '}</span>
        <span>Em {props.language}</span>
      </div>
      <ul className={styles.tagList} data-testid="taglist-list" aria-label="Tags">
        {props.tags?.map((tag: string, index: number) => (
          <li className={styles.tagItem} key={`${index}-${tag}`} data-testid="taglist-item">
            <Link className={styles.tagLink} href={`/blog/tag/${tag}`}>{`#${tag}`}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
