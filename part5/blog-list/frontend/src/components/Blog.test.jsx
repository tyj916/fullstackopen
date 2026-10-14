import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const mockUpdateHandler = vi.fn()
const mockNavigate = vi.fn()

vi.mock('react-router-dom', async () => {
  const originalModule = await vi.importActual('react-router-dom')
  return {
    ...originalModule,
    useNavigate: () => mockNavigate,
  }
})

describe('<Blog />', () => {
  beforeEach(() => {
    mockUpdateHandler.mockClear()
    mockNavigate.mockClear()

    const blog = {
      title: 'Component test with react-testing-library',
      author: 'Author Name',
      url: 'http://localhost:3003/',
      likes: 1,
      user: {
        name: 'Username'
      }
    }

    render(<Blog blog={blog} updateBlog={mockUpdateHandler} />)
  })

  test('render blog', () => {
    const title = screen.getByText('Author Name: Component test with react-testing-library')
    const url = screen.getByText('http://localhost:3003/')
    const likes = screen.getByText('Likes: 1')
    const name = screen.getByText('Username')

    expect(title).toBeVisible()
    expect(url).toBeVisible()
    expect(likes).toBeVisible()
    expect(name).toBeVisible()
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
