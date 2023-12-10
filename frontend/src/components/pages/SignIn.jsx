import { useAppSelector } from "../../store/configureStore";
import {
  signInUser,
  selectUser,
  selectIsAuthenticated,
} from "../../slices/accountSlice";
import { useInput, useSignOut, useAuthSubmit } from "../../utils/customHooks";
import GoogleAuth from "../GoogleAuth";
import Input from "../Input";

function SignIn() {
  const userInfo = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialUserValue = { email: "", password: "" };
  const formValues = useInput(initialUserValue);
  const signOut = useSignOut();
  const { errors, handleSubmit } = useAuthSubmit(signInUser, formValues.values);
  const formErrors = errors;

  return (
    <div>
      {isAuthenticated ? (
        <div>
          <p>{`Welcome, ${userInfo.username}`}</p>
          <button onClick={signOut}>Logout</button>
        </div>
      ) : (
        <>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              name="email"
              placeholder="Email"
              extraValue={formValues}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              extraValue={formValues}
            />
            <button type="submit">Login</button>
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
