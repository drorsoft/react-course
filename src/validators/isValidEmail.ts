export const isValidEmail = (email: string): boolean => {
  if (typeof email !== "string") {
    throw new Error("Invalid input type");
  }
  const phoneRegex = new RegExp(/.+@.+\..+/);
  return phoneRegex.test(email);
};
