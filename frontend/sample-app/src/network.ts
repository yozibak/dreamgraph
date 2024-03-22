import 'vite/client'
import { Amplify } from 'aws-amplify'
import { GraphQLResult, generateClient } from 'aws-amplify/api'
import { Note } from './types'

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

const client = generateClient()

export const fetchNotes = async () => {
  const result = (await client.graphql({
    query: `
      query GetNotes {
        getNotes(number: 10) {
          content
          createdAt
        }
      }
    `,
  })) as GraphQLResult<{ getNotes: Note[] }>
  return result.data.getNotes
}

export const createNote = async (content: string) => {
  await client.graphql({
    query: `
      mutation MyMutation {
        addNote(content: "${content}") {
          content
          createdAt
        }
      }
    `,
  })
}
