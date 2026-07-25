import npmPackage from '~/package.json';

const profile = {
  title: 'Diego Costa - Engineering Manager, Senior Software Engineer',
  description: "Engineering Manager passionate about building products that impact people's lives.",
  icon: 'static/icon.png',
  author: 'Diego Costa',
  bio: 'Sou um engineering manager apaixonado por transformar tecnologia em impacto real. Tenho mais de 10 anos de experiência em engenharia de software, atuando em grandes empresas e startups em rápido crescimento.\nMeus principais interesses incluem liderança de engenharia, gestão de pessoas e a promoção da diversidade e inclusão no setor de tecnologia.\nSe você quiser saber mais sobre mim, confira os links abaixo!',
  links: [
    { label: 'Linkedin', url: 'https://linkedin.com/in/diegocoxta' },
    { label: 'Github', url: 'https://github.com/diegocoxta' },
    { label: 'E-mail', url: 'mailto:contato@diegocosta.com.br' }
  ],
  repository: npmPackage.repository,
};

export default profile;
