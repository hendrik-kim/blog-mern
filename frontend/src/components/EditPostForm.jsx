import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAllPosts, postUpdated } from "./../slices/postSlice";

const EditPostForm = ({ postId }) => {
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Added loading state
  const posts = useSelector(selectAllPosts);
  const post = posts.find((p) => p.postId === postId);

  // Added useEffect to handle loading state
  useEffect(() => {
    setLoading(false);
  }, [post]);

  const [editedTitle, setEditedTitle] = useState(post ? post.title : "");
  const [editedContent, setEditedContent] = useState(post ? post.content : "");
  const [editedPostVisibility, setEditedPostVisibility] = useState(
    post ? post.postVisibility : "public"
  );

  const onContentChanged = (e) => setEditedContent(e.target.value);
  const onTitleChanged = (e) => setEditedTitle(e.target.value);
  const handleVisibilityChange = (e) => setEditedPostVisibility(e.target.value);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (!post) {
    return <h2>Post not found!</h2>;
  }

  const onSavePostClicked = async () => {
    try {
      if (post) {
        dispatch(
          postUpdated({
            postId: post.postId,
            title: editedTitle,
            content: editedContent,
            postVisibility: editedPostVisibility,
          })
        );
      }
    } catch (error) {
      console.error("Error editing post:", error);
      setError("An error occurred while editing the post.");
    }
  };

  return (
    <div>
      <section>
        <h2>Edit the post</h2>
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
          <label htmlFor="postTitle">Content:</label>
          <textarea
            type="text"
            name="postContent"
            value={editedContent}
            onChange={onContentChanged}
          />
          <button type="button" onClick={onSavePostClicked}>
            Save post
          </button>
          <button type="button">Cancel</button>
        </form>
      </section>
    </div>
  );
};

export default EditPostForm;
