const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'Keto journal',
    author: 'Emma Ketolady',
    url: 'ketojournal.com',
    likes: 2

  },
  {
    title: 'Golf daily',
    author: 'Sawyer Golferman',
    url: 'golfdaily.com',
    likes: 5
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}