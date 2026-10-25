import { repository } from '~/package.json';
import type { ConfigType } from '~/lib/config';

import { domainEnv, themeColor } from '~/lib/domain';

const domain = 'diegocoxta.com';

const config: ConfigType = {
  author: 'Diego Costa',
  repository: repository.url,
  theme: {
    accentColor: themeColor('SITE_ACCENT_COLOR', domain),
    textColor: themeColor('SITE_TEXT_COLOR', domain),
    defaultTheme: 'system',
  },
  title: '@diegocoxta',
  description: 'config.description',
  locales: ['pt', 'en', 'es'],
  jobTitle: ['Engineering Manager', 'Senior Software Engineer', 'Photographer'],
  domain,
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
      title: 'config.links.unsplash.title',
      icon: 'FaUnsplash',
      href: 'https://unsplash.com/diegocoxta',
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
      type: 'card',
      title: 'config.links.shop.title',
      icon: 'FaCartShopping',
      href: 'https://lista.mercadolivre.com.br/_CustId_126689975?',
      description: 'config.links.shop.description',
      highlight: true,
      hide: true,
    },
    {
      type: 'card',
      title: 'config.links.photography.title',
      icon: 'FaCamera',
      href: 'https://diegocosta.me',
      description: 'config.links.photography.description',
      recentActivity: {
        widget: 'UnsplashRecentActivity',
        config: {
          title: 'config.links.photography.recentactivity.title',
          username: domainEnv('UNSPLASH_USERNAME', domain, { required: false }),
          authorization: domainEnv('UNSPLASH_ACCESS_KEY', domain, { required: false }),
        },
      },
    },
    {
      type: 'card',
      title: 'config.links.blog.title',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br',
      description: 'config.links.blog.description',
      recentActivity: {
        widget: 'FeedListingRecentActivity',
        config: {
          title: 'config.links.blog.recentactivity.title',
          feed: 'https://diegocosta.com.br/blog/feed',
        },
      },
    },
    {
      type: 'card',
      title: 'config.links.like_page.title',
      icon: 'FaHeart',
      href: 'https://github.com/diegocoxta/sites',
      description: 'config.links.like_page.description',
      highlight: true,
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
          title: 'config.links.github.recentactivity.title',
          username: domainEnv('GITHUB_USERNAME', domain, { required: false }),
          authorization: domainEnv('GITHUB_PERSONAL_ACCESS_TOKEN', domain, { required: false }),
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
          title: 'config.links.hardcover.recentactivity.title',
          authorization: domainEnv('HARDCOVER_TOKEN', domain, { required: false }),
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
          title: 'config.links.lastfm.recentactivity.title',
          username: domainEnv('LASTFM_USERNAME', domain, { required: false }),
          authorization: domainEnv('LASTFM_API_KEY', domain, { required: false }),
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
          title: 'config.links.discogs.recentactivity.title',
          username: domainEnv('DISCOGS_USERNAME', domain, { required: false }),
          authorization: domainEnv('DISCOGS_TOKEN', domain, { required: false }),
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
          title: 'config.links.setlist.recentactivity.title',
          username: domainEnv('SETLIST_USERNAME', domain, { required: false }),
          authorization: domainEnv('SETLIST_API_KEY', domain, { required: false }),
        },
      },
      hide: true,
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
          title: 'config.links.letterboxd.recentactivity.title',
          username: domainEnv('LETTERBOXD_USERNAME', domain, { required: false }),
        },
      },
    },
  ],
};

export default config;
