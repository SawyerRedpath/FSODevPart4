const mongoose = require('mongoose')
const helper = require('./bloglist_api_test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')


beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {

  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('valid blog post successfully creates blog', async () => {

  const newBlog = {
    title: 'Newly added blog',
    author: 'Jose Ramirez',
    url: 'newblog.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  expect(blogsAtEnd).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        ...newBlog
      })
    ])
  )
})

describe('delete functionality', () => {
  test('succeeds with status 204 if id is valid', async () => {

    const blogsBeforeDelete = await helper.blogsInDb()
    const blogToDelete = blogsBeforeDelete[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

    const blogsAfterDelete = await helper.blogsInDb()

    expect(blogsAfterDelete).toHaveLength(blogsBeforeDelete.length - 1)

    expect(blogsAfterDelete).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          ...blogToDelete
        })
      ])
    )
  })
})


afterAll(() => {
  mongoose.connection.close()
})

