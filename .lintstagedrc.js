import { relative } from 'path';

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames.map((f) => relative(process.cwd(), f)).join(' --file ')}`;

const config = {
  '*': ['yarn prettier'],
  '*.{js,ts,tsx,jsx,json}': [buildEslintCommand],
  '*.css': ['yarn stylelint'],
};

export default config;
