import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    status: "idle",
    title: "First title",
    content: "First content",
    selectedOption: "public",
    timestamp: "8:12:24PM",
  },
  {
    status: "idle",
    title: "Second title",
    content: "Second content",
    selectedOption: "public",
    timestamp: "8:12:29PM",
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
      prepare(title, content, selectedOption) {
        const timestamp = new Date().toLocaleTimeString();
        return {
          payload: {
            status: "idle",
            title,
            content,
            selectedOption,
            timestamp,
          },
        };
      },
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

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
