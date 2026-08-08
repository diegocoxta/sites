import AboutMe from '~/components/AboutMe';

import config from '~/app/diegocosta.com.br/config';

export default async function HomePage() {
  return <AboutMe bio={config.bio} />;
}
