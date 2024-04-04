import { createRef, useEffect } from 'react'
import { Message } from '../types'

export const MessageThread = ({ messages }: { messages: Message[] }) => {
  const thread = createRef<HTMLDivElement>()
  useEffect(() => {
    if (thread.current) {
      thread.current.scrollIntoView(false)
    }
  }, [thread, messages])
  return (
    <div className="message-thread">
      <div ref={thread}>
        {messages.map((mes, i) => (
          <MessageItem key={i} message={mes} />
        ))}
      </div>
    </div>
  )
}

const MessageItem = ({ message }: { message: Message }) => {
  return (
    <div className="message-item">
      {message.username}: {message.text}
    </div>
  )
}
