export { default as DiscogsRecentActivity } from './widgets/Discogs';
export { default as HardcoverRecentActivity } from './widgets/Hardcover';
export { default as LetterboxdRecentActivity } from './widgets/Letterboxd';
export { default as UnsplashRecentActivity } from './widgets/Unplash';
export { default as LastfmRecentActivity } from './widgets/Lastfm';

export interface RecentActivityProps {
  username?: string;
  authorization?: string;
}
