'use client';

import { useEffect, useState } from 'react';

import { useTranslator } from '~/components/TranslationProvider';

import { getLastfmNowPlayingTrack, type NowPlayingTrack } from '~/app/diegocoxta.com/actions';

import styles from './styles.module.css';

export default function NowPlaying() {
  const t = useTranslator();
  const [track, setTrack] = useState<NowPlayingTrack | null>(null);

  useEffect(() => {
    let active = true;

    getLastfmNowPlayingTrack()
      .then((result) => {
        if (active) {
          setTrack(result);
        }
      })
      .catch(() => {});

    return () => {
      active = false;
    };
  }, []);

  if (!track) {
    return null;
  }

  return (
    <p className={styles.nowPlaying}>
      <span className={styles.pulse} aria-hidden />
      <span className={styles.label}>{t('client.components.linkhub.recentactivity.lastfm.nowplaying')}</span>
      <a className={styles.track} href={track.url} target="_blank" rel="noopener">
        {track.name} — {track.artist}
      </a>
    </p>
  );
}
