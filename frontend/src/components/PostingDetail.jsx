// PostDetail.jsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../slices/postSlice";
import { useParams } from "react-router-dom";
import { validateUserSession } from "../slices/accountSlice";

const PostDetail = () => {
  const dispatch = useAppDispatch();
  const { postId } = useParams();
  const posts = useAppSelector(selectAllPosts);
  const filteredPosts = Array.isArray(posts.posts)
    ? posts.posts.filter((post) => post._id === postId)
    : [];

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(validateUserSession());
  }, [dispatch]);

  const post = filteredPosts[0];
  return (
    <div>
      <h1>Posting Detail</h1>
      {/* <h2>Title: {post.title}</h2> */}
      <p>User ID: {post.user}</p>
      <h4>Visibility: {post.postVisibility}</h4>
      <p>Content: {post.content}</p>
      <p>Posting Time: {post.timestamp}</p>
    </div>
  );
};

export default PostDetail;
