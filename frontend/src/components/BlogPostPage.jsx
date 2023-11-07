import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Editor } from "@tinymce/tinymce-react";
import {
  postBlog,
  selectPostStatus,
  selectPostMessage,
} from "../slices/blogSlice";

function BlogPostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedOption, setSelectedOption] = useState("public");

  const dispatch = useDispatch();
  const postStatus = useSelector(selectPostStatus);
  const postMessage = useSelector(selectPostMessage);
  const posts = useSelector((state) => state.blog.posts);
  const postError = useSelector((state) => state.blog.postError);

  const editorRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postBlog({ title, content, selectedOption })).then(() => {
      setTitle("");
      setContent("");
    });
  };

  const handleOnChange = (e) => {
    setSelectedOption(e.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <br />
        <label>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <br />
        </label>
        {/* call Category component*/}
        <Editor
          onInit={(evt, editor) => (editorRef.current = editor)}
          value={content}
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
        <br />
        <button type="submit">Post</button>
      </form>
      {postStatus === "succeeded" && <p>{postMessage}</p>}
      {postStatus === "failed" && <p>{postError}</p>}
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post.title}</p>{" "}
        </div>
      ))}
    </div>
  );
}

export default BlogPostPage;
