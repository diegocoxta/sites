'use client';

import { useMemo } from 'react';

import type { Gallery, Photo } from './types';

import { useInfiniteScrollPhotos } from './hooks/useInfiniteScrollPhotos';

import Masonry, { type MasonryEntry } from './components/Masonry';
import Tile from './components/Tile';
import LoadMore from './components/LoadMore';

interface PortfolioProps {
  initialPhotos: Photo[];
  initialHasMore: boolean;
  loadMore: (page: number) => Promise<Gallery>;
  hrefBase: string;
  leading?: React.ReactElement;
}

export default function Portfolio(props: PortfolioProps) {
  const { photos, hasMore, loading, failed, sentinelRef, handleLoadMore } = useInfiniteScrollPhotos(
    props.initialPhotos,
    props.initialHasMore,
    props.loadMore
  );

  const items = useMemo<MasonryEntry[]>(
    () =>
      photos.map((photo) => ({ id: photo.id, node: <Tile key={photo.id} photo={photo} hrefBase={props.hrefBase} /> })),
    [photos, props.hrefBase]
  );

  return (
    <>
      <Masonry leading={props.leading} items={items} />
      {hasMore && <LoadMore loading={loading} failed={failed} onLoadMore={handleLoadMore} sentinelRef={sentinelRef} />}
    </>
  );
}
