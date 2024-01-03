import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import SignIn from "../pages/SignIn";
import AddPostForm from "../pages/AddPostForm";
import Register from "../pages/Register";
import Home from "../pages/Home";
import Mypage from "../pages/Mypage";
import CategoryList from "../pages/CategoryList";
import EditPostForm from "../pages/EditPostForm";
import Search from "../pages/Search";

const NoMatch = () => {
  return <h1>This path hasn't been developed!</h1>;
};

{
  /* TODO: Need to organize the paths. Will need user/post id  & nested routes  */
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // { path: '/search', element:  },
      // { path: '/category', element: <CategoryList /> },
      // { path: 'blog-post', element: <BlogPostForm /> },
      { path: "/", element: <Home /> },
      { path: "category", element: <CategoryList /> },
      { path: "new-post", element: <AddPostForm /> },
      { path: "/edit-post/:postId", element: <EditPostForm /> },
      { path: "search", element: <Search /> },
      { path: "my-page", element: <Mypage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <Register /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
