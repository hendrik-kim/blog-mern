/**
 * Reusable Input Component
 *
 * @component
 * @param {Object} prop - The properties passed to the Input component.
 * @param {string} prop.type - The type of the input field (e.g., text, password).
 * @param {string} prop.name - The name attribute of the input field.
 * @param {string} prop.placeholder - The placeholder text for the input field.
 * @param {string} [prop.label] - Optional label for the input field.
 * @param {string} [prop.value] - The current value of the input field.
 * @param {Function} [prop.onChange] - Handler function for the change event.
 * @param {Object[]} [prop.options] - Options for select and radio input types.
 * @param {string} prop.options[].value - The value of the option.
 * @param {string} prop.options[].label - The label for the option.
 * @param {string} [prop.checked] - The checked value for radio input type.
 *
 * @returns {JSX.Element} - An input element with specified properties.
 *
 * @example
 * // Example usage in a parent component:
 * <Input
 *   type="text"
 *   name="username"
 *   value={username}
 *   placeholder="Enter your username"
 *   onChange={(e) => setUsername(e.target.value)}
 * />
 */
function Input(prop) {
  const { type, label, name, value, onChange = () => {} } = prop;

  const inputProps = {
    type,
    name,
    value,
    onChange,
  };

  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      {/* Textarea */}
      {type === "textarea" ? (
        <textarea {...inputProps} placeholder={prop.placeholder} />
      ) : /* Dropdown */
      type === "select" ? (
        <select {...inputProps} onChange={onChange}>
          {prop.options &&
            prop.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
        </select>
      ) : /* Radio button */
      type === "radio" ? (
        <div>
          {prop.options &&
            prop.options.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name={name}
                  value={option.value}
                  checked={prop.checked === option.value}
                  onChange={onChange}
                />
                {option.label}
              </label>
            ))}
        </div>
      ) : (
        /* Rest of types(text, password etc) */
        <input {...inputProps} placeholder={prop.placeholder} />
      )}
    </div>
  );
}

export default Input;
