'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { Gallery, Photo } from '../types';

export function useInfiniteScrollPhotos(
  initialPhotos: Photo[],
  initialHasMore: boolean,
  loadMore: (page: number) => Promise<Gallery>
) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleLoadMore = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }

    setLoading(true);
    setFailed(false);

    try {
      const nextPage = page + 1;
      const result = await loadMore(nextPage);

      if (!result.ok) {
        setFailed(true);
        return;
      }

      if (result.photos.length > 0) {
        setPhotos((current) => {
          const seen = new Set(current.map((photo) => photo.id));
          return [...current, ...result.photos.filter((photo) => !seen.has(photo.id))];
        });
        setPage(nextPage);
      }

      setHasMore(result.hasMore);
    } catch {
      setFailed(true);
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, loadMore]);

  useEffect(() => {
    const node = sentinelRef.current;

    if (!node || !hasMore || failed) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          handleLoadMore();
        }
      },
      { rootMargin: '800px 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [handleLoadMore, hasMore, failed]);

  return { photos, hasMore, loading, failed, sentinelRef, handleLoadMore };
}
