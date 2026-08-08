import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Footer from '~/components/Footer';

import config from '~/app/diegocoxta.com/config';

import './globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider enableSystem={false}>
      <Header name={config.title} size={28}>
        <ThemeSwitcher />
      </Header>
      {children}
      <Footer author={config.title} />
    </ThemeProvider>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
};
