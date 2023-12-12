import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../../slices/postSlice";
import { validateUserSession } from "../../slices/accountSlice";
import { store } from "../../store/configureStore";

function Home() {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const PUBLIC = "public";

  useEffect(() => {
    dispatch(fetchAllPosts());
    console.log("fetched posts!", store.getState().blog.posts);

    //Validate session for users who successfully authenticated and redirected from google log in page.
    dispatch(validateUserSession());
  }, [dispatch]);

  const reversedPosts = Object.values(
    (Array.isArray(posts.posts) &&
      posts.posts.filter((post) => post.postVisibility === PUBLIC).reverse()) ||
      {}
  );

  return (
    <div>
      <h2>Posting in mypage</h2>
      {reversedPosts.length > 0 ? (
        reversedPosts.map((post, i) => (
          <article key={i}>
            <h3>{post.title}</h3>
            <p>{post.user}</p>
            <h4>{post.postVisibility}</h4>
            <p>{post.content}</p>
            <p>posting time: {post.timestamp}</p>
          </article>
        ))
      ) : (
        <p>No public posts available</p>
      )}
    </div>
  );
}
export default Home;
