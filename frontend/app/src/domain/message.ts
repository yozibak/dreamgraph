import { useEffect, useState } from 'react'
import { sendMessageToApi, startSubscription } from '../network'
import { Message } from '../types'

export const useMessage = (roomID?: string, username?: string) => {
  const [messages, setMessages] = useState<Message[]>([])

  const sendMessage = (text: string) => {
    if (!roomID || !username) return
    sendMessageToApi(text, roomID, username)
  }

  const onMessageReceived = (mes: Message) => setMessages([...messages, mes])

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
  }
}
