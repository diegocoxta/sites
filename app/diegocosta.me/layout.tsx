import { ThemeProvider } from 'next-themes';

import AccentColor from '~/components/shared/AccentColor';

import config from '~/app/diegocosta.me/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider forcedTheme={config.theme.defaultTheme}>
      <AccentColor color={config.theme.accentColor} />
      {children}
    </ThemeProvider>
  );
}
