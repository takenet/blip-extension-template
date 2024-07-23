const { resolve } = require('node:path');

const project = resolve(__dirname, 'tsconfig.json');

module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  extends: [
    require.resolve('@vercel/style-guide/eslint/browser'),
    require.resolve('@vercel/style-guide/eslint/typescript'),
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
    'cypress.config.ts',
    '**/*.js',
  ],
  parserOptions: {
    project,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project,
      },
    },
  },
  rules: {
    '@typescript-eslint/consistent-type-imports': 'error',
    'react/self-closing-comp': 'error',
    'react/no-array-index-key': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    'unicorn/filename-case': 'off',
    'import/no-default-export': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-confusing-void-expression': 'off',
    'eslint-comments/require-description': 'off',
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-nested-ternary': 'off',
    'no-bitwise': 'off',
    '@typescript-eslint/non-nullable-type-assertion-style': 'off',
    '@typescript-eslint/restrict-template-expressions': [
      'error',
      { allowNumber: true },
    ],
    '@typescript-eslint/no-misused-promises': [
      'error',
      { checksVoidReturn: false },
    ],
    'tailwindcss/no-custom-classname': [
      'error',
      {
        whitelist: [
          'ag\\-theme\\-quartz-dark',
          'ag\\-theme\\-quartz',
          'mantine\\-focus\\-auto',
        ],
      },
    ],
    'jsx-a11y/no-autofocus': 'off',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'import/no-cycle': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
};
