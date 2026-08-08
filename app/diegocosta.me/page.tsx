import Image from 'next/image';

import Header from '~/components/Header';
import Container from '~/components/Container';
import Divisor from '~/components/Divisor';

export default function HomePage() {
  return (
    <>
      <Container>
        <Header name="Diego Costa" />
        <section className="sectionPreview">
          <div className="text">
            <p>This page is currently under construction.</p>
            <p>
              In the meantime, you can check out some of my photos on
              <a target="_blank" href="https://unsplash.com/diegocoxta" className="link">
                <Image src="/unsplash.svg" className="icon" unoptimized alt="Unsplash" width={32} height={32} />{' '}
                Unsplash
              </a>
            </p>
          </div>
        </section>
      </Container>
      <Divisor />
      <section className="social">
        <ul className="socialLinks">
          <li>
            <a target="_blank" href="https://unsplash.com/diegocoxta">
              <Image src="/unsplash.svg" alt="" height={32} width={32} />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://instagram.com/diegocoxta">
              <Image src="/instagram.svg" alt="" height={32} width={32} />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.tiktok.com/@diegocoxta">
              <Image src="/tiktok.svg" alt="" height={32} width={32} />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.youtube.com/@diegocoxta">
              <Image src="/youtube.svg" alt="" height={32} width={32} />
            </a>
          </li>
        </ul>
      </section>
    </>
  );
}
