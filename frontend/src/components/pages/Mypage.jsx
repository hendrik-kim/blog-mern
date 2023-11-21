import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";
import { deletePosting } from "./../../slices/postSlice";
import EditPostForm from "../EditPostForm";
import { useNavigate } from "react-router-dom";

const Mypage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const [updateClickedPostId, setUpdateClickedPostId] = useState(null);

  const handleDelete = async (id) => {
    console.log("Deleting post with id:", id);
    try {
      await dispatch(deletePosting({ postId: id }));
    } catch (error) {
      console.error("Error deleting post:", error);
      setError("An error occurred while deleting the post.");
    }
  };

  const handleUpdate = (postId) => {
    // navigate(`/edit-post/${postId}`);
  };

  // category part should be displaying.
  const posts = useSelector(selectAllPosts);
  const reversedPosts = [...posts].reverse();
  const renderedPosts = reversedPosts.map((post, i) => (
    <article key={i}>
      <h3>{post.postId}</h3>
      <h3>{post.title}</h3>
      <h4>{post.postVisibility}</h4>
      <p>{post.content}</p>
      <p>posting time: {post.timestamp}</p>
      <button onClick={() => handleDelete(post.postId)}>Delete</button>
      <button onClick={() => handleUpdate(post.postId)}>Update</button>
      <EditPostForm postId={post.postId} />
    </article>
  ));

  return (
    <div>
      <section>
        <h2>Posting in My page</h2>
        {renderedPosts}
      </section>
    </div>
  );
};

export default Mypage;
