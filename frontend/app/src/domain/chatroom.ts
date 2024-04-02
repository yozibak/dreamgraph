import { useState } from 'react'

export const useChatRoom = () => {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState(getInvitedRoom())

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

export const getInvitedRoom = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const roomID = urlParams.get('roomID')
  return roomID || undefined
}

export const getInvitationLink = (roomID: string) => {
  return `${window.location.origin}?roomID=${roomID}`
}
