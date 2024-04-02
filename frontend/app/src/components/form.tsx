import { useState } from 'react'

export const Form = ({
  onSubmit,
  placeholder,
}: {
  onSubmit: (value: string) => void
  placeholder: string
}) => {
  const [val, setVal] = useState('')
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(val)
        setVal('')
      }}
    >
      <input onChange={(e) => setVal(e.target.value)} value={val} placeholder={placeholder} />
      <button type="submit">send</button>
    </form>
  )
}
