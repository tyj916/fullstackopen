import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  beforeEach(() => {
    render(<BlogForm />)
  })

  test('render the form', () => {
    const element = screen.getByText('Create New')
    expect(element).toBeInTheDocument()
  })
})
