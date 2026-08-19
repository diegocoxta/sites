import npmPackage from '~/package.json';

const profile = {
  title: 'Diego Costa - Engineering Manager, Senior Software Engineer',
  description: "Engineering Manager apaixonado por criar produtos que impactam a vida das pessoas.",
  domain: 'diegocosta.com.br',
  author: 'Diego Costa',
  bio: 'Sou um engineering manager apaixonado por transformar tecnologia em impacto real. Tenho mais de 10 anos de experiência em engenharia de software, atuando em grandes empresas e startups em rápido crescimento.\nMeus principais interesses incluem liderança de engenharia, gestão de pessoas e a promoção da diversidade e inclusão no setor de tecnologia.\nSe você quiser saber mais sobre mim, confira os links abaixo!',
  links: [
    { label: 'Blog', url: '/blog' },
    { label: 'Currículo', url: '/cv' },
    { label: 'E-mail', url: 'mailto:diego@diegocosta.com.br' },
    { label: 'Linkedin', url: 'https://linkedin.com/in/diegocoxta' },
    { label: 'Github', url: 'https://github.com/diegocoxta' },
    { label: 'Mais', url: 'https://diegocoxta.com' },
  ],
  repository: npmPackage.repository,
};

export default profile;
