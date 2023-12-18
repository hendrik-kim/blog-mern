import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { fetchAllPosts, selectAllPosts } from "../slices/postSlice";
import { validateUserSession, selectUser } from "../slices/accountSlice";
import { useNavigate } from "react-router-dom";
import { deletePost, editPost } from "../slices/postSlice";

const Posting = ({ postVisibility, showButtons = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const posts = useAppSelector(selectAllPosts);
  const userInfo = useAppSelector(selectUser);

  useEffect(() => {
    dispatch(fetchAllPosts());
    dispatch(validateUserSession());
  }, [dispatch]);

  const filteredPosts = Array.isArray(posts.posts)
    ? (postVisibility === "public"
        ? posts.posts.filter((post) => post.postVisibility === "public")
        : posts.posts.filter((post) => post.user === userInfo?._id)
      ).reverse()
    : [];

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
  };
  const handleUpdate = (postId) => {
    dispatch(editPost(postId));
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, i) => (
          <article key={i}>
            <h3>title: {post.title}</h3>
            {/* TODO: change userid to username once duplicate check is done */}
            <p>user id: {post.user}</p>
            <h4>visibility: {post.postVisibility}</h4>
            <p>content: {post.content}</p>
            <p>posting time: {post.timestamp}</p>
            {showButtons && (
              <>
                <button onClick={() => handleDelete(post._id)}>Delete</button>
                <button onClick={() => handleUpdate(post._id)}>Update</button>
              </>
            )}
          </article>
        ))
      ) : (
        <p>No posts available</p>
      )}
    </div>
  );
};

export default Posting;
