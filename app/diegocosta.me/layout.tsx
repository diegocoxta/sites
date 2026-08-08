import type { Metadata } from 'next';

import './global.css';

export default function RootLayout({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

export const metadata: Metadata = {
  title: {
    template: `%s | Diego Costa  // Photographer`,
    default: `Diego Costa  // Photographer`,
  },
};
