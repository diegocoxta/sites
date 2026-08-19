export { default as DiscogsRecentActivity } from './widgets/Discogs';
export { default as HardcoverRecentActivity } from './widgets/Hardcover';
export { default as LetterboxdRecentActivity } from './widgets/Letterboxd';
export { default as UnsplashRecentActivity } from './widgets/Unplash';
export { default as LastfmRecentActivity } from './widgets/Lastfm';
export { default as GithubRecentActivity } from './widgets/Github';

export interface RecentActivityProps {
  username?: string;
  authorization?: string;
}
