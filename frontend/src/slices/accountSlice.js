import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import agent from "../api/agent";

const initialState = {
  user: {
    email: "",
    isAdmin: null,
    username: "",
    profileImage: "",
    bio: "",
    _id: "",
  },
  isAuthenticated: false,
  loading: false,
  blogPost: null,
};

// Asynchronous thunk for signing up an user
export const signUpUser = createAsyncThunk(
  "user/signUpUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.register(data);
      return user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data); // Attempt to login with provided data
      return user; // Return the user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Return error if login fails
    }
  }
);

export const signOutUser = createAsyncThunk(
  "user/signOutUser",
  async (data, thunkAPI) => {
    try {
      const response = await agent.Account.signOut();
      return response.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const googleAuth = createAsyncThunk(
  "user/googleAuth",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.googleLogin();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const validateUserSession = createAsyncThunk(
  "user/validateUserSession",
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.validateSession();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async (data, thunkAPI) => {
    try {
      const { userId, ...userProfile } = data;
      const profileEdit = await agent.Account.updateUser(userId, userProfile);
      return profileEdit;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(googleAuth.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(validateUserSession.pending, (state) => {
        state.loading = true;
      })
      .addCase(validateUserSession.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.loading = false;
      })
      .addCase(validateUserSession.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        localStorage.setItem("bio", action.payload.bio);
        alert("Updated!");
        window.location.reload();
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        storage.removeItem("persist:account");
        storage.removeItem("user");
        localStorage.removeItem("bio");
      })
      .addCase(signOutUser.rejected, (state, action) => {
        // TODO: Handle sign-out error
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setUser } = userSlice.actions;

export const selectUser = (state) => state.account.user;
export const selectIsAuthenticated = (state) => state.account.isAuthenticated;
export const selectLoading = (state) => state.account.loading;

export default userSlice.reducer;
