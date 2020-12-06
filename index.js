import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import App from './App';

import configureStore from './src/store';

const store = configureStore();

const CWC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

registerRootComponent(CWC);
