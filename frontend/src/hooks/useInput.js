import { useState } from "react";

/**
 * Custom hook for managing input values in forms.
 *
 * @param {Object} initialValue - The initial values for the input fields.
 *                                NOTE: To use this hook, ensure that the name attributes
 *                                of input tags match the fields in the initialValue object.
 *                                Example: <input name="email" /> & initialValue { email: "" }
 *
 * @returns {{
 *   formValues: Object,
 *   handleChange: Function
 * }}                           Returns an object with properties for input values and the onChange handler.
 */
const useInput = (initialValue) => {
  /**
   * State to manage input values.
   * @type {Object}
   */
  const [formValues, setFormValues] = useState(initialValue);

  /**
   * Handles changes to input values.
   *
   * @param {Event} event   The change event.
   * @returns {void}
   */
  const handleChange = (event) => {
    // Destructure name and value from the target
    const { name, value } = event.target;
    // Update the formValues object with the new value
    setFormValues({ ...formValues, [name]: value });
  };

  return {
    formValues,
    handleChange,
  };
};

export default useInput;
