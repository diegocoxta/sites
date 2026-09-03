import type { Metadata } from 'next';
import { cookies, headers } from 'next/headers';

import type { ConfigType } from '~/lib/config';
import { LOCALE_COOKIE } from '~/lib/i18n/locale';
import { getClientMessages, getTranslations } from '~/lib/i18n/messages';

import TranslationProvider from '~/components/TranslationProvider';
import Header from '~/components/Header';
import Branding from '~/components/Branding';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import NotFound from '~/components/NotFound';
import Footer from '~/components/Footer';

import diegocostaComBr from '~/app/diegocosta.com.br/config';
import diegocostaMe from '~/app/diegocosta.me/config';
import diegocoxtaCom from '~/app/diegocoxta.com/config';

const SITES: readonly ConfigType[] = [diegocoxtaCom, diegocostaComBr, diegocostaMe];

export default async function NotFoundPage() {
  let hostname = (await headers()).get('host')?.split(':')[0];

  if (hostname === 'localhost') {
    hostname = process.env.DEV_SITE || 'diegocosta.com.br';
  }

  const config = SITES.find((candidate) => candidate.domain === hostname) ?? diegocostaComBr;
  const locale = ((await cookies()).get(LOCALE_COOKIE)?.value as ConfigType['locales'][number]) ?? config.locales[0];

  const t = getTranslations(config, locale);
  const messages = getClientMessages(config);

  return (
    <TranslationProvider messages={messages} locale={locale}>
      <Header left={<Branding name={config.author} />} right={<ThemeSwitcher />} />
      <NotFound t={t} domain={config.domain} />
      <Footer author={config.author} t={t} />
    </TranslationProvider>
  );
}

export const metadata: Metadata = {
  title: '404',
  robots: { index: false, follow: false },
};
