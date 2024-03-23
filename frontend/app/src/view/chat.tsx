import { useContext, useState } from 'react'
import { ChatRoomContext } from '../domain'
import { Message } from '../types'

export const Chat = () => {
  const { messages } = useContext(ChatRoomContext)
  return (
    <>
      <MessageThread messages={messages} />
      <MessageForm />
    </>
  )
}

const MessageThread = ({ messages }: { messages: Message[] }) => {
  return (
    <div>
      {messages.map((mes, i) => (
        <MessageItem key={i} message={mes} />
      ))}
    </div>
  )
}

const MessageItem = ({ message }: { message: Message }) => {
  return (
    <div>
      {message.username}: {message.text}
    </div>
  )
}

const MessageForm = () => {
  const [content, setContent] = useState('')
  const { sendMessage } = useContext(ChatRoomContext)
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        sendMessage(content)
      }}
    >
      <input
        onChange={(e) => setContent(e.target.value)}
        value={content}
        placeholder="what's up?"
      />
    </form>
  )
}
