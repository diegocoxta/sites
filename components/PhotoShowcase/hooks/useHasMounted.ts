'use client';

import { useSyncExternalStore } from 'react';

const subscribeNever = () => () => undefined;

// react-plock only balances/positions its columns client-side — this flips to `true`
// once hydrated, without the "setState in an effect" pattern the mount-detection idiom
// (`useState` + `useEffect`) would otherwise trigger.
export function useHasMounted(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => true,
    () => false
  );
}
