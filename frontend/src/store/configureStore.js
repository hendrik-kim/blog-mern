import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import accountSlice from '../slices/accountSlice';
import blogReducer from '../slices/blogSlice';

// Import other necessary slices

// Configure the Redux store
export const store = configureStore({
  reducer: {
    // Combine reducers from different slices
    account: accountSlice,
    blog: blogReducer,
    // Include other reducers as needed
  },
});

// Custom hook to use with useDispatch
export const useAppDispatch = () => useDispatch();

// Custom hook to use with useSelector
export const useAppSelector = useSelector;
