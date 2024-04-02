import { useContext } from 'react'
import { Form } from '../components/form'
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
  const { sendMessage } = useContext(DomainContext)
  return <Form onSubmit={sendMessage} placeholder={`what's up?`} />
}
