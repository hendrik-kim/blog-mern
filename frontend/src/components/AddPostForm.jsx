import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postAdded } from "../slices/postSlice";
import { Editor } from "@tinymce/tinymce-react";

const AddPostForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("public");

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
          <Editor
            // onInit={(evt, editor) => (editorRef.current = editor)}
            type="text"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            onEditorChange={(newContent) => setContent(newContent)}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <textarea
            type="text"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          /> */}
          <button type="button" onClick={onSavePostClicked}>
            Save post
          </button>
        </form>
      </section>
    </div>
  );
};

export default AddPostForm;
