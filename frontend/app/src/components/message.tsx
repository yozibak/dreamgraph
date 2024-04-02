import { Message } from '../types'

export const MessageThread = ({ messages }: { messages: Message[] }) => {
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
