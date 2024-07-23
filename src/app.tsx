import { Suspense } from 'react';
import Routes from './Routes';

const App = () => {
  return (
    <Suspense fallback={<bds-loading-page />}>
      <Routes />
    </Suspense>
  );
};

export default App;
