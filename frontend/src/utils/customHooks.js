import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { selectErrorMessage } from "../slices/commonSlice";
import { signOutUser } from "../slices/accountSlice";
import validation from "./validation";
import { globalErrors } from "./error";

/**
 * Custom hook for managing input values in forms.
 *
 * @param {any} initialValue    The initial value for the input.
 * @returns {{
 *   values: Object,
 *   onChange: Function
 * }}                           Returns an object with properties for input values and the onChange handler.
 */
export const useInput = (initialValue) => {
  /**
   * State to manage input values.
   * @type {Object}
   */
  const [values, setValues] = useState(initialValue);

  /**
   * Handles changes to input values.
   *
   * @param {Event} event   The change event.
   * @returns {void}
   */
  const handleChange = (event) => {
    // Destructure name and value from the target
    const { name, value } = event.target;

    // Update the values object with the new value
    setValues({ ...values, [name]: value });
  };

  return {
    values,
    onChange: handleChange,
  };
};

/**
 * Custom hook for handling authentication form submissions.
 *
 * @param {action(redux)} action    The action to be dispatched.
 * @param {Object} values           The values associated with the action.
 * @returns {{
 *   errors: Object,
 *   handleSubmit: Function
 * }}                               Returns an object of error messages to display and the function for form onSubmit event.
 */
export const useAuthSubmit = (action, values) => {
  /**
   * Redux dispatch function.
   * @type {function}
   */
  const dispatch = useAppDispatch();

  /**
   * State for managing errors from both client and server side.
   * @type {Object}
   */
  const [errors, setErrors] = useState({
    password: [], // Initialize with password property to display password policy when first render in Register form
  });

  /**
   * Selector to get server-side error from Redux state.
   * @type {string}
   */
  const serverSideErrors = useAppSelector(selectErrorMessage);

  /**
   * Client-side error obtained from form validation.
   * @type {Object}
   */
  const clientSideErrors = validation(values);

  /**
   * Flag to trigger useEffect after form submission.
   * @type {boolean}
   */
  const [isSubmitted, setIsSubmitted] = useState(false);

  /**
   * useEffect to handle server-side errors after submission.
   *
   * @effect
   */
  useEffect(() => {
    if (serverSideErrors && isSubmitted) {
      handleServerError(serverSideErrors);
      setIsSubmitted(false);
    }
  }, [serverSideErrors, isSubmitted]);

  /**
   * Handles form submission.
   *
   * @param {Event} event     The form submission event.
   * @returns {Promise<void>} A Promise that resolves when the form submission is complete.
   */
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Set the client-side error.
    setErrors(clientSideErrors);

    // If there isn't any client-side error, dispatch the action and handle server-side error.
    if (Object.keys(clientSideErrors).length === 0) {
      try {
        await dispatch(action(values));
        if (serverSideErrors) {
          handleServerError(serverSideErrors);
          setIsSubmitted(true);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  /**
   * Handles server-side errors and updates the errors state accordingly.
   *
   * @param {string} errorMessage  The error message received from the server.
   * @returns {void}
   */
  const handleServerError = (errorMessage) => {
    switch (errorMessage) {
      case globalErrors[401]:
        setErrors({
          invalid: "Incorrect email or password. Please try again.",
        });
        break;
      case globalErrors[409]:
        setErrors({ invalid: "Account already exists. Please sign in." });
        break;
      default:
        setErrors({ invalid: errorMessage });
    }
  };

  return { errors, handleSubmit };
};

/**
 * Custom hook for handling user logout.
 *
 * @returns {Function} A function that dispatches the signOutUser action.
 */
export const useSignOut = () => {
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
