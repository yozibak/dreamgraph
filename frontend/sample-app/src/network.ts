import { Amplify } from 'aws-amplify'
import { generateClient, GraphQLSubscription } from 'aws-amplify/api'
import { useEffect } from 'react'

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

export type Message = {
  username: string
  text: string
}

export const useChatRoom = (handleMessage: (mes: Message) => void) => {
  useEffect(() => {
    console.log('sub..')
    const subscription = client
      .graphql<GraphQLSubscription<{ subscribeChatRoom: Message }>>({
        query: `
        subscription MySubscription {
          subscribeChatRoom(roomID: "room1") {
            username
            text
            roomID
          }
        }    
      `,
      })
      .subscribe({
        next: (value) => {
          console.log(value)
          handleMessage(value.data.subscribeChatRoom)
        },
        error: (e) => {
          console.warn(e)
        },
      })
    return () => {
      subscription && subscription.unsubscribe()
    }
  }, [handleMessage])
}

export const sendMessage = async (content: string) => {
  console.log('sendMessage')
  await client.graphql({
    query: `
      mutation MyMutation {
        sendMessage(text: "${content}", roomID: "room1", username: "yozibak") {
          text
          roomID
          username
        }
      }    
    `,
  })
}
