import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setErrorMessage, setLoading } = commonSlice.actions;

export const selectErrorMessage = (state) => state.common.errorMessage;
export const selectLoading = (state) => state.common.loading;

export default commonSlice.reducer;
