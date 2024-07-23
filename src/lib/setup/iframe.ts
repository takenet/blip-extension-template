import { IframeMessageProxy, heightChange } from 'blip-iframe';
import { track } from 'lib/utils/track';

IframeMessageProxy.listen();

// The iframe's parent minimum height is 100%. By setting it's height to 0px,
// the extension will take 100% of the remaining height.
void heightChange({ height: 0 });

window.onload = () => {
  const scheme = document
    .querySelector('html')
    ?.getAttribute('data-mantine-color-scheme');

  void track('opened', { scheme });
};
