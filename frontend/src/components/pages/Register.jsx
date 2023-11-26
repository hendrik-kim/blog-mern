import React, { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signOutUser, signUpUser } from '../../slices/accountSlice';

function Register() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const isAuthenticated = useAppSelector((state) => state.account.isAuthenticated);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = () => {
    //If passwords that user typed in are unmatched, display alert
    if (password !== confirmPassword) {
      alert('Password unmatched');
    } else {
      dispatch(signUpUser({ email, password, username }));
    }
  };

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <div>
      {/* if user successfully registered, show welcome message with logout button */}
      {isAuthenticated ? (
        <div>
            <p>{`Welcome, ${userInfo.username}`}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '30%',
            gap: 10,
          }}
        >
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
          <input
            type='password'
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input
            type='text'
            placeholder='User name'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
        </div>
      )}
    </div>
  );
}

export default Register;
