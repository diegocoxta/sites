import AboutMe from '~/components/AboutMe';

import { profile } from '~/app/cms';

export default function HomePage() {
  return (
    <>
      <AboutMe bio={profile.bio} links={profile.links} />
    </>
  );
}
