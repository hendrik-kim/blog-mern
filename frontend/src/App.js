import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/configureStore';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { validateUserSession } from './slices/accountSlice';
import RootLayout from './layouts/RootLayout';
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  console.log(process.env.GOOGLE_CLIENT_ID);
  const clientID =
    '1031592030135-2c9fabeh56q6vuklpn68jknf48ie8fai.apps.googleusercontent.com';
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  );

  useEffect(() => {
    dispatch(validateUserSession());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <GoogleOAuthProvider
        eOAuthProvider
        clientId='1031592030135-2c9fabeh56q6vuklpn68jknf48ie8fai.apps.googleusercontent.com'
      >
        <RootLayout />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
