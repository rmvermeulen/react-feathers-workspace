module.exports = {
  hooks: {
    'pre-commit': 'pretty-quick --staged && lerna run pre-commit',
  },
};
