import type { ConfigProps } from '~/lib/config';

const profile: ConfigProps = {
  title: '@diegocoxta',
  description: 'My daily life, photography, and travels!',
  jobTitle: ['Engineering Manager', 'Senior Software Engineer', 'Photographer'],
  domain: 'diegocoxta.com',
  author: 'Diego Costa',
  avatar: '/background_v3.jpg',
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
        variables: {
          username: process.env.UNSPLASH_USERNAME,
          authorization: process.env.UNSPLASH_ACCESS_KEY,
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
        variables: {
          username: process.env.GITHUB_USERNAME,
          authorization: process.env.GITHUB_PERSONAL_ACCESS_TOKEN,
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
        variables: {
          username: process.env.DISCOGS_USERNAME,
          authorization: process.env.DISCOGS_TOKEN,
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
        variables: {
          username: process.env.LETTERBOXD_USERNAME,
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
        variables: {
          authorization: process.env.HARDCOVER_TOKEN,
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
        variables: {
          username: process.env.LASTFM_USERNAME,
          authorization: process.env.LASTFM_API_KEY,
        },
      },
    },
    {
      type: 'card',
      title: 'Tools I use',
      icon: 'FaToolbox',
      href: 'https://diegocosta.com.br/uses',
      description: 'The page where I share the tools that make my life easier and happier.',
    },
    {
      type: 'card',
      title: 'My Tech Blog',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br',
      description: 'Updated less frequently than a legacy codebase.',
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
