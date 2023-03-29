import React from 'react';
import ReactDOM from 'react-dom/client';
import { StoreProvider } from 'easy-peasy';
import { store } from 'store';

import './index.css';
import Home from 'pages/Home';
import { ErrorBoundries } from 'components';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ErrorBoundries fallback='⚠️ Some Error Occured'>
    <StoreProvider store={store}>
      <Home />
  </StoreProvider>
  </ErrorBoundries>
);
