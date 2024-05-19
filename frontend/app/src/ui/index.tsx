import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { DreamGraph } from './view/app'
import { Container } from './components/layout'
import { useEffect, useState } from 'react'
import { Welcome } from './view/welcome'
import { getCurrentUser } from 'aws-amplify/auth'

const App = () => {
  const [welcome, setWelcome] = useState(true)
  useEffect(() => {
    async function checkAuth() {
      const user = await getCurrentUser()
      if (user) setWelcome(false)
    }
    checkAuth()
  }, [welcome, setWelcome])

  return welcome ? <Welcome login={() => setWelcome(false)} /> : <AuthenticatedApp />
}

const AuthenticatedApp = () => (
  <Container>
    <Authenticator loginMechanisms={['email']}>
      {(props) => <DreamGraph {...props} />}
    </Authenticator>
  </Container>
)

export default App
