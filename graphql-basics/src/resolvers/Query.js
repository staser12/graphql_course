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
  posts(parent, args, { db }, info) {
      if (!args.query) {
          return db.posts
      }

      return db.posts.filter((post) => {
          return post.title.toLowerCase().includes(args.query.toLowerCase()) || post.body.toLowerCase().includes(args.query.toLowerCase())
      })
  },
  users(parent, args, { db }, info) {
      if (!args.query) {
          return db.users
      } else {
          return db.users.filter((user) => {
              return user.name.toLowerCase().includes(args.query.toLowerCase())
          })
      }
  },
  comments(parent, args, { db }, info) {
      return db.comments
  }
}

export { Query as default }