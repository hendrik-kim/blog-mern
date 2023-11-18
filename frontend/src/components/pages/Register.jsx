import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/configureStore';
import { signOutUser, signUpUser } from '../../slices/accountSlice';
import GoogleAuth from '../GoogleAuth';

function Register() {
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.account.user);
  const initialUserValue = { email: '', password: '', confirmPassword: '', username: ''};
  const [formValues, setFormValues] = useState(initialUserValue);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    if(Object.keys(formErrors).length === 0 && isSubmit) {
      let email = formValues.email;
      let password = formValues.password;
      let username = formValues.username;

      const result = async () => {
        const res = await dispatch(signUpUser({ email, password, username }));
        
        //Check if there is error while signing up
        if(res.error) {
          const statusCode = res.payload.response.status;
          
          //Display error
          if(statusCode === 400) {
            setFormErrors({invalid: 'Account already exists. Please try to log in'});
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
        <>
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
          <p>{
            (formErrors.hasOwnProperty('invalid') ?
              formErrors.invalid : ''
            )
            }</p>
          <p> Or </p>
          <GoogleAuth />
        </>
      )}
    </div>
  );
}

export default Register;
