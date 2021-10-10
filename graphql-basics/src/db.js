const users = [{
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

const posts = [{
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

const comments = [{
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

const db = {
  users,
  posts,
  comments
}

export default db;