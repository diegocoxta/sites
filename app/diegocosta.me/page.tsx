import './page.css';

import * as Fa from 'react-icons/fa6';

import type { IconLinkType } from '~/lib/config';
import { getTranslations } from '~/lib/i18n/messages';

import Container from '~/components/Container';

import config from '~/app/diegocosta.me/config';

export default function HomePage() {
  const t = getTranslations(config);

  return (
    <Container>
      <section className="sectionPreview">
        <div className="text">
          <p>{t('page.home.underConstruction')}</p>
          <p>
            {t('page.home.checkPhotos')}{' '}
            <a
              target="_blank"
              href="https://unsplash.com/diegocoxta"
              className="link"
              title={t('config.links.unsplash.title')}
            >
              <Fa.FaUnsplash /> Unsplash
            </a>
          </p>
        </div>
      </section>
      <section className="social">
        <ul className="socialLinks">
          {config.links
            ?.filter((link): link is IconLinkType => link.type === 'icon')
            .map((link) => {
              const Icon = Fa[link.icon as keyof typeof Fa];
              return (
                <li key={link.href}>
                  <a target="_blank" href={link.href} rel="me noopener" title={t(link.title)}>
                    <Icon />
                  </a>
                </li>
              );
            })}
        </ul>
      </section>
    </Container>
  );
}
