import React, { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signInUser, signOutUser } from '../../slices/accountSlice';
import GoogleAuth from '../GoogleAuth';

function SignIn() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const initialUserValue = {email: '', password: ''};
  const [formValues, setFormValues] = useState(initialUserValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {

    if(Object.keys(formErrors).length === 0 && isSubmit) {
      let email = formValues.email;
      let password = formValues.password;

      const result = async () => {
        const res = await dispatch(signInUser({ email, password }));
        
        //Check if there is error while logging in
        if(res.error) {
          const statusCode = res.payload.response.status;
          
          //Display error
          if(statusCode === 401) {
            setFormErrors({invalid: 'Invalid email or password'});
          } 
        }
      }

      result();
    }
  }, [dispatch, formErrors, formValues, isSubmit])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value}); //Take name as a key for the object 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {}; 

    if(!values.email) {
      errors.email = "Please enter email"; 
    }

    if(!values.password) {
      errors.password = "Please enter password";
    }

    return errors;
  } 

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <div>
      {userInfo ? (
        <div>
          <p>{`Welcome, ${userInfo.username}`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formValues.email}
              onChange={handleChange}
            />
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formValues.password}
              onChange={handleChange}
            />
            <button type='submit'>Login</button>
          </form>
          <p>{Object.values(formErrors)[0]}</p>
          <p> Or </p>
          <GoogleAuth />
        </>
      )}
    </div>
  );
}

export default SignIn;
