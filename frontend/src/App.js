import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/configureStore";
import BlogPostPage from "./components/BlogPostPage.jsx"; // Example component for blog posting
import UserProfile from "./example/UserProfile"; // Example component for user profile
import AddPostForm from "./components/AddPostForm";
function App() {
  return (
    <Provider store={store}>
      <div>
        {/* Your application components go here */}
        <UserProfile />
        <AddPostForm />
        {/* <BlogPostPage /> */}
        {/* You can also use Routes from react-router-dom to navigate between these components */}
      </div>
    </Provider>
  );
}

export default App;
