export const isValidMobilePhone = (phone) => {
    const phoneRegex = new RegExp(/^\d{9}$/);
    return phoneRegex.test(phone)
}
