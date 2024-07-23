import '@cypress/instrument-cra';
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*',
    },
  },
  component: {
    video: false,
    screenshotOnRunFailure: false,
    setupNodeEvents: (on, config) => {
      require('@cypress/code-coverage/task')(on, config);

      return config;
    },
    devServer: {
      framework: 'create-react-app',
      bundler: 'webpack',
    },
  },
});
