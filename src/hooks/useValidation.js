export default () => {
  let error = '';
  let isValidated = false;
  const validateInputs = (type, email, password, conPassword) => {
    if (type === 'Login') {
      if (!validateEmail(email) && !validatePassword(password)) {
        error = 'Email and Password do not meet requirements..';
        isValidated = false;
      } else if (!validateEmail(email)) {
        error = 'Email does not meet requirements..';
        isValidated = false;
      } else if (!validatePassword(password)) {
        error = 'Password does not meet requirements..';
        isValidated = false;
      } else {
        isValidated = true;
      }
    }
    if (type === 'Signup') {
      if (!validateEmail(email) && !validatePassword(password)) {
        error = 'Email and Password do not meet requirements..';
        isValidated = false;
      } else if (!validateEmail(email)) {
        error = 'Email does not meet requirements..';
        isValidated = false;
      } else if (!validatePassword(password)) {
        error = 'Password must be 4 characters or longer';
        isValidated = false;
      } else if (password !== conPassword) {
        error = 'Passwords do not match';
        isValidated = false;
      } else {
        isValidated = true;
      }
    }
    return [isValidated, error];
  };

  const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    if (password.length < 4) {
      return false;
    }
    return true;
  };

  return [validateInputs];
};
