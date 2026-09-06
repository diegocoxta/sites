'use client';

import { useMemo } from 'react';

import type { Photo, PhotoFeedPage } from '../../types';
import { useInfiniteScrollPhotos } from '../../hooks/useInfiniteScrollPhotos';
import BackToTop from '../BackToTop';
import Masonry, { type MasonryEntry } from '../Masonry';
import Tile from '../Tile';
import LoadMore from '../LoadMore';

interface FeedProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
  loadMore: (page: number) => Promise<PhotoFeedPage>;
  hrefBase: string;
  leading?: React.ReactElement;
}

export default function Feed({ initialPhotos, initialHasMore, loadMore, hrefBase, leading }: FeedProps) {
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
      {hasMore && <LoadMore loading={loading} failed={failed} onLoadMore={handleLoadMore} sentinelRef={sentinelRef} />}
      <BackToTop />
    </>
  );
}
