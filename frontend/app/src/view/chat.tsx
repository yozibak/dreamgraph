import { useContext, useState } from 'react'
import { MessageThread } from '../components/message'
import { ChatRoomContext } from '../domain'

export const Chat = () => {
  const { messages } = useContext(ChatRoomContext)
  return (
    <>
      <MessageThread messages={messages} />
      <MessageForm />
    </>
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
