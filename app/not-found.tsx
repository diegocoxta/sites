'use client';

import { usePathname } from 'next/navigation';

import NotFound from '~/components/NotFound';

export default function NotFoundPage() {
  const pathname = usePathname();

  return <NotFound pathname={pathname} />;
}
