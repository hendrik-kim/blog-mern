/**
 * Error definitions for global error and form validation.
 */

/**
 * Global error definitions.
 */
export const globalErrors = {
  400: "Bad Request: An error occurred in the request.",
  401: "Unauthorized: Please log in to access this resource.",
  403: "Forbidden: You don't have permission to access this resource.",
  404: "Not Found: The requested resource was not found.",
  409: "Conflict: The resource already exists.",
  500: "Internal Server Error: An unexpected error occurred on the server.",
  default: "An unexpected error occurred. Please try again.",
};

/**
 * Form validation error definitions.
 */
export const validationErrors = {
  email: {
    invalidFormat: "Please enter a valid email.",
    required: "Please enter an email.",
  },
  password: {
    invalidFormat: "Password must meet the specified criteria.",
    required: "Please enter a password.",
  },
  confirmPassword: {
    mismatch: "Password confirmation does not match with the password.",
    required: "Please re-enter your password.",
  },
  username: {
    required: "Please enter a username.",
  },
};
