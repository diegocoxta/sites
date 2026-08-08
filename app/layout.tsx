import type { Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import { SITE_ACCENT_COLOR } from '~/lib/envs';

const sourceSans = Source_Sans_3({
  variable: '--main-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceSans.variable}`}
        style={
          {
            '--main-accent-color': SITE_ACCENT_COLOR,
          } as React.CSSProperties
        }
      >
        {children}
      </body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
