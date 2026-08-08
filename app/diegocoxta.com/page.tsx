import Image from 'next/image';

import Avatar from '~/components/Avatar';
import LinkEntry from '~/components/LinkEntry';

import config from '~/app/diegocoxta.com/config';
import Title from '~/components/Title';
import Container from '~/components/Container';
import Header from '~/components/Header';
import ThemeSwitcher from '~/components/ThemeSwitcher';
import Divisor from '~/components/Divisor';
import SocialButton, { type SocialButtonProps, SocialButtonList } from '~/components/SocialButton';
import Footer from '~/components/Footer';

export default function HomePage() {
  return (
    <>
      <Container>
        <Header name={config.title} size={28} avatar={config.avatar}>
          <ThemeSwitcher />
        </Header>
        <SocialButtonList>
          {config.socialLinks.map((socialLink) => (
            <SocialButton
              key={socialLink.href}
              title={socialLink.title}
              href={socialLink.href}
              icon={socialLink.icon as SocialButtonProps['icon']}
            />
          ))}
        </SocialButtonList>
        <LinkEntry
          title="/uses"
          description="The page where I share the tools that make my life easier and happier."
          href="/uses"
        />
        <LinkEntry title="Instagram" href="https://instagram.com/diegocoxta" />
        <LinkEntry title="Instagram" href="https://instagram.com/diegocoxta" />
      </Container>
      <Divisor />
      <Footer author={config.title} />
    </>
  );
}
