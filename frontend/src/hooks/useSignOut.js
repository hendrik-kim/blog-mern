import { useAppDispatch } from "../store/configureStore";
import { signOutUser } from "../slices/accountSlice";

/**
 * Custom hook for handling user logout.
 *
 * @returns {Function} A function that dispatches the signOutUser action.
 */
const useSignOut = () => {
  /**
   * Redux dispatch function.
   * @type {function}
   */
  const dispatch = useAppDispatch();

  /**
   * Handles user logout by dispatching the signOutUser action.
   *
   * @function
   * @name handleLogout
   * @returns {void}
   */
  const handleLogout = () => {
    dispatch(signOutUser());
  };

  return handleLogout;
};

export default useSignOut;
