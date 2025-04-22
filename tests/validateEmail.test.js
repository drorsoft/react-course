import { expect, test, describe } from 'vitest'
import { isValidEmail } from '../src/validators/isValidEmail'

describe('email validator', () => {
    test(' gmail address is valid', () => {
        const isValid = isValidEmail('john@gmail.com')
        expect(isValid).toBe(true)
    })
    test('address without @ sign is invalid', () => {
        const isValid = isValidEmail('johngmail.com')
        expect(isValid).toBe(false)
    })
    test('address with no domain is not valid', () => {
        const isValid = isValidEmail('john@')
        expect(isValid).toBe(false)
    })
})
