export const sayHello = /* GraphQL */ `
  mutation SayHello($username: String!) {
    sayHello(username: $username) {
      content
    }
  }
`
