import './page.css';

import { FaUnsplash, FaInstagram, FaTiktok, FaYoutube } from 'react-icons/fa';

import Container from '~/components/Container';

export default function HomePage() {
  return (
    <Container>
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
