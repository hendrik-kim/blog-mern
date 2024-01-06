import React, { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "../store/configureStore";
import { selectErrorMessage } from "../slices/commonSlice";
import validation from "../utils/validation";
import { globalErrors } from "../utils/error";
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
const useAuthSubmit = (action, values) => {
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
      case "User already exists":
        setErrors({
          invalid: "Account already exists. Please sign in.",
        });
        break;
      case "Username already exists":
        setErrors({
          invalid: "Username already exists. Please try different username.",
        });
        break;
      default:
        setErrors({ invalid: errorMessage });
    }
  };

  return { errors, handleSubmit };
};

export default useAuthSubmit;
