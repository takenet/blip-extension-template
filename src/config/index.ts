import isDev from '../lib/utils/isDev';
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
