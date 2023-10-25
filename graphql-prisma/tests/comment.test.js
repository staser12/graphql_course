import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, commentOne, commentTwo, postOne } from './utils/seedDatabase'
import getClient from './utils/getClientOld'
import { deleteComment, subscribeToComments } from './utils/operations'

const client = getClient()

beforeEach(seedDatabase)

test('Should delete own comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentTwo.comment.id
    }

    await client.mutate({mutation: deleteComment, variables})
    const exists = await prisma.exists.Comment({ id: commentTwo.comment.id })

    expect(exists).toBe(false)
})

test('Should not delete other users comment', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: commentOne.comment.id
    }

    await expect(
        client.mutate({mutation: deleteComment, variables})
    ).rejects.toThrow()
})

// test('Should subscribe to comments for a post', async (done) => {
//     const variables = {
//         postId: postOne.post.id
//     }

//     client.subscribe({ query: subscribeToComments, variables }).subscribe({
//         next(response) {
//             expect(response.data.comment.mutation).toBe('DELETED')
//             done()
//         }
//     })

//     // Change comment
//     await prisma.mutation.deleteComment({ where: { id: commentOne.comment.id } })
// })