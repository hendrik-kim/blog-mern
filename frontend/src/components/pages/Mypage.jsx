import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../../slices/postSlice";
import { store } from "../../store/configureStore";
import { deletePost, editPost } from "../../slices/postSlice";
import { useNavigate } from "react-router-dom";

function Mypage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user: userInfo } = useAppSelector((state) => state.account);
  const posts = useAppSelector((state) => selectAllPosts(state));

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
  const userId = userInfo._id;

  const reversedPosts = Object.values(
    (Array.isArray(posts.posts) &&
      posts.posts.filter((post) => post.user === userId).reverse()) ||
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
