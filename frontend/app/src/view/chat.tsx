import { useContext, useState } from 'react'
import { MessageThread } from '../components/message'
import { DomainContext } from '../domain'

export const Chat = () => {
  const { messages } = useContext(DomainContext)
  return (
    <>
      <MessageThread messages={messages} />
      <MessageForm />
    </>
  )
}

const MessageForm = () => {
  const [content, setContent] = useState('')
  const { sendMessage } = useContext(DomainContext)
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
