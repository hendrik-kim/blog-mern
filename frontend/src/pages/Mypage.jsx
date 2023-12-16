import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../../slices/postSlice";
import { deletePost, editPost } from "../../slices/postSlice";
import { useNavigate } from "react-router-dom";
import { globalErrors } from "../../utils/error";
import { validateUserSession, selectUser } from "../../slices/accountSlice.js";

function Mypage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userInfo = useAppSelector(selectUser);
  const posts = useAppSelector((state) => selectAllPosts(state));

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(validateUserSession());
  }, [dispatch]);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };
  const handleUpdate = (postId) => {
    dispatch(editPost(postId));
    navigate(`/edit-post/${postId}`);
  };

  if (!userInfo) {
    return (
      <div>
        <h2>Error in Mypage</h2>
        <p>{globalErrors[401]}</p>
      </div>
    );
  }
  const reversedPosts = Object.values(
    (Array.isArray(posts.posts) &&
      posts.posts.filter((post) => post.user === userInfo._id).reverse()) ||
      {}
  );

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
