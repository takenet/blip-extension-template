import i18n from 'i18next';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import Layout from '../Layout';

const router = createMemoryRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        {
          index: true,
          element: <>child route</>,
        },
      ],
    },
  ],
  { initialEntries: ['/'] },
);

describe('<Layout />', () => {
  beforeEach(() => {
    cy.mount(<RouterProvider router={router} />);
  });

  it('renders the header with title and tooltip', () => {
    cy.get('h1').should('contain.text', i18n.t('header.title'));
    cy.get('bds-tooltip')
      .should('have.attr', 'tooltip-text')
      .and('equal', i18n.t('header.information'));
  });

  it('it renders the child route', () => {
    cy.get('body').should('contain.text', 'child route');
  });
});
