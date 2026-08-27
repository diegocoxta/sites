import type { ConfigType } from '~/lib/config';

const profile: ConfigType = {
  title: '@diegocoxta',
  description: 'My daily life, photography, and travels!',
  jobTitle: ['Engineering Manager', 'Senior Software Engineer', 'Photographer'],
  domain: 'diegocoxta.com',
  author: 'Diego Costa',
  avatar: '/background_v2.jpg',
  links: [
    { type: 'icon', icon: 'FaInstagram', title: 'Instagram', href: 'https://instagram.com/diegocoxta' },
    { type: 'icon', icon: 'FaTiktok', title: 'Tiktok', href: 'https://tiktok.com/@diegocoxta' },
    { type: 'icon', icon: 'FaYoutube', title: 'YouTube', href: 'https://youtube.com/@diegocoxta' },
    { type: 'icon', icon: 'FaMastodon', title: 'Mastodon', href: 'https://mastodon.social/@diegocoxta' },
    { type: 'icon', icon: 'FaBluesky', title: 'Bluesky', href: 'https://bsky.app/profile/diegocoxta.com' },
    { type: 'icon', icon: 'FaThreads', title: 'Threads', href: 'https://threads.com/@diegocoxta' },
    { type: 'icon', icon: 'FaEnvelope', title: 'Drop me a line', href: 'mailto:diego@diegocoxta.com' },
    {
      type: 'card',
      title: 'Unsplash',
      icon: 'FaUnsplash',
      href: 'https://unsplash.com/diegocoxta',
      description: 'The world through my lenses.',
      recentActivity: {
        widget: 'UnsplashRecentActivity',
        props: {
          title: 'Recent Photos',
          username: process.env.UNSPLASH_USERNAME,
          authorization: process.env.UNSPLASH_ACCESS_KEY,
        },
      },
    },
    {
      type: 'card',
      title: 'Discogs',
      icon: 'FaRecordVinyl',
      href: 'https://www.discogs.com/user/diegocoxta',
      description: 'The records currently on my shelf.',
      recentActivity: {
        widget: 'DiscogsRecentActivity',
        props: {
          title: 'Last Records Purchased',
          username: process.env.DISCOGS_USERNAME,
          authorization: process.env.DISCOGS_TOKEN,
        },
      },
    },
    {
      type: 'card',
      title: 'Hardcover',
      icon: 'FaBookBookmark',
      href: 'https://hardcover.app/@diegocoxta',
      description: 'Keeping track of pages and stories.',
      recentActivity: {
        widget: 'HardcoverRecentActivity',
        props: {
          title: 'Currently Reading',
          authorization: process.env.HARDCOVER_TOKEN,
        },
      },
    },
    {
      type: 'card',
      title: 'Letterboxd',
      icon: 'FaLetterboxd',
      href: 'https://letterboxd.com/diegocoxta/',
      description: 'Logging the movies I watch.',
      recentActivity: {
        widget: 'LetterboxdRecentActivity',
        props: {
          title: 'Recently Watched Movies',
          username: process.env.LETTERBOXD_USERNAME,
        },
      },
    },
    {
      type: 'card',
      title: 'My Tech Blog',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br/blog',
      description: 'Updated less frequently than a legacy codebase.',
      recentActivity: {
        widget: 'FeedListingRecentActivity',
        props: {
          title: 'Latest blog posts',
          feed: 'https://diegocosta.com.br/blog/feed',
        },
      },
    },
    {
      type: 'card',
      title: 'Github',
      icon: 'FaGithub',
      href: 'https://github.com/diegocoxta',
      description: 'Where my personal apps live, thrive, and occasionally get abandoned.',
      recentActivity: {
        widget: 'GithubRecentActivity',
        props: {
          title: 'Contribution Activity',
          username: process.env.GITHUB_USERNAME,
          authorization: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
        },
      },
    },
    {
      type: 'card',
      title: 'Last.fm',
      icon: 'FaLastfm',
      href: 'https://www.last.fm/user/diego_coxta',
      description: 'The real-time soundtrack of my daily life.',
      recentActivity: {
        widget: 'LastfmRecentActivity',
        props: {
          title: 'Monthly Top Artists',
          username: process.env.LASTFM_USERNAME,
          authorization: process.env.LASTFM_API_KEY,
        },
      },
    },
    {
      type: 'card',
      title: 'Setlist.fm',
      icon: 'FaTicket',
      href: 'https://www.setlist.fm/user/diegocoxta',
      description: 'Tracking the concerts I survive.',
      recentActivity: {
        widget: 'SetlistRecentActivity',
        props: {
          title: 'Latest attended concerts',
          username: process.env.SETLIST_USERNAME,
          authorization: process.env.SETLIST_API_KEY,
        },
      },
    },
    {
      type: 'card',
      title: 'Like this page?',
      icon: 'FaHeart',
      href: 'https://github.com/diegocoxta/pages',
      description: 'The source code is 100% free and open on my GitHub.',
    },
  ],
};

export default profile;
