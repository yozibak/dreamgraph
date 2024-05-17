import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

export const configureAWS = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: process.env.USER_POOL_CLIENT_ID!,
        userPoolId: process.env.USER_POOL_ID!,
      },
    },
    API: {
      GraphQL: {
        endpoint: process.env.API_ENDPOINT!,
        region: 'ap-northeast-1',
        defaultAuthMode: 'userPool',
      },
    },
  })
}

export const graphqlClient = generateClient()
