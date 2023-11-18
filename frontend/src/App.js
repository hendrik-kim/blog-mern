import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { persistor, store } from "./store/configureStore";
import RootLayout from "./layouts/RootLayout";

function App() {
  return (
    <Provider store={store}>
      {/* Delay the rendering of our app's UI until the persisted state has been retrieved and saved to redux */}
      {/* TODO: Create loading indicator */}
      <PersistGate loading={null} persistor={persistor}>
        <RootLayout />
      </PersistGate>
    </Provider>
  );
}

export default App;
