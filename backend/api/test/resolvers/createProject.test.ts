import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('add project', async () => {
  const context = createUserRequestMock({
    arguments: {
      input: {
        title: 'my-project-foo',
      },
    },
  })
  const result = await evaluateResolver('createProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'PutItem',
    key: {
      projectId: { S: expect.any(String) },
      userId: { S: context.identity.username },
    },
    attributeValues: {
      title: { S: context.arguments.input.title },
    },
  })
})
