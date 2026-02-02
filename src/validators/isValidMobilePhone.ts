export const isValidMobilePhone = (phone: string): boolean => {
  const phoneRegex = new RegExp(/^\d{10}$/);
  return phoneRegex.test(phone);
};
