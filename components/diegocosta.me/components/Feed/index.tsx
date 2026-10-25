'use client';

import { useMemo } from 'react';

import { useTranslator } from '~/components/shared/TranslationProvider';

import type { Photo, PhotoFeedPage } from '~/components/diegocosta.me/types';
import { useInfiniteScrollPhotos } from '~/components/diegocosta.me/hooks';
import BackToTop from '~/components/diegocosta.me/components/BackToTop';
import Masonry, { type MasonryEntry } from '~/components/diegocosta.me/components/Masonry';
import Tile from '~/components/diegocosta.me/components/Tile';
import LoadMore from '~/components/diegocosta.me/components/LoadMore';

import styles from './styles.module.css';

interface FeedProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
  loadMore: (page: number) => Promise<PhotoFeedPage>;
  hrefBase: string;
  leading?: React.ReactNode;
  trailing?: React.ReactNode;
}

export default function Feed(props: FeedProps) {
  const t = useTranslator();
  const { initialPhotos, initialHasMore, loadMore, hrefBase, leading, trailing } = props;
  const { photos, hasMore, loading, failed, sentinelRef, handleLoadMore } = useInfiniteScrollPhotos(
    initialPhotos,
    initialHasMore,
    loadMore
  );

  const items = useMemo<MasonryEntry[]>(
    () => photos.map((photo) => ({ id: photo.id, node: <Tile key={photo.id} photo={photo} hrefBase={hrefBase} /> })),
    [photos, hrefBase]
  );

  const leadingNode = leading ? (
    <div className={styles.leading}>
      {leading}
      {trailing}
    </div>
  ) : undefined;

  return (
    <>
      <Masonry leading={leadingNode} items={items} />
      {hasMore ? (
        <LoadMore loading={loading} failed={failed} onLoadMore={handleLoadMore} sentinelRef={sentinelRef} />
      ) : (
        <p className={styles.end}>{t('client.components.photoshowcase.feed.end')}</p>
      )}
      <BackToTop />
    </>
  );
}
