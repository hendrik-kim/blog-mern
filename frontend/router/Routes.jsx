import { createBrowserRouter } from 'react-router-dom';
import App from './App'; // App component is in the same directory
import BlogPostForm from './example/BlogPostForm';
import UserProfile from './example/UserProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'blog-post', element: <BlogPostForm /> },
      { path: 'user-profile', element: <UserProfile /> },
    ],
  },
]);
