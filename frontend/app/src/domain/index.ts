import { createContext } from 'react'
import { getLocationParam, useChatRoom } from './chatroom'
import { useMessage } from './message'

export type DomainStore = ReturnType<typeof useDomain>
export const DomainContext = createContext({} as DomainStore)

export const useDomain = () => {
  const invitedRoom = getLocationParam()
  const { roomID, username, enterChatRoom } = useChatRoom(invitedRoom)
  const { messages, sendMessage } = useMessage(roomID, username)
  return {
    messages,
    sendMessage,
    username,
    roomID,
    enterChatRoom,
    invitedRoom,
  }
}
