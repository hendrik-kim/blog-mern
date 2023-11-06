import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../api/agent';

const initialState = {
  posts: [],
  postStatus: 'idle', // Status of the blog posting process ('idle' | 'loading' | 'succeeded' | 'failed')
  postError: null,
  postMessage: null,
};

export const postBlog = createAsyncThunk(
  'blog/postBlog',
  async (data, thunkAPI) => {
    try {
      const blogPost = await agent.Blog.postArticle(data);
      return blogPost;
    } catch (error) {
      const message = error.response?.data?.message || error;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // Add custom reducers if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(postBlog.pending, (state) => {
        state.postStatus = 'loading'; // Set status to 'loading' when the blog post request is sent
      })
      .addCase(postBlog.fulfilled, (state, action) => {
        // Handle the fulfilled state of the postBlog action
        const { message, content } = action.payload; // Destructure message and content from the payload
        state.posts.push(content); // Add the content to the posts array
        state.postMessage = message; // Store the response message
        state.postStatus = 'succeeded';
      })
      .addCase(postBlog.rejected, (state, action) => {
        state.postStatus = 'failed';
        state.postError = action.payload || 'Failed to post';
      });
  },
});

// Selector to get the current post status
export const selectPostStatus = (state) => state.blog.postStatus;

// Selector to get the message from the backend response
export const selectPostMessage = (state) => state.blog.postMessage;

// Exporting the reducer
export default blogSlice.reducer;
