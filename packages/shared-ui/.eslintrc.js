module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ["@repo/eslint-config/react.js", "plugin:storybook/recommended"],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
};
