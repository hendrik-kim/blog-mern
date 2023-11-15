import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './store/configureStore';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import { validateUserSession } from './slices/accountSlice';
import RootLayout from './layouts/RootLayout';

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  ); 

  useEffect(() => {
    dispatch(validateUserSession());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <RootLayout />  
    </Provider>
  );
}

export default App;
