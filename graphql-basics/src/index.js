import { GraphQLServer } from 'graphql-yoga'

// String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        hello: String!
        name: String!,
        location: String!,
        bio: String!
    }
`

// Resolvers
const resolvers = {
    Query: {
        hello() {
            return 'This is my first query!'
        },
        name() {
            return 'Stan'
        },
        location() {
            return 'Tampere'
        },
        bio() {
            return 'I live in Tampere!'
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
