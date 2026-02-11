const config = {
  '*': ['yarn prettier'],
  '*.{js,ts,tsx,jsx,json}': ['yarn lint'],
  '*.css': ['yarn stylelint'],
};

export default config;
