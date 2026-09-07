import { ThemeProvider } from 'next-themes';

import config from '~/app/diegocoxta.com/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <ThemeProvider defaultTheme={config.theme.defaultTheme}>{children}</ThemeProvider>;
}
