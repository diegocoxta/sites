import { redirect } from 'next/navigation';

import config from '~/app/diegocoxta.com/config';

export const revalidate = 43200;

export default function HomePage() {
  redirect(`/${config.locales[0]}`);
}
