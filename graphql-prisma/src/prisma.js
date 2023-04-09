import { Prisma } from 'prisma-binding'

const primsa = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'localhost:4466'
})