import { IframeMessageProxy } from 'iframe-message-proxy';
import config from '../../config';
import isDev from './isDev';

const track = async (eventName, properties) => {
  if (isDev) {
    return false;
  }

  const trackEvent = `${config.segment.prefix}-${eventName}`;
  const payload = { ...properties, environment: config.env };

  await IframeMessageProxy.sendMessage({
    action: 'segment',
    content: {
      method: 'createApplicationTrack',
      parameters: { trackEvent, payload },
    },
  });
};

export default track;
