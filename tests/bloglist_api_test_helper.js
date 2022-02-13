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

const nonExistingId = async () => {
  const blog = new Blog({ title: 'to be deleted', author: 'deleting this', url: 'deletingthis.com', likes: 0 })

  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

module.exports = {
  initialBlogs, blogsInDb, nonExistingId
}