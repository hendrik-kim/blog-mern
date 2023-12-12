import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { editPost, getPostById, selectAllPosts } from "../slices/postSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const [error, setError] = useState("");
  const postData = useAppSelector(selectAllPosts);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const action = await dispatch(getPostById(postId));
        const fetchedPost = action.payload;

        setEditedTitle(fetchedPost.title);
        setEditedContent(fetchedPost.content);
        setEditedPostVisibility(fetchedPost.postVisibility);

        console.log("Fetched post data:", fetchedPost);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("An error occurred while fetching the post.");
      }
    };

    fetchData();
  }, [dispatch, postId]);

  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
  const [editedPostVisibility, setEditedPostVisibility] = useState("public");

  useEffect(() => {
    if (postData) {
      setEditedTitle(postData.title);
      setEditedContent(postData.content);
      setEditedPostVisibility(postData.postVisibility);
    }
  }, [postData]);

  const onContentChanged = (e) => setEditedContent(e.target.value);
  const onTitleChanged = (e) => setEditedTitle(e.target.value);
  const handleVisibilityChange = (e) => setEditedPostVisibility(e.target.value);

  const onSavePostClicked = async () => {
    try {
      if (postId) {
        await dispatch(
          editPost({
            postId,
            title: editedTitle,
            content: editedContent,
            postVisibility: editedPostVisibility,
          })
        );
        setEditedContent("");
        setEditedTitle("");
        setEditedPostVisibility("public");
      }
    } catch (error) {
      console.error("Error editing post:", error);
      setError("An error occurred while editing the post.");
    }
  };

  if (!postData) {
    return <h2>Post not found!</h2>;
  }

  return (
    <div>
      <section>
        <h2>Edit the post</h2>
        {error && <p>Error: {error}</p>}
        <form>
          Posting Status
          <label>
            <input
              type="radio"
              name="posting-visibility-status"
              value="public"
              checked={editedPostVisibility === "public"}
              onChange={handleVisibilityChange}
            />
            Public
          </label>
          <label>
            <input
              type="radio"
              name="posting-visibility-status"
              value="private"
              checked={editedPostVisibility === "private"}
              onChange={handleVisibilityChange}
            />
            Private
          </label>
          <label htmlFor="postTitle">Title:</label>
          <input
            type="text"
            name="postTitle"
            value={editedTitle}
            onChange={onTitleChanged}
          />
          <br />
          <label htmlFor="postContent">Content:</label>
          <textarea
            type="text"
            name="postContent"
            value={editedContent}
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

export default EditPostForm;
