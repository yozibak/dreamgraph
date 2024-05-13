import { graphqlClient } from './client'
import { sayHello } from './queries'

type Message = {
  content: string
}

export const sendSayHello = async () => {
  try {
    const result = (await graphqlClient.graphql({
      query: sayHello,
      variables: { username: 'John' },
      // authMode: 'userPool'
    })) as { data: { sayHello: Message } }
    return result.data.sayHello.content
  } catch (e) {

    console.log(e)
  }
}
