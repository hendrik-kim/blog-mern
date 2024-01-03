import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../slices/postSlice";
import { validateUserSession, selectUser } from "../slices/accountSlice";

const usePosts = (postVisibility, searchTerm, searchType) => {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const posts = useAppSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(validateUserSession());
  }, [dispatch]);

  const searchedPosting = Array.isArray(posts.posts)
    ? posts.posts
        .filter((post) =>
          post[searchType]?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .reverse()
    : [];

  const publicPosting = Array.isArray(posts.posts)
    ? (postVisibility === "public"
        ? posts.posts.filter((post) => post.postVisibility === "public")
        : posts.posts.filter((post) => post.user === userInfo?._id)
      ).reverse()
    : [];
  return { publicPosting, searchedPosting };
};

export default usePosts;
