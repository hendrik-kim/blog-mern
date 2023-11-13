import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../store/configureStore';
import agent from '../api/agent';
import { googleAuth } from '../slices/accountSlice';

function GoogleAuth() {
  const dispatch = useAppDispatch();

  const googleSignIn = () => {
    /* INFO: The auth logic is handled on the backend completely, including identifying the user and generating the JWT. 
            On the client side, find the JWT in the cookie and then perform the subsequent user auth process.
     */
    dispatch(googleAuth());
  };
  // = useGoogleLogin({
  //     onSuccess: async res => {
  //         try {
  //             console.log(res.access_token);
  //             dispatch(googleAuth());

  //         } catch (err) {
  //             console.log(err)

  //         }
  //     }
  // });

  return <button onClick={googleSignIn}>Sign in with Google</button>;
}

export default GoogleAuth;
