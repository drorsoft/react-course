export const isValidEmail = (email: string): boolean => {
  const phoneRegex = new RegExp(/.+@.+\..+/);
  return phoneRegex.test(email);
};
