import type { Metadata } from 'next';

import { getTranslations } from '~/lib/i18n/messages';

import { PageDescription } from '~/components/Blog';

import config from '~/app/diegocosta.com.br/config';

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <main id="centered-page" aria-label={t('page.home.arialabel')}>
      <h1 className="srOnly">{t('page.home.heading')}</h1>
      <PageDescription>{t('page.home.bio')}</PageDescription>
    </main>
  );
}

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};
