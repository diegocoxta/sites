import AboutMe from '~/components/AboutMe';
import Links from '~/components/Links';

import { profile } from '~/lib/cms';

export default function HomePage() {
  return (
    <>
      <AboutMe bio={profile.bio} />
      <Links links={profile.links} />
    </>
  );
}
