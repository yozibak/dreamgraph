import { useContext, useState } from 'react'
import { DomainContext } from '../domain'

export const Welcome = () => {
  const { roomID } = useContext(DomainContext)
  return (
    <>
      {roomID ? (
        <div>Welcome to {roomID}, enter your username to start</div>
      ) : (
        <div>Welcome! Let's host a chat room</div>
      )}
    </>
  )
}

export const UserNameForm = () => {
  const [name, setName] = useState('')
  const { enterChatRoom } = useContext(DomainContext)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        enterChatRoom(name)
      }}
    >
      <input onChange={(e) => setName(e.target.value)} value={name} placeholder="who are you?" />
    </form>
  )
}
