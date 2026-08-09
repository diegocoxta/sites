import Avatar from '~/components/Avatar';
import Container from '~/components/Container';
import PageLink from '~/components/PageLink';
import SocialLink, { SocialLinkProps } from '~/components/SocialLink';
import Username from '~/components/Username';
import VCard from '~/components/VCard';

import config from '~/app/diegocoxta.com/config';

export default function HomePage() {
  return (
    <Container maxWidth={520}>
      <VCard>
        <Avatar src={config.avatar} alt={config.title} size={96} />
        <Username username={config.title} size={32} />
        <p>{config.bio}</p>
        <VCard horizontal>
          {config.socialLinks.map((socialLink) => (
            <SocialLink
              key={socialLink.href}
              title={socialLink.title}
              href={socialLink.href}
              icon={socialLink.icon as SocialLinkProps['icon']}
            />
          ))}
        </VCard>
      </VCard>
      {config.pages.map((page) => (
        <PageLink key={page.href} {...page} />
      ))}
    </Container>
  );
}
