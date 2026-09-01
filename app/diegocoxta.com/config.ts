import type { ConfigType } from '~/lib/config';

import globalConfig from '~/app/config';

const config: ConfigType = {
  ...globalConfig,
  title: '@diegocoxta',
  description: 'config.description',
  locales: ['pt', 'en', 'es'],
  jobTitle: ['Engineering Manager', 'Senior Software Engineer', 'Photographer'],
  domain: 'diegocoxta.com',
  author: 'Diego Costa',
  avatar: '/background_v4.jpg',
  links: [
    {
      type: 'icon',
      icon: 'FaInstagram',
      title: 'config.links.instagram.title',
      href: 'https://instagram.com/diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaTiktok',
      title: 'config.links.tiktok.title',
      href: 'https://tiktok.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaYoutube',
      title: 'config.links.youtube.title',
      href: 'https://youtube.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaMastodon',
      title: 'config.links.mastodon.title',
      href: 'https://mastodon.social/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaBluesky',
      title: 'config.links.bluesky.title',
      href: 'https://bsky.app/profile/diegocoxta.com',
    },
    {
      type: 'icon',
      icon: 'FaThreads',
      title: 'config.links.threads.title',
      href: 'https://threads.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaEnvelope',
      title: 'config.links.envelope.title',
      href: 'mailto:diego@diegocoxta.com',
    },
    {
      type: 'card',
      title: 'config.links.shop.title',
      icon: 'FaCartShopping',
      href: 'https://lista.mercadolivre.com.br/_CustId_126689975?',
      description: 'config.links.shop.description',
    },
    {
      type: 'card',
      title: 'Unsplash',
      icon: 'FaUnsplash',
      href: 'https://unsplash.com/diegocoxta',
      description: 'config.links.unsplash.description',
      recentActivity: {
        widget: 'UnsplashRecentActivity',
        config: {
          title: 'config.links.unsplash.recentActivity.title',
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
      description: 'config.links.discogs.description',
      recentActivity: {
        widget: 'DiscogsRecentActivity',
        config: {
          title: 'config.links.discogs.recentActivity.title',
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
      description: 'config.links.hardcover.description',
      recentActivity: {
        widget: 'HardcoverRecentActivity',
        config: {
          title: 'config.links.hardcover.recentActivity.title',
          authorization: process.env.HARDCOVER_TOKEN,
        },
      },
    },
    {
      type: 'card',
      title: 'Letterboxd',
      icon: 'FaLetterboxd',
      href: 'https://letterboxd.com/diegocoxta/',
      description: 'config.links.letterboxd.description',
      recentActivity: {
        widget: 'LetterboxdRecentActivity',
        config: {
          title: 'config.links.letterboxd.recentActivity.title',
          username: process.env.LETTERBOXD_USERNAME,
        },
      },
    },
    {
      type: 'card',
      title: 'My Tech Blog',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br/blog',
      description: 'config.links.blog.description',
      recentActivity: {
        widget: 'FeedListingRecentActivity',
        config: {
          title: 'config.links.blog.recentActivity.title',
          feed: 'https://diegocosta.com.br/blog/feed',
        },
      },
    },
    {
      type: 'card',
      title: 'Github',
      icon: 'FaGithub',
      href: 'https://github.com/diegocoxta',
      description: 'config.links.github.description',
      recentActivity: {
        widget: 'GithubRecentActivity',
        config: {
          title: 'config.links.github.recentActivity.title',
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
      description: 'config.links.lastfm.description',
      recentActivity: {
        widget: 'LastfmRecentActivity',
        config: {
          title: 'config.links.lastfm.recentActivity.title',
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
      description: 'config.links.setlist.description',
      recentActivity: {
        widget: 'SetlistRecentActivity',
        config: {
          title: 'config.links.setlist.recentActivity.title',
          username: process.env.SETLIST_USERNAME,
          authorization: process.env.SETLIST_API_KEY,
        },
      },
    },
    {
      type: 'card',
      title: 'Like this page?',
      icon: 'FaHeart',
      href: 'https://github.com/diegocoxta/sites',
      description: 'config.links.like_page.description',
    },
  ],
};

export default config;
