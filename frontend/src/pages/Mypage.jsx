import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { store, useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../slices/postSlice";
import { deletePost, editPost } from "../slices/postSlice";

function Mypage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useAppSelector(selectAllPosts);

  useEffect(() => {
    dispatch(fetchAllPosts());
    console.log("fetched posts!", store.getState().blog.posts);
  }, [dispatch]);

  const handleDelete = (postId) => {
    console.log("post deleted! MyPage 1", postId);
    dispatch(deletePost(postId));
  };
  const handleUpdate = (postId) => {
    console.log("post updated! MyPage", postId);
    dispatch(editPost(postId));
    navigate(`/edit-post/${postId}`);
  };

  const reversedPosts = Object.values(posts.posts)
    ? Object.values(posts.posts).reverse()
    : {};

  return (
    <div>
      <h2>Posting in mypage</h2>
      {reversedPosts.length > 0 ? (
        reversedPosts.map((post, i) => (
          <article key={i}>
            <h3>{post.title}</h3>
            <h4>{post.postVisibility}</h4>
            <p>{post.content}</p>
            <p>posting time: {post.timestamp}</p>
            <button onClick={() => handleDelete(post._id)}>Delete</button>
            <button onClick={() => handleUpdate(post._id)}>Update</button>
          </article>
        ))
      ) : (
        <p>No public posts available</p>
      )}
    </div>
  );
}

export default Mypage;
