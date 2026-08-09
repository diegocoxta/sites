import { FaUnsplash, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

import Container from '~/components/Container';
import Header from '~/components/Header';
import Branding from '~/components/Branding';
import Title from '~/components/Title';

export default function HomePage() {
  return (
    <Container>
      <Header
        left={<Branding name="Diego Costa" size={30} />}
        right={<Title fontSize={18}>Aspiring photographer</Title>}
      />
      <section className="sectionPreview">
        <div className="text">
          <p>This page is currently under construction.</p>
          <p>
            In the meantime, you can check out some of my photos on
            <a target="_blank" href="https://unsplash.com/diegocoxta" className="link">
              <FaUnsplash /> Unsplash
            </a>
          </p>
        </div>
      </section>
      <section className="social">
        <ul className="socialLinks">
          <li>
            <a target="_blank" href="https://unsplash.com/diegocoxta">
              <FaUnsplash />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://instagram.com/diegocoxta">
              <FaInstagram />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.tiktok.com/@diegocoxta">
              <FaTiktok />
            </a>
          </li>
          <li>
            <a target="_blank" href="https://www.youtube.com/@diegocoxta">
              <FaYoutube />
            </a>
          </li>
        </ul>
      </section>
    </Container>
  );
}
