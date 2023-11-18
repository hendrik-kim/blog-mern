import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signOutUser, signUpUser } from '../../slices/accountSlice';

function Register() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const initialUserValue = { email: '', password: '', confirmPassword: '', username: ''};
  const [formValues, setFormValues] = useState(initialUserValue);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value}); //Take name as a key for the object 
  }

  const handleSubmit = (e) => {
    e.preventDefault(); 
    setFormErrors(validate(formValues));

    if(Object.keys(formErrors).length === 0) {
      let email = formValues.email;
      let password = formValues.password;
      let username = formValues.username;

      dispatch(signUpUser({ email, password, username }));
    }
  }

  const validate = (values) => {
    const errors = {}; 
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;
    
    //Validate Email 
    if(!values.email) {
      errors.email = "Email is required.";
    } else if(!emailRegex.test(values.email)) {
       errors.email = "Please enter a valid email.";
    }

    //Validate Password 
    if(!values.password) {
      errors.password = "Password is required.";
    } else if(values.password < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    //Validate Confirm Password
    if(!values.confirmPassword) {
      errors.confirmPassword = "Please re-enter your password.";
    } else if(values.password !== values.confirmPassword) {
      errors.confirmPassword = "Password confirmation does not match with the password."
    }

    //Validate Username 
    if(!values.username) {
      errors.username = "Usernamae is required.";
    } 

    return errors;
  }

  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return (
    <div>
      {/* if user successfully registered, show welcome message with logout button */}
      {userInfo ? (
        <div>
          <p>{`Welcome, ${userInfo.username}`}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '30%',
          }}
        >
          <h1>Sign Up</h1>
          <div>
            <input
              type='text'
              name='email'
              placeholder='Email'
              value={formValues.email}
              onChange={handleChange}
              style={{width: '95%'}}
            />
            <span>{formErrors.email}</span>
          </div>
          <div>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formValues.password}
              onChange={handleChange}
              style={{width: '95%'}}
            />
            <span>{formErrors.password}</span>
          </div>
          <div>
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formValues.confirmPassword}
              onChange={handleChange}
              style={{width: '95%'}}
            />
            <span>{formErrors.confirmPassword}</span>
          </div>
          <div>
            <input
              type='text'
              name='username'
              placeholder='User name'
              value={formValues.username}
              onChange={handleChange}
              style={{width: '95%'}}
            />
            <span>{formErrors.username}</span>
          </div>
          
          <button type='submit'>Register</button>
        </form>
      )}
    </div>
  );
}

export default Register;
