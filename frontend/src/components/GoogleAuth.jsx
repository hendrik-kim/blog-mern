import React from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useAppDispatch } from '../store/configureStore';
import agent from '../api/agent';
import { googleAuth } from '../slices/accountSlice';

function GoogleAuth() {    
    const dispatch = useAppDispatch();

    const googleSignIn = useGoogleLogin({
        onSuccess: async res => {
            try {
                console.log(res.access_token);
                dispatch(googleAuth());

            } catch (err) {
                console.log(err)

            }
        }
    });

    return (
        <button onClick={googleSignIn}>Sign in with Google</button>
    );
}

export default GoogleAuth;
