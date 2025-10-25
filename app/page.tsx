import Center from '~/components/Center';
import Container from '~/components/Container';
import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import AboutMe from '~/components/AboutMe';

import { getPosts, getPages, profile } from '~/app/cms';

export default function HomePage() {
  return (
    <Center>
      <Container>
        <Header name={profile.author}>
          <ThemeSwitcher />
          <CommandBar pages={[...getPosts(), ...getPages()]} repository={profile.repository.url} />
        </Header>
        <AboutMe bio={profile.bio} links={profile.links} />
      </Container>
    </Center>
  );
}
