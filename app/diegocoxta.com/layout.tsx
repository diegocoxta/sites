import type { Metadata } from 'next';

import config from '~/app/diegocoxta.com/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return children;
}

export const metadata: Metadata = {
  title: {
    template: `%s | ${config.title}`,
    default: config.title,
  },
  description: config.description,
};
