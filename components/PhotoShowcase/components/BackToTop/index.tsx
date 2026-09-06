'use client';

import { useEffect, useState } from 'react';

import { useTranslator } from '~/components/TranslationProvider';

import styles from './styles.module.css';

export default function BackToTop() {
  const t = useTranslator();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setVisible(window.scrollY > window.innerHeight));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
  };

  return (
    <button
      type="button"
      className={`${styles.button} ${visible ? styles.visible : ''}`}
      onClick={scrollToTop}
      aria-label={t('client.components.photoShowcase.backToTop.label')}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden focusable="false">
        <path d="M12 5.4 4.6 12.8 6 14.2l5-5V20h2V9.2l5 5 1.4-1.4z" fill="currentColor" />
      </svg>
    </button>
  );
}
