import '@cypress/code-coverage/support';
import { mount } from 'cypress/react18';
import '../../src/index.css';
import '../../src/lib/setup/blip-ds';
import '../../src/lib/setup/fonts';
import '../../src/@types/cypress.d.ts';
import './commands';
import './i18n';

Cypress.Commands.add('mount', mount);
