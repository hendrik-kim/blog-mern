import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/configureStore";
import { addPost as addPostAction } from "../../slices/postSlice.js";
import { globalErrors } from "../../utils/error";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const { user: userInfo } = useAppSelector((state) => state.account);
  const [post, setPost] = useState({
    title: "",
    content: "",
    postVisibility: "public",
  });

  const handleVisibilityChange = (e) => {
    setPost({
      ...post,
      postVisibility: e.target.value,
    });
  };
  const userId = userInfo ? userInfo._id : null;
  if (userId === null) {
    return (
      <div>
        <h2>Error in Write a post page</h2>
        <p>{globalErrors[401]}</p>
      </div>
    );
  }

  const onSavePostClicked = () => {
    if (!post.title && !post.content) {
      alert("Fill up the title or content");
    } else {
      dispatch(
        addPostAction({
          ...post,
          userId: userInfo._id,
          timestamp: new Date().toLocaleTimeString(),
        })
      );
      setPost({
        title: "",
        content: "",
        postVisibility: "public",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSavePostClicked();
  };

  return (
    <div>
      <div>
        <section>
          <h2>Add a new post</h2>
          <form onSubmit={handleSubmit}>
            Posting Status
            <label>
              <input
                type="radio"
                name="posting-visibility-status"
                value="public"
                checked={post.postVisibility === "public"}
                onChange={handleVisibilityChange}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="posting-visibility-status"
                value="private"
                checked={post.postVisibility === "private"}
                onChange={handleVisibilityChange}
              />
              Private
            </label>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              name="postTitle"
              value={post.title}
              onChange={(e) => setPost({ ...post, title: e.target.value })}
            />
            <br />
            <label htmlFor="postTitle">Content:</label>
            <textarea
              type="text"
              name="postContent"
              value={post.content}
              onChange={(e) => setPost({ ...post, content: e.target.value })}
            />
            <button type="submit">Save post</button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddPostForm;
