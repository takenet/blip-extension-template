import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');

if (rootElement === null) {
  throw Error(
    [
      'No element with the id `root` found. Please check `index.html`',
      "ReactDOM needs this element to create the app's root.",
    ].join('\n'),
  );
}

const root = ReactDOM.createRoot(rootElement);

export default root;
