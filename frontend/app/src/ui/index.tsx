import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import * as auth from 'aws-amplify/auth'
import { useEffect, useState } from 'react'
import { AuthContext } from '../auth'
import { Container } from './components/layout'
import { App } from './view/app'

type AppMode = 'local' | 'cloud'

const Main = () => {
  const [appMode, setAppMode] = useState<AppMode>()

  useEffect(() => {
    ;(async () => {
      const session = await auth.fetchAuthSession()
      setAppMode(session.tokens?.accessToken ? 'cloud' : 'local')
    })()
  }, [])

  if (appMode === 'cloud') {
    return (
      <Container>
        <Authenticator loginMechanisms={['email']}>
          {({ signOut }) => (
            <AuthContext.Provider
              value={{
                isAuthenticated: true,
                switchAuth: () => {
                  signOut?.()
                },
              }}
            >
              <App />
            </AuthContext.Provider>
          )}
        </Authenticator>
      </Container>
    )
  }
  if (appMode === 'local') {
    return (
      <AuthContext.Provider
        value={{
          isAuthenticated: false,
          switchAuth: function signIn() {
            setAppMode('cloud')
          },
        }}
      >
        <App />
      </AuthContext.Provider>
    )
  }
  return <></> // loading
}

export default Main
