import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {
  let mockUpdateHandler;

  beforeEach(() => {
    const blog = {
      title: 'Component test with react-testing-library',
      author: 'Author Name',
      url: 'http://localhost:3003/',
      likes: 1,
      user: {
        name: 'Username'
      }
    }

    mockUpdateHandler = vi.fn()

    render(<Blog blog={blog} updateBlog={mockUpdateHandler} />)
  })

  test('render title and author', () => {
    const element = screen.getByText('Component test with react-testing-library Author Name', { exact: false })
    expect(element).toBeDefined()
  })

  test('at start the blog details are not displayed', () => {
    const url = screen.queryByText(/http:\/\/localhost:3003\//i)
    const likes = screen.queryByText(/Likes/i)
    
    expect(url).not.toBeInTheDocument()
    expect(likes).not.toBeInTheDocument()
  })

  test('clicking the button toggle blog details display', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    const url = screen.queryByText(/http:\/\/localhost:3003\//i)
    const likes = screen.queryByText(/Likes/i)
    
    expect(url).toBeInTheDocument()
    expect(likes).toBeInTheDocument()
  })

  test('clicking the like button 2 times calls event handler twice', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton);

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockUpdateHandler.mock.calls).toHaveLength(2)
  })
})
