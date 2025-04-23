import { expect, test, describe } from 'vitest'
import { isValidMobilePhone } from '../src/validators/isValidMobilePhone'

describe('phone number validator', () => {
    test('valid 10-digit phone number', () => {
        const isValid = isValidMobilePhone('1234567890')
        expect(isValid).toBe(true)
    })
    test('phone number with less than 10 digits is invalid', () => {
        const isValid = isValidMobilePhone('123456789')
        expect(isValid).toBe(false)
    })
    test('phone number with more than 10 digits is invalid', () => {
        const isValid = isValidMobilePhone('12345678901')
        expect(isValid).toBe(false)
    })
    test('phone number with letters is invalid', () => {
        const isValid = isValidMobilePhone('12345abcde')
        expect(isValid).toBe(false)
    })
    test('phone number with special characters is invalid', () => {
        const isValid = isValidMobilePhone('12345@#$%^')
        expect(isValid).toBe(false)
    })
    test('empty phone number is invalid', () => {
        const isValid = isValidMobilePhone('')
        expect(isValid).toBe(false)
    })
})