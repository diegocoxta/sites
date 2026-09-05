import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { getTranslations } from '~/lib/i18n/messages';
import Unsplash from '~/lib/unsplash';

import Container from '~/components/Container';
import PhotoGalleryNav from '~/components/PhotoGalleryNav';

import config from '~/app/diegocosta.me/config';

import styles from './page.module.css';

const unsplash = Unsplash(config.unsplash);

export function generateMetadata(): Metadata {
  const t = getTranslations(config);

  return {
    title: t('page.about.title'),
    description: t('page.about.description'),
    alternates: { canonical: '/about' },
  };
}

export default async function AboutPage() {
  const t = getTranslations(config);
  const [photos, stats] = await Promise.all([unsplash.getAllPhotos(), unsplash.getStats()]);
  // Stand in for a dedicated self-portrait until one is set — see PhotoBioCard for the
  // same placeholder on the home page.
  const [primary, secondary] = photos;

  return (
    <Container>
      <PhotoGalleryNav current="about" t={t} />
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>{t('page.about.headline')}</h1>
      </div>
      <div className={styles.layout}>
        <div className={styles.copy}>
          <h2 className={styles.copyTitle}>{t('page.about.subheadline')}</h2>
          <p>{t('page.about.paragraph1')}</p>
          <p>{t('page.about.paragraph2')}</p>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.totalPhotos}</span>
              <span className={styles.statLabel}>{t('page.about.statsPhotos')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.totalCollections}</span>
              <span className={styles.statLabel}>{t('page.about.statsCollections')}</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>{stats.yearsActive}</span>
              <span className={styles.statLabel}>{t('page.about.statsYears')}</span>
            </div>
          </div>
          <Link className={styles.cta} href="/contact">
            {t('page.about.contactCta')}
          </Link>
        </div>
        <div className={styles.portraits}>
          {primary && (
            <div className={styles.portraitLarge}>
              <Image
                src={primary.urls.regular}
                alt={primary.alt_description ?? ''}
                fill
                sizes="(max-width: 900px) 100vw, 380px"
              />
            </div>
          )}
          {secondary && (
            <div className={styles.portraitSmall}>
              <Image
                src={secondary.urls.regular}
                alt={secondary.alt_description ?? ''}
                fill
                sizes="(max-width: 900px) 100vw, 380px"
              />
            </div>
          )}
        </div>
      </div>
    </Container>
  );
}
