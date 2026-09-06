'use client';

import { useMemo } from 'react';
import { Masonry as PlockMasonry } from 'react-plock';

import { useHasMounted } from '../../hooks/useHasMounted';
import styles from './styles.module.css';

export type MasonryEntry = { id: string; node: React.ReactNode };

interface MasonryProps {
  /** Rendered as the first cell, interleaved into the same balanced columns as `items`. */
  leading?: React.ReactElement;
  items: MasonryEntry[];
}

/**
 * The single react-plock masonry shared by every gallery page — the feed, the collections
 * index and each collection — so they all lay out identically. Renders a plain CSS-column
 * fallback for the server paint / no-JS clients and swaps to the JS-balanced columns once
 * mounted.
 */
export default function Masonry({ leading, items }: MasonryProps): React.ReactElement {
  const mounted = useHasMounted();

  const entries = useMemo<MasonryEntry[]>(
    () => (leading ? [{ id: 'leading', node: leading }, ...items] : items),
    [leading, items]
  );

  // react-plock only balances its columns after mount — fall back to plain, real markup
  // (not a skeleton) so crawlers and no-JS   clients still get the real cells too.
  if (!mounted) {
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

  return (
    <PlockMasonry
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
  );
}
