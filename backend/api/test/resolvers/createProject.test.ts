import { CreateProjectInput } from '../../src/types'
import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('add project', async () => {
  const createPjInput: CreateProjectInput = {
    projectId: 'pj-1',
    title: 'my-project-foo',
    unlocks: ['pj-2'],
    importance: 3,
    status: 'normal'
  }
  const context = createUserRequestMock({
    arguments: {
      input: createPjInput,
    },
    identity: {
      username: 'johndoe',
      sub: 'user-001',
      issuer: ' https://cognito-idp.ap-northeast-1.amazonaws.com/{userPoolId}',
      groups: [],
      claims: {},
      sourceIp: ['x.x.x.x'],
      defaultAuthStrategy: 'ALLOW',
    }
  })
  const result = await evaluateResolver('createProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'PutItem',
    key: {
      projectId: { S: createPjInput.projectId },
      userId: { S: context.identity.sub },
    },
    attributeValues: {
      title: { S: createPjInput.title },
      importance: { N: createPjInput.importance },
      status: { S: createPjInput.status },
      unlocks: {
        L: [
          {
            S: createPjInput.unlocks[0]
          }
        ]
      },
    },
  })
})
