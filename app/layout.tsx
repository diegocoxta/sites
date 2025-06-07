import { type Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import { Source_Sans_3 } from 'next/font/google';

import './globals.css';

import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';

import { getPosts, getPages, profile } from '~/app/cms';

const sourceSans = Source_Sans_3({
  variable: '--main-primary-font',
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${profile.title}`,
    default: profile.title,
  },
  description: profile.description,
};

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${sourceSans.variable}`}>
        <ThemeProvider>
          <Header name={profile.author}>
            <ThemeSwitcher />
            <CommandBar pages={[...getPosts(), ...getPages()]} repository={profile.repository.url} />
          </Header>
          {children}
          <Footer sourceCode={profile.repository.url} author={profile.author} />
        </ThemeProvider>
      </body>
    </html>
  );
}
