import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../api/agent";

export const categoryListAsync = createAsyncThunk(
  "categories/categoryListAsync",
  async () => {
    try {
      const response = await agent.Category.getCategories();
      console.log("categorySlice", response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "categories/getCategoryById",
  async (data) => {
    try {
      const response = await agent.Category.getCategoryById(data);
      console.log("get Category by id in slice", response);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

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
        categoryData.name
      );
      return updatedCategory;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const categorySlice = createSlice({
  name: "categories",
  initialState: {
    categories: [],
    status: "idle",
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategoryAsync.fulfilled, (state, action) => {
        const deletedCategoryId = action.payload._id;
        state.categories = state.categories.filter(
          (category) => category._id !== deletedCategoryId
        );
      })
      .addCase(updateCategoryAsync.fulfilled, (state, action) => {
        const { _id, name } = action.payload;
        const existingCategory = state.categories.find(
          (category) => category._id === _id
        );
        if (existingCategory) {
          existingCategory.name = name;
        }
      })
      .addCase(getCategoryById.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(categoryListAsync.fulfilled, (state, action) => {
        return {
          ...state,
          data: action.payload,
        };
      });
  },
});
export const selectAllCategories = (state) => state.categories;
export default categorySlice.reducer;
