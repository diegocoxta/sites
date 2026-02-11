import { type Metadata } from 'next';

import { ThemeProvider } from 'next-themes';
import { Source_Sans_3 } from 'next/font/google';

import { profile } from '~/app/cms';

import './globals.css';

const sourceSans = Source_Sans_3({
  variable: '--main-primary-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable}`}>
        <ThemeProvider defaultTheme="dark">{children}</ThemeProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${profile.title}`,
    default: profile.title,
  },
  description: profile.description,
};
