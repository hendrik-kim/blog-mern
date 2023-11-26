import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./store/configureStore";
import { Provider } from "react-redux";
import { persistor, store } from "./store/configureStore";
import { validateUserSession } from "./slices/accountSlice";
import RootLayout from "./layouts/RootLayout";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  const dispatch = useAppDispatch();

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
