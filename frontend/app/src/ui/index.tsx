import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { DreamGraph } from './view/app'
import { Container } from './components/layout'
import { useEffect, useState } from 'react'
import { Welcome } from './view/welcome'
import { getCurrentUser } from 'aws-amplify/auth'
import pjson from '../../package.json'

const AppVersion = pjson.version

const App = () => {
  const [welcome, setWelcome] = useState(true)
  useEffect(() => {
    async function checkAuth() {
      try {
        await getCurrentUser()
        setWelcome(false)
      } catch (e) {
        // not authenticated
      }
    }
    checkAuth()
  }, [welcome, setWelcome])

  return welcome ? (
    <Welcome appVersion={AppVersion} login={() => setWelcome(false)} />
  ) : (
    <AuthenticatedApp />
  )
}

const AuthenticatedApp = () => (
  <Container>
    <Authenticator loginMechanisms={['email']}>
      {(props) => <DreamGraph {...props} />}
    </Authenticator>
  </Container>
)

export default App
