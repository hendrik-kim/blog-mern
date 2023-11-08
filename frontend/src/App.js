import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';

import BlogPostPage from './components/BlogPostPage'; // Example component for blog posting
import UserProfile from './example/UserProfile';

function App() {
  return (
    <Provider store={store}>
      <div>
        {/* Your application components go here */}
        <UserProfile />
        <BlogPostPage />
        {/* You can also use Routes from react-router-dom to navigate between these components */}
      </div>
    </Provider>
  );
}

export default App;
