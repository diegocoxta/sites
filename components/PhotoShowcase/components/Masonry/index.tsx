'use client';

import { useMemo } from 'react';
import { Masonry as PlockMasonry } from 'react-plock';

import { useHasMounted } from '../../hooks/useHasMounted';

import styles from './styles.module.css';

export type MasonryEntry = { id: string; node: React.ReactNode };

interface MasonryProps {
  leading?: React.ReactElement;
  items: MasonryEntry[];
}

export default function Masonry({ leading, items }: MasonryProps) {
  const mounted = useHasMounted();

  const entries = useMemo<MasonryEntry[]>(
    () => (leading ? [{ id: 'leading', node: leading }, ...items] : items),
    [leading, items]
  );

  // react-plock only balances its columns after mount — fall back to plain, real markup
  // (not a skeleton) so crawlers and no-JS clients still get the real cells too.
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
        // 1 column on phones, then 2 / 3 / 4 at 640 / 1024 / 1536 — kept in sync with
        // the `.fallbackGrid` pre-hydration CSS. react-plock reads columns[i] once `i`
        // breakpoints are passed and clamps `i` to media.length - 1, so the trailing
        // 2560 is filler that just makes the 4-column tier reachable.
        columns: [1, 2, 3, 4],
        gap: [3, 3, 3, 3],
        media: [640, 1024, 1536, 2560],
        useBalancedLayout: true,
      }}
      render={(entry) => entry.node}
    />
  );
}
