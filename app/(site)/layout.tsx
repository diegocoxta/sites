import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import CommandBar from '~/components/CommandBar';
import Footer from '~/components/Footer';
import Container from '~/components/Container';

import { getPosts, getPages, profile } from '~/app/cms';

export default function SiteLayout({ children }: React.PropsWithChildren) {
  return (
    <>
      <Header name={profile.author}>
        <ThemeSwitcher />
        <CommandBar pages={[...getPosts(), ...getPages()]} repository={profile.repository.url} />
      </Header>
      {children}
      <Container>
        <Footer sourceCode={profile.repository.url} author={profile.author} />
      </Container>
    </>
  );
}
