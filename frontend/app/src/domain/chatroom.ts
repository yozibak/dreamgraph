import { useState } from 'react'

export const useChatRoom = (initialRoomId?: string) => {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState(initialRoomId)

  const enterChatRoom = (username: string) => {
    if (!roomID) {
      setRoomID(`${username}-chat-room`)
    }
    setUsername(username)
  }
  return {
    roomID,
    username,
    enterChatRoom,
  }
}

export const getLocationParam = () => {
  if (!window.location.pathname) return
  return window.location.pathname.slice(1)
}
