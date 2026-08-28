import type { ConfigType } from '~/lib/config';

const profile: ConfigType = {
  title: '@diegocoxta',
  description: {
    en: 'My daily life, photography, and travels!',
    pt: 'Minha vida diária, fotografia e viagens!',
    es: '¡Mi vida diaria, fotografía y viajes!',
  },
  jobTitle: ['Engineering Manager', 'Senior Software Engineer', 'Photographer'],
  domain: 'diegocoxta.com',
  author: 'Diego Costa',
  avatar: '/background_v2.jpg',
  links: [
    {
      type: 'icon',
      icon: 'FaInstagram',
      title: {
        en: 'Find me on Instagram',
        es: 'Encuéntrame en Instagram',
        pt: 'Siga-me no Instagram',
      },
      href: 'https://instagram.com/diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaTiktok',
      title: {
        en: 'Find me on Tiktok',
        es: 'Encuéntrame en Tiktok',
        pt: 'Siga-me no Tiktok',
      },
      href: 'https://tiktok.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaYoutube',
      title: {
        en: 'Find me on YouTube',
        es: 'Encuéntrame en YouTube',
        pt: 'Siga-me no YouTube',
      },
      href: 'https://youtube.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaMastodon',
      title: {
        en: 'Find me on Mastodon',
        es: 'Encuéntrame en Mastodon',
        pt: 'Siga-me no Mastodon',
      },
      href: 'https://mastodon.social/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaBluesky',
      title: {
        en: 'Find me on Bluesky',
        es: 'Encuéntrame en Bluesky',
        pt: 'Siga-me no Bluesky',
      },
      href: 'https://bsky.app/profile/diegocoxta.com',
    },
    {
      type: 'icon',
      icon: 'FaThreads',
      title: {
        en: 'Find me on Threads',
        es: 'Encuéntrame en Threads',
        pt: 'Siga-me no Threads',
      },
      href: 'https://threads.com/@diegocoxta',
    },
    {
      type: 'icon',
      icon: 'FaEnvelope',
      title: {
        en: 'Drop me a line',
        pt: 'Me mande uma mensagem',
        es: 'Envíame un mensaje',
      },
      href: 'mailto:diego@diegocoxta.com',
    },
    {
      type: 'card',
      title: 'Unsplash',
      icon: 'FaUnsplash',
      href: 'https://unsplash.com/diegocoxta',
      description: {
        en: 'The world through my lenses.',
        es: 'El mundo a través de mis lentes.',
        pt: 'O mundo através das minhas lentes.',
      },
      recentActivity: {
        widget: 'UnsplashRecentActivity',
        config: {
          title: {
            en: 'Recent Photos',
            pt: 'Fotos Recentes',
            es: 'Fotos Recientes',
          },
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
      description: {
        en: 'The records currently on my shelf.',
        pt: 'Os discos atualmente na minha prateleira.',
        es: 'Los discos que actualmente tengo en mi estante.',
      },
      recentActivity: {
        widget: 'DiscogsRecentActivity',
        config: {
          title: {
            en: 'Last Records Purchased',
            pt: 'Últimos Discos Comprados',
            es: 'Últimos Discos Comprados',
          },
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
      description: {
        en: 'Keeping track of pages and stories.',
        pt: 'Acompanhando as páginas e histórias.',
        es: 'Siguiendo las páginas y historias.',
      },
      recentActivity: {
        widget: 'HardcoverRecentActivity',
        config: {
          title: {
            en: 'Currently Reading',
            pt: 'Lendo Atualmente',
            es: 'Leyendo Actualmente',
          },
          authorization: process.env.HARDCOVER_TOKEN,
        },
      },
    },
    {
      type: 'card',
      title: 'Letterboxd',
      icon: 'FaLetterboxd',
      href: 'https://letterboxd.com/diegocoxta/',
      description: {
        en: 'Logging the movies I watch.',
        pt: 'Registrando os filmes que assisto.',
        es: 'Registrando las películas que veo.',
      },
      recentActivity: {
        widget: 'LetterboxdRecentActivity',
        config: {
          title: {
            en: 'Recently Watched Movies',
            pt: 'Filmes Assistidos Recentemente',
            es: 'Películas Vistas Recientemente',
          },
          username: process.env.LETTERBOXD_USERNAME,
        },
      },
    },
    {
      type: 'card',
      title: 'My Tech Blog',
      icon: 'FaFloppyDisk',
      href: 'https://diegocosta.com.br/blog',
      description: {
        en: 'Updated less frequently than a legacy codebase.',
        pt: 'Atualizado menos frequentemente que uma base de código legada.',
        es: 'Actualizado menos frecuentemente que una base de código heredada.',
      },
      recentActivity: {
        widget: 'FeedListingRecentActivity',
        config: {
          title: {
            en: 'Latest blog posts',
            pt: 'Últimos posts do blog',
            es: 'Últimos posts del blog',
          },
          feed: 'https://diegocosta.com.br/blog/feed',
        },
      },
    },
    {
      type: 'card',
      title: 'Github',
      icon: 'FaGithub',
      href: 'https://github.com/diegocoxta',
      description: {
        en: 'Where my personal apps live, thrive, and occasionally get abandoned.',
        pt: 'Onde meus apps pessoais vivem, prosperam e ocasionalmente são abandonados.',
        es: 'Donde mis apps personales viven, prosperan y ocasionalmente son abandonadas.',
      },
      recentActivity: {
        widget: 'GithubRecentActivity',
        config: {
          title: {
            en: 'Contribution Activity',
            pt: 'Atividade de Contribuição',
            es: 'Actividad de Contribución',
          },
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
      description: {
        en: 'The real-time soundtrack of my daily life.',
        pt: 'A trilha sonora em tempo real da minha vida diária.',
        es: 'La banda sonora en tiempo real de mi vida diaria.',
      },
      recentActivity: {
        widget: 'LastfmRecentActivity',
        config: {
          title: {
            en: 'Monthly Top Artists',
            pt: 'Artistas Mais Tocados Mensalmente',
            es: 'Artistas Más Escuchados Mensualmente',
          },
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
      description: {
        en: 'Tracking the concerts I survive.',
        pt: 'Rastreando os concertos que sobrevivo.',
        es: 'Siguiendo los conciertos que sobrevivo.',
      },
      recentActivity: {
        widget: 'SetlistRecentActivity',
        config: {
          title: {
            en: 'Latest attended concerts',
            pt: 'Últimos concertos assistidos',
            es: 'Últimos conciertos asistidos',
          },
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
      description: {
        en: 'The source code is 100% free and open on my GitHub.',
        pt: 'O código-fonte é 100% gratuito e aberto no meu GitHub.',
        es: 'El código fuente es 100% gratuito y abierto en mi GitHub.',
      },
    },
  ],
};

export default profile;
