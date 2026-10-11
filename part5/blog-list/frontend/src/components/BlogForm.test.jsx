import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  let addBlog

  beforeEach(() => {
    addBlog = vi.fn()
    render(<BlogForm addBlog={addBlog} />)
  })

  test('render the form', () => {
    const element = screen.getByText('Create New')
    expect(element).toBeInTheDocument()
  })

  test('calls onSubmit', async () => {
    const user = userEvent.setup()
    const titleInput = screen.getByLabelText('Title')
    const authorInput = screen.getByLabelText('Author')
    const urlInput = screen.getByLabelText('Url')
    const submitButton = screen.getByText('Create')

    await user.type(titleInput, 'React test title textbox')
    await user.type(authorInput, 'React test author textbox')
    await user.type(urlInput, 'React test url textbox')
    await user.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    expect(addBlog.mock.calls[0][0].title).toBe('React test title textbox')
    expect(addBlog.mock.calls[0][0].author).toBe('React test author textbox')
    expect(addBlog.mock.calls[0][0].url).toBe('React test url textbox')
  })
})
