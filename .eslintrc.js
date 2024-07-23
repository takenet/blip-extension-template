module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/react'),
    'plugin:tailwindcss/recommended',
    'plugin:cypress/recommended',
  ],
  ignorePatterns: [
    'node_modules',
    'dist',
    'build',
    'coverage',
    'cypress',
    '**/*.d.ts',
  ],
  parser: '@babel/eslint-parser',
  parserOptions: {
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  rules: {
    'no-shadow': 'error',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'error',
    'unicorn/filename-case': 'off',
    'import/no-default-export': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'react/function-component-definition': 'off',
    'eslint-comments/require-description': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-cycle': 'off',
  },
};
