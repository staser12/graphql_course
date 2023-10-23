import 'cross-fetch/polyfill'
import { gql } from 'apollo-boost'
import prisma from '../src/prisma'
import seedDatabase, { userOne, postOne, postTwo } from './utils/seedDatabase'
import getClient from './utils/getClient'
import { getPosts, getMyPosts, updatePost, createPost, deletePost } from './utils/operations'


const client = getClient()

beforeEach(seedDatabase)


test('Should expose published posts', async () => {
    const response = await client.query({ query: getPosts })

    expect(response.data.posts.length).toBe(1)
    expect(response.data.posts[0].published).toBe(true)
})

test('Should fetch users posts', async () => {
    const client = getClient(userOne.jwt)
    const { data } = await client.query({query: getMyPosts})

    expect(data.myPosts.length).toBe(2)
})

test('Should be able to update own post', async ()  => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postOne.post.id,
        data: {
            published: false
        }
    }

    const { data } = await client.mutate({mutation: updatePost, variables})
    const exists = await prisma.exists.Post({ id: postOne.post.id, published: false})

    expect(data.updatePost.published).toBe(false)
    expect(exists).toBe(true)
})

test('Should create a new post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        data: {
            title: "Post #3",
            body: "Post #3 created inside the test",
            published: true
        }
    }

    const { data } = await client.mutate({mutation: createPost, variables})
    const exists = await prisma.exists.Post({ id: data.createPost.id, title: data.createPost.title,
        body: data.createPost.body, published: data.createPost.published})

    expect(data.createPost.title).toBe("Post #3")
    expect(data.createPost.body).toBe("Post #3 created inside the test")
    expect(data.createPost.published).toBe(true)
    expect(exists).toBe(true)
})

test('Shoule delete a post', async () => {
    const client = getClient(userOne.jwt)
    const variables = {
        id: postTwo.post.id
    }

    const { data } = await client.mutate({mutation: deletePost, variables})
    const exists = await prisma.exists.Post({ id: data.deletePost.id})

    expect(exists).toBe(false)
})