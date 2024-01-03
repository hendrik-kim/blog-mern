import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/configureStore";
import { deletePost, getPostById } from "../slices/postSlice";
import usePosts from "../hooks/usePosts";

const Posting = ({ postVisibility, showButtons = false }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { publicPosting } = usePosts(postVisibility);

  const handleDelete = (postId) => {
    dispatch(deletePost(postId));
    alert("Post deleted!");
  };
  const handleUpdate = (postId) => {
    dispatch(getPostById(postId));
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div>
      {publicPosting.length > 0 ? (
        publicPosting.map((post, i) => (
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
