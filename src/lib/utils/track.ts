import { segment } from 'blip-iframe';
import config from '../../config';
import isDev from './is-dev';

export const track = <TKey extends string>(
  eventName: string,
  properties?: Record<TKey, unknown>,
) => {
  if (isDev) {
    return false;
  }

  const trackEvent = `${config.segment.prefix}-${eventName}`;
  const payload = { ...properties, environment: config.env };

  return segment({
    method: 'createApplicationTrack',
    parameters: { trackEvent, payload },
  });
};
