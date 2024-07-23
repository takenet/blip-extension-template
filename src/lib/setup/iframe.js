import { IframeMessageProxy } from 'iframe-message-proxy';
import track from '../utils/track';

IframeMessageProxy.listen();

// The iframe's parent minimum height is 100%. By setting it's height to 0px,
// the extension will take 100% of the remaining height.
void IframeMessageProxy.sendMessage({
  action: 'heightChange',
  content: 0,
});

void track('opened');
