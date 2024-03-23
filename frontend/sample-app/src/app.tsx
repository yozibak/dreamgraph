import { useState } from 'react'
import { Message, sendMessage, useChatRoom } from './network'

export default () => {
  const [messages, setMessages] = useState<Message[]>([])

  useChatRoom((mes) => setMessages([...messages, mes]))

  return (
    <>
      <h1>chat room</h1>
      <ul>
        {messages.map((mes, i) => (
          <li key={i}>
            {mes.username}: {mes.text}
          </li>
        ))}
      </ul>
      <NoteForm />
    </>
  )
}

const NoteForm = () => {
  const [content, setContent] = useState('')
  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault()
        await sendMessage(content)
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
