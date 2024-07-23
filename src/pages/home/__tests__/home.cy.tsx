import { Providers } from 'providers';
import { Home } from '../home';

describe('<Home />', () => {
  it('renders', () => {
    cy.viewport(1280, 720);
    cy.mount(
      <Providers>
        <Home />
      </Providers>,
    );
  });
});
