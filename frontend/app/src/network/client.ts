import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

export const configureAWS = () => {
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolClientId: 'ksklfaeiilei7udhq5hdrttpf',
        userPoolId: 'ap-northeast-1_RvEcMahwL',
        // identityPoolId: "ap-northeast-1:adbc10dc-caa9-4dd5-ab63-336eff87a828",
      },
    },
    API: {
      GraphQL: {
        endpoint:
        'https://dbq33t2uo5akrclo4ze76r4azy.appsync-api.ap-northeast-1.amazonaws.com/graphql',
        region: 'ap-northeast-1',
        defaultAuthMode: 'apiKey',
        apiKey: "da2-wi3vvg53gza5zjca6jcqxloruy",
      },
    },
  })
}


export const graphqlClient = generateClient()