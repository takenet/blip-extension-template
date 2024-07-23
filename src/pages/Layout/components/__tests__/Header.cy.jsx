import i18n from 'i18next';
import Header from '../Header';

describe('<Header />', () => {
  beforeEach(() => {
    cy.mount(<Header />);
  });

  it('renders a title', () => {
    cy.get('h1').should('contain.text', i18n.t('header.title'));
  });

  it('renders a tooltip with information', () => {
    cy.get('bds-tooltip')
      .should('have.attr', 'tooltip-text')
      .and('equal', i18n.t('header.information'));
  });
});
