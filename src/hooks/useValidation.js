import { useState } from 'react';

export default () => {
  const [error, setError] = useState('');
  const [isValidated, setIsValidated] = useState(false);

  const validateInputs = (type, email, password) => {
    if (type === 'Login') {
      if (!validateEmail(email) && !validatePassword(password)) {
        setError('Email and Password do not meet requirements..');
        setIsValidated(false);
      } else if (!validateEmail(email)) {
        setError('Email does not meet requirements..');
        setIsValidated(false);
      } else if (!validatePassword(password)) {
        setError('Password does not meet requirements..');
        setIsValidated(false);
      } else {
        setIsValidated(true);
      }
    }
    if (type === 'Signup') {
      if (!validateEmail(email) && !validatePassword(password)) {
        setError('Email and Password do not meet requirements..');
        setIsValidated(false);
      } else if (!validateEmail(email)) {
        setError('Email does not meet requirements..');
        setIsValidated(false);
      } else if (!validatePassword(password)) {
        setError('Password must be 4 characters or longer');
        setIsValidated(false);
      } else {
        setIsValidated(true);
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
