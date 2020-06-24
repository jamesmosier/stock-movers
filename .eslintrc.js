module.exports = {
  root: true,
  extends: [
    'plugin:jsx-a11y/recommended',
    'react-app',
    'prettier',
    'prettier/react',
  ],
  plugins: ['jsx-a11y', 'prettier'],
  rules: {
    'no-duplicate-imports': 'error',
    'jsx-a11y/no-autofocus': [0],
    'jsx-a11y/anchor-is-valid': [0],
  },
};
