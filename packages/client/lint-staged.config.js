module.exports = {
  'package.json': ['prettier-package-json --write', 'git add'],
  'src/**/*.{ts,tsx}': ['yarn lint --fix', 'git add', 'jest --findRelatedTests'],
};
