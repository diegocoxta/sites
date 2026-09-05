'use client';

import { useCallback, useRef } from 'react';

const SWIPE_THRESHOLD = 50;

/** Left/right touch swipe -> next/previous, via the same `goTo` the arrows and keyboard use. */
export function useSwipeNavigation(goTo: (id: string | null) => void, prevId: string | null, nextId: string | null) {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = useCallback((event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: React.TouchEvent) => {
      const startX = touchStartX.current;
      touchStartX.current = null;

      if (startX == null) {
        return;
      }

      const endX = event.changedTouches[0]?.clientX ?? startX;
      const delta = endX - startX;

      if (delta > SWIPE_THRESHOLD) {
        goTo(prevId);
      } else if (delta < -SWIPE_THRESHOLD) {
        goTo(nextId);
      }
    },
    [goTo, prevId, nextId]
  );

  return { onTouchStart, onTouchEnd };
}
