import AboutMe from '~/components/AboutMe';

import { getTranslations } from '~/lib/i18n/messages';

import config from '~/app/diegocosta.com.br/config';

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <div id="centered-page">
      <AboutMe t={t} />
    </div>
  );
}
