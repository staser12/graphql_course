import { v4 as uuidv4 } from 'uuid'


const Mutation = {
  async createUser(parent, args, { prisma }, info) {
      return await prisma.mutation.createUser({ data: args.data }, info)
  },
  async deleteUser(parent, args, { prisma }, info) {
    return prisma.mutation.deleteUser({where: {id: args.id}}, info)
  },
  async updateUser(parent, args, { prisma }, info) {
    return prisma.mutation.updateUser({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
  async createPost(parent, args, { prisma }, info) {
    return prisma.mutation.createPost({
      data: {
        title: args.data.title,
        body: args.data.body,
        published: args.data.published,
        author: {
          connect: {
            id: args.data.author
          }
        }
      }
    }, info)
      // check author exists
      // const userExists = db.users.some((user) => user.id === args.data.author)

      // if (!userExists) {
      //     throw new Error('User not found.')
      // }

      // const post = {
      //     id: uuidv4(),
      //     ...args.data
      // }

      // db.posts.push(post)

      // if (args.data.published) {
      //   pubsub.publish("post", {
      //     post: {
      //       mutation: 'CREATED',
      //       data: post
      //     }
      //   })
      // }

      // return post
  },
  deletePost(parent, args, { prisma }, info) {
      return prisma.mutation.deletePost({where: {id: args.id}}, info)
  },
  updatePost(parent, args, { prisma }, info) {

      // const post = db.posts.find((post) => post.id === args.id)

      // const { data } = args
      // const originalPost = { ...post }

      // if (!post) {
      //     throw new Error('Post not found.')
      // }

      // if (typeof data.title === 'string') {
      //   post.title = data.title
      // }

      // if (typeof data.body === 'string') {
      //   post.body = data.body
      // }

      // if (typeof data.published === 'boolean') {
      //   post.published = data.published

      //   if (originalPost.published && !post.published) {
      //     pubsub.publish('post',  {
      //       post: {
      //         mutation: 'DELETED',
      //         data: originalPost
      //       }
      //     })
      //   } else if (!originalPost.published && post.published) {
      //     pubsub.publish('post',  {
      //       post: {
      //         mutation: 'CREATED',
      //         data: post
      //       }
      //     })
      //   } else if (post.published) {
      //     // updated
      //     pubsub.publish('post',  {
      //       post: {
      //         mutation: 'UPDATED',
      //         data: post
      //       }
      //     })
      //   }
      // }

      // return post
      return prisma.mutation.updatePost({
        where: {
          id: args.id
        },
        data: args.data
      }, info)
  },
  createComment(parent, args, { prisma }, info) {
      return prisma.mutation.createComment({
        data: {
          text: args.data.text,
          author: {
            connect: {
              id: args.data.author
            }
          },
          post: {
            connect: {
              id: args.data.post
            }
          }
        }
      }, info)
  },
  deleteComment(parent, args, { prisma }, info) {
      return prisma.mutation.deleteComment({
        where: {
          id: args.id
        }
      }, info)
  },
  updateComment(parent, args, { prisma }, info) {
    return prisma.mutation.updateComment({
      where: {
        id: args.id
      },
      data: args.data
    }, info)
  },
}

export { Mutation as default }
