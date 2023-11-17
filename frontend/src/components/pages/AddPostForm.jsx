import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../../slices/postSlice";

const AddPostForm = () => {
  // category section required
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const handleOnChange = (e) => {
    setIsPublic(e.target.value == "public");
  };

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, isPublic ? "public" : "private"));
      setTitle("");
      setContent("");
      setIsPublic(true);
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
              checked={isPublic}
              onChange={handleOnChange}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="posting-status"
              value="private"
              checked={!isPublic}
              onChange={handleOnChange}
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
