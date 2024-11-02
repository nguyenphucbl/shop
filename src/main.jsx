import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';

import { GlobalStyles } from '~/components';
import { store } from '~/stores/store.js';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <GlobalStyles>
        <App />
      </GlobalStyles>
    </Provider>
  </StrictMode>,
);
