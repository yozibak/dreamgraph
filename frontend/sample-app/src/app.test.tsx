import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './app'

test(`App`, () => {
  render(<App />)
  expect(screen.getByText('hello world')).toBeInTheDocument()
})