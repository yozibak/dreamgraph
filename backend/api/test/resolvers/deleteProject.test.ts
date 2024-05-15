import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('delete project', async () => {
  const context = createUserRequestMock({ arguments: { projectId: 'my-project-id-123' } })
  const result = await evaluateResolver('deleteProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'DeleteItem',
    key: {
      projectId: { S: 'my-project-id-123' },
      userId: { S: context.identity.username },
    },
  })
})