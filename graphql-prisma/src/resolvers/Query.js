const Query = {
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
  posts(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
        opArgs.where = {
            OR: [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
    }

    return prisma.query.posts(opArgs, info)
    //   if (!args.query) {
    //       return db.posts
    //   }

    //   return db.posts.filter((post) => {
    //       return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
    //   })
  },
  users(parent, args, { prisma }, info) {
    const opArgs = {}

    if (args.query) {
        opArgs.where = {
            OR: [{
                name_contains: args.query
            }, {
                email_contains: args.query
            }]
        }
    }

    return prisma.query.users(opArgs, info)

    //   if (!args.query) {
    //       return db.users
    //   } else {
    //       return db.users.filter((user) => {
    //           return user.name.toLowerCase().includes(args.query.toLowerCase())
    //       })
    //   }
  },
  comments(parent, args, { db }, info) {
      return db.comments
  }
}

export { Query as default }