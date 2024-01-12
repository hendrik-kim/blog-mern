import { createSlice } from "@reduxjs/toolkit";

import { validateUserSession } from "./accountSlice";

const initialState = {
  errorMessage: null,
  loading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(validateUserSession.pending, (state) => {
        // Clear previous error message when the request is pending
        state.errorMessage = null;
        state.loading = true;
      })
      .addCase(validateUserSession.rejected, (state, action) => {
        // Set the error message when the request is rejected
        state.errorMessage = action.payload
          ? action.payload.message
          : "An error occurred";
        state.loading = false;
      })
      .addCase(validateUserSession.fulfilled, (state) => {
        state.loading = false;
      });
  },
});

export const { setErrorMessage, setLoading } = commonSlice.actions;

export const selectErrorMessage = (state) => state.common.errorMessage;
export const selectLoading = (state) => state.common.loading;

export default commonSlice.reducer;
