// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from './store/configureStore';
// import { Provider } from 'react-redux';

// import { persistor, store } from './store/configureStore';
// import { validateUserSession } from './slices/accountSlice';
// import RootLayout from './layouts/RootLayout';
// import { PersistGate } from 'redux-persist/integration/react'

// function App() {
//   const dispatch = useAppDispatch();
//   const isAuthenticated = useAppSelector(
//     (state) => state.account.isAuthenticated
//   );

//   useEffect(() => {
//     dispatch(validateUserSession());
//   }, [dispatch]);

//   return (
//     <Provider store={store}>
//     {/* Delay the rendering of our app's UI until the persisted state has been retrieved and saved to redux */}
//       <PersistGate loading={null} persistor={persistor}>
//         <RootLayout />
//       </PersistGate>
//     </Provider>
//   );
// }

// export default App;
// App.js
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/configureStore";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import RootLayout from "./layouts/RootLayout";
import { validateUserSession } from "./slices/accountSlice";
import { persistor, store } from "./store/configureStore";

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
      {/* Delay the rendering of our app's UI until the persisted state has been retrieved and saved to redux */}
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
      </PersistGate>
    </Provider>
  );
}

export default App;
