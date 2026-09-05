'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Masonry } from 'react-plock';

import type { GalleryPage, GalleryPhoto } from './types';
import { useInfiniteScrollPhotos } from './useInfiniteScrollPhotos';
import styles from './styles.module.css';

export type { GalleryPage, GalleryPhoto } from './types';

type GalleryEntry = { id: string; node: React.ReactNode };

interface PhotoGalleryProps {
  initialPhotos: GalleryPhoto[];
  initialHasMore: boolean;
  loadMore: (page: number) => Promise<GalleryPage>;
  hrefBase: string;
  /**
   * Extra, non-paginated cards shown first, interleaved into the same column-balanced
   * masonry as the photos — the bio and collections-index cards on the home page. Each
   * element needs its own stable `key`; omitted on the collection sub-galleries.
   */
  leading?: React.ReactElement;
  labels: {
    loading: string;
    loadMore: string;
    retry: string;
  };
}

/**
 * The real entries, laid out with a plain CSS multi-column grid instead of react-plock.
 * Rendered for the initial (server-rendered) paint and swapped for the JS-balanced
 * <Masonry> once mounted — so crawlers and no-JS clients still get real `<a>`/`<img>`
 * markup for the gallery instead of an empty shell that only fills in client-side.
 */
function GalleryFallbackGrid({ entries }: { entries: GalleryEntry[] }): React.ReactElement {
  return (
    <div className={styles.fallbackGrid}>
      {entries.map((entry) => (
        <div key={entry.id} className={styles.fallbackItem}>
          {entry.node}
        </div>
      ))}
    </div>
  );
}

function GalleryItem({ photo, hrefBase }: { photo: GalleryPhoto; hrefBase: string }): React.ReactElement {
  const [loaded, setLoaded] = useState(false);

  return (
    <Link
      className={styles.item}
      href={`${hrefBase}/${photo.id}`}
      scroll={false}
      style={{ backgroundColor: photo.color ?? undefined }}
    >
      <Image
        className={`${styles.image} ${loaded ? styles.imageLoaded : ''}`}
        src={photo.urls.regular}
        alt={photo.alt_description ?? ''}
        width={photo.width}
        height={photo.height}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        onLoad={() => setLoaded(true)}
      />
    </Link>
  );
}

export default function PhotoGallery({
  initialPhotos,
  initialHasMore,
  loadMore,
  hrefBase,
  leading,
  labels,
}: PhotoGalleryProps): React.ReactElement {
  const { photos, hasMore, loading, failed, mounted, sentinelRef, handleLoadMore } = useInfiniteScrollPhotos(
    initialPhotos,
    initialHasMore,
    loadMore
  );

  const entries = useMemo<GalleryEntry[]>(() => {
    const leadingEntries = leading ? [{ id: 'leading', node: leading }] : [];
    const photoEntries = photos.map((photo) => ({
      id: photo.id,
      node: <GalleryItem key={photo.id} photo={photo} hrefBase={hrefBase} />,
    }));

    return [...leadingEntries, ...photoEntries];
  }, [leading, photos, hrefBase]);

  // react-plock only renders its columns after mount — fall back to plain, real markup
  // (not a skeleton) so the initial batch is there for SEO/no-JS clients too.
  if (!mounted) {
    return <GalleryFallbackGrid entries={entries} />;
  }

  return (
    <>
      <Masonry
        className={styles.masonry}
        items={entries}
        config={{
          columns: [1, 3, 4],
          gap: [3, 3, 3],
          media: [640, 768, 1024],
          useBalancedLayout: true,
        }}
        render={(entry) => entry.node}
      />
      {hasMore && (
        <div className={styles.more}>
          <button className={styles.moreButton} type="button" onClick={handleLoadMore} disabled={loading}>
            {loading ? labels.loading : failed ? labels.retry : labels.loadMore}
          </button>
          <div ref={sentinelRef} className={styles.sentinel} aria-hidden />
        </div>
      )}
    </>
  );
}
