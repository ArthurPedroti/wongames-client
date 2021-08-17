import { render, screen } from '@testing-library/react'

import Logo from '.'

describe('<Logo />', () => {
  it('should render a white label by default', () => {
    const { container } = render(<Logo />)

    expect(screen.getByRole('heading', { name: /Logo/i })).toBeInTheDocument()

    expect(container.firstChild).toMatchSnapshot()
  })
})
