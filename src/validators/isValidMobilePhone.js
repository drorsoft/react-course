export const isValidMobilePhone = (phone) => {
    const phoneRegex = new RegExp(/^\d{10}$/);
    return phoneRegex.test(phone)
}
