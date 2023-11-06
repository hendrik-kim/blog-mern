import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  postBlog,
  selectPostStatus,
  selectPostMessage,
} from '../slices/blogSlice';

function BlogPostForm() {
  const [content, setContent] = useState('');
  const dispatch = useDispatch();
  const postStatus = useSelector(selectPostStatus);
  const postMessage = useSelector(selectPostMessage);
  const posts = useSelector((state) => state.blog.posts);
  const postError = useSelector((state) => state.blog.postError);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(postBlog({ content })).then(() => {
      setContent('');
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Write your blog post here...'
        />
        <button type='submit'>Post</button>
      </form>
      {postStatus === 'succeeded' && <p>{postMessage}</p>}
      {postStatus === 'failed' && <p>{postError}</p>}
      {posts.map((post, index) => (
        <div key={index}>
          <p>{post}</p>
        </div>
      ))}
    </div>
  );
}

export default BlogPostForm;
