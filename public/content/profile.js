import npmPackage from '~/package.json';

const profile = {
  title: 'Diego Costa - Engineering Manager, Senior Software Engineer',
  description: "Engineering Manager passionate about building products that impact people's lives.",
  icon: 'static/icon.png',
  author: 'Diego Costa',
  bio: 'I’m a Engineering Manager passionate about the intersection between technology and people. My goal is to help technology teams achieve their full potential.\nI have a great interest in engineering leadership, people management, software engineering, as well as inclusion and diversity.\nIf you’d like to learn more about me, check out the links below!',
  links: [
    { label: 'Linkedin', url: 'https://linkedin.com/in/diegocoxta' },
    { label: 'Github', url: 'https://github.com/diegocoxta' },
    { label: 'E-mail', url: 'mailto:diego@diegocosta.me' },
  ],
  repository: npmPackage.repository,
};

export default profile;
