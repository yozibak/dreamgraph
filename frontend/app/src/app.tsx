import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { AuthUser } from 'aws-amplify/auth'
import { Dreams } from './dreams'

const App = () => {
  return (
    <>
      <div>dream app</div>
      <Dreams />
      <Authenticator loginMechanisms={['email']}>{(props) => <Welcome {...props} />}</Authenticator>
    </>
  )
}

const Welcome: React.FC<{ user?: AuthUser; signOut?: () => void }> = ({ user, signOut }) => {
  if (!user) return (
    <div>
      <div>Welcome, guest</div>
      <Dreams />
    </div>
  )
  return (
    <div>
      <div>Welcome, {user.username}</div>
      <Dreams />
      <button onClick={signOut}>Sign out</button>
    </div>
  )
}

export default App
