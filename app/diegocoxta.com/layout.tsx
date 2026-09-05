import { ThemeProvider } from 'next-themes';

import PersonSchema from '~/components/PersonSchema';

import config from '~/app/diegocoxta.com/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <ThemeProvider defaultTheme={config.theme.defaultTheme}>
      <PersonSchema data={config} />
      {children}
    </ThemeProvider>
  );
}
