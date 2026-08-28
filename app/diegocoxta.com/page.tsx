import { redirect } from 'next/navigation';

import { SUPPORTED_LANGUAGES } from '~/lib/lang';

export const revalidate = 3600;

export default function HomePage() {
  redirect(SUPPORTED_LANGUAGES[0]);
}
