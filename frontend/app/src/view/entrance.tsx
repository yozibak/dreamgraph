import { useContext } from 'react'
import { Form } from '../components/form'
import { DomainContext } from '../domain'

export const Entrance = () => {
  const { roomID } = useContext(DomainContext)
  return (
    <div>
      {roomID
        ? `Welcome! Let's host a chat room`
        : `Welcome to ${roomID}, enter your username to start`}
      <UserNameForm />
    </div>
  )
}

const UserNameForm = () => {
  const { enterChatRoom } = useContext(DomainContext)
  return <Form onSubmit={enterChatRoom} placeholder={'enter your username'} />
}
