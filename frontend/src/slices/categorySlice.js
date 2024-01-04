import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import agent from '../api/agent';

// Async thunk to fetch the categor list from the server when the component mounts
export const categoryListAsync = createAsyncThunk(
  "categories/categoryListAsync",
  async () => {
    try {
      // Make an API request to ge the category list using the agent
      const categoryList = await agent.Category.getCategories();
      return categoryList;
    } catch (error) {
      // If there is an error during the API request, throw an error
      throw new Error(error.message);
    }
  }
);

// Async thunk to add new category into the server when the component mounts
export const addCategoryAsync = createAsyncThunk(
  "categories/addCategoryAsync",
  async (categoryData, thunkAPI) => {
    try {
      const newCategory = await agent.Category.createCategory(categoryData);
      return newCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to remove a category from the server 
export const removeCategoryAsync = createAsyncThunk(
  "categories/removeCategoryAsync",
  async (categoryId, thunkAPI) => {
    try {
      const removeCategory = await agent.Category.deleteCategory(categoryId);
      return removeCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Async thunk to update a category on the server
export const updateCategoryAsync = createAsyncThunk(
  "categories/updateCategoryAsync",
  async (categoryData, thunkAPI) => {
    try {
      const updatedCategory = await agent.Category.updateCategory(
        categoryData._id,
        categoryData.name);
      return updatedCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Declare categorySlice with initial state and reducers
const categorySlice = createSlice({
  name: "categories",
  initialState: {
      categories: [], // Initial state with an empty arrary for categories
      status: "idle", // Status for tracking the state of asycn poerations
      error: null, // Error to store any error massages
  },
  reducers: {},

  // Handling async thunk results
  extraReducers: (builder) => {
    builder
      // Add case for successful addition of a category
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        // Push the new category to the state
        state.categories.push(action.payload);
      })
      // Add case for successful removal of a category
      .addCase(removeCategoryAsync.fulfilled, (state, action) => {
        // Remove the deleted category from the state
        const deletedCategoryId = action.payload._id;
        state.categories = state.categories.filter(
          (category) => category._id !== deletedCategoryId
        );
      })
      // Add case for successful update of a category
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        const { _id, name } = action.payload;
        // Find the existing category and update its name
        const existingCategory = state.categories.find(
          (category) => category._id === _id
        );
        if (existingCategory) {
          existingCategory.name = name;
        }
      })
      // Add case for pending category list retrieval
      .addCase(categoryListAsync.pending, (state) => {
        state.status = "loading";
      })
      // Add case for successful category list retrieval
      .addCase(categoryListAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      // Add case for failed category list retrieval
      .addCase(categoryListAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default categorySlice.reducer;