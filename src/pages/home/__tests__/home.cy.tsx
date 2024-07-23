import i18n from 'i18next';
import Home from '../Home';

describe('<Home />', () => {
  beforeEach(() => {
    cy.mount(<Home />);
  });

  it('shows a title', () => {
    cy.get('body').should('contain.text', i18n.t('home.title'));
  });

  it('has a counter button', () => {
    cy.get('bds-button').as('button');

    cy.get('@button').should(
      'contain.text',
      i18n.t('home.button-count', { count: 0 }),
    );

    cy.get('@button').click();
    cy.get('@button').should(
      'contain.text',
      i18n.t('home.button-count', { count: 1 }),
    );

    cy.get('@button').click();
    cy.get('@button').should(
      'contain.text',
      i18n.t('home.button-count', { count: 2 }),
    );
  });

  it('has a link to the blip-ds documentation', () => {
    cy.get('a')
      .should('have.attr', 'href')
      .and('include', 'takenet.github.io/blip-ds');
  });

  it('has a logo', () => {
    cy.get('img').should('have.attr', 'alt').and('include', 'blip logo');
  });
});
