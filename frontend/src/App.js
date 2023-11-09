
import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import UserProfile from "./example/UserProfile"; // Example component for user profile
import AddPostForm from "./components/AddPostForm";

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* Your application components go here */}
        <UserProfile />
        <AddPostForm />
      </div>
    </Provider>
  );
}

export default App;
