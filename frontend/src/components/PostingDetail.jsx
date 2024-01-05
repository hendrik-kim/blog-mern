// PostDetail.jsx
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { useParams } from "react-router-dom";
import { validateUserSession } from "../slices/accountSlice";
import { getPostById, selectAllPosts } from "../slices/postSlice";
import { useNavigate } from "react-router-dom";
const PostDetail = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectAllPosts);
  const { postId } = useParams();

  useEffect(() => {
    dispatch(validateUserSession());
    dispatch(getPostById(postId));
  }, [dispatch]);

  const filteredPosts = Array.isArray(posts.posts)
    ? posts.posts.filter((post) => post._id === postId)
    : [];
  return (
    <div>
      {filteredPosts.map((post, i) => (
        <article key={i}>
          <h1>Title: {post.title}</h1>
          <p>User id: {post.user}</p>
          <p>Category: {post.category}</p>
          <p>Content: {post.content}</p>
          <p>Post Visibility: {post.postVisibility}</p>
          <p>Time Stamp: {post.timestamp}</p>
        </article>
      ))}
      <button onClick={() => navigate(-1)}>go back</button>
    </div>
  );
};

export default PostDetail;
