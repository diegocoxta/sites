'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import type { GalleryPage, GalleryPhoto } from './types';
import { useHasMounted } from './useHasMounted';

/**
 * The pagination state machine behind the gallery: holds the accumulated photos, fetches
 * the next page on demand (button click or the sentinel entering view), dedupes, and
 * surfaces a `failed` flag instead of ever pretending a failed fetch means "no more photos".
 */
export function useInfiniteScrollPhotos(
  initialPhotos: GalleryPhoto[],
  initialHasMore: boolean,
  loadMore: (page: number) => Promise<GalleryPage>
) {
  const [photos, setPhotos] = useState(initialPhotos);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const mounted = useHasMounted();
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
    // `mounted` isn't used in the body, but the sentinel only exists in the DOM once
    // mounted is true (before that the caller renders a fallback grid instead) — without
    // it as a dependency this effect runs once against a still-null ref and never re-attaches.
  }, [handleLoadMore, hasMore, failed, mounted]);

  return { photos, hasMore, loading, failed, mounted, sentinelRef, handleLoadMore };
}
