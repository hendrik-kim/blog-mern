import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../api/agent";

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (data) => {
    try {
      const response = await agent.Blog.getPostById(data);
      return response;
    } catch (err) {
      console.log(err);
    }
  }
);
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAllPosts",
  async () => {
    try {
      const response = await agent.Blog.getPosts();
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
      const { postId, ...postDetails } = data;
      const postEdit = await agent.Blog.updatePost(postId, postDetails);
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
      const postDelete = await agent.Blog.deletePost(data);
      return postDelete;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  posts: [],
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
      .addCase(getPostById.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
        };
      })
      .addCase(fetchAllPosts.pending, (state, action) => {
        // request start
        return (state = {
          ...state,
          status: "idle",
          foodLogs: action.payload,
        });
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(editPost.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const deletedPostId = action.payload;
        state.posts = state.posts.filter((post) => post._id !== deletedPostId);
      });
  },
});

export const selectAllPosts = (state) => state.posts;
export const { setPost } = postsSlice.actions;
export default postsSlice.reducer;
