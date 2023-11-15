import React from 'react';
import { useAppDispatch } from '../store/configureStore';
import { googleAuth } from '../slices/accountSlice';

function GoogleAuth() {
  const dispatch = useAppDispatch();

  const googleSignIn = () => {
    dispatch(googleAuth());
  };

  return <button onClick={googleSignIn}>Continue with Google</button>;
}

export default GoogleAuth;
