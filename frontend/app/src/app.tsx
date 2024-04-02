import { Header } from './components/header'
import { DomainContext, useDomain } from './domain'
import { Chat } from './view/chat'
import { UserNameForm, Welcome } from './view/welcome'

export default () => {
  const domain = useDomain()
  return (
    <>
      <DomainContext.Provider value={domain}>
        {domain.roomID ? <Header roomID={domain.roomID} /> : <></>}
        {domain.roomID && domain.username ? <Chat /> : <Welcome />}
        {domain.username === '' ? <UserNameForm /> : <></>}
      </DomainContext.Provider>
    </>
  )
}
