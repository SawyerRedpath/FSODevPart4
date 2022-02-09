const listHelper = require('../utils/list_helper')

test('empty array returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1);
})