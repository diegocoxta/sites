'use client';

import { useRef, useState } from 'react';

import { GetUserCollectionsResponseType } from '~/lib/services/unsplash';

import PhotoCollection from '~/components/PhotoCollection';

import styles from './styles.module.css';

type PhotoCollectionListProps = GetUserCollectionsResponseType;

export default function PhotoCollectionList(props: PhotoCollectionListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth - container.clientWidth;

    const progress = maxScroll > 0 ? (scrollLeft / maxScroll) * 100 : 0;
    setScrollProgress(progress);
  };

  return (
    <>
      <div className={styles.container} ref={scrollRef} onScroll={handleScroll}>
        <div className={styles.track}>
          {props.collections.map((collection, index) => {
            return (
              <div
                key={collection.id}
                data-index={index}
                className={styles.item}
                onClick={() => {
                  const container = scrollRef.current;
                  const cardElement = container?.children[0].children[index] as HTMLElement;

                  if (container && cardElement) {
                    const scrollPosition =
                      cardElement.offsetLeft - container.clientWidth / 2 + cardElement.clientWidth / 2;
                    container.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                  }
                }}
              >
                <PhotoCollection photos={collection.preview_photos} />
                <div className={styles.details}>
                  <p className={styles.title}>{collection.title}</p>
                  <p className={styles.description}>{collection.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.progress}>
        <div className={styles.progressBar} style={{ width: `${scrollProgress}%` }} />
      </div>
    </>
  );
}
