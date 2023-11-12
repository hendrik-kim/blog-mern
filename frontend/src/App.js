
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import RootLayout from './layouts/RootLayout';

function App() {
  return (
    <Provider store={store}>
      <RootLayout />
    </Provider>
  );
}

export default App;
