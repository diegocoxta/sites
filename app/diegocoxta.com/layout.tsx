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
