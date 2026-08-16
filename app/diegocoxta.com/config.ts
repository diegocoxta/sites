const profile = {
  title: '@diegocoxta',
  description: 'Where you can find my social networks',
  bio: '📍🇧🇷 My daily life, photography, and travels!',
  domain: 'diegocoxta.com',
  avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
  background: '/background_v3.jpg',
  social: [
    { icon: 'FaInstagram', title: 'Instagram', href: 'https://instagram.com/diegocoxta' },
    { icon: 'FaTiktok', title: 'Tiktok', href: 'https://tiktok.com/@diegocoxta' },
    { icon: 'FaYoutube', title: 'YouTube', href: 'https://youtube.com/@diegocoxta' },
    { icon: 'FaMastodon', title: 'Mastodon', href: 'https://mastodon.social/@diegocoxta' },
    { icon: 'FaBluesky', title: 'Bluesky', href: 'https://bsky.app/profile/diegocoxta.bsky.social' },
    { icon: 'FaThreads', title: 'Threads', href: 'https://www.threads.com/@diegocoxta' },
    { icon: 'FaEnvelope', title: 'Mail me', href: 'mailto:x@diegocosta.me' },
  ],
  pages: [
    {
      title: 'Unsplash',
      icon: 'FaCameraRetro',
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
      title: 'Letterboxd',
      icon: 'FaTv',
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
      title: 'Tools I use',
      icon: 'FaToolbox',
      href: '/uses',
      description: 'The page where I share the tools that make my life easier and happier.',
    },
    {
      title: 'My Tech Blog',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br',
      description: 'Updated less frequently than a legacy codebase.',
    },
    {
      title: 'Like this page?',
      icon: 'FaHeart',
      href: 'https://github.com/diegocoxta/pages',
      description: 'The source code is 100% free and open on my GitHub.',
    },
  ],
};

export default profile;
