'use server';

import { domainEnv } from '~/lib/domain';
import { getNowPlaying } from '~/lib/services/lastfm';

import config from '~/app/diegocoxta.com/config';

export type NowPlayingTrack = {
  name: string;
  artist: string;
  url: string;
};

const username = domainEnv('LASTFM_USERNAME', config.domain, { required: false });
const authorization = domainEnv('LASTFM_API_KEY', config.domain, { required: false });

export async function getLastfmNowPlayingTrack(): Promise<NowPlayingTrack | null> {
  if (!username || !authorization) {
    return null;
  }

  const track = await getNowPlaying({ username, authorization });

  return track ? { name: track.name, artist: track.artist['#text'], url: track.url } : null;
}
