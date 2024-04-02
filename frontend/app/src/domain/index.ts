import { createContext } from 'react'
import { getLocationParam, useChatRoom } from './chatroom'
import { useMessage } from './message'

export const DomainContext = createContext({} as ReturnType<typeof useDomain>)

export const useDomain = () => {
  const initialParam = getLocationParam()
  const { roomID, username, enterChatRoom } = useChatRoom(initialParam)
  const { messages, sendMessage } = useMessage(roomID, username)
  return {
    messages,
    sendMessage,
    username,
    roomID,
    enterChatRoom,
  }
}
