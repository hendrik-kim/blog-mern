import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import {
  persistStore,
  persistReducer,
  REGISTER,
  REHYDRATE,
  PERSIST,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import accountSlice from "../slices/accountSlice";
import blogReducer from "../slices/blogSlice";
import postsReducer from "../slices/postSlice";

const persistConfig = {
  key: "root",
  storage,
};

// Combine reducers from different slices
// Import other necessary slices
const rootReducer = combineReducers({
  account: accountSlice,
  blog: blogReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [REGISTER, REHYDRATE, PERSIST],
      },
    }),
});

// Custom hook to use with useDispatch
export const useAppDispatch = () => useDispatch();

// Custom hook to use with useSelector
export const useAppSelector = useSelector;

export const persistor = persistStore(store);
