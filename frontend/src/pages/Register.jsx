import { useAppSelector } from "../store/configureStore";
import {
  selectUser,
  selectIsAuthenticated,
  signUpUser,
} from "../slices/accountSlice";
import useAuthSubmit from "../hooks/useAuthSubmit";
import useInput from "../hooks/useInput";
import useSignOut from "../hooks/useSignOut";
import GoogleAuth from "../components/GoogleAuth";
import Input from "../components/Input";

function Register() {
  const userInfo = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialUserValue = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };
  const { formValues, handleChange } = useInput(initialUserValue);
  const signOut = useSignOut();
  const { errors, handleSubmit } = useAuthSubmit(signUpUser, formValues);

  return (
    <div>
      {/* if user successfully registered, show welcome message with logout button */}
      {isAuthenticated ? (
        <div>
          <p>{`Welcome, ${userInfo.username}`}</p>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit}>
            <div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                value={formValues.email}
                onChange={handleChange}
              />
              <span>{errors.email}</span>
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                value={formValues.password}
                onChange={handleChange}
              />
              {errors.hasOwnProperty("password") ? (
                <div>
                  Password must meet the following criteria:
                  <ul>
                    <li>At least 8 characters</li>
                    <li>At least one lower case letter</li>
                    <li>At least one upper case letter</li>
                    <li>At least one special character among '@$!%*?&'</li>
                    <li>At least one numeric value</li>
                  </ul>
                </div>
              ) : (
                ""
              )}
            </div>
            <div>
              <Input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formValues.confirmPassword}
                onChange={handleChange}
              />
              <span>{errors.confirmPassword}</span>
            </div>
            <div>
              <Input
                type="text"
                name="username"
                placeholder="User name"
                value={formValues.username}
                onChange={handleChange}
              />
              <span>{errors.username}</span>
            </div>
            <button type="submit">Register</button>
          </form>
          <p>{errors.hasOwnProperty("invalid") ? errors.invalid : ""}</p>
          <p> Or </p>
          <GoogleAuth />
        </>
      )}
    </div>
  );
}

export default Register;
