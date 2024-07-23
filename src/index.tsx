import React from 'react';
import App from './App';
import './index.css';
import './lib/setup/blip-ds';
import './lib/setup/fonts';
import './lib/setup/i18n';
import './lib/setup/iframe';
import root from './lib/setup/root';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
