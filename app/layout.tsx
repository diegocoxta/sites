import type { Viewport } from 'next';
import { Source_Sans_3 } from 'next/font/google';

const sourceSans = Source_Sans_3({
  variable: '--main-primary-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable}`}>{children}</body>
    </html>
  );
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};
