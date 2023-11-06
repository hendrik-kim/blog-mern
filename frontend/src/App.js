import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import BlogPostForm from './example/BlogPostForm'; // Example component for blog posting
import UserProfile from './example/UserProfile'; // Example component for user profile

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* Your application components go here */}
        <UserProfile />
        <BlogPostForm />
        {/* You can also use Routes from react-router-dom to navigate between these components */}
      </div>
    </Provider>
  );
}

export default App;
