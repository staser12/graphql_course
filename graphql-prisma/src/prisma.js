import { Prisma } from 'prisma-binding'

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
})

export { prisma as default }

// // primsa.query
// const createPostForUser = async (authorId, data) => {
//     const userExists = await prisma.exists.User({
//         id: authorId
//     })

//     if ( !userExists ) {
//         throw new Error('User not found!')
//     }

//     const post = await prisma.mutation.createPost({
//         data: {
//             ...data,
//             author: {
//                 connect: {
//                     id: authorId
//                 }
//             }
//         }
//     }, '{ author { id name email posts { id title published } } }')

//     return post.author
// }

// // prisma.query.users(null, '{ id name posts { id title } }').then((data) => {
// //     console.log(JSON.stringify(data, undefined, 2))
// // })

// // prisma.query.comments(null, '{ id text author { id name} }').then(data => {
// //     console.log(JSON.stringify(data, undefined, 2))
// // })

// const updatePostForUser = async (postId, data) => {
//     const postExists = await prisma.exists.Post({
//         id: postId
//     })

//     if ( !postExists ) {
//         throw new Error('Post not found!')
//     }

//     const post = await prisma.mutation.updatePost({
//         where: {
//             id: postId
//         },
//         data
//     }, '{ author { id name email posts { id title published } } }')
//     return post.author
// }

// // updatePostForUser('clg9bwmmu01f80a10dceyvnkc', {published: false}).then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //     console.log(error.message)
// // })

// // createPostForUser('clg6pqxre010z0a104w9vlnu7', {
// //     title: 'New post again',
// //     body: 'New New Post 2',
// //     published: true
// // }).then((user) => {
// //     console.log(JSON.stringify(user, undefined, 2))
// // }).catch((error) => {
// //     console.log(error.message)
// // })