import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { Welcome } from './welcome'

test(`${Welcome.name}`, () => {
  const { getByText } = render(<Welcome />)
  expect(getByText(/Welcome!/)).toBeInTheDocument()
})
