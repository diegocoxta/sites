'use client';

import { useMemo } from 'react';

import { useTranslator } from '~/components/TranslationProvider';

import type { Photo, PhotoFeedPage } from '../../types';
import { useInfiniteScrollPhotos } from '../../hooks/useInfiniteScrollPhotos';
import BackToTop from '../BackToTop';
import Masonry, { type MasonryEntry } from '../Masonry';
import Tile from '../Tile';
import LoadMore from '../LoadMore';

import styles from './styles.module.css';

interface FeedProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
  loadMore: (page: number) => Promise<PhotoFeedPage>;
  hrefBase: string;
  leading?: React.ReactElement;
}

export default function Feed(props: FeedProps) {
  const t = useTranslator();
  const { initialPhotos, initialHasMore, loadMore, hrefBase, leading } = props;
  const { photos, hasMore, loading, failed, sentinelRef, handleLoadMore } = useInfiniteScrollPhotos(
    initialPhotos,
    initialHasMore,
    loadMore
  );

  const items = useMemo<MasonryEntry[]>(
    () => photos.map((photo) => ({ id: photo.id, node: <Tile key={photo.id} photo={photo} hrefBase={hrefBase} /> })),
    [photos, hrefBase]
  );

  return (
    <>
      <Masonry leading={leading} items={items} />
      {hasMore ? (
        <LoadMore loading={loading} failed={failed} onLoadMore={handleLoadMore} sentinelRef={sentinelRef} />
      ) : (
        <p className={styles.end}>{t('client.components.photoshowcase.feed.end')}</p>
      )}
      <BackToTop />
    </>
  );
}
