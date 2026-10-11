import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('render <Blog />', () => {
  const blog = {
    title: 'Component test with react-testing-library',
    author: 'Test',
    url: 'http://localhost:3003/',
    likes: 1,
    user: {
      name: 'Username'
    }
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component test with react-testing-library', { exact: false })
  expect(element).toBeDefined()
})
