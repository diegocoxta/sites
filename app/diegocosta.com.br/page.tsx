import PageDescription from '~/components/PageDescription';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.com.br/config';

export default function HomePage() {
  const t = getTranslations(config);

  return <PageDescription id="centered-page" aria-label={t('page.home.ariaLabel')} content={t('page.home.bio')} />;
}
