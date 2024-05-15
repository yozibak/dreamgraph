import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('get project', async () => {
  const context = createUserRequestMock({ arguments: { projectId: 'my-project-id-123' } })
  const result = await evaluateResolver('getProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'GetItem',
    key: {
      projectId: { S: 'my-project-id-123' },
      userId: { S: context.identity.username },
    },
  })
})

test('get project from context value', async () => {
  const context = createUserRequestMock({
    stash: { projectId: 'my-project-id-123' },
  })
  const result = await evaluateResolver('getProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'GetItem',
    key: {
      projectId: { S: 'my-project-id-123' },
      userId: { S: context.identity.username },
    },
  })
})
