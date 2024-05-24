import { Toggle } from './toggle'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { act, render, screen } from '@testing-library/react'

test(`${Toggle.name}`, async () => {
  const Default = ({ cb }: { cb: () => void }) => <div onClick={cb}>default</div>
  const Alt = ({ cb }: { cb: () => void }) => {
    return (
      <input
        onChange={(e) => {
          if (e.currentTarget.value === 'finish') {
            cb()
          }
        }}
      />
    )
  }

  render(
    <Toggle
      DefaultUI={({ toggle }) => <Default cb={toggle} />}
      AltUI={({ toggle }) => <Alt cb={toggle} />}
    />
  )

  await act(async () => {
    await userEvent.click(screen.getByText(/default/))
  })

  const input = await screen.findByRole('textbox')
  expect(input).toBeVisible()

  await act(async () => {
    await userEvent.type(input, 'fini')
  })

  expect(input).toHaveValue('fini')

  await act(async () => {
    await userEvent.type(input, 'sh')
  })
  expect(input).toHaveValue('finish')

  expect(await screen.findByText(/default/)).toBeVisible()
})
