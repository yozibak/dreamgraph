import { createContext, useEffect, useState } from 'react'
import { sendMessageToApi, startSubscription } from '../network'
import { Message } from '../types'

export const ChatRoomContext = createContext({} as ReturnType<typeof useChatRoom>)

export const useChatRoom = () => {
  const [username, setUsername] = useState('')
  const [roomID, setRoomID] = useState('')
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (text: string) => sendMessageToApi(text, roomID, username)
  const onMessageReceived = (mes: Message) => setMessages([...messages, mes])

  const hostChatRoom = (hostUserName: string) => {
    setUsername(hostUserName)
    setRoomID(`${hostUserName}-chat-room`)
  }

  useEffect(() => {
    if (!window.location.pathname) return
    setRoomID(window.location.pathname.slice(1))
  }, [window.location.pathname, setRoomID])

  useEffect(() => {
    if (!roomID) return
    const subscription = startSubscription(roomID, onMessageReceived)
    return () => {
      subscription.unsubscribe()
    }
  }, [roomID, onMessageReceived])

  return {
    messages,
    sendMessage,
    username,
    setUsername,
    roomID,
    hostChatRoom,
  }
}
