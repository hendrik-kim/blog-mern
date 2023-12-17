import { useAppSelector } from "../store/configureStore";
import {
  signInUser,
  selectUser,
  selectIsAuthenticated,
} from "../slices/accountSlice";
import useAuthSubmit from "../hooks/useAuthSubmit";
import useInput from "../hooks/useInput";
import useSignOut from "../hooks/useSignOut";
import GoogleAuth from "../components/GoogleAuth";
import Input from "../components/Input";

function SignIn() {
  const userInfo = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const initialUserValue = { email: "", password: "" };
  const { formValues, handleChange } = useInput(initialUserValue);
  const signOut = useSignOut();
  const { errors, handleSubmit } = useAuthSubmit(signInUser, formValues);

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
              value={formValues.email}
              onChange={handleChange}
            />
            <Input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <button type="submit">Login</button>
          </form>
          <p>{Object.values(errors)[0]}</p>
          <p> Or </p>
          <GoogleAuth />
        </>
      )}
    </div>
  );
}

export default SignIn;
