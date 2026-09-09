'use server';

import { getNowPlaying } from '~/lib/services/lastfm';

export type NowPlayingTrack = {
  name: string;
  artist: string;
  url: string;
};

const username = process.env.LASTFM_USERNAME;
const authorization = process.env.LASTFM_API_KEY;

export async function getLastfmNowPlayingTrack(): Promise<NowPlayingTrack | null> {
  if (!username || !authorization) {
    return null;
  }

  const track = await getNowPlaying({ username, authorization });

  return track ? { name: track.name, artist: track.artist['#text'], url: track.url } : null;
}
