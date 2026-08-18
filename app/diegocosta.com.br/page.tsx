import AboutMe from '~/components/AboutMe';

import config from '~/app/diegocosta.com.br/config';

export default async function HomePage() {
  return (
    <div id="centered-page">
      <AboutMe bio={config.bio} />
    </div>
  );
}
