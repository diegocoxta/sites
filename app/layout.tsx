import type { Viewport, Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';

import './globals.css';

const IMAGE_VERSION = process.env.NEXT_PUBLIC_APP_IMAGE_VERSION ?? '1';

const sourceSans = Source_Sans_3({
  variable: '--main-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default async function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html suppressHydrationWarning>
      <body className={`${sourceSans.variable}`}>{children}</body>
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
