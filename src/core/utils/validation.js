export const ValidationRules = {
  required: (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (value && !emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  minLength: (min) => (value) => {
    if (value && value.length < min) {
      return `Must be at least ${min} characters long`;
    }
    return null;
  },

  maxLength: (max) => (value) => {
    if (value && value.length > max) {
      return `Must be no more than ${max} characters long`;
    }
    return null;
  },

  pattern: (regex, message) => (value) => {
    if (value && !regex.test(value)) {
      return message;
    }
    return null;
  },

  custom: (validator, message) => (value) => {
    if (!validator(value)) {
      return message;
    }
    return null;
  },
};

export const validateField = (value, rules = []) => {
  for (const rule of rules) {
    const error = rule(value);
    if (error) {
      return error;
    }
  }
  return null;
};

export const validateForm = (formData, validationSchema) => {
  const errors = {};
  let isValid = true;

  Object.keys(validationSchema).forEach((field) => {
    const fieldValue = formData[field];
    const fieldRules = validationSchema[field];
    const error = validateField(fieldValue, fieldRules);
    
    if (error) {
      errors[field] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};