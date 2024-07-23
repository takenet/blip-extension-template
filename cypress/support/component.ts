import '@cypress/code-coverage/support';
import { mount } from 'cypress/react18';
import '../../src/index.css';
import '../../src/lib/setup/fonts';
import '../../src/@types/cypress.d.ts';
import './commands';

Cypress.Commands.add('mount', mount);
