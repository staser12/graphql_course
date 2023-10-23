import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import prisma from '../../src/prisma'


const userOne = {
    input: {
        name: 'Jen',
        email: 'jen@example.com',
        password: bcrypt.hashSync('Red098!@#$')
    },
    user: undefined,
    jwt: undefined
}

const postOne = {
    input: {
        title: 'Post #1',
        body: 'Post body #1',
        published: true

    },
    post: undefined
}

const postTwo = {
    input: {
        title: 'Post #2 (draft)',
            body: 'Post body #2',
            published: false,

    },
    post: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET)

    // create posts
    //Create post one
    postOne.post = await prisma.mutation.createPost({
        data: {
            ...postOne.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })

    postTwo.post = await prisma.mutation.createPost({
        data: {
            ...postTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            }
        }
    })
}

export { seedDatabase as default, userOne, postOne, postTwo }
