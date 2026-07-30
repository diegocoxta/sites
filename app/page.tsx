import Layout from '~/components/Layout';
import AboutMe from '~/components/AboutMe';

import { getPages, getPosts, profile } from '~/app/cms';

export default function HomePage() {
  return (
    <Layout repository={profile.repository.url} author={profile.author} posts={getPosts()} pages={getPages()} centered>
      <AboutMe bio={profile.bio} links={profile.links} />
    </Layout>
  );
}
