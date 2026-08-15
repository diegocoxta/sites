import Image from 'next/image';
import { FaHeart } from 'react-icons/fa6';
import { XMLParser } from 'fast-xml-parser';

import type { RecentActivityProps } from '../index';

import styles from '../styles.module.css';

interface LetterboxdResponseType {
  items: Array<{
    title: string;
    watchedDate: string;
    memberLike: string;
    cover: string;
    pubDate: string;
  }>;
}

export async function getActivity(username: string): Promise<LetterboxdResponseType> {
  try {
    const response = await fetch(`https://letterboxd.com/${username}/rss/`);

    if (!response.ok) {
      throw new Error(`Erro ao buscar o RSS: ${response.statusText}`);
    }

    const xmlData = await response.text();

    const parser = new XMLParser({
      ignoreAttributes: false,
    });
    const parsedData = parser.parse(xmlData);

    const items = parsedData.rss?.channel?.item;

    if (!items) {
      return { items: [] } as LetterboxdResponseType;
    }

    const moviesArray = Array.isArray(items) ? items : [items];

    const movies: LetterboxdResponseType['items'] = moviesArray.map((item) => {
      const description = item.description || '';
      const imgMatch = description.match(/src="([^"]+)"/);
      const coverUrl = imgMatch ? imgMatch[1] : '';

      return {
        title: item['letterboxd:filmTitle'] || item.title,
        watchedDate: item['letterboxd:watchedDate'] || '',
        memberLike: item['letterboxd:memberLike'] || 'No',
        cover: coverUrl,
        pubDate: item['pubDate'] || '',
      };
    });

    return { items: movies };
  } catch (error) {
    console.error('Erro ao processar o feed do Letterboxd:', error);
    return { items: [] } as LetterboxdResponseType;
  }
}

export default async function LetterboxdWidget(props: RecentActivityProps) {
  if (!props.username) {
    return <></>;
  }

  const data = await getActivity(props.username);

  return (
    <>
      <p className={styles.title}>Recently Watched Movies</p>
      <div className={styles.container}>
        {data.items.slice(0, 3).map((movie) => (
          <div className={styles.item} key={movie.pubDate}>
            <Image
              src={movie.cover}
              width={190}
              height={190}
              alt={movie.title}
              className={styles.itemCover}
              loading="eager"
            />
            <p className={styles.itemTitle}>
              {movie.memberLike === 'Yes' && <FaHeart className={styles.itemLike} />} {movie.title}
            </p>
            <p className={styles.itemDate}>
              Watched in{' '}
              {new Date(movie.watchedDate).toLocaleDateString('en', {
                timeZone: 'UTC',
                month: 'long',
                year: 'numeric',
              })}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
