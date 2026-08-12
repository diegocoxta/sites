import Link from 'next/link';

import { BlogContentAttributes } from '~/lib/mdcms';

import styles from './styles.module.css';

export type MetaAttributesProps = Partial<Pick<BlogContentAttributes, 'date' | 'readingTime' | 'language' | 'tags'>>;

export default function MetaAttributes(props: MetaAttributesProps): React.ReactElement {
  const readingTime =
    props.readingTime! < 1 ? 'Menos de 1 minuto de leitura' : `${props.readingTime!.toFixed()} minutos de leitura`;

  return (
    <>
      <p
        className={styles.container}
      >{`${props.date && new Date(props.date).toLocaleDateString('pt-br')} · ${readingTime} · Em ${props.language}`}</p>
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
