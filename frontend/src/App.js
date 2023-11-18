import { useAppDispatch, useAppSelector } from './store/configureStore';
import { Provider } from 'react-redux';
import { persistor, store } from './store/configureStore';
import { validateUserSession } from './slices/accountSlice';
import RootLayout from './layouts/RootLayout';
import { PersistGate } from 'redux-persist/integration/react'

function App() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(
    (state) => state.account.isAuthenticated
  ); 
  const userInfo = useAppSelector(
    (state) => state.account.user
  ); 
 
  if(isAuthenticated && userInfo === undefined) {
    dispatch(validateUserSession());
  }

  return (
    <Provider store={store}>
    {/* May need loading Indicator */}
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />    
      </PersistGate>
    </Provider>
  );
}

export default App;
