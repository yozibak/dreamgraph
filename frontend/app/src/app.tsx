import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from 'aws-amplify/auth'
import { PropsWithChildren } from 'react'
import { Dreams } from './ui'

const App = () => {
  return (
    <Container>
      <Authenticator loginMechanisms={['email']}>{(props) => <Welcome {...props} />}</Authenticator>
    </Container>
  )
}

const Container: React.FC<PropsWithChildren> = ({ children }) => (
  <div className="p-8 h-dvh w-dvw text-gray-800">{children}</div>
)

const Welcome: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ signOut }) => {
  return (
    <div>
      <button className="text-blue-800" onClick={signOut}>
        Sign out
      </button>
      <Dreams />
    </div>
  )
}

export default App
