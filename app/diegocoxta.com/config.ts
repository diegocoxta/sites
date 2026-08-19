const profile = {
  title: 'Diego Costa',
  description: 'My daily life, photography, and travels!',
  domain: 'diegocoxta.com',
  author: '@diegocoxta',
  background: '/background_v3.jpg',
  icons: [
    { icon: 'FaInstagram', title: 'Instagram', href: 'https://instagram.com/diegocoxta' },
    { icon: 'FaTiktok', title: 'Tiktok', href: 'https://tiktok.com/@diegocoxta' },
    { icon: 'FaYoutube', title: 'YouTube', href: 'https://youtube.com/@diegocoxta' },
    { icon: 'FaMastodon', title: 'Mastodon', href: 'https://mastodon.social/@diegocoxta' },
    { icon: 'FaBluesky', title: 'Bluesky', href: 'https://bsky.app/profile/diegocoxta.com' },
    { icon: 'FaThreads', title: 'Threads', href: 'https://threads.com/@diegocoxta' },
  ],
  cards: [
    {
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
    {
      title: 'Drop me a line',
      icon: 'FaEnvelope',
      href: 'mailto:diego@diegocoxta.com',
      description: 'Are you old school? Send me an email.',
    },
  ],
};

export default profile;
