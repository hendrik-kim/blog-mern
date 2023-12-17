import React, { useState } from "react";

import { useAppDispatch } from "../store/configureStore.js";
import { addPost as addPostAction } from "../slices/postSlice.js";
import Input from "../components/Input.jsx";
import useInput from "../hooks/useInput.js";

const AddPostForm = () => {
  const dispatch = useAppDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postVisibility, setPostVisibility] = useState("public");

  //useInput usage example:
  const initialPostValue = {
    title: "",
    content: "",
    category: "Life",
    visibility: "public",
  };
  const { formValues, handleChange } = useInput(initialPostValue);

  const handleVisibilityChange = (e) => {
    setPostVisibility(e.target.value);
  };

  //TODO: as using useInput, this function need to be updated.
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
            {/* Input component usage example  */}
            <Input
              type="radio"
              name="visibility"
              label="Posting Status"
              options={[
                { value: "public", label: "Public" },
                { value: "private", label: "Private" },
              ]}
              checked={formValues.visibility}
              onChange={handleChange}
            />
            <Input
              type="select"
              name="category"
              label="Select Category: "
              options={[
                { value: "life", label: "Life" },
                { value: "travel", label: "Travel" },
                { value: "Food", label: "Food" },
              ]}
              value={formValues.category}
              onChange={handleChange}
            />
            <Input
              type="text"
              name="title"
              placeholder="Title"
              label="Title: "
              value={formValues.title}
              onChange={handleChange}
            />
            <Input
              type="textarea"
              label="Content: "
              placeholder="Enter your story.."
              name="content"
              value={formValues.content}
              onChange={handleChange}
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
