import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../api/agent";

// get post
export const getPost = createAsyncThunk(
  "posts/getPost",
  async (data, thunkAPI) => {
    try {
      const getPost = await agent.Blog.getPosts();
      console.log(getPost);
      return getPost;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async (data, thunkAPI) => {
    try {
      const response = await agent.Blog.getPosts();
      console.log("fetch", response);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);

// post add
export const addPost = createAsyncThunk(
  "posts/addPost",
  async (data, thunkAPI) => {
    try {
      console.log("action", data);
      const postAdd = await agent.Blog.createPost(data);
      return postAdd;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// post edit
export const editPost = createAsyncThunk(
  "posts/editPost",
  async (data, thunkAPI) => {
    try {
      const postEdit = await agent.Blog.updatePost(data);
      return postEdit;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// post delete
export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (data, thunkAPI) => {
    try {
      console.log("post deleted in slice", data);
      const postDelete = await agent.Blog.deletePost(data);
      return postDelete;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [], // Initialize posts as an array
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPost: (state, action) => {
      state.posts = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPosts.pending, (state, action) => {
        // request start
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getPost.pending, (state, action) => {
        // request start
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = action.payload;
      });
  },
});

export const selectAllPosts = (state) => state.posts;
export const { setPost } = postsSlice.actions;
export default postsSlice.reducer;
