export const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidPassword = (password) => {
  return /[!@#$%^&*(),.?":{}|<>]/.test(password) && password.length >= 8;
};
