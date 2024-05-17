import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from 'aws-amplify/auth'
import { PropsWithChildren } from 'react'
import { Dreams } from './ui'

const App = () => {
  return (
    <Container>
      <Authenticator loginMechanisms={['email']}>{(props) => <Authenticated {...props} />}</Authenticator>
    </Container>
  )
}

const Container: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="h-dvh w-dvw text-gray-800 ">{children}</div>
)

const Authenticated: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ signOut }) => {
  return (
    <div className='h-full flex flex-col'>
      <div className=' bg-gray-200'>
        <button className="text-blue-800" onClick={signOut}>
          Sign out
        </button>
      </div>
      <div className='grow'>
        <Dreams />
      </div>
    </div>
  )
}

export default App
