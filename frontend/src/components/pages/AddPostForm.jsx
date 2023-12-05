import React, { useState } from "react";
import { useAppDispatch } from "../../store/configureStore";
import { addPost as addPostAction } from "../../slices/postSlice.js";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postVisibility, setPostVisibility] = useState("public");

  const handleVisibilityChange = (e) => {
    setPostVisibility(e.target.value);
  };

  const onSavePostClicked = () => {
    if (!title && content) {
      alert("Fill up the title or content");
    } else {
      dispatch(
        addPostAction({
          title,
          content,
          postVisibility,
          timestamp: new Date().toLocaleTimeString(),
        })
      );
      setTitle("");
      setContent("");
      setPostVisibility("public");
    }
  };

  return (
    <div>
      <div>
        <section>
          <h2>Add a new post</h2>
          <form>
            Posting Status
            <label>
              <input
                type="radio"
                name="posting-visibility-status"
                value="public"
                checked={postVisibility === "public"}
                onChange={handleVisibilityChange}
              />
              Public
            </label>
            <label>
              <input
                type="radio"
                name="posting-visibility-status"
                value="private"
                checked={postVisibility === "private"}
                onChange={handleVisibilityChange}
              />
              Private
            </label>
            <label htmlFor="postTitle">Title:</label>
            <input
              type="text"
              name="postTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <br />
            <label htmlFor="postTitle">Content:</label>
            <textarea
              type="text"
              name="postContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button type="button" onClick={onSavePostClicked}>
              Save post
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default AddPostForm;
