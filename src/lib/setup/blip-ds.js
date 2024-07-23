import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';

void applyPolyfills().then(() => defineCustomElements(window));
