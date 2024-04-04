import type { GraphQLSubscription } from 'aws-amplify/api'
import { Message } from '../types'
import { client } from './client'

export const startSubscription = (roomID: string, onData: (mes: Message) => void) => {
  const subscription = client
    .graphql<GraphQLSubscription<{ subscribeChatRoom: Message }>>({
      query: /* GraphQL */ `
        subscription SubscribeChatRoom {
          subscribeChatRoom(roomID: "${roomID}") {
            username
            text
            roomID
          }
        }
      `,
    })
    .subscribe({
      next: (value) => onData(value.data.subscribeChatRoom),
      // eslint-disable-next-line no-console
      error: (e) => console.warn(e),
    })
  return subscription
}

export const sendMessageToApi = async (content: string, roomID: string, username: string) => {
  await client.graphql({
    query: /* GraphQL */ `
      mutation SendMessage {
        sendMessage(text: "${content}", roomID: "${roomID}", username: "${username}") {
          text
          roomID
          username
        }
      }    
    `,
  })
}
