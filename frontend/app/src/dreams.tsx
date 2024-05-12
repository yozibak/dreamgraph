import { useState } from 'react'
import { sendSayHello } from './network'

export const Dreams = () => {
  const [message, setMessage] = useState('no message yet')
  const handleHello = async () => {
    const mes = await sendSayHello()
    mes && setMessage(mes)
  }
  return (
    <div>
      <h1>Dreams</h1>
      <button onClick={handleHello}>say hello</button>
      <div>{message}</div>
    </div>
  )
}
