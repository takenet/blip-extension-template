import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/charts/styles.css';
import React from 'react';
import App from './app';
import './index.css';
import './lib/setup/fonts';
import './lib/setup/iframe';
import root from './lib/setup/root';

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
