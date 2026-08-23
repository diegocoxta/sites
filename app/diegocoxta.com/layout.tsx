import type { Metadata } from 'next';

import PersonSchema from '~/components/PersonSchema';

import config from '~/app/diegocoxta.com/config';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <PersonSchema data={config} />
      {children}
    </>
  );
}

export const metadata: Metadata = {
  metadataBase: `https://${config.domain}`,
  title: {
    template: `%s | ${config.author} (${config.title})`,
    default: `${config.author} (${config.title})`,
  },
  description: config.description,
  alternates: {
    canonical: '/',
  },
};
