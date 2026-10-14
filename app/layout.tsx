import type { Viewport, Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import './globals.css';

// Cache buster for the icon: change the env to make browsers fetch it again
const IMAGE_VERSION = process.env.NEXT_PUBLIC_APP_IMAGE_VERSION ?? '1';

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
        {children}
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
    icon: `/icon?v=${IMAGE_VERSION}`,
    apple: `/icon?v=${IMAGE_VERSION}`,
  },
};
