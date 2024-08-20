import { evaluateResolver } from '../evaluate'
import { createUserRequestMock } from '../mock'

test('update project', async () => {
  const context = createUserRequestMock({
    arguments: {
      input: {
        projectId: 'my-project-foo-id',
        title: 'my-project-foo',
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
    },
  })
  const result = await evaluateResolver('updateProject', context, 'request')
  expect(result).toMatchObject({
    operation: 'UpdateItem',
    key: {
      projectId: { S: context.arguments.input.projectId },
      userId: { S: context.identity.sub },
    },
    update: {
      expression: 'SET #expName_1 = :expValue_1',
      expressionNames: {
        '#expName_1': 'title',
      },
      expressionValues: {
        ':expValue_1': {
          S: 'my-project-foo',
        },
      },
    },
  })
})
