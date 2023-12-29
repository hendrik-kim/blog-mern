import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../src/store/configureStore";
import { globalErrors } from "../utils/error";

import {
  editPost,
  getPostById,
  selectAllPosts,
} from "../../src/slices/postSlice";

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useAppDispatch();
  const postData = useAppSelector(selectAllPosts);
  const [editedPostVisibility, setEditedPostVisibility] = useState("public");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");
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
        return (
          <div>
            <h2>Error in Write a post page</h2>
            <p>{globalErrors[400]}</p>
          </div>
        );
      }
    };

    fetchData();
  }, [dispatch, postId]);

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
        alert("Post edited successfully!");
      }
    } catch (error) {
      console.error("Error editing post:", error);
    }
  };

  if (!postData) {
    return <h2>Post not found!</h2>;
  }

  return (
    <div>
      <section>
        <h2>Edit the post</h2>
        {globalErrors[400] && (
          <div>
            <h2>Error in Write a post page</h2>
            <p>{globalErrors[400]}</p>
          </div>
        )}
        s
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
