import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';

import config from '~/app/diegocoxta.com/config';

import './globals.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
};
