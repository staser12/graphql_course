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

const userTwo = {
    input: {
        name: 'Mikko',
        email: 'mikko@example.com',
        password: bcrypt.hashSync('Red098!@#111$')
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

const commentOne = {
    input: {
        text: 'Great post!'
    },
    comment: undefined
}

const commentTwo = {
    input: {
        text: 'I am glad!'
    },
    comment: undefined
}

const seedDatabase = async () => {
    // Delete test data
    await prisma.mutation.deleteManyComments()
    await prisma.mutation.deleteManyPosts()
    await prisma.mutation.deleteManyUsers()

    // Create user one
    userOne.user = await prisma.mutation.createUser({
        data: userOne.input
    })
    userOne.jwt = jwt.sign({userId: userOne.user.id}, process.env.JWT_SECRET)

    // Create user two
    userTwo.user = await prisma.mutation.createUser({
        data: userTwo.input
    })
    userTwo.jwt = jwt.sign({userId: userTwo.user.id}, process.env.JWT_SECRET)

    // create posts
    // Create post one
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

    // create comment one
    commentOne.comment = await prisma.mutation.createComment({
        data: {
            ...commentOne.input,
            author: {
                connect: {
                    id: userTwo.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })

    // create comment two
    commentTwo.comment = await prisma.mutation.createComment({
        data: {
            ...commentTwo.input,
            author: {
                connect: {
                    id: userOne.user.id
                }
            },
            post: {
                connect: {
                    id: postOne.post.id
                }
            }
        }
    })

}

export { seedDatabase as default, userOne, userTwo, postOne, postTwo, commentOne, commentTwo }
