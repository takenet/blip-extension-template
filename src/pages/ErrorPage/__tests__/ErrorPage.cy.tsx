import i18n from 'i18next';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import ErrorPage from '../ErrorPage';

Cypress.on('uncaught:exception', () => {
  return false;
});

describe('<ErrorPage />', () => {
  it('shows 404 error if the route does not exist', () => {
    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <>element</>,
          errorElement: <ErrorPage />,
        },
      ],
      { initialEntries: ['/non-existent-route'] },
    );

    cy.mount(<RouterProvider router={router} />);

    cy.get('.text-9xl').should('have.text', '404');
    cy.get('.text-xl').should('have.text', 'Not Found');
  });

  it('shows default status and statusText if they do not exist', () => {
    const Element = () => {
      throw new Error();
    };

    const router = createMemoryRouter(
      [
        {
          path: '/',
          element: <Element />,
          errorElement: <ErrorPage />,
        },
      ],
      { initialEntries: ['/'] },
    );

    cy.mount(<RouterProvider router={router} />);

    cy.get('.text-9xl').should('have.text', i18n.t('errorPage.defaultStatus'));
    cy.get('.text-xl').should(
      'have.text',
      i18n.t('errorPage.defaultStatusText'),
    );
  });
});
