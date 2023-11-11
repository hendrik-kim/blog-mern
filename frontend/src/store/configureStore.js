import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import accountSlice from '../slices/accountSlice';
import blogReducer from '../slices/blogSlice';
import postsReducer from '../slices/postSlice';

// Import other necessary slices

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Combine reducers from different slices
    account: accountSlice,
    blog: blogReducer,
    posts: postsReducer,
  },
});

// Custom hook to use with useDispatch
export const useAppDispatch = () => useDispatch();

// Custom hook to use with useSelector
export const useAppSelector = useSelector;
