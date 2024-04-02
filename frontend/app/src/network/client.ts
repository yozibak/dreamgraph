import { Amplify } from 'aws-amplify'
import { generateClient } from 'aws-amplify/api'

Amplify.configure({
  API: {
    GraphQL: {
      endpoint: process.env.VITE_API_ENDPOINT!,
      region: 'ap-northeast-1',
      defaultAuthMode: 'apiKey',
      apiKey: process.env.VITE_API_KEY,
    },
  },
})

export const client = generateClient()
