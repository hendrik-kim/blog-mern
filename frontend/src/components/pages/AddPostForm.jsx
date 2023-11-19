import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../../slices/postSlice";
import { v4 as uuidv4 } from "uuid";

const AddPostForm = () => {
  // category section required
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postId, setPostId] = useState("");
  const [postVisibility, setPostVisibility] = useState("public");
  const [error, setError] = useState("");
  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const handleVisibilityChange = (e) => {
    setPostVisibility(e.target.value);
  };

  const onSavePostClicked = async () => {
    try {
      if (title && content) {
        setPostId(uuidv4());
        dispatch(postAdded(title, content, postVisibility));
        setTitle("");
        setContent("");
        setPostVisibility("public");
      } else {
        if (!title) {
          alert("please enter the title");
        } else if (!content) {
          alert("please enter the content");
        }
      }
    } catch (error) {
      console.error("Error adding post:", error);
      setError("An error occurred while adding the post.");
    }
  };
  return (
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
            onChange={onTitleChanged}
          />
          <br />
          <label htmlFor="postTitle">Content:</label>
          <textarea
            type="text"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>
            Save post
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddPostForm;
