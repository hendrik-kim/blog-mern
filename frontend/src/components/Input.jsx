/**
 * Reusable Input Component
 *
 * @component
 * @param {Object} prop - The properties passed to the Input component.
 * @param {string} prop.type - The type of the input field (e.g., text, password).
 * @param {string} prop.name - The name attribute of the input field.
 * @param {string} prop.placeholder - The placeholder text for the input field.
 * @param {Object} prop.extraValue - Additional values or state managed by a parent component.
 *
 * @returns {JSX.Element} - An input element with specified properties.
 *
 * @example
 * // Example usage in a parent component:
 * <Input
 *   type="text"
 *   name="username"
 *   placeholder="Enter your username"
 *   extraValue={formValues}
 * />
 */
function Input(prop) {
  return (
    <input
      type={prop.type}
      name={prop.name}
      placeholder={prop.placeholder}
      {...prop.extraValue}
    />
  );
}

export default Input;
