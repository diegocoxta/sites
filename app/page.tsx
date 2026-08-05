import Layout from '~/components/Layout';
import AboutMe from '~/components/AboutMe';
import Links from '~/components/Links';

import { getPages, getPosts, profile } from '~/lib/cms';

export default function HomePage() {
  return (
    <Layout repository={profile.repository.url} author={profile.author} posts={getPosts()} pages={getPages()} centered>
      <AboutMe bio={profile.bio} />
      <Links links={profile.links} />
    </Layout>
  );
}
