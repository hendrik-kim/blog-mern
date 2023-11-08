import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import agent from '../api/agent';

// Define the initial state of the user slice, including the user and blogPost states
const initialState = {
  user: JSON.parse(localStorage.getItem('user') || 'null'), // Retrieve the user from localStorage if available
  blogPost: null, // Initialize blogPost state to null
};

// Asynchronous thunk for signing in a user
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

// Create a slice for user-related state and actions
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Initial state of the slice
  reducers: {
    // Reducer to handle user sign out
    signOut: (state) => {
      state.user = null; // Set user state to null
      localStorage.removeItem('user'); // Remove user from localStorage
    },
    // Reducer to manually set user state
    setUser: (state, action) => {
      state.user = action.payload; // Update the user state with given payload
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fulfilled state for signInUser
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload; // Set user state to the logged-in user
      })
      // Handle rejected state for signInUser
      .addCase(signInUser.rejected, (state) => {
        state.user = null; // Reset user state to null on login failure
      });
  },
});

// Export actions from the slice
export const { signOut, setUser } = userSlice.actions;

// Export the reducer from the slice
export default userSlice.reducer;
