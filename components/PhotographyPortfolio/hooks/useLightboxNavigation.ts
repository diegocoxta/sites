'use client';

import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface UseLightboxNavigationParams {
  variant: 'modal' | 'page';
  hrefBase: string;
  closeHref: string;
  prevId: string | null;
  nextId: string | null;
}

/** hrefFor/goTo/close plus the ← → Esc keyboard bindings that drive them. */
export function useLightboxNavigation({ variant, hrefBase, closeHref, prevId, nextId }: UseLightboxNavigationParams) {
  const router = useRouter();

  const hrefFor = useCallback((id: string) => `${hrefBase}/${id}`, [hrefBase]);

  const goTo = useCallback(
    (id: string | null) => {
      if (id) {
        router.replace(hrefFor(id), { scroll: false });
      }
    },
    [router, hrefFor]
  );

  const close = useCallback(() => {
    if (variant === 'modal') {
      router.back();
    } else {
      router.push(closeHref);
    }
  }, [router, variant, closeHref]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowLeft') {
        goTo(prevId);
      } else if (event.key === 'ArrowRight') {
        goTo(nextId);
      } else if (event.key === 'Escape' && variant === 'modal') {
        close();
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [goTo, prevId, nextId, close, variant]);

  return { hrefFor, goTo, close };
}
