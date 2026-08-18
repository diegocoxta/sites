import type { Metadata } from 'next';

import Header from '~/components/Header';
import Branding from '~/components/Branding';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Footer from '~/components/Footer';

import config from '../diegocosta.me/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header left={<Branding name={config.author} />} right={<ThemeSwitcher />} />
      {children}
      <Footer author={config.author} />
    </>
  );
}

export const metadata: Metadata = {
  metadataBase: `https://${config.domain}`,
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
  alternates: {
    canonical: '/',
  },
};
