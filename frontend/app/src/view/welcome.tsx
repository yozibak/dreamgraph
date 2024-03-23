import { useContext, useState } from 'react'
import { ChatRoomContext } from '../domain'

export const Welcome = () => {
  const { roomID } = useContext(ChatRoomContext)
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
  const { roomID, setUsername, hostChatRoom } = useContext(ChatRoomContext)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        if (roomID) {
          setUsername(name)
        } else {
          hostChatRoom(name)
        }
      }}
    >
      <input onChange={(e) => setName(e.target.value)} value={name} placeholder="who are you?" />
    </form>
  )
}
