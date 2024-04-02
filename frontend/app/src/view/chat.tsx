import { useContext } from 'react'
import { Form } from '../components/form'
import { MessageThread } from '../components/message'
import { DomainContext } from '../domain'
import { Invitation } from '../components/invitation'
import { getInvitationLink } from '../domain/chatroom'

export const Chat = () => {
  const { messages, roomID } = useContext(DomainContext)
  if (!roomID) return <></>
  return (
    <>
      <MessageThread messages={messages} />
      <MessageForm />
      <Invitation invitationLink={getInvitationLink(roomID)} />
    </>
  )
}

const MessageForm = () => {
  const { sendMessage } = useContext(DomainContext)
  return <Form onSubmit={sendMessage} placeholder={`what's up?`} />
}

