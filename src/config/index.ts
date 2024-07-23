import isDev from 'lib/utils/is-dev';
import productionConfig from './appsettings.json';

export type Config = typeof productionConfig;

function getConfig(): Config {
  try {
    return isDev
      ? (require('./appsettings.development.json') as Config)
      : productionConfig;
  } catch (error) {
    return productionConfig;
  }
}

const config = getConfig();
export default config;
