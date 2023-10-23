import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, {userOne} from './utils/seedDatabase'
import getClient from './utils/getClient'
import { createUser, getUsers, login, getProfile } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)




test('Should create a new user', async () => {
    const variables = {
        data: {
            name: "Stan",
            email: "stan@example.com",
            password: "MyPass123"
        }
    }

    const response = await client.mutate({
        mutation: createUser,
        variables
    })

    const exists = await prisma.exists.User({
        id: response.data.createUser.user.id
    })

    expect(exists).toBe(true)
})

test('Should expose public author profiles', async () => {
    const response = await client.query({ query: getUsers })

    expect(response.data.users.length).toBe(1)
    expect(response.data.users[0].email).toBe(null)
    expect(response.data.users[0].name).toBe('Jen')
})


test('Should not login with bad credentials', async () => {
    const variables = {
        data: {
            email: "jeff@example.com",
            password: "12345678"
        }
    }

    await expect(client.mutate({mutation: login, variables})).rejects.toThrow()
})


test('Should not signup with a short password', async () => {
    const variables = {
        data: {
            name: "Stan",
            email: "stan@example.com",
            password: "pass"
        }
    }
    await expect(client.mutate({mutation: createUser, variables})).rejects.toThrow()
})

test('Should fetch user profile', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({query: getProfile})

    expect(data.me.id).toBe(userOne.user.id)
    expect(data.me.name).toBe(userOne.user.name)
    expect(data.me.email).toBe(userOne.user.email)
})


// import { getFirstName, isValidPassword } from "../src/utils/user";

// test('Should return first name when given full name', () => {
//     const firstName = getFirstName('Stanislav Radomskiy')

//     expect(firstName).toBe('Stanislav')
// })

// test('Should return first name when given first name', () => {
//     const firstName = getFirstName('Jen')

//     expect(firstName).toBe('Jen')
// })

// test('Should reject password shorter than 8 characters', () => {
//     const passwordValid = isValidPassword('1234')

//     expect(passwordValid).toBe(false)
// })

// test('Should reject password that contains word password', () => {
//     const passwordValid = isValidPassword('password12345')

//     expect(passwordValid).toBe(false)
// })

// test('Should correctly validate a valid password', () => {
//     const passwordValid = isValidPassword('abcdefg12345')

//     expect(passwordValid).toBe(true)
// })
