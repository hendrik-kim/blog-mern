import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signInUser, signOutUser } from '../../slices/accountSlice';
import GoogleAuth from '../GoogleAuth';

function SignIn() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(signInUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <div>
      {isAuthenticated ? ( 
         <div>
            <p>{`Welcome, ${userInfo.username}`}</p>
            <button onClick={handleLogout}>Logout</button>
          </div> 
      ) : (
        <div>
          <input
            type='text'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
          <p> Or </p>
          <GoogleAuth />
        </div>
      )}
    </div>
  );
}

export default SignIn;
