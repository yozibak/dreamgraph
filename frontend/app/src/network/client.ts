import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

const { VITE_API_ENDPOINT, VITE_API_KEY } = import.meta.env

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: VITE_API_ENDPOINT,
      region: 'ap-northeast-1',
      defaultAuthMode: 'apiKey',
      apiKey: VITE_API_KEY,
    },
  },
})

export const client = generateClient()
