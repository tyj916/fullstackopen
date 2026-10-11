import { render, screen } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  beforeEach(() => {
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
  })

  test('render title', () => {
    const element = screen.getByText('Component test with react-testing-library', { exact: false })
    expect(element).toBeDefined()
  })

  test('at start the blog details are not displayed', () => {
    const element = screen.queryByText(/http:\/\/localhost:3003\//i)
    expect(element).not.toBeInTheDocument()
  })
})
