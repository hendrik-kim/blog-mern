
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/configureStore';
import UserProfile from './example/UserProfile'; // Example component for user profile
import AddPostForm from './components/AddPostForm';

import Register from './components/Register';


function App() {
  return (
    // TODO: React Router setup required
    <Provider store={store}>
      <div>
        {/* Your application components go here */}
        <Register />
        <br />
        <br />
        <UserProfile />
        <AddPostForm />
      </div>
    </Provider>
  );
}

export default App;
