import { GraphQLServer } from 'graphql-yoga'
import { v4 as uuidv4 } from 'uuid'

// Scalar types - String, Boolean, Int, Float, ID

// demo data
let users = [{
    id: '1',
    name: 'Stan',
    email: 'stan@example.com',
    age: 36
},
{
    id: '2',
    name: 'Sarah',
    email: 'sarah@example.com'
},
{
    id: '3',
    name: 'Mike',
    email: 'mike@example.com'
}]

let posts = [{
    id: '10',
    title: 'Post 1',
    body: 'This is post number one!',
    published: true,
    author: '1'
},
{
    id: '11',
    title: 'Post 2',
    body: 'This is post number two!',
    published: true,
    author: '1'
},
{
    id: '12',
    title: 'Post 3',
    body: 'This is post number three!',
    published: false,
    author: '2'
}]

let comments = [{
    id: '21',
    text: 'This is comment number one!',
    author: '1',
    post: '10'
},
{
    id: '22',
    text: 'This is comment number two!',
    author: '1',
    post: '10'
},
{
    id: '23',
    text: 'This is comment number three!',
    author: '2',
    post: '11'
},
{
    id: '24',
    text: 'This is comment number four!',
    author: '2',
    post: '12'
}]

// Type definitions (schema)
const typeDefs = `
    type Query {
        users(query: String): [User!]!
        me: User!
        post: Post!
        posts(query: String): [Post!]!
        comments: [Comment!]!
    }

    type Mutation {
        createUser(data: CreateUserInput!): User!
        deleteUser(id: ID!): User!
        createPost(data: CreatePostInput!): Post!
        deletePost(id: ID!): Post!
        createComment(data: CreateCommentInput!): Comment!
        deleteComment(id: ID!): Comment!
    }

    input CreateUserInput {
        name: String!,
        email: String!,
        age: Int
    }

    input CreatePostInput {
        title: String!,
        body: String!,
        published: Boolean!,
        author: ID!
    }

    input CreateCommentInput {
        text: String!,
        post: ID!,
        author: ID!
    }

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int
        posts: [Post!]!
        comments: [Comment!]!
    }

    type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
        author: User!
        comments: [Comment!]!
    }

    type Comment {
        id: ID!
        text: String!
        author: User!
        post: Post!
    }
`

// Resolvers
const resolvers = {
    Query: {
        me() {
            return {
                id: '123098',
                name: 'Mike',
                email: 'mike@example.com'
            }
        },
        post() {
            return {
                id: '444555',
                title: 'post',
                body: 'my first post',
                published: true,
            }
        },
        posts(parent, args, ctx, info) {
            if (!args.query) {
                return posts
            }

            return posts.filter((post) => {
                return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
            })
        },
        users(parent, args, ctx, info) {
            if (!args.query) {
                return users
            } else {
                return users.filter((user) => {
                    return user.name.toLowerCase().includes(args.query.toLowerCase())
                })
            }
        },
        comments(parent, args, ctx, info) {
            return comments
        }
    },
    Mutation: {
        createUser(parent, args, ctx, info) {
            const emailTaken = users.some((user) => {
                return user.email === args.data.email
            })

            if (emailTaken) {
                throw new Error('Email taken.')
            }

            const user = {
                id: uuidv4(),
                ...args.data
            }

            users.push(user)
            return user
        },
        deleteUser(parent, args, ctx, info) {
            const userIndex = users.findIndex((user) => user.id === args.id)

            if (userIndex === -1) {
                throw new Error('User not found.')
            }

            const deletedUsers = users.splice(userIndex, 1)

            posts = posts.filter((post) => {
                const match = post.author === args.id

                if (match) {
                    comments = comments.filter((comment) => {
                        return comment.post !== post.id
                    })
                }
                return !match
            })

            comments = comments.filter((comment) => {
                return comment.author !== args.id
            })

            return deletedUsers[0]
        },
        createPost(parent, args, ctx, info) {
            // check author exists
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found.')
            }

            const post = {
                id: uuidv4(),
                ...args.data
            }

            posts.push(post)
            return post
        },
        deletePost(parent, args, ctx, info) {
            const postIndex = posts.findIndex((post) => post.id === args.id)

            if (postIndex === -1) {
                throw new Error('Post not found.')
            }

            const deletedPosts = posts.splice(postIndex, 1)

            comments = comments.filter((comment) => {
                return comment.post !== args.id
            })
            return deletedPosts[0]
        },
        createComment(parent, args, ctx, info) {
            // check author exists
            const userExists = users.some((user) => user.id === args.data.author)

            if (!userExists) {
                throw new Error('User not found.')
            }

            // check post exists
            const postExists = posts.some((post) => post.id === args.data.post && post.published)

            if (!userExists) {
                throw new Error('User not found.')
            }

            if (!postExists) {
                throw new Error('Post not found.')
            }

            const comment = {
                id: uuidv4(),
                ...args.data
            }

            comments.push(comment)
            return comment
        },
        deleteComment(parent, args, ctx, info) {
            const commentIndex = comments.findIndex((comment) => comment.id === args.id)

            if (commentIndex === -1) {
                throw new Error('Comment not found.')
            }

            const deletedComments = comments.splice(commentIndex, 1)
            return deletedComments[0]
        }
    },
    Post: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.post === parent.id
            })
        }
    },
    User: {
        posts(parent, args, ctx, info) {
            return posts.filter((post) => {
                return post.author === parent.id
            })
        },
        comments(parent, args, ctx, info) {
            return comments.filter((comment) => {
                return comment.author === parent.id
            })
        }
    },
    Comment: {
        author(parent, args, ctx, info) {
            return users.find((user) => {
                return user.id === parent.author
            })
        },
        post(parent, args, ctx, info) {
            return posts.find((post) => {
                return post.id === parent.post
            })
        }
    }
}

const server = new GraphQLServer({
    typeDefs,
    resolvers
})

server.start(() => {
    console.log('The server is up!')
})
