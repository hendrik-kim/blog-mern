import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../slices/postSlice";
import PostList from "./PostList";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("public");
  const [showPostList, setShowPostList] = useState(false); // State for controlling visibility

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);
  //trigger with the button to save the content
  const handleOnChange = (e) => {
    setSelectedOption(e.target.value);
  };
  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(postAdded(title, content, selectedOption));
      setTitle("");
      setContent("");
      setSelectedOption("public");
    }
  };
  const togglePostList = () => {
    setShowPostList(!showPostList);
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
              checked={selectedOption === "public"}
              onChange={handleOnChange}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="posting-status"
              value="private"
              checked={selectedOption === "private"}
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
        <button type="button" onClick={togglePostList}>
          Check the public posting
        </button>
        {showPostList && <PostList />} {/* Conditionally render the PostList */}
      </section>
    </div>
  );
};

export default AddPostForm;
