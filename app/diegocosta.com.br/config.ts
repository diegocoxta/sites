import npmPackage from '~/package.json';
import type { ConfigProps } from '~/lib/config';

type LocalConfigProps = ConfigProps & {
  bio: string;
  repository: string;
};

const profile: LocalConfigProps = {
  title: 'Diego Costa',
  jobTitle: ['Engineering Manager', 'Senior Software Engineer'],
  description: 'Engineering Manager apaixonado por criar produtos que impactam a vida das pessoas.',
  domain: 'diegocosta.com.br',
  author: 'Diego Costa',
  avatar: 'https://avatars.githubusercontent.com/u/3134422?v=4',
  bio: 'Sou um engineering manager apaixonado por transformar tecnologia em impacto real. Tenho mais de 10 anos de experiência em engenharia de software, atuando em grandes empresas e startups em rápido crescimento.\nMeus principais interesses incluem liderança de engenharia, gestão de pessoas e a promoção da diversidade e inclusão no setor de tecnologia.\nSe você quiser saber mais sobre mim, confira os links abaixo!',
  links: [
    { type: 'text', title: 'Blog', href: '/blog' },
    { type: 'text', title: 'Currículo', href: '/cv' },
    { type: 'text', title: 'E-mail', href: 'mailto:diego@diegocosta.com.br' },
    { type: 'text', title: 'Linkedin', href: 'https://linkedin.com/in/diegocoxta' },
    { type: 'text', title: 'Mastodon', href: 'https://mastodon.social/@diegocoxta' },
    { type: 'text', title: 'Mais', href: 'https://diegocoxta.com' },
  ],
  repository: npmPackage.repository.url,
};

export default profile;
