import { validationErrors } from "./error";

/**
 * Validates user input for sign-in or registration forms.
 *
 * @param {Object} values                   The object containing user-entered information.
 *   @property {string} email               User's email address.
 *   @property {string} password            User's password.
 *   @property {string} confirmPassword     User's password confirmation (for registration).
 *   @property {string} username            User's username (for registration).
 * @returns {Object}                        An object containing error messages for the input validation.
 *   @property {string} email               Error message for email validation.
 *   @property {string} password            Error message for password validation.
 *   @property {string} confirmPassword     Error message for password confirmation validation.
 *   @property {string} username            Error message for username validation.
 */
function validation(values) {
  const errors = {};
  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i; // Regex for email format
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/i; // Regex for password format

  if (Object.keys(values).length > 2) {
    /** REGISTRATION VALIDATION **/

    /** EMAIL **/
    // If email value is not in valid format, return error
    if (!emailRegex.test(values.email)) {
      errors.email = validationErrors.email.invalidFormat;
    }

    /** PASSWORD **/
    // If password value is not in valid format, return error
    if (!passwordRegex.test(values.password)) {
      errors.password = validationErrors.password.invalidFormat;
    }

    /** CONFIRM PASSWORD **/
    // If confirmPassword field is null, return error.
    if (!values.confirmPassword) {
      errors.confirmPassword = validationErrors.confirmPassword.required;
      // If confirmPassword value is not the same as the password value, return error.
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = validationErrors.confirmPassword.mismatch;
    }

    /** USERNAME **/
    // If username field is null, return error.
    if (!values.username) {
      errors.username = validationErrors.username.required;
    }
  } else {
    /** SIGN-IN VALIDATION **/

    /** EMAIL **/
    // If email field is null, return error
    if (!values.email) {
      errors.email = validationErrors.email.required;
    }

    /** PASSWORD **/
    // If password field is null, return error
    if (!values.password) {
      errors.password = validationErrors.password.required;
    }
  }

  return errors;
}

export default validation;
