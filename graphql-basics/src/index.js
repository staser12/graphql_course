import { GraphQLServer } from 'graphql-yoga'

// Scalar types - String, Boolean, Int, Float, ID

// Type definitions (schema)
const typeDefs = `
    type Query {
        id: ID!
        name: String!
        age: Int!
        employed: Boolean!
        gpa: Float

        title: String!
        price: Float!
        releaseYear: Int
        rating: Float
        inStock: Boolean
    }
`

// Resolvers
const resolvers = {
    Query: {
        id() {
            return 'abc123'
        },
        name() {
            return 'Stan'
        },
        age() {
            return 36
        },
        employed() {
            return true
        },
        gpa() {
            return 3.01
        },

        title() {
            return 'Kia Ceed'
        },
        price() {
            return 17990.00
        },
        releaseYear() {
            return 2012
        },
        rating() {
            return 5.0
        },
        inStock() {
            return true
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
