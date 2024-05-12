export const handler = async (event) => {
  const username = event.arguments.id || event.arguments.content
  return { content: `Hello, ${username}` } // Post
}
