import { useAppSelector } from "../../store/configureStore";
import {
  selectUser,
  selectIsAuthenticated,
  signUpUser,
} from "../../slices/accountSlice";
import { useInput, useSignOut, useAuthSubmit } from "../../utils/customHooks";
import GoogleAuth from "../GoogleAuth";
import Input from "../Input";

function Register() {
  const userInfo = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const initialUserValue = {
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  };
  const formValues = useInput(initialUserValue);
  const signOut = useSignOut();
  const { errors, handleSubmit } = useAuthSubmit(signUpUser, formValues.values);

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
          <form onSubmit={handleSubmit}>
            <h1>Sign Up</h1>
            <div>
              <Input
                type="text"
                name="email"
                placeholder="Email"
                extraValue={formValues}
              />
              <span>{errors.email}</span>
            </div>
            <div>
              <Input
                type="password"
                name="password"
                placeholder="Password"
                extraValue={formValues}
              />{" "}
              <span>{errors.password}</span>
              {errors.hasOwnProperty("password") ? (
                <div>
                  Password must meet the following criteria:
                  <ul>
                    <li>At least 8 characters</li>
                    <li>At least one lower case letter</li>
                    <li>At least one upper case letter</li>
                    <li>At least one special character among '@$!%*?&'</li>
                    <li>At least 8 characters</li>
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
                extraValue={formValues}
              />
              <span>{errors.confirmPassword}</span>
            </div>
            <div>
              <Input
                type="text"
                name="username"
                placeholder="User name"
                extraValue={formValues}
              />
              <span>{errors.username}</span>
            </div>
            <button type="submit">Register</button>
          </form>
          <p>
            {errors.hasOwnProperty("invalid") ? errors.invalid : ""}
          </p>
          <p> Or </p>
          <GoogleAuth />
        </>
      )}
    </div>
  );
}

export default Register;
