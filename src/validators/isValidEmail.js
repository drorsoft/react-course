export const isValidEmail = (phone) => {
    const phoneRegex = new RegExp(/.+@.+\..+/);
    return phoneRegex.test(phone)
}
