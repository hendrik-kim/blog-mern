import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, createTransform, REGISTER, REHYDRATE, PERSIST } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import accountReducer from '../slices/accountSlice';
import blogReducer from '../slices/blogSlice';
import postsReducer from '../slices/postSlice';

//Transform to only persist the username from user object 
const whitelistTransform = createTransform(
  (inboundState, key) => {
    if(key === 'user' && inboundState !== undefined && inboundState !== null) {
      return inboundState.username;
    }
    return inboundState;
  },
  (outBoundState, key) => {
    if(key === 'user') {
      return {
        email: '',
        isAdmin: null,
        isOAuthUser: null,
        username: outBoundState,
        _id: '',
      }
    }
    return outBoundState;
  }
);

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['account']
}

const accountPersistConfig = {
  key: 'account',
  storage, 
  whitelist: ['isAuthenticated', 'user'],
  transforms: [whitelistTransform]
}


// Combine reducers from different slices
// Import other necessary slices
const rootReducer = combineReducers({ 
  account: persistReducer(accountPersistConfig, accountReducer),
  blog: blogReducer,
  posts: postsReducer,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer)

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
