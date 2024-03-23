import { Header } from './components/header'
import { ChatRoomContext, useChatRoom } from './domain'
import { Chat } from './view/chat'
import { UserNameForm, Welcome } from './view/welcome'

export default () => {
  const chatroom = useChatRoom()
  return (
    <>
      <ChatRoomContext.Provider value={chatroom}>
        <Header roomID={chatroom.roomID} />
        {chatroom.roomID && chatroom.username ? <Chat /> : <Welcome />}
        {chatroom.username === '' ? <UserNameForm /> : <></>}
      </ChatRoomContext.Provider>
    </>
  )
}
