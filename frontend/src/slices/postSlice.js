import { createSlice } from "@reduxjs/toolkit";

const initialState = [
  //example
  { title: "First title", content: "First content", selectedOption: "public" },
  {
    title: "Second title",
    content: "Second content",
    selectedOption: "public",
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
        return {
          payload: {
            title,
            content,
            selectedOption,
          },
        };
      },
    },
  },
});

export const selectAllPosts = (state) => state.posts;

export const { postAdded } = postsSlice.actions;
export default postsSlice.reducer;
