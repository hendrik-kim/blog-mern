import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../../slices/postSlice";
import { store } from "../../store/configureStore";

function Home() {
  const dispatch = useAppDispatch();

  // Fetch posts when the component mounts
  useEffect(() => {
    dispatch(fetchAllPosts());
    console.log("fetched posts!", store.getState().blog.posts);
  }, [dispatch]);

  const posts = useAppSelector(selectAllPosts);

  return (
    <div>
      <h2>Posting in HomePage</h2>
      {posts.posts && Array.isArray(posts.posts) && posts.posts.length > 0 ? (
        posts.posts
          .filter((post) => post.postVisibility === "public")
          .reverse()
          .map((post, i) => (
            <article key={i}>
              <h3>{post.title}</h3>
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
