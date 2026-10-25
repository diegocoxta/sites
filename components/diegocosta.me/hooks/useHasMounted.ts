'use client';

import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => undefined;

export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
}
