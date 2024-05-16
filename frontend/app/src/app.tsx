import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from 'aws-amplify/auth'
import { Dreams } from './dreams'

const App = () => {
  return (
    <>
      <Authenticator loginMechanisms={['email']}>{(props) => <Welcome {...props} />}</Authenticator>
    </>
  )
}

const Welcome: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ signOut }) => {
  return (
    <div>
      <button onClick={signOut}>Sign out</button>
      <Dreams />
    </div>
  )
}

export default App
