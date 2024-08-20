import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('list projects', async () => {
  const context = createUserRequestMock()
  const result = await evaluateResolver('listProjects', context, 'request')
  expect(result).toEqual({
    operation: 'Query',
    query: {
      expression: '(#userId = :userId_eq)',
      expressionNames: {
        '#userId': 'userId',
      },
      expressionValues: {
        ':userId_eq': {
          S: 'user-1',
        },
      },
    },
  })
})
