import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  blogPost: null,
};

// Asynchronous thunks
export const signUpUser = createAsyncThunk(
  'user/signUpUser',
  async (data, thunkAPI) => {
    try {
      const response = await agent.Account.register(data);
      return response.user;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const signInUser = createAsyncThunk(
  'user/signInUser',
  async (data, thunkAPI) => {
    try {
      const user = await agent.Account.login(data); // Attempt to login with provided data
      localStorage.setItem('user', JSON.stringify(user)); // Save the user to localStorage on success
      return user; // Return the user data
    } catch (error) {
      return thunkAPI.rejectWithValue(error); // Return error if login fails
    }
  }
);

export const signOutUser = createAsyncThunk(
  'user/signOutUser',
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
  'user/googleAuth',
  async (data, thunkAPI) => {
    try {
      await agent.Account.googleLogin();
    } catch (error) {
      return thunkAPI.rejectWithValue(error); //Return error if registration fails
    }
  }
);

export const validateUserSession = createAsyncThunk(
  'user/validateUserSession',
  async (_, thunkAPI) => {
    try {
      const response = await agent.Account.validateSession();
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // signOut: (state) => {
    //   state.user = null;
    //   state.isAuthenticated = false;
    // },
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
      })
      .addCase(googleAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
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
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(signOutUser.fulfilled, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        // TODO: Handle sign-out error
      })
      .addDefaultCase((state, action) => {});
  },
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;
