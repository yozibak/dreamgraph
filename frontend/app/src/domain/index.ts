import { createContext } from 'react'
import { useChatRoom } from './chatroom'
import { useMessage } from './message'

export type DomainStore = ReturnType<typeof useDomain>
export const DomainContext = createContext({} as DomainStore)

export const useDomain = () => {
  const { roomID, username, enterChatRoom } = useChatRoom()
  const { messages, sendMessage } = useMessage(roomID, username)
  return {
    messages,
    sendMessage,
    username,
    roomID,
    enterChatRoom,
  }
}
