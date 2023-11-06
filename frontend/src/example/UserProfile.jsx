import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../store/configureStore';
import { signInUser, signOut } from '../slices/authSlice';

function UserProfile() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    dispatch(signInUser({ username, password }));
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{`Welcome, ${userInfo.user.username}`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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

export default UserProfile;
