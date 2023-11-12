import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signInUser, signOut } from '../../slices/accountSlice';

function SignIn() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(signInUser({ email, password }));
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div>
      {userInfo ? (
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
        </div>
      )}
    </div>
  );
}

export default SignIn;
