import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const simulateApiCall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
};

export const addPostAsync = createAsyncThunk(
  "posts/addPostAsync",
  async (post, { dispatch }) => {
    const response = await simulateApiCall(post);
    dispatch(postAdded(response));
  }
);

const initialState = [
  //example
  {
    id: "firstid",
    status: "idle",
    title: "First title",
    content: "First content",
    postVisibility: "public",
    timestamp: "8:12:24PM",
  },
];

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload);
      },
      prepare(title, content, postVisibility) {
        const timestamp = new Date().toLocaleTimeString();
        return {
          payload: {
            id: uuidv4(),
            status: "idle",
            title,
            content,
            postVisibility,
            timestamp,
          },
        };
      },
    },
    deletePosting: (state, action) => {
      const { id } = action.payload;
      const findId = state.find((post) => post.id === id);
      if (findId) {
        return state.filter((f) => f.id !== id);
      }
    },
  },
  extraReducers: (builder) => {
    const updatePostStatus = (state, action, status) => {
      const { title } = action.meta.arg;
      const post = state.find((post) => post.title === title);

      if (post) {
        post.status = status;
      }
    };

    builder
      .addCase(addPostAsync.pending, (state, action) => {
        updatePostStatus(state, action, "Loading");
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        updatePostStatus(state, action, "Complete");
        state.push(action.payload);
      })
      .addCase(addPostAsync.rejected, (state, action) => {
        updatePostStatus(state, action, "Fail");
      });
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded, deletePosting } = postsSlice.actions;
export default postsSlice.reducer;
