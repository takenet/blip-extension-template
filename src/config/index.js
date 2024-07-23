import isDev from '../lib/utils/isDev';
import productionConfig from './appsettings.json';

function getConfig() {
  try {
    return isDev ? require('./appsettings.development.json') : productionConfig;
  } catch (error) {
    return productionConfig;
  }
}

const config = getConfig();
export default config;
