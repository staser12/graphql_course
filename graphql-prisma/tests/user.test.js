import { getFirstName, isValidPassword } from "../src/utils/user";

test('Should return first name when given full name', () => {
    const firstName = getFirstName('Stanislav Radomskiy')

    expect(firstName).toBe('Stanislav')
})

test('Should return first name when given first name', () => {
    const firstName = getFirstName('Jen')

    expect(firstName).toBe('Jen')
})

test('Should reject password shorter than 8 characters', () => {
    const passwordValid = isValidPassword('1234')

    expect(passwordValid).toBe(false)
})

test('Should reject password that contains word password', () => {
    const passwordValid = isValidPassword('password12345')

    expect(passwordValid).toBe(false)
})

test('Should correctly validate a valid password', () => {
    const passwordValid = isValidPassword('abcdefg12345')

    expect(passwordValid).toBe(true)
})
