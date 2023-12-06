import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import SignIn from "../components/pages/SignIn";
import AddPostForm from "../components/pages/AddPostForm";
import Register from "../components/pages/Register";
import Home from "../components/pages/Home";
import Mypage from "../components/pages/Mypage";
import CategoryList from "../components/pages/CategoryList";
import EditPostForm from "../components/pages/EditPostForm";

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
      // { path: '/category', element: },
      // { path: 'blog-post', element: <BlogPostForm /> },
      { path: "/", element: <Home /> },
      { path: "category", element: <CategoryList /> },
      { path: "new-post", element: <AddPostForm /> },
      { path: "/edit-post/:postId", element: <EditPostForm /> },
      { path: "my-page", element: <Mypage /> },
      { path: "sign-in", element: <SignIn /> },
      { path: "sign-up", element: <Register /> },
      { path: "*", element: <NoMatch /> },
    ],
  },
]);
