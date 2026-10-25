import { redirect } from 'next/navigation';

import config from '~/app/diegocosta.me/config';

export default function HomePage() {
  redirect(`/${config.locales[0]}`);
}
