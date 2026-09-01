import type { Viewport, Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { ThemeProvider } from 'next-themes';

import './globals.css';

const sourceSans = Source_Sans_3({
  variable: '--main-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${sourceSans.variable}`}
        style={
          {
            '--main-accent-color': `#${process.env.SITE_ACCENT_COLOR ?? 'e55242'}`,
          } as React.CSSProperties
        }
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  manifest: '/manifest.json',
  icons: {
    icon: '/icon?v=1',
    apple: '/icon?v=1',
  },
};
