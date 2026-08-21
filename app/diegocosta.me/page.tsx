import './page.css';

import * as Fa from 'react-icons/fa6';

import Container from '~/components/Container';

import config from '~/app/diegocosta.me/config';

export default function HomePage() {
  return (
    <Container>
      <section className="sectionPreview">
        <div className="text">
          <p>This page is currently under construction.</p>
          <p>
            In the meantime, you can check out some of my photos on
            <a target="_blank" href="https://unsplash.com/diegocoxta" className="link">
              <Fa.FaUnsplash /> Unsplash
            </a>
          </p>
        </div>
      </section>
      <section className="social">
        <ul className="socialLinks">
          {config.links
            ?.filter((link) => link.type === 'icon')
            .map((link) => {
              const Icon = Fa[link.icon as keyof typeof Fa];
              return (
                <li key={link.href}>
                  <a target="_blank" href={link.href} rel="me noreferrer noopener">
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
